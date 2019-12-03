"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const suf_regex_1 = require("suf-regex");
class Scanner {
    constructor(context) {
        this._previousVars = [];
        this.context = context;
    }
    /**
     * scans for variables and mixin.
     */
    scanLine(listener) {
        const document = listener.document;
        if (document.languageId === 'sass') {
            const previousVars = this._previousVars;
            this._previousVars = [];
            const pathBasename = path_1.basename(document.fileName);
            const varRegex = /\${1}\S*:/;
            const mixinRegex = /@mixin ?\S+ ?\(?.*\)?/;
            let variables = {};
            for (const change of listener.contentChanges) {
                const start = change.range.start;
                const end = change.range.end;
                for (let i = start.line; i <= end.line && i < document.lineCount; i++) {
                    const line = document.lineAt(i);
                    const isVar = varRegex.test(line.text);
                    let currentItem;
                    if (isVar) {
                        variables = this.context.workspaceState.get(path_1.normalize(document.fileName));
                        currentItem = this.createVar(line.text, pathBasename, variables);
                    }
                    const isMixin = mixinRegex.test(line.text);
                    if (isMixin) {
                        variables = this.context.workspaceState.get(path_1.normalize(document.fileName));
                        currentItem = this.createMixin(line.text, pathBasename, variables);
                    }
                    if (isVar || isMixin) {
                        variables = currentItem.state;
                        this._previousVars.push(currentItem.current);
                        previousVars.forEach((v, i) => {
                            if (currentItem.current.line === v.line ||
                                currentItem.current.namespace.match(suf_regex_1.escapeRegExp(v.namespace))) {
                                delete variables[v.namespace];
                            }
                        });
                        this.context.workspaceState.update(path_1.normalize(document.fileName), variables);
                    }
                }
            }
        }
    }
    /**
     * scans for variables and mixin.
     */
    scanFile(document) {
        if (document.languageId === 'sass') {
            const text = document.getText();
            const pathBasename = path_1.basename(document.fileName);
            let variables = {};
            variables = this.scanFileHandleGetVars(text, pathBasename, variables);
            variables = this.scanFileHandleGetMixin(text, pathBasename, variables);
            this.context.workspaceState.update(path_1.normalize(document.fileName), variables);
        }
    }
    /**
     * handles finding the variables in a file.
     */
    scanFileHandleGetVars(text, pathBasename, variables) {
        const varRegex = /^ *\${1}\S*:/gm;
        let varMatches;
        while ((varMatches = varRegex.exec(text)) !== null) {
            if (varMatches.index === varRegex.lastIndex) {
                varRegex.lastIndex++;
            }
            varMatches.forEach((match) => {
                variables = this.createVar(match, pathBasename, variables).state;
            });
        }
        return variables;
    }
    /**
     * handles finding the mixins in a file.
     */
    scanFileHandleGetMixin(text, pathBasename, variables) {
        const mixinRegex = /^ *@mixin ?\S+ ?\(?.*\)?/gm;
        let mixinMatches;
        while ((mixinMatches = mixinRegex.exec(text)) !== null) {
            if (mixinMatches.index === mixinRegex.lastIndex) {
                mixinRegex.lastIndex++;
            }
            mixinMatches.forEach((match) => {
                variables = this.createMixin(match, pathBasename, variables).state;
            });
        }
        return variables;
    }
    /**
     * creates a mixin state item.
     */
    createMixin(match, pathBasename, variables, line) {
        let argNum = 0;
        const rep = match.replace('@mixin', '').trim();
        const namespace = `${pathBasename}/${rep}`;
        const item = {
            title: `$${rep.split('(')[0]}`,
            insert: `@include ${rep
                .replace(/(\$\w*:? ?[\w-]*,?)/g, r => {
                argNum++;
                return `$\{${argNum}:${r
                    .replace('$', '\\$')
                    .replace(',', '')
                    .split(':')[0]}: \},`;
            })
                .replace(/,\)$/, ')')}\n`,
            detail: `Include ${rep} - ${pathBasename} Mixin.`,
            kind: vscode_1.CompletionItemKind.Method
        };
        variables[namespace] = { item, type: 'Mixin' };
        return { state: variables, current: { line, namespace } };
    }
    /**
     * creates a variable snippet.
     */
    createVar(match, pathBasename, variables, line) {
        const rep = match.split(':')[0].replace(':', '');
        const namespace = `${pathBasename}/${rep}`;
        const item = {
            title: rep,
            insert: rep,
            detail: `(${rep.replace('$', '')}) - ${pathBasename} Variable.`,
            kind: vscode_1.CompletionItemKind.Variable
        };
        variables[namespace] = { item, type: 'Variable' };
        return { state: variables, current: { line, namespace } };
    }
}
exports.Scanner = Scanner;
//# sourceMappingURL=autocomplete.scan.js.map