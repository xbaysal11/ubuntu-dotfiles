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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const ThemeCommands = __importStar(require("./commands"));
const ReleaseNotes_1 = require("./webviews/ReleaseNotes");
const changelog_manager_1 = require("./core/changelog-manager");
const extension_manager_1 = require("./core/extension-manager");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield extension_manager_1.extensionManager.init();
        const releaseNotesView = new ReleaseNotes_1.ReleaseNotesWebview(context);
        const installationType = extension_manager_1.extensionManager.getInstallationType();
        if ((installationType.firstInstall || installationType.update) && (yield changelog_manager_1.changelogManager.askShowChangelog())) {
            yield releaseNotesView.show();
        }
        // Registering commands
        vscode_1.commands.registerCommand('materialTheme.setAccent', ThemeCommands.setAccent);
        vscode_1.commands.registerCommand('materialTheme.showReleaseNotes', () => __awaiter(this, void 0, void 0, function* () { return releaseNotesView.show(); }));
    });
}
exports.activate = activate;
//# sourceMappingURL=material.theme.config.js.map