"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const readPkgUp = require("read-pkg-up");
const resolve = require("resolve");
const errorHandler_1 = require("./errorHandler");
function findPkg(fspath, pkgName) {
    const res = readPkgUp.sync({ cwd: fspath, normalize: false });
    const { root } = path.parse(fspath);
    if (res &&
        res.package &&
        ((res.package.dependencies && res.package.dependencies[pkgName]) ||
            (res.package.devDependencies && res.package.devDependencies[pkgName]))) {
        return resolve.sync(pkgName, { basedir: res.path });
    }
    else if (res && res.path) {
        const parent = path.resolve(path.dirname(res.path), '..');
        if (parent !== root) {
            return findPkg(parent, pkgName);
        }
    }
    return;
}
function requireLocalPkg(fspath, pkgName) {
    let modulePath;
    try {
        modulePath = findPkg(fspath, pkgName);
        if (modulePath !== void 0) {
            return require(modulePath);
        }
    }
    catch (e) {
        errorHandler_1.addToOutput(`Failed to load ${pkgName} from ${modulePath}. Using bundled.`);
    }
    return require(pkgName);
}
exports.requireLocalPkg = requireLocalPkg;
//# sourceMappingURL=requirePkg.js.map