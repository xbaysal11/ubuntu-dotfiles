"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const constants_1 = require("./constants");
exports.getDefaultsJson = () => {
    const defaults = require(path_1.join(constants_1.PATHS.extensionDir, constants_1.PATHS.defaults));
    if (defaults === undefined || defaults === null) {
        throw new Error('Cannot find defaults params');
    }
    return defaults;
};
exports.getPackageJson = () => require(path_1.join(constants_1.PATHS.rootDir, constants_1.PATHS.package));
exports.getIconsVariantJson = (path) => require(path_1.join(constants_1.PATHS.rootDir, path));
exports.getAbsolutePath = (input) => path_1.join(constants_1.PATHS.rootDir, input);
//# sourceMappingURL=fs.js.map