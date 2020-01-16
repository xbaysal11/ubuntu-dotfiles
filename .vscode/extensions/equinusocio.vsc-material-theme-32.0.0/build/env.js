"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
exports.SRC_FOLDER_PATH = path.resolve('./src');
exports.BUILD_FOLDER_PATH = path.resolve('./build');
exports.TS_BUILD_FOLDER_PATH = path.resolve('./dist');
exports.CONFIG_FILE_NAME = 'material-theme.config.json';
exports.USER_CONFIG_FILE_NAME = 'user.material-theme.config.json';
exports.MATERIAL_THEME_EXT_ID = 'equinusocio.vsc-material-theme';
//# sourceMappingURL=env.js.map