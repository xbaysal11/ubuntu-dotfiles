"use strict";
/**
 * Main utilities for Material Theme integration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialThemes = [
    'Material Theme',
    'Material Theme High Contrast',
    'Material Theme Darker',
    'Material Theme Darker High Contrast',
    'Material Theme Palenight',
    'Material Theme Palenight High Contrast',
    'Material Theme Ocean',
    'Material Theme Ocean High Contrast',
    'Material Theme Lighter',
    'Material Theme Lighter High Contrast'
];
exports.isMaterialTheme = (currentThemeId) => exports.materialThemes.includes(currentThemeId);
exports.getThemeIconVariant = (defaults, currentThemeId) => {
    const found = Object.keys(defaults.themeIconVariants)
        .find(variant => currentThemeId.includes(variant));
    return found ? found.toLowerCase() : undefined;
};
//# sourceMappingURL=material-theme.js.map