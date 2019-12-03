"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  The core functionality of the autocomplete is work done by Stanislav Sysoev (@d4rkr00t)
  in his stylus extension and been adjusted to account for the slight differences between
  the languages.

  Original stylus version: https://github.com/d4rkr00t/language-stylus
*/
const vscode_1 = require("vscode");
const cssSchema = require("./schemas/autocomplete.cssSchema");
const autocomplete_schema_1 = require("./schemas/autocomplete.schema");
const autocomplete_at_1 = require("./schemas/autocomplete.at");
const autocomplete_pseudo_1 = require("./schemas/autocomplete.pseudo");
const util_1 = require("util");
const autocomplete_utility_1 = require("./autocomplete.utility");
const autocomplete_scan_1 = require("./scan/autocomplete.scan");
const autocomplete_commentCompletions_1 = require("./schemas/autocomplete.commentCompletions");
const suf_regex_1 = require("suf-regex");
const path_1 = require("path");
class SassCompletion {
    constructor(context) {
        this.context = context;
        this.scan = new autocomplete_scan_1.Scanner(context);
    }
    provideCompletionItems(document, position, token) {
        const start = new vscode_1.Position(position.line, 0);
        const range = new vscode_1.Range(start, position);
        const currentWord = document.getText(range).trim();
        const currentWordUT = document.getText(range);
        const text = document.getText();
        const isValue = autocomplete_utility_1.AutocompleteUtilities.isValue(cssSchema, currentWord);
        const config = vscode_1.workspace.getConfiguration();
        const disableUnitCompletion = config.get('sass.disableUnitCompletion');
        let block = false;
        let isInMixinBlock = false;
        let atRules = [];
        let Units = [];
        let properties = [];
        let values = [];
        let classesAndIds = [];
        let functions = [];
        let variables = [];
        let completions = [];
        if (document.languageId === 'vue') {
            block = autocomplete_utility_1.AutocompleteUtilities.isInVueStyleBlock(start, document);
        }
        if (!block && vscode_1.extensions.getExtension('syler.sass-next') !== undefined && currentWord.startsWith('?')) {
            vscode_1.commands.executeCommand('sass.abbreviations').then(() => '', err => console.log('[Sass Abbreviations Error]: ', err));
        }
        if (!block && /^@import/.test(currentWord)) {
            completions = autocomplete_utility_1.AutocompleteUtilities.getImportSuggestionsForCurrentWord(document, currentWord);
            block = true;
        }
        if (!block && /^@use/.test(currentWord)) {
            completions = autocomplete_utility_1.AutocompleteUtilities.getImportSuggestionsForCurrentWord(document, currentWord);
            block = true;
        }
        if (!block && currentWord.startsWith('&')) {
            completions = autocomplete_pseudo_1.sassPseudo(config.get('sass.andStared'));
            block = true;
        }
        if (!block && !disableUnitCompletion && util_1.isNumber(currentWordUT)) {
            Units = autocomplete_utility_1.AutocompleteUtilities.getUnits(currentWord);
        }
        if (!block && currentWord.startsWith('/')) {
            completions = autocomplete_commentCompletions_1.sassCommentCompletions();
            block = true;
        }
        if (!block && suf_regex_1.isPath(currentWord)) {
            block = true;
        }
        if (!block) {
            let { imports, varScopeModules, globalScopeModules } = autocomplete_utility_1.AutocompleteUtilities.getImports(text);
            // also get current file from the workspace State.
            imports.push({ path: path_1.basename(document.fileName), namespace: undefined });
            isInMixinBlock = autocomplete_utility_1.AutocompleteUtilities.isInMixinBlock(start, document);
            this.scan.scanFile(document);
            if (isValue) {
                values = autocomplete_utility_1.AutocompleteUtilities.getPropertyValues(cssSchema, currentWord);
                if (isInMixinBlock === false) {
                    autocomplete_utility_1.AutocompleteUtilities.ImportsLoop(imports, document, this.context, (element, namespace) => {
                        if (element.type === 'Variable') {
                            const completionItem = new vscode_1.CompletionItem(autocomplete_utility_1.AutocompleteUtilities.mergeNamespace(element.item.title, namespace));
                            completionItem.insertText = autocomplete_utility_1.AutocompleteUtilities.mergeNamespace(element.item.insert, namespace);
                            completionItem.detail = element.item.detail;
                            completionItem.kind = element.item.kind;
                            variables.push(completionItem);
                        }
                    });
                }
                else {
                    variables = isInMixinBlock;
                }
                functions = autocomplete_schema_1.default;
            }
            else {
                varScopeModules = [];
                variables = [];
                autocomplete_utility_1.AutocompleteUtilities.ImportsLoop(imports, document, this.context, (element, namespace) => {
                    if (element.type === 'Mixin') {
                        const completionItem = new vscode_1.CompletionItem(autocomplete_utility_1.AutocompleteUtilities.mergeNamespace(element.item.title, namespace));
                        completionItem.insertText = autocomplete_utility_1.AutocompleteUtilities.mergeNamespace(element.item.insert, namespace);
                        completionItem.detail = element.item.detail;
                        completionItem.kind = element.item.kind;
                        variables.push(completionItem);
                    }
                });
                classesAndIds = autocomplete_utility_1.AutocompleteUtilities.getHtmlClassOrIdCompletions(document);
                atRules = autocomplete_at_1.sassAt;
                properties = autocomplete_utility_1.AutocompleteUtilities.getProperties(cssSchema, currentWord);
            }
            completions = [].concat(properties, values, functions, Units, variables, atRules, classesAndIds, varScopeModules, globalScopeModules);
        }
        return completions;
    }
}
exports.default = SassCompletion;
//# sourceMappingURL=autocomplete.js.map