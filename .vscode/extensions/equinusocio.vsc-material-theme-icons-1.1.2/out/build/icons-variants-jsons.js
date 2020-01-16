"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const fs_1 = require("./helpers/fs");
const paths_1 = require("./helpers/paths");
exports.default = () => {
    const { themeIconVariants, variantsIcons } = fs_1.getDefaultsJson();
    const themIconsJson = fs.readFileSync(path.resolve(paths_1.PATHS.pathIcons), 'utf8');
    for (const variantName of Object.keys(themeIconVariants)) {
        const jsonDefaults = JSON.parse(themIconsJson);
        for (const iconname of variantsIcons) {
            const newIconPath = jsonDefaults.iconDefinitions[iconname].iconPath.replace('.svg', `${variantName}.svg`);
            jsonDefaults.iconDefinitions[iconname].iconPath = newIconPath;
            fs.writeFileSync(paths_1.PATHS.pathIconKey(variantName), JSON.stringify(jsonDefaults), { encoding: 'utf-8' });
        }
    }
    return Promise.resolve();
};
//# sourceMappingURL=icons-variants-jsons.js.map