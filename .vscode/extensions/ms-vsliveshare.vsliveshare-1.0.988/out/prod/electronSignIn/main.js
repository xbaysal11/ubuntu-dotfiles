"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regexes_1 = require("./regexes");
const { app, BrowserWindow } = require('electron');
const defer = (fn, timeout = 1) => {
    setTimeout(fn, timeout);
};
let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        width: 500,
        height: 400
    });
    mainWindow.setMenu(null);
    let serviceUri = process.env.VSLS_LOGIN_URI;
    if (!process.env.VSLS_LOGIN_URI) {
        throw new Error(`No login URI provided.`);
    }
    // replace trailing slash if set
    serviceUri = serviceUri.replace(/\/\s*?$/, '');
    mainWindow.loadURL(serviceUri, { userAgent: 'Chrome/Electron' });
    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });
    mainWindow.on('blur', () => {
        mainWindow.show();
    });
    mainWindow.on('page-title-updated', () => {
        defer(() => {
            const title = mainWindow.getTitle();
            const url = mainWindow.webContents.getURL();
            if (!title) {
                return;
            }
            const userCodeMatches = title.match(regexes_1.userCodeRegex);
            if (userCodeMatches && userCodeMatches[0]) {
                const userCode = userCodeMatches[0];
                // send user code to ::stdout
                console.log(`[auth]: user code => ${userCode}`);
                app.quit();
            }
            else {
                const cleanURL = (url || '').split('?')[0];
                console.log(`[title change]: ${cleanURL.substr(0, 100)}`);
            }
        });
    });
    if (app.dock && (typeof app.dock === 'function')) {
        // hide the app icon in the dock
        app.dock.hide();
    }
});
app.on('window-all-closed', () => {
    app.quit();
});

//# sourceMappingURL=main.js.map
