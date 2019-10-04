"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
let statusBarItem;
const outputChannel = vscode_1.window.createOutputChannel('Prettier');
let prettierInformation;
function toggleStatusBarItem(editor) {
    if (statusBarItem === undefined) {
        return;
    }
    if (editor !== undefined) {
        if (['debug', 'output'].some(part => editor.document.uri.scheme === part)) {
            return;
        }
        const filePath = editor.document.isUntitled
            ? undefined
            : editor.document.fileName;
        const score = vscode_1.languages.match(utils_1.allEnabledLanguages(filePath), editor.document);
        const disabledLanguages = utils_1.getConfig(editor.document.uri).disableLanguages;
        if (score > 0 && !disabledLanguages.includes(editor.document.languageId)) {
            statusBarItem.show();
        }
        else {
            statusBarItem.hide();
        }
    }
    else {
        statusBarItem.hide();
    }
}
function registerDisposables() {
    return [
        vscode_1.window.onDidChangeActiveTextEditor(editor => {
            toggleStatusBarItem(editor);
        })
    ];
}
exports.registerDisposables = registerDisposables;
function updateStatusBar(message) {
    statusBarItem.text = message;
    statusBarItem.tooltip = prettierInformation;
    statusBarItem.show();
}
function setUsedModule(module, version, bundled) {
    prettierInformation = `${module}@${version}${bundled ? ' (bundled)' : ''}`;
}
exports.setUsedModule = setUsedModule;
function addFilePath(msg, fileName) {
    const lines = msg.split('\n');
    if (lines.length > 0) {
        lines[0] = lines[0].replace(/(\d*):(\d*)/g, `${fileName}:$1:$2`);
        return lines.join('\n');
    }
    return msg;
}
function addToOutput(message) {
    const title = `${new Date().toLocaleString()}:`;
    outputChannel.appendLine(title);
    outputChannel.appendLine('-'.repeat(title.length));
    outputChannel.appendLine(`${message}\n`);
}
exports.addToOutput = addToOutput;
function safeExecution(cb, defaultText, fileName) {
    if (cb instanceof Promise) {
        return cb
            .then(returnValue => {
            updateStatusBar('Prettier: $(check)');
            return returnValue;
        })
            .catch((err) => {
            addToOutput(addFilePath(err.message, fileName));
            updateStatusBar('Prettier: $(x)');
            return defaultText;
        });
    }
    try {
        const returnValue = cb();
        updateStatusBar('Prettier: $(check)');
        return returnValue;
    }
    catch (err) {
        addToOutput(addFilePath(err.message, fileName));
        updateStatusBar('Prettier: $(x)');
        return defaultText;
    }
}
exports.safeExecution = safeExecution;
function setupErrorHandler() {
    statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, -1);
    statusBarItem.text = 'Prettier';
    statusBarItem.command = 'prettier.open-output';
    toggleStatusBarItem(vscode_1.window.activeTextEditor);
    return vscode_1.commands.registerCommand('prettier.open-output', () => {
        outputChannel.show();
    });
}
exports.setupErrorHandler = setupErrorHandler;
//# sourceMappingURL=errorHandler.js.map