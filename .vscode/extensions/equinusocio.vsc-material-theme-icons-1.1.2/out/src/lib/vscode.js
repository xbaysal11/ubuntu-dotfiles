"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
exports.getCurrentThemeID = () => vscode_1.workspace.getConfiguration().get('workbench.colorTheme', '');
exports.getCurrentIconsID = () => vscode_1.workspace.getConfiguration().get('workbench.iconTheme', '');
exports.setIconsID = (id) => vscode_1.workspace.getConfiguration().update('workbench.iconTheme', id, true);
exports.getMaterialThemeSettings = () => vscode_1.workspace
    .getConfiguration()
    .get('materialTheme', { accent: '' });
exports.openMaterialThemeExt = () => vscode_1.commands.executeCommand('workbench.extensions.action.showExtensionsWithIds', ['equinusocio.vsc-material-theme']);
exports.reloadWindow = () => vscode_1.commands.executeCommand('workbench.action.reloadWindow');
//# sourceMappingURL=vscode.js.map