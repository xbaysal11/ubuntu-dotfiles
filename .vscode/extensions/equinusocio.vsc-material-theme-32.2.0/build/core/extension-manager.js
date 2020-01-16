"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const env_1 = require("../env");
class ExtensionManager {
    constructor() {
        const extensionFolderUri = vscode_1.Uri.file(vscode_1.extensions.getExtension(env_1.MATERIAL_THEME_EXT_ID).extensionPath);
        this.configFileUri = extensionFolderUri.with({ path: path_1.posix.join(extensionFolderUri.path, env_1.CONFIG_FILE_NAME) });
        this.userConfigFileUri = extensionFolderUri.with({ path: path_1.posix.join(extensionFolderUri.path, env_1.USER_CONFIG_FILE_NAME) });
    }
    getPackageJSON() {
        return vscode_1.extensions.getExtension(env_1.MATERIAL_THEME_EXT_ID).packageJSON;
    }
    getConfig() {
        return this.configJSON;
    }
    getInstallationType() {
        return this.installationType;
    }
    updateConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const newConfig = Object.assign(Object.assign({}, this.configJSON), config);
            yield vscode_1.workspace.fs.writeFile(this.configFileUri, Buffer.from(JSON.stringify(newConfig), 'utf-8'));
        });
    }
    isVersionUpdate(userConfig) {
        const splitVersion = (input) => {
            const [major, minor, patch] = input.split('.').map(i => parseInt(i, 10));
            return { major, minor, patch };
        };
        const packageJSON = this.getPackageJSON();
        const versionCurrent = splitVersion(packageJSON.version);
        const versionOld = splitVersion(userConfig.changelog.lastversion);
        const update = (versionCurrent.major > versionOld.major ||
            versionCurrent.minor > versionOld.minor ||
            versionCurrent.patch > versionOld.patch);
        return update;
    }
    getUserConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const configBuffer = yield vscode_1.workspace.fs.readFile(this.userConfigFileUri);
                const configContent = Buffer.from(configBuffer).toString('utf8');
                return JSON.parse(configContent);
            }
            catch (_a) { }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packageJSON = this.getPackageJSON();
                const userConfig = yield this.getUserConfig();
                this.installationType = {
                    update: userConfig && this.isVersionUpdate(userConfig),
                    firstInstall: !userConfig
                };
                const configBuffer = yield vscode_1.workspace.fs.readFile(this.configFileUri);
                const configContent = Buffer.from(configBuffer).toString('utf8');
                this.configJSON = JSON.parse(configContent);
                const userConfigUpdate = Object.assign(Object.assign({}, this.configJSON), { changelog: { lastversion: packageJSON.version } });
                yield vscode_1.workspace.fs.writeFile(this.userConfigFileUri, Buffer.from(JSON.stringify(userConfigUpdate), 'utf-8'));
            }
            catch (error) {
                this.configJSON = { accentsProperties: {}, accents: {} };
                vscode_1.window
                    .showErrorMessage(`Material Theme: there was an error while loading the configuration. Please retry or open an issue: ${String(error)}`);
            }
        });
    }
}
exports.extensionManager = new ExtensionManager();
//# sourceMappingURL=extension-manager.js.map