"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utilityFunctions_1 = require("../../utilityFunctions");
exports.dataProps = require('./generatedData/autocomplete.data.dataProps.json');
exports.generatedData = mapProps();
function mapProps() {
    const items = [];
    for (const key in exports.dataProps) {
        if (exports.dataProps.hasOwnProperty(key)) {
            const prop = exports.dataProps[key];
            const item = new vscode_1.CompletionItem(key, vscode_1.CompletionItemKind.Property);
            item.insertText = key.concat(': ');
            item.tags = prop.status === 'obsolete' ? [1] : [];
            item.documentation = utilityFunctions_1.GetPropertyDescription(key, prop);
            items.push(item);
        }
    }
    return items;
}
//# sourceMappingURL=autocomplete.generatedData.js.map