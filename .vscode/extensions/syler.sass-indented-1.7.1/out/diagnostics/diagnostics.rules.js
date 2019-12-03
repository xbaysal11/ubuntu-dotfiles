"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const diagnostics_utility_1 = require("./diagnostics.utility");
const suf_regex_1 = require("suf-regex");
class DiagnosticRules {
    constructor() {
        this._VARS = {};
    }
    reset(document) {
        this._VARS = {};
        this._DOCUMENT = document;
    }
    check(line) {
        const diagnostics = [];
        const range = new vscode_1.Range(new vscode_1.Position(line.lineNumber, line.firstNonWhitespaceCharacterIndex), line.range.end);
        if (suf_regex_1.isProperty(line.text) && !suf_regex_1.isHtmlTag(line.text)) {
            diagnostics.push(...this._CHECK_PROPERTY(line, range));
        }
        else if (suf_regex_1.isVar(line.text)) {
            diagnostics.push(...this._CHECK_VAR(line, range));
        }
        else {
            diagnostics.push(...this._CHECK_INVALID(line, range));
        }
        return diagnostics;
    }
    _CHECK_PROPERTY(line, range) {
        const diagnostics = [];
        if (suf_regex_1.isProperty(line.text, true)) {
            const warning = new vscode_1.Diagnostic(range, diagnostics_utility_1.DiagnosticUtility.ruleMessages.property[0], vscode_1.DiagnosticSeverity.Warning);
            warning.code = 'Property: 0';
            warning.source = 'Sass ';
            diagnostics.push(warning);
        }
        if (!suf_regex_1.hasPropertyValueSpace(line.text)) {
            const warning = new vscode_1.Diagnostic(diagnostics_utility_1.DiagnosticUtility.getPropertySpaceRange(line.text, range), diagnostics_utility_1.DiagnosticUtility.ruleMessages.property[1], vscode_1.DiagnosticSeverity.Warning);
            warning.code = 'Property: 1';
            warning.source = 'Sass ';
            diagnostics.push(warning);
        }
        diagnostics.push(...this._CHECK_INVALID(line, range));
        return diagnostics;
    }
    _CHECK_INVALID(line, range) {
        const diagnostics = [];
        if (suf_regex_1.isScssOrCss(line.text)) {
            let isInQuotes = false;
            for (let i = 0; i < line.text.length; i++) {
                const char = line.text[i];
                if (!isInQuotes && char === '/' && line.text[i + 1] === '/') {
                    break;
                }
                else if (/['"]/.test(char)) {
                    isInQuotes = !isInQuotes;
                }
                if (/[;{}]/.test(char) && !isInQuotes) {
                    const error = new vscode_1.Diagnostic(new vscode_1.Range(new vscode_1.Position(range.start.line, i), new vscode_1.Position(range.end.line, i + 1)), diagnostics_utility_1.DiagnosticUtility.ruleMessages.invalid[0], vscode_1.DiagnosticSeverity.Error);
                    error.source = 'Sass ';
                    switch (char) {
                        case ';':
                            error.message = diagnostics_utility_1.DiagnosticUtility.ruleMessages.invalid[0];
                            error.code = 'Invalid: 0';
                            break;
                        case '{':
                        case '}':
                            error.message = diagnostics_utility_1.DiagnosticUtility.ruleMessages.invalid[1];
                            error.code = 'Invalid: 1';
                            break;
                    }
                    diagnostics.push(error);
                }
            }
        }
        return diagnostics;
    }
    _CHECK_VAR(line, range) {
        const diagnostics = [];
        const key = suf_regex_1.splitOnce(line.text, ':').key;
        const key_T = key.trim();
        if (this._VARS.hasOwnProperty(key_T)) {
            const error = new vscode_1.Diagnostic(range, diagnostics_utility_1.DiagnosticUtility.ruleMessages.variable[0], vscode_1.DiagnosticSeverity.Warning);
            error.code = 'Variable: 0';
            error.relatedInformation = [new vscode_1.DiagnosticRelatedInformation(new vscode_1.Location(this._DOCUMENT.uri, this._VARS[key_T].range), 'Already Declared Here')];
            error.source = 'Sass ';
            diagnostics.push(error);
        }
        else {
            this._VARS[key_T] = { range };
        }
        diagnostics.push(...this._CHECK_INVALID(line, range));
        return diagnostics;
    }
}
exports.DiagnosticRules = DiagnosticRules;
//# sourceMappingURL=diagnostics.rules.js.map