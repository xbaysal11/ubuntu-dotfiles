"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const paths_1 = require("./helpers/paths");
const fs_1 = require("../src/lib/fs");
const writeIconVariant = (filepath, destpath, colour) => {
    const regexp = new RegExp('(#4a616c)', 'i');
    const finalFilePath = path.join(process.cwd(), paths_1.PATHS.icons, filepath);
    const finalDestpath = path.join(process.cwd(), paths_1.PATHS.icons, destpath);
    fs.writeFileSync(finalDestpath, fs.readFileSync(finalFilePath, 'utf-8')
        .replace(regexp, ($0, $1) => $0.replace($1, colour)), { encoding: 'utf-8' });
};
exports.default = () => {
    const { themeVariantsColours, variantsIcons } = fs_1.getDefaultsJson();
    const PACKAGE_JSON = require(path.resolve('./package.json'));
    // For each Material Theme variant colours
    for (const variantName of Object.keys(themeVariantsColours)) {
        for (const contribute of PACKAGE_JSON.contributes.iconThemes) {
            const regexpCheck = new RegExp(Object.keys(themeVariantsColours).join('|'), 'i');
            if (regexpCheck.test(contribute.path) || regexpCheck.test(contribute.id)) {
                continue;
            }
            const basepath = path.join(process.cwd(), contribute.path);
            const basetheme = require(basepath);
            const theme = JSON.parse(JSON.stringify(basetheme));
            const variant = themeVariantsColours[variantName];
            for (const iconName of variantsIcons) {
                const basethemeIcon = basetheme.iconDefinitions[iconName];
                const themeIcon = theme.iconDefinitions[iconName];
                if (themeIcon !== undefined) {
                    themeIcon.iconPath = themeIcon.iconPath.replace('.svg', `${variantName}.svg`);
                }
                if (basethemeIcon !== undefined && themeIcon !== undefined) {
                    writeIconVariant(basethemeIcon.iconPath, themeIcon.iconPath, variant);
                }
            }
        }
    }
    return Promise.resolve();
};
//# sourceMappingURL=icons-variants.js.map