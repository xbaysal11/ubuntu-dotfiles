"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const paths_1 = require("./helpers/paths");
const ensureDir = (dirname) => !fs.existsSync(dirname) ?
    fs.mkdirSync(dirname) : void 0;
/**
 * Returns an object implementing the IIcon interface
 */
const iconFactory = (fileName) => {
    let name = path.basename(fileName, path.extname(fileName));
    const filename = name;
    const last = false;
    // renaming icon for vscode
    // if the icon filename starts with a folder prefix,
    // the resulting name will be prefixed only by an underscore,
    // otherwise the icon will be prefixed by a _file_ prefix
    name = name.indexOf('folder') ?
        name.indexOf('file') ? `_file_${name}` : `_${name}` :
        name = `_${name}`;
    return { filename, name, last };
};
exports.default = () => {
    let contents;
    const fileNames = fs.readdirSync(path.resolve(paths_1.PATHS.srcSvgs));
    const icons = fileNames.map(iconFactory);
    const partials = fs.readdirSync(path.resolve(paths_1.PATHS.srcPartials));
    const partialsData = {};
    ensureDir(path.join(paths_1.PATHS.variants));
    icons[icons.length - 1].last = true;
    for (const partial of partials) {
        partialsData[path.basename(partial, path.extname(partial))] = fs.readFileSync(path.join(paths_1.PATHS.srcPartials, `./${partial}`), 'utf-8');
    }
    contents = mustache.render(fs.readFileSync(path.resolve(paths_1.PATHS.srcIconsTheme), 'utf-8'), { icons }, partialsData);
    contents = JSON.stringify(JSON.parse(contents), undefined, 2);
    fs.writeFileSync(paths_1.PATHS.tmpPathIcons, contents, { encoding: 'utf-8' });
    return Promise.resolve();
};
//# sourceMappingURL=icons.js.map