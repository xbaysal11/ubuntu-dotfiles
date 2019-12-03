'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const format_provider_1 = require("./format/format.provider");
const autocomplete_scan_1 = require("./autocomplete/scan/autocomplete.scan");
const autocomplete_1 = require("./autocomplete/autocomplete");
const hover_provider_1 = require("./languageFeatures/hover/hover.provider");
const color_provider_1 = require("./languageFeatures/color/color.provider");
const diagnostics_provider_1 = require("./diagnostics/diagnostics.provider");
function activate(context) {
    const config = vscode.workspace.getConfiguration();
    setSassLanguageConfiguration(config);
    const SassFormatter = new format_provider_1.default(context);
    const SassFormatterRegister = vscode.languages.registerDocumentFormattingEditProvider([
        { language: 'sass', scheme: 'file' },
        { language: 'sass', scheme: 'untitled' }
    ], SassFormatter);
    // Events
    const scan = new autocomplete_scan_1.Scanner(context);
    // const saveDisposable = vscode.workspace.onDidSaveTextDocument(doc => setTimeout(() => scan.scanFile(doc), 0));
    let previousDocument = vscode.window.activeTextEditor.document;
    const activeDisposable = vscode.window.onDidChangeActiveTextEditor(editor => {
        if (previousDocument !== undefined) {
            scan.scanFile(previousDocument);
        }
        if (editor !== undefined) {
            previousDocument = editor.document;
            scan.scanFile(editor.document);
        }
    });
    const hover = new hover_provider_1.SassHoverProvider();
    const hoverDisposable = vscode.languages.registerHoverProvider([
        { language: 'sass', scheme: 'file' },
        { language: 'sass', scheme: 'untitled' }
    ], {
        provideHover: hover.provideHover
    });
    const color = new color_provider_1.SassColorProvider();
    const colorDisposable = vscode.languages.registerColorProvider([
        { language: 'sass', scheme: 'file' },
        { language: 'sass', scheme: 'untitled' }
    ], {
        provideColorPresentations: color.provideColorPresentations,
        provideDocumentColors: color.provideDocumentColors
    });
    const sassCompletion = new autocomplete_1.default(context);
    const sassCompletionDisposable = vscode.languages.registerCompletionItemProvider([
        { language: 'sass', scheme: 'file' },
        { language: 'sass', scheme: 'untitled' },
        { language: 'vue', scheme: 'file' },
        { language: 'vue', scheme: 'untitled' }
    ], sassCompletion, '\\.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', '/', '?', '?.', '&');
    const diagnostics = new diagnostics_provider_1.DiagnosticsProvider();
    const diagnosticsCollection = vscode.languages.createDiagnosticCollection('sass');
    if (vscode.window.activeTextEditor) {
        if (config.get('sass.lint.enable')) {
            diagnostics.update(vscode.window.activeTextEditor.document, diagnosticsCollection);
        }
    }
    const changeDisposable = vscode.workspace.onDidChangeTextDocument(l => {
        if (config.get('sass.lint.enable')) {
            // diagnostics.updateLine(l.document, l.contentChanges, diagnosticsCollection)
            diagnostics.update(l.document, diagnosticsCollection);
        }
    });
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            if (config.get('sass.lint.enable')) {
                diagnostics.update(editor.document, diagnosticsCollection);
            }
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((configEvent) => {
        if (configEvent.affectsConfiguration('sass')) {
            setSassLanguageConfiguration(config, diagnosticsCollection);
        }
    }));
    context.subscriptions.push(changeDisposable);
    context.subscriptions.push(hoverDisposable);
    context.subscriptions.push(colorDisposable);
    context.subscriptions.push(sassCompletionDisposable);
    context.subscriptions.push(SassFormatterRegister);
    context.subscriptions.push(activeDisposable);
    // context.subscriptions.push(saveDisposable);
}
exports.activate = activate;
function setSassLanguageConfiguration(config, diagnosticsCollection) {
    const disableAutoIndent = config.get('sass.disableAutoIndent');
    if (!config.get('sass.lint.enable') && diagnosticsCollection !== undefined) {
        diagnosticsCollection.clear();
    }
    vscode.languages.setLanguageConfiguration('sass', {
        wordPattern: /(#?-?\d*\.\d\w*%?)|([$@#!.:]?[\w-?]+%?)|[$@#!.]/g,
        onEnterRules: [
            {
                beforeText: /^((?!^(\/n|\s+|.*: .*|.*@.*|.*,|\s+\+.*)$).*|.*@media(?!^\s+$).*)$/,
                action: {
                    indentAction: disableAutoIndent ? vscode.IndentAction.None : vscode.IndentAction.Indent
                }
            }
        ]
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map