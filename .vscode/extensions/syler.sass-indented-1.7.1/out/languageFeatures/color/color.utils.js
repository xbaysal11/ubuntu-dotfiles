"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = require("s.color");
class ColorUtilities {
    static convertColorToString(color, type) {
        switch (type) {
            case 'hex':
                if (color.alpha === 1) {
                    return s_color_1.RGBToHEX({ r: color.red, b: color.blue, g: color.green, a: color.alpha }, 'hex-without-alpha');
                }
                return s_color_1.RGBToHEX({ r: color.red, b: color.blue, g: color.green, a: color.alpha });
            case 'rgb':
                return `rgb${color.alpha === 1 ? '' : 'a'}(${Math.round(color.red * 255)}, ${Math.round(color.green * 255)}, ${Math.round(color.blue * 255)}${color.alpha === 1 ? '' : ', '.concat(color.alpha.toString())})`;
        }
    }
}
exports.ColorUtilities = ColorUtilities;
//# sourceMappingURL=color.utils.js.map