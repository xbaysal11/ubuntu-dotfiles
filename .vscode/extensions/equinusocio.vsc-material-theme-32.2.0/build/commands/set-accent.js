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
const extension_manager_1 = require("../core/extension-manager");
const settings_manager_1 = require("../core/settings-manager");
const PURGE_KEY = 'Remove accents';
const isValidColor = (color) => color && /^#([0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
const getThemeColorCustomizationsConfig = (accentColor) => {
    const { accentsProperties } = extension_manager_1.extensionManager.getConfig();
    const color = isValidColor(accentColor) ? accentColor : undefined;
    const themeColorCustomConfig = Object.keys(accentsProperties).reduce((acc, propName) => {
        const currentProp = accentsProperties[propName];
        const shouldModify = color && currentProp.alpha < 100;
        const colorProp = shouldModify ? `${color}${currentProp.alpha > 10 ? currentProp.alpha : `0${currentProp.alpha}`}` : color;
        acc[propName] = colorProp;
        return acc;
    }, {});
    return themeColorCustomConfig;
};
const updateColorCustomizationsConfig = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        vscode_1.workspace.getConfiguration().update('workbench.colorCustomizations', config, true);
        return true;
    }
    catch (error) {
        vscode_1.window.showErrorMessage(error);
    }
});
const quickPick = () => __awaiter(void 0, void 0, void 0, function* () {
    const themeConfig = extension_manager_1.extensionManager.getConfig();
    const options = Object.keys(themeConfig.accents).concat(PURGE_KEY);
    return vscode_1.window.showQuickPick(options);
});
exports.command = () => __awaiter(void 0, void 0, void 0, function* () {
    const themeConfig = extension_manager_1.extensionManager.getConfig();
    const currentColorCustomizationsConfig = vscode_1.workspace.getConfiguration().get('workbench.colorCustomizations');
    const accent = yield quickPick();
    const config = accent === PURGE_KEY ? Object.assign(Object.assign({}, currentColorCustomizationsConfig), getThemeColorCustomizationsConfig()) : Object.assign(Object.assign({}, currentColorCustomizationsConfig), getThemeColorCustomizationsConfig(themeConfig.accents[accent]));
    yield updateColorCustomizationsConfig(config);
    yield settings_manager_1.settingsManager.updateSetting('accent', accent);
});
//# sourceMappingURL=set-accent.js.map