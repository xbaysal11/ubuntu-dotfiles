//
//  Copyright (c) Microsoft Corporation. All rights reserved.
//
'use strict';
class WelcomePageUtils {
    constructor() {
        this.vsCodeApi = (typeof acquireVsCodeApi === 'function') ? acquireVsCodeApi() : null;
    }
    static get Instance() {
        if (!WelcomePageUtils.singleton) {
            WelcomePageUtils.singleton = new WelcomePageUtils();
        }
        return WelcomePageUtils.singleton;
    }
    copyLink() {
        if (!this.vsCodeApi) {
            return;
        }
        this.vsCodeApi.postMessage({
            command: 'copyUrl'
        });
    }
    shareWithYourself() {
        if (!this.vsCodeApi) {
            return;
        }
        this.vsCodeApi.postMessage({
            command: 'shareWithYourself',
            text: 'share-with-yourself-link'
        });
    }
    signIn() {
        if (!this.vsCodeApi) {
            return;
        }
        this.vsCodeApi.postMessage({
            command: 'signIn',
            text: 'signin-link'
        });
    }
    onClick(text) {
        if (!this.vsCodeApi) {
            return;
        }
        this.vsCodeApi.postMessage({
            command: 'onClick',
            text: text
        });
    }
    share() {
        if (!this.vsCodeApi) {
            return;
        }
        this.vsCodeApi.postMessage({
            command: 'startFromWelcomePage'
        });
    }
    applyToAll(selector, callback) {
        const elements = document.querySelectorAll(selector);
        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                callback(elements[i]);
            }
        }
    }
    hide(selector) {
        this.applyToAll(selector, (e) => e.style.display = 'none');
    }
    show(selector) {
        this.applyToAll(selector, (e) => e.style.display = 'block');
    }
    changeImage(selector, source) {
        const image = document.querySelector(selector);
        image.src = source;
    }
}
const welcomePageUtils = WelcomePageUtils.Instance;
const vslsSessionHigherState = vslsSessionState;
switch (dynamicWelcomePageGroup) {
    case DYNAMIC_WELCOME_PAGE_EXPERIMENT_SIMPLE_PAGE_GROUP:
        if (vslsCurrentSessionHigherState === vslsSessionState.JoiningInProgress
            || vslsCurrentSessionHigherState === vslsSessionState.Joined
            || vslsCurrentSessionHigherState === vslsSessionState.SharingInProgress
            || vslsCurrentSessionHigherState === vslsSessionState.Shared) {
            showControlPage();
        }
        else {
            showSimplePage();
        }
        break;
    case DYNAMIC_WELCOME_PAGE_EXPERIMENT_DYNAMIC_PAGE_GROUP:
        if (vslsIsFirstTimeShare) {
            showDynamicPage();
        }
        else {
            showControlPage();
        }
        break;
    default:
        showControlPage();
        break;
}
function showSimplePage() {
    WelcomePageUtils.Instance.show('.vsliveshare-welcome-page-main');
    WelcomePageUtils.Instance.hide('.js-liveshare-share-full');
    WelcomePageUtils.Instance.hide('.js-liveshare-join-full');
    WelcomePageUtils.Instance.hide('.bottom-text');
    WelcomePageUtils.Instance.hide('.vsliveshare-dynamic-welcome-page');
    WelcomePageUtils.Instance.show('.js-liveshare-simple-share-full');
    WelcomePageUtils.Instance.applyToAll('.js-share-now-button', (e) => {
        e.onclick = () => welcomePageUtils.share();
    });
}
function showControlPage() {
    WelcomePageUtils.Instance.show('.vsliveshare-welcome-page-main');
    WelcomePageUtils.Instance.hide('.js-liveshare-simple-share-full');
    WelcomePageUtils.Instance.hide('.vsliveshare-dynamic-welcome-page');
    WelcomePageUtils.Instance.show('.bottom-text');
    // Show/hide based on core higher states
    if (vslsIsPostReloadJoin === true
        || vslsCurrentSessionHigherState === vslsSessionState.JoiningInProgress
        || vslsCurrentSessionHigherState === vslsSessionState.Joined) {
        WelcomePageUtils.Instance.hide('.js-liveshare-share-full');
        WelcomePageUtils.Instance.show('.js-liveshare-join-full');
    }
    else {
        WelcomePageUtils.Instance.show('.js-liveshare-share-full');
        WelcomePageUtils.Instance.hide('.js-liveshare-join-full');
    }
    // Show/hide based on inprogress states
    if (vslsCurrentSessionHigherState === vslsSessionState.Shared
        || vslsCurrentSessionHigherState === vslsSessionState.Joined) {
        WelcomePageUtils.Instance.show('.js-liveshare-action-post');
    }
    else {
        WelcomePageUtils.Instance.hide('.js-liveshare-action-post');
    }
    // Show/hide based on shared state
    if (vslsCurrentSessionState === vslsSessionState.Shared) {
        WelcomePageUtils.Instance.hide('.js-liveshare-share-pre');
        WelcomePageUtils.Instance.applyToAll('.js-liveshare-join-uri-button', (e) => {
            e.onclick = () => welcomePageUtils.copyLink();
        });
        WelcomePageUtils.Instance.applyToAll('.js-liveshare-join-self-button', (e) => {
            e.onclick = () => welcomePageUtils.shareWithYourself();
        });
    }
    // Show/hide based on auth state
    if (vslsIsAuthenticated
        || vslsCurrentSessionHigherState === undefined) {
        WelcomePageUtils.Instance.hide('.js-liveshare-action-signin');
    }
    else {
        WelcomePageUtils.Instance.show('.js-liveshare-action-signin');
        WelcomePageUtils.Instance.applyToAll('.sign-in-button', (e) => {
            e.onclick = () => welcomePageUtils.signIn();
        });
        let signinButtonText = 'Launch Sign In';
        if (vslsCurrentSessionState === vslsSessionState.SigningIn
            || vslsCurrentSessionState === vslsSessionState.ExternallySigningIn) {
            signinButtonText = 'Signing In...';
        }
        WelcomePageUtils.Instance.applyToAll('.sign-in-button', (e) => {
            e.innerText = signinButtonText;
        });
    }
    if (!vslsIsWebView) {
        WelcomePageUtils.Instance.hide('button');
    }
    else {
        // on click telemetry handlers
        for (let i = 0; i < document.links.length; i++) {
            const link = document.links[i];
            link.onclick = () => welcomePageUtils.onClick(link.id);
        }
    }
}
function showDynamicPage() {
    WelcomePageUtils.Instance.hide('.vsliveshare-welcome-page-main');
    WelcomePageUtils.Instance.show('.vsliveshare-dynamic-welcome-page');
    WelcomePageUtils.Instance.hide('.dynamic-welcome-page-content-element-text');
    WelcomePageUtils.Instance.hide('#liveshare-collaboration-details');
    WelcomePageUtils.Instance.hide('.dynamic-page-bottom-text');
    WelcomePageUtils.Instance.applyToAll('.dynamic-welcome-page-start-button', (e) => {
        e.onclick = () => {
            welcomePageUtils.share();
            WelcomePageUtils.Instance.show('.content-element-share');
        };
    });
    WelcomePageUtils.Instance.applyToAll('#dynamic-page-join-yourself-button', (e) => {
        e.onclick = () => welcomePageUtils.shareWithYourself();
    });
    WelcomePageUtils.Instance.changeImage('#dynamic-page-share-icon', 'https://aka.ms/vsls-share-gray-icon');
    WelcomePageUtils.Instance.changeImage('#dynamic-page-authenticate-icon', 'https://aka.ms/vsls-authenticate-gray-icon');
    WelcomePageUtils.Instance.changeImage('#dynamic-page-invite-icon', 'https://aka.ms/vsls-invite-gray-icon');
    WelcomePageUtils.Instance.changeImage('#dynamic-page-join-yourself-icon', 'https://aka.ms/vsls-join-yourself-gray-icon');
    const authenticateButton = document.querySelector('#dynamic-page-authenticate-button');
    const inviteButton = document.querySelector('#dynamic-page-invite-button');
    const joinYourselfButton = document.querySelector('#dynamic-page-join-yourself-button');
    authenticateButton.style.border = '2px solid gray';
    inviteButton.style.border = '2px solid gray';
    joinYourselfButton.style.backgroundColor = 'gray';
    switch (vslsCurrentSessionState) {
        case vslsSessionState.SigningIn:
            WelcomePageUtils.Instance.show('.content-element-share');
            WelcomePageUtils.Instance.changeImage('#dynamic-page-share-icon', 'https://aka.ms/vsls-share-blue-icon');
            authenticateButton.style.border = '2px solid var(--vscode-button-background)';
            break;
        case vslsSessionState.ExternallySigningIn:
            WelcomePageUtils.Instance.show('.content-element-share');
            WelcomePageUtils.Instance.changeImage('#dynamic-page-share-icon', 'https://aka.ms/vsls-share-blue-icon');
            authenticateButton.style.border = '2px solid var(--vscode-button-background)';
            break;
        case vslsSessionState.SignedIn:
            WelcomePageUtils.Instance.show('.dynamic-welcome-page-content-element-text');
            WelcomePageUtils.Instance.changeImage('#dynamic-page-share-icon', 'https://aka.ms/vsls-share-blue-icon');
            authenticateButton.style.border = '2px solid var(--vscode-button-background)';
            inviteButton.style.border = '2px solid var(--vscode-button-background)';
            WelcomePageUtils.Instance.changeImage('#dynamic-page-authenticate-icon', 'https://aka.ms/vsls-authenticate-blue-icon');
            break;
        case vslsSessionState.SharingInProgress:
            WelcomePageUtils.Instance.show('.dynamic-welcome-page-content-element-text');
            WelcomePageUtils.Instance.changeImage('#dynamic-page-share-icon', 'https://aka.ms/vsls-share-blue-icon');
            authenticateButton.style.border = '2px solid var(--vscode-button-background)';
            inviteButton.style.border = '2px solid var(--vscode-button-background)';
            WelcomePageUtils.Instance.changeImage('#dynamic-page-authenticate-icon', 'https://aka.ms/vsls-authenticate-blue-icon');
            break;
        case vslsSessionState.Shared:
            WelcomePageUtils.Instance.show('.dynamic-welcome-page-content-element-text');
            WelcomePageUtils.Instance.changeImage('#dynamic-page-share-icon', 'https://aka.ms/vsls-share-blue-icon');
            authenticateButton.style.border = '2px solid var(--vscode-button-background)';
            inviteButton.style.border = '2px solid var(--vscode-button-background)';
            joinYourselfButton.style.backgroundColor = 'var(--vscode-button-background)';
            WelcomePageUtils.Instance.changeImage('#dynamic-page-authenticate-icon', 'https://aka.ms/vsls-authenticate-blue-icon');
            break;
        default:
            break;
    }
    if (hasCollaborators) {
        WelcomePageUtils.Instance.show('#liveshare-collaboration-details');
        WelcomePageUtils.Instance.show('.dynamic-page-bottom-text');
        WelcomePageUtils.Instance.changeImage('#dynamic-page-invite-icon', 'https://aka.ms/vsls-invite-blue-icon');
        WelcomePageUtils.Instance.changeImage('#dynamic-page-join-yourself-icon', 'https://aka.ms/vsls-join-yourself-blue-icon');
    }
}

//# sourceMappingURL=welcomePageMain.js.map
