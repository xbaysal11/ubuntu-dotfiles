"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_rules_1 = require("./diagnostics.rules");
const suf_regex_1 = require("suf-regex");
class DiagnosticsProvider {
    constructor(rules = new diagnostics_rules_1.DiagnosticRules()) {
        this.rules = rules;
    }
    update(document, collection) {
        const diagnostics = [];
        let ignoreLine = false;
        if (document.languageId === 'sass') {
            this.rules.reset(document);
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                if (suf_regex_1.isIgnore(line.text)) {
                    ignoreLine = true;
                }
                else if (ignoreLine) {
                    ignoreLine = false;
                }
                else {
                    diagnostics.push(...this.rules.check(line));
                }
            }
            collection.set(document.uri, diagnostics);
        }
        else {
            collection.clear();
        }
    }
    /**
     * @deprecated ??
     */
    updateLine(document, changes, collection) {
        const oldDiagnostics = collection.get(document.uri);
        if (oldDiagnostics !== undefined) {
            const newDiagnostics = [];
            // check for new diagnostics
            const changedLines = {};
            for (let i = 0; i < changes.length; i++) {
                const change = changes[i];
                const endLine = change.range.start.line + change.text.split('\n').length - 1;
                for (let j = change.range.start.line; j <= endLine; j++) {
                    const line = document.lineAt(j);
                    changedLines[j] = this.rules.check(line);
                }
            }
            // check old diagnostics
            const alreadyAddedLines = {};
            for (let y = 0; y < oldDiagnostics.length; y++) {
                const diagnostic = oldDiagnostics[y];
                if (changedLines[diagnostic.range.start.line] !== undefined) {
                    // replace with new diagnostics
                    alreadyAddedLines[diagnostic.range.start.line] = diagnostic.range.start.line;
                    newDiagnostics.push(...changedLines[diagnostic.range.start.line]);
                    delete changedLines[diagnostic.range.start.line];
                }
                else if (alreadyAddedLines[diagnostic.range.start.line] === undefined) {
                    // add old diagnostics
                    // when formatting css old diagnostics get added that should not be added
                    // newDiagnostics.push(diagnostic);
                }
            }
            // add new diagnostics
            for (const key in changedLines) {
                if (changedLines.hasOwnProperty(key)) {
                    const lineChanges = changedLines[key];
                    newDiagnostics.push(...lineChanges);
                }
            }
            collection.set(document.uri, newDiagnostics);
        }
    }
}
exports.DiagnosticsProvider = DiagnosticsProvider;
//# sourceMappingURL=diagnostics.provider.js.map