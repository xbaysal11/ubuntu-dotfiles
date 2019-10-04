"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const prettier = require("prettier");
const vscode_1 = require("vscode");
const requirePkg_1 = require("./requirePkg");
function getConfig(uri) {
    return vscode_1.workspace.getConfiguration('prettier', uri);
}
exports.getConfig = getConfig;
function getParsersFromLanguageId(languageId, path, useBundled = false) {
    const language = getSupportLanguages(useBundled ? undefined : path).find(lang => lang &&
        lang.extensions &&
        Array.isArray(lang.vscodeLanguageIds) &&
        lang.vscodeLanguageIds.includes(languageId) &&
        (lang.extensions.length > 0 ||
            (path != null &&
                lang.filenames != null &&
                lang.filenames.includes(path_1.basename(path)))));
    if (!language) {
        return [];
    }
    return language.parsers;
}
exports.getParsersFromLanguageId = getParsersFromLanguageId;
function allEnabledLanguages(path) {
    return getSupportLanguages(path).reduce((ids, language) => [...ids, ...(language.vscodeLanguageIds || [])], []);
}
exports.allEnabledLanguages = allEnabledLanguages;
function rangeSupportedLanguages() {
    return [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
        'json',
        'graphql'
    ];
}
exports.rangeSupportedLanguages = rangeSupportedLanguages;
function getGroup(group, path) {
    return getSupportLanguages(path).filter(language => language.group === group);
}
exports.getGroup = getGroup;
function getSupportLanguages(path) {
    let prettierInstance;
    prettierInstance = path ? requirePkg_1.requireLocalPkg(path, 'prettier') : prettier;
    if (prettierInstance.getSupportInfo) {
        return prettierInstance.getSupportInfo(prettierInstance.version).languages;
    }
    else {
        return prettier.getSupportInfo(prettierInstance.version).languages;
    }
}
//# sourceMappingURL=utils.js.map