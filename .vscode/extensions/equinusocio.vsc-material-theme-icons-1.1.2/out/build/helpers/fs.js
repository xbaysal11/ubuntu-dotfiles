"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const constants_1 = require("../../src/lib/constants");
exports.getDefaultsJson = () => {
    const defaults = require(path_1.join(constants_1.PATHS.rootDir, constants_1.PATHS.defaults));
    if (defaults === undefined || defaults === null) {
        throw new Error('Cannot find defaults params');
    }
    return defaults;
};
//# sourceMappingURL=fs.js.map