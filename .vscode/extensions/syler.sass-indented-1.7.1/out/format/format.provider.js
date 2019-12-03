"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const sass_formatter_1 = require("sass-formatter");
class FormattingProvider {
    constructor(context) {
        this.context = context;
    }
    provideDocumentFormattingEdits(document, options) {
        const config = vscode_1.workspace.getConfiguration('sass.format');
        return [
            new vscode_1.TextEdit(document.validateRange(new vscode_1.Range(new vscode_1.Position(0, 0), new vscode_1.Position(document.lineCount + 1, 10))), sass_formatter_1.SassFormatter.Format(document, options, {
                convert: config.get('convert'),
                debug: config.get('debug'),
                deleteCompact: config.get('deleteCompact'),
                deleteEmptyRows: config.get('deleteEmptyRows'),
                deleteWhitespace: config.get('deleteWhitespace'),
                enabled: config.get('enabled'),
                replaceSpacesOrTabs: config.get('replaceSpacesOrTabs'),
                setPropertySpace: config.get('setPropertySpace')
            }))
        ];
    }
}
exports.default = FormattingProvider;
//# sourceMappingURL=format.provider.js.map