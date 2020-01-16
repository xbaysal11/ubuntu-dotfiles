"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const fs_1 = require("./helpers/fs");
const paths_1 = require("./helpers/paths");
const ICON_VARIANTS_BASE_PATH = path.join(process.cwd(), paths_1.PATHS.pathIcons);
const DEFAULTS = fs_1.getDefaultsJson();
const normalizeIconPath = (iconPath) => path.join(process.cwd(), paths_1.PATHS.icons, iconPath);
const replaceNameWithAccent = (name, accentName) => name.replace('.svg', `.accent.${accentName}.svg`);
const replaceSVGColour = (filecontent, colour) => filecontent.replace(new RegExp('#(80CBC4)', 'i'), ($0, $1) => {
    const newColour = colour.replace('#', '');
    return $0.replace($1, newColour);
});
const replaceWhiteSpaces = (input) => input.replace(/\s+/g, '-');
const writeSVGIcon = (fromFile, toFile, accent) => {
    const fileContent = fs.readFileSync(normalizeIconPath(fromFile), 'utf-8');
    const content = replaceSVGColour(fileContent, DEFAULTS.accents[accent]);
    const pathToFile = normalizeIconPath(toFile);
    fs.writeFileSync(pathToFile, content);
};
exports.default = () => {
    const basetheme = require(ICON_VARIANTS_BASE_PATH);
    for (const key of Object.keys(DEFAULTS.accents)) {
        const iconName = replaceWhiteSpaces(key);
        const themecopy = JSON.parse(JSON.stringify(basetheme));
        for (const accentableIconName of DEFAULTS.accentableIcons) {
            const iconOriginDefinition = basetheme.iconDefinitions[accentableIconName];
            const iconCopyDefinition = themecopy.iconDefinitions[accentableIconName];
            if (iconOriginDefinition !== undefined && typeof iconOriginDefinition.iconPath === 'string' && iconCopyDefinition !== undefined && typeof iconCopyDefinition.iconPath === 'string') {
                iconCopyDefinition.iconPath = replaceNameWithAccent(iconOriginDefinition.iconPath, iconName);
                writeSVGIcon(iconOriginDefinition.iconPath, iconCopyDefinition.iconPath, key);
            }
            else {
                console.log(`Icon ${accentableIconName} not found`);
            }
        }
    }
    return Promise.resolve();
};
//# sourceMappingURL=icons-accents.js.map