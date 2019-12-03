"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class DiagnosticUtility {
    static getPropertySpaceRange(text, range) {
        let start = 0;
        let end = 0;
        let started = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ':') {
                start = i;
                started = true;
            }
            else if (started && char !== ' ') {
                end = i;
                break;
            }
        }
        if (end === start) {
            end += 1;
        }
        return new vscode_1.Range(new vscode_1.Position(range.start.line, start), new vscode_1.Position(range.end.line, end));
    }
}
exports.DiagnosticUtility = DiagnosticUtility;
DiagnosticUtility.ruleMessages = {
    property: ['Empty Property', 'Property should have one space Between the prop and value'],
    invalid: ['Semicolons Are Not Allowed', 'Curly Brackets Are Not Allowed'],
    variable: ['Variable Declared more than once']
};
//# sourceMappingURL=diagnostics.utility.js.map