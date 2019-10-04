"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const configCacheHandler_1 = require("./configCacheHandler");
const errorHandler_1 = require("./errorHandler");
const ignoreFileHandler_1 = require("./ignoreFileHandler");
const PrettierEditProvider_1 = require("./PrettierEditProvider");
const utils_1 = require("./utils");
const telemetryKey = '93c48152-e880-42c1-8652-30ad62ce8b49';
let reporter;
let formatterHandler;
let rangeFormatterHandler;
function disposeHandlers() {
    if (formatterHandler) {
        formatterHandler.dispose();
    }
    if (rangeFormatterHandler) {
        rangeFormatterHandler.dispose();
    }
    formatterHandler = undefined;
    rangeFormatterHandler = undefined;
}
function selectors() {
    let allLanguages;
    if (vscode_1.workspace.workspaceFolders === undefined) {
        allLanguages = utils_1.allEnabledLanguages();
    }
    else {
        allLanguages = [];
        for (const folder of vscode_1.workspace.workspaceFolders) {
            allLanguages.push(...utils_1.allEnabledLanguages(folder.uri.fsPath));
        }
    }
    const allRangeLanguages = utils_1.rangeSupportedLanguages();
    const { disableLanguages } = utils_1.getConfig();
    const globalLanguageSelector = allLanguages.filter(l => !disableLanguages.includes(l));
    const globalRangeLanguageSelector = allRangeLanguages.filter(l => !disableLanguages.includes(l));
    if (vscode_1.workspace.workspaceFolders === undefined) {
        return {
            languageSelector: globalLanguageSelector,
            rangeLanguageSelector: globalRangeLanguageSelector
        };
    }
    const untitledLanguageSelector = globalLanguageSelector.map(l => ({ language: l, scheme: 'untitled' }));
    const untitledRangeLanguageSelector = globalRangeLanguageSelector.map(l => ({ language: l, scheme: 'untitled' }));
    const fileLanguageSelector = globalLanguageSelector.map(l => ({ language: l, scheme: 'file' }));
    const fileRangeLanguageSelector = globalRangeLanguageSelector.map(l => ({ language: l, scheme: 'file' }));
    return {
        languageSelector: untitledLanguageSelector.concat(fileLanguageSelector),
        rangeLanguageSelector: untitledRangeLanguageSelector.concat(fileRangeLanguageSelector)
    };
}
function activate(context) {
    const extensionPackage = require(context.asAbsolutePath('./package.json'));
    reporter = new vscode_extension_telemetry_1.default('prettier-vscode', extensionPackage.version, telemetryKey);
    const config = utils_1.getConfig();
    reporter.sendTelemetryEvent('integration_usage', undefined, {
        eslint: config.eslintIntegration ? 1 : 0,
        stylelint: config.stylelintIntegration ? 1 : 0,
        tslint: config.tslintIntegration ? 1 : 0
    });
    context.subscriptions.push(reporter);
    const { fileIsIgnored } = ignoreFileHandler_1.default(context.subscriptions);
    const editProvider = new PrettierEditProvider_1.default(fileIsIgnored);
    function registerFormatter() {
        disposeHandlers();
        const { languageSelector, rangeLanguageSelector } = selectors();
        rangeFormatterHandler = vscode_1.languages.registerDocumentRangeFormattingEditProvider(rangeLanguageSelector, editProvider);
        formatterHandler = vscode_1.languages.registerDocumentFormattingEditProvider(languageSelector, editProvider);
    }
    registerFormatter();
    context.subscriptions.push(vscode_1.workspace.onDidChangeWorkspaceFolders(registerFormatter), {
        dispose: disposeHandlers
    }, errorHandler_1.setupErrorHandler(), configCacheHandler_1.default(), ...errorHandler_1.registerDisposables());
}
exports.activate = activate;
function deactivate() {
    reporter.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map