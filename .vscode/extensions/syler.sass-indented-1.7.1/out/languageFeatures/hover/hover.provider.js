"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cssSchema = require("../../autocomplete/schemas/autocomplete.cssSchema");
const autocomplete_utility_1 = require("../../autocomplete/autocomplete.utility");
const suf_regex_1 = require("suf-regex");
const utilityFunctions_1 = require("../../utilityFunctions");
class SassHoverProvider {
    constructor() { }
    provideHover(document, position, token) {
        const line = document.lineAt(position.line);
        const currentWord = SassHoverProvider._GET_CURRENT_WORD(line, position);
        const name = currentWord.replace(/:/g, '');
        if (suf_regex_1.isProperty(line.text)) {
            const propData = autocomplete_utility_1.AutocompleteUtilities.findPropertySchema(cssSchema, name);
            if (propData) {
                return {
                    contents: [
                        `\`\`\`sass\n${SassHoverProvider.capitalizeFirstLetter(name)} (css property)\n\`\`\``,
                        `${utilityFunctions_1.GetPropertyDescription(name, propData, true)}`
                    ]
                };
            }
            else {
                return { contents: [] };
            }
        }
        return {
            contents: []
        };
    }
    static _GET_CURRENT_WORD(line, position) {
        let firstHalfArr = [];
        for (let i = position.character - 1; i > 0; i--) {
            const char = line.text[i];
            if (char === ' ') {
                if (i <= position.character) {
                    break;
                }
                else {
                    firstHalfArr = [];
                }
            }
            else {
                firstHalfArr.unshift(char);
            }
        }
        let firstHalf = firstHalfArr.join('');
        let secondHalf = '';
        for (let i = position.character; i < line.text.length; i++) {
            const char = line.text[i];
            if (char === ' ') {
                if (i >= position.character) {
                    break;
                }
                else {
                    secondHalf = '';
                }
            }
            else {
                secondHalf = secondHalf + char;
            }
        }
        return firstHalf + secondHalf;
    }
    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}
exports.SassHoverProvider = SassHoverProvider;
//# sourceMappingURL=hover.provider.js.map