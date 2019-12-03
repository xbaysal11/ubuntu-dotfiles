"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function GetPropertyDescription(name, prop, asString) {
    const desc = (prop.desc
        ? `${getPropStatus(prop.status)}${prop.desc}${prop.mdn_url ? `\n\n[MDN](${prop.mdn_url})` : ''}`
        : getPropStatus(prop.status)) +
        `\n\n${GoogleLink(name)}\n\n` +
        ConvertPropertyValues(prop.values);
    if (asString) {
        return desc;
    }
    return new vscode_1.MarkdownString(desc);
}
exports.GetPropertyDescription = GetPropertyDescription;
function ConvertPropertyValues(values) {
    if (values === undefined) {
        return '';
    }
    let text = '**Values**';
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        text = text.concat('\n* ', value.name !== undefined ? '**`' + value.name + '`**' : '', value.desc !== undefined ? ' *' + value.desc + '*' : '');
    }
    return text;
}
function getPropStatus(status) {
    switch (status) {
        case 'standard':
            return '';
        case 'nonstandard':
            return '⚠️ **Attention** this Property is **`nonStandard`**.\n\n';
        case 'experimental':
            return '⚠️ **Attention** this Property is **`Experimental`**.\n\n';
        case 'obsolete':
            return '⛔️ **Attention** this Property is **`Obsolete`**.\n\n';
        default:
            return 'No Status Data Available.\n\n';
    }
}
function GoogleLink(search) {
    return `[Google](https://www.google.com/search?q=css+${search})`;
}
//# sourceMappingURL=utilityFunctions.js.map