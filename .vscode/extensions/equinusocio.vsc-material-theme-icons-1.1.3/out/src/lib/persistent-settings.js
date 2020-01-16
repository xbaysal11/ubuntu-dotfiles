"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const semver_1 = require("semver");
const os = require("os");
const constants_1 = require("./constants");
const fs_2 = require("./fs");
class PersistentSettings {
    constructor(vscode) {
        this.vscode = vscode;
        this.settings = this.getSettings();
        this.defaultState = {
            version: '0.0.0'
        };
    }
    getSettings() {
        const appName = this.vscode.env.appName || '';
        const isDev = /dev/i.test(appName);
        const isOSS = isDev && /oss/i.test(appName);
        const isInsiders = /insiders/i.test(appName);
        const vscodeVersion = new semver_1.SemVer(this.vscode.version).version;
        const isWin = /^win/.test(process.platform);
        const vscodePath = this.vscodePath();
        const vscodeAppName = this.vscodeAppName(isInsiders, isOSS, isDev);
        const vscodeAppUserPath = path_1.join(vscodePath, vscodeAppName, 'User');
        const persistentSettingsFilePath = path_1.join(vscodeAppUserPath, constants_1.FILES.persistentSettings);
        const { version } = fs_2.getPackageJson();
        const extensionSettings = {
            version
        };
        this.settings = {
            isDev,
            isOSS,
            isInsiders,
            isWin,
            vscodeVersion,
            vscodeAppUserPath,
            persistentSettingsFilePath,
            extensionSettings
        };
        return this.settings;
    }
    getState() {
        if (!fs_1.existsSync(this.settings.persistentSettingsFilePath)) {
            return this.defaultState;
        }
        try {
            return require(this.settings.persistentSettingsFilePath);
        }
        catch (error) {
            // TODO: errorhandler
            // ErrorHandler.logError(error, true);
            console.log(error);
            return this.defaultState;
        }
    }
    setState(state) {
        try {
            fs_1.writeFileSync(this.settings.persistentSettingsFilePath, JSON.stringify(state));
        }
        catch (error) {
            // TODO: errorhandler
            // ErrorHandler.logError(error, true);
            console.log(error);
        }
    }
    deleteState() {
        fs_1.unlinkSync(this.settings.persistentSettingsFilePath);
    }
    updateStatus() {
        const state = this.getState();
        state.version = this.settings.extensionSettings.version;
        this.setState(state);
        return state;
    }
    isNewVersion() {
        const currentVersionInstalled = this.getState().version;
        // If is firstInstall
        return currentVersionInstalled === this.defaultState.version ? false : semver_1.lt(currentVersionInstalled, this.settings.extensionSettings.version);
    }
    isFirstInstall() {
        return this.getState().version === this.defaultState.version;
    }
    vscodeAppName(isInsiders, isOSS, isDev) {
        return process.env.VSCODE_PORTABLE
            ? 'user-data'
            : isInsiders
                ? 'Code - Insiders'
                : isOSS
                    ? 'Code - OSS'
                    : isDev
                        ? 'code-oss-dev'
                        : 'Code';
    }
    vscodePath() {
        switch (process.platform) {
            case 'darwin':
                return `${os.homedir()}/Library/Application Support`;
            case 'linux':
                return `${os.homedir()}/.config`;
            case 'win32':
                return process.env.APPDATA;
            default:
                return '/var/local';
        }
    }
}
exports.default = PersistentSettings;
//# sourceMappingURL=persistent-settings.js.map