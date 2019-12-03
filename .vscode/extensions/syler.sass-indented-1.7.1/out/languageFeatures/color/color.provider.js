"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const color_utils_1 = require("./color.utils");
const suf_regex_1 = require("suf-regex");
const s_color_1 = require("s.color");
class SassColorProvider {
    constructor() { }
    provideColorPresentations(color, context, token) {
        return [
            new vscode_1.ColorPresentation(color_utils_1.ColorUtilities.convertColorToString(color, 'hex')),
            new vscode_1.ColorPresentation(color_utils_1.ColorUtilities.convertColorToString(color, 'rgb'))
        ];
    }
    provideDocumentColors(document, token) {
        const colors = [];
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            if (suf_regex_1.hasColor(line.text)) {
                const colorsPositions = SassColorProvider._GET_COLOR_POS(line.text);
                for (let j = 0; j < colorsPositions.length; j++) {
                    const color = colorsPositions[j];
                    const { r, g, b, a } = s_color_1.StringToRGB(color.text);
                    colors.push(new vscode_1.ColorInformation(new vscode_1.Range(new vscode_1.Position(line.range.start.line, color.start), new vscode_1.Position(line.range.start.line, color.end)), new vscode_1.Color(r, g, b, a)));
                }
            }
        }
        return colors;
    }
    /**
     * **assumes that the input is valid**
     */
    static _GET_COLOR_POS(text) {
        let colors = [];
        let add = false;
        let type = 'hex';
        let currentColor = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '#') {
                add = true;
                colors[currentColor] = { text: '', start: 0, end: 0 };
                colors[currentColor].start = i;
                colors[currentColor].text = colors[currentColor].text.concat(char);
                type = 'hex';
            }
            else if (/r/i.test(char) && /g/i.test(text[i + 1]) && /b/i.test(text[i + 2])) {
                type = 'rgb';
                add = true;
                colors[currentColor] = { text: '', start: 0, end: 0 };
                colors[currentColor].start = i;
                colors[currentColor].text = colors[currentColor].text.concat(char);
            }
            else if (add && char === ' ' && type === 'hex') {
                colors[currentColor].end = i;
                add = false;
                currentColor += 1;
            }
            else if (add && char === ')' && type === 'rgb') {
                colors[currentColor].text = colors[currentColor].text.concat(char);
                colors[currentColor].end = i + 1;
                add = false;
                currentColor += 1;
            }
            else if (add) {
                if (/[a-fA-F\d]/.test(char) && type === 'hex') {
                    colors[currentColor].text = colors[currentColor].text.concat(char);
                }
                else if (type === 'rgb') {
                    colors[currentColor].text = colors[currentColor].text.concat(char);
                }
                else {
                    colors[currentColor].end = i;
                    add = false;
                    currentColor += 1;
                }
            }
            if (add && i + 1 === text.length) {
                colors[currentColor].end = i + 1;
            }
        }
        return colors;
    }
}
exports.SassColorProvider = SassColorProvider;
//# sourceMappingURL=color.provider.js.map