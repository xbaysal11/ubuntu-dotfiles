"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const paths_1 = require("./helpers/paths");
exports.default = () => execa.shell(`json-minify ${paths_1.PATHS.tmpPathIcons} > ${paths_1.PATHS.pathIcons} && rimraf ${paths_1.PATHS.tmpPathIcons}`);
//# sourceMappingURL=json-minify.js.map