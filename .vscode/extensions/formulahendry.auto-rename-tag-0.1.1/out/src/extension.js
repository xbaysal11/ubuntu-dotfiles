'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tagManager_1 = require("./tagManager");
function activate(context) {
    let tagManager = new tagManager_1.TagManager();
    tagManager.run();
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map