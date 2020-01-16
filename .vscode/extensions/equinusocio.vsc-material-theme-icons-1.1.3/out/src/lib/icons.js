"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconsPath = (pkg, iconsId) => {
    const found = pkg.contributes.iconThemes.find(iconObj => iconObj.id === iconsId);
    return found ? found.path : '';
};
//# sourceMappingURL=icons.js.map