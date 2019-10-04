"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettier = require("prettier");
const vscode_1 = require("vscode");
const errorHandler_1 = require("./errorHandler");
const requirePkg_1 = require("./requirePkg");
const utils_1 = require("./utils");
const STYLE_PARSERS = ['postcss', 'css', 'less', 'scss'];
function checkHasPrettierConfig(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = yield resolveConfig(filePath);
        return config !== null;
    });
}
function resolveConfig(filePath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = (yield prettier.resolveConfig(filePath, options));
            return { config };
        }
        catch (error) {
            return { config: null, error };
        }
    });
}
function mergeConfig(hasPrettierConfig, additionalConfig, prettierConfig, vscodeConfig) {
    return hasPrettierConfig
        ? Object.assign(Object.assign({ parser: vscodeConfig.parser }, prettierConfig), additionalConfig) : Object.assign(Object.assign(Object.assign({}, vscodeConfig), prettierConfig), additionalConfig);
}
function format(text, { fileName, languageId, uri, isUntitled }, customOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const vscodeConfig = utils_1.getConfig(uri);
        const localPrettier = requirePkg_1.requireLocalPkg(fileName, 'prettier');
        if (vscodeConfig.disableLanguages.includes(languageId)) {
            return text;
        }
        const dynamicParsers = utils_1.getParsersFromLanguageId(languageId, isUntitled ? undefined : fileName);
        let useBundled = false;
        let parser;
        if (!dynamicParsers.length) {
            const bundledParsers = utils_1.getParsersFromLanguageId(languageId, isUntitled ? undefined : fileName, true);
            parser = bundledParsers[0] || 'babylon';
            useBundled = true;
        }
        else if (vscodeConfig.parser &&
            dynamicParsers.includes(vscodeConfig.parser)) {
            parser = vscodeConfig.parser;
        }
        else {
            parser = dynamicParsers[0];
        }
        const doesParserSupportEslint = [
            'javascript',
            'javascriptreact',
            'typescript',
            'typescriptreact',
            'vue'
        ].includes(languageId);
        const hasConfig = yield checkHasPrettierConfig(fileName);
        if (!hasConfig && vscodeConfig.requireConfig) {
            return text;
        }
        const { config: fileOptions, error } = yield resolveConfig(fileName, {
            editorconfig: true
        });
        if (error) {
            errorHandler_1.addToOutput(`Failed to resolve config for ${fileName}. Falling back to the default config settings.`);
        }
        const prettierOptions = mergeConfig(hasConfig, customOptions, fileOptions || {}, {
            arrowParens: vscodeConfig.arrowParens,
            bracketSpacing: vscodeConfig.bracketSpacing,
            endOfLine: vscodeConfig.endOfLine,
            htmlWhitespaceSensitivity: vscodeConfig.htmlWhitespaceSensitivity,
            jsxBracketSameLine: vscodeConfig.jsxBracketSameLine,
            jsxSingleQuote: vscodeConfig.jsxSingleQuote,
            parser: parser,
            printWidth: vscodeConfig.printWidth,
            proseWrap: vscodeConfig.proseWrap,
            quoteProps: vscodeConfig.quoteProps,
            semi: vscodeConfig.semi,
            singleQuote: vscodeConfig.singleQuote,
            tabWidth: vscodeConfig.tabWidth,
            trailingComma: vscodeConfig.trailingComma,
            useTabs: vscodeConfig.useTabs
        });
        if (vscodeConfig.tslintIntegration && parser === 'typescript') {
            return errorHandler_1.safeExecution(() => {
                const prettierTslint = require('prettier-tslint')
                    .format;
                errorHandler_1.setUsedModule('prettier-tslint', 'Unknown', true);
                return prettierTslint({
                    fallbackPrettierOptions: prettierOptions,
                    filePath: fileName,
                    text
                });
            }, text, fileName);
        }
        if (vscodeConfig.eslintIntegration && doesParserSupportEslint) {
            return errorHandler_1.safeExecution(() => {
                const prettierEslint = require('prettier-eslint');
                errorHandler_1.setUsedModule('prettier-eslint', 'Unknown', true);
                return prettierEslint({
                    fallbackPrettierOptions: prettierOptions,
                    filePath: fileName,
                    text
                });
            }, text, fileName);
        }
        if (vscodeConfig.stylelintIntegration && STYLE_PARSERS.includes(parser)) {
            const prettierStylelint = require('prettier-stylelint');
            return errorHandler_1.safeExecution(prettierStylelint.format({
                filePath: fileName,
                prettierOptions,
                text
            }), text, fileName);
        }
        if (!doesParserSupportEslint && useBundled) {
            return errorHandler_1.safeExecution(() => {
                const warningMessage = `prettier@${localPrettier.version} doesn't support ${languageId}. ` +
                    `Falling back to bundled prettier@${prettier.version}.`;
                errorHandler_1.addToOutput(warningMessage);
                errorHandler_1.setUsedModule('prettier', prettier.version, true);
                return prettier.format(text, prettierOptions);
            }, text, fileName);
        }
        errorHandler_1.setUsedModule('prettier', localPrettier.version, false);
        return errorHandler_1.safeExecution(() => localPrettier.format(text, prettierOptions), text, fileName);
    });
}
function fullDocumentRange(document) {
    const lastLineId = document.lineCount - 1;
    return new vscode_1.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}
class PrettierEditProvider {
    constructor(fileIsIgnored) {
        this.fileIsIgnored = fileIsIgnored;
    }
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        return this._provideEdits(document, {
            rangeEnd: document.offsetAt(range.end),
            rangeStart: document.offsetAt(range.start)
        });
    }
    provideDocumentFormattingEdits(document, options, token) {
        return this._provideEdits(document, {});
    }
    _provideEdits(document, options) {
        if (!document.isUntitled && this.fileIsIgnored(document.fileName)) {
            return Promise.resolve([]);
        }
        return format(document.getText(), document, options).then(code => [
            vscode_1.TextEdit.replace(fullDocumentRange(document), code)
        ]);
    }
}
exports.default = PrettierEditProvider;
//# sourceMappingURL=PrettierEditProvider.js.map