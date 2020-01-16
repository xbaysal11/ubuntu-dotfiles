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
const MESSAGES = {
    CHANGELOG: {
        message: 'Material Theme Icons was updated! Version ',
    },
    INSTALLATION: {
        message: 'Thank you for using Material Theme Icons! Install also the Material Theme for a more immersive experience.',
        options: { ok: 'Sure! 👌', cancel: 'Nope 😢' }
    }
};
exports.changelogMessage = (iconsVersion) => __awaiter(void 0, void 0, void 0, function* () {
    return vscode_1.window.showInformationMessage(MESSAGES.CHANGELOG.message + iconsVersion);
});
exports.installationMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield vscode_1.window.showInformationMessage(MESSAGES.INSTALLATION.message, MESSAGES.INSTALLATION.options.ok, MESSAGES.INSTALLATION.options.cancel)) === MESSAGES.INSTALLATION.options.ok;
});
//# sourceMappingURL=messages.js.map