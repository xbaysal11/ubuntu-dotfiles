"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const CommentsArray = [
    { name: '/Reset Tabs', body: '//R', desc: '' },
    { name: '/Ignore Next line', body: '//I', desc: '' },
    { name: '/Space', body: '//S', desc: '' }
];
exports.sassCommentCompletions = () => {
    const comments = CommentsArray.map(item => {
        const completionItem = new vscode_1.CompletionItem(item.name);
        completionItem.insertText = new vscode_1.SnippetString(`${item.body}\n$0`);
        completionItem.detail = item.desc;
        completionItem.kind = vscode_1.CompletionItemKind.Property;
        return completionItem;
    });
    return comments;
};
//# sourceMappingURL=autocomplete.commentCompletions.js.map