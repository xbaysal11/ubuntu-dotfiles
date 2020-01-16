"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_remote_icons_1 = require("./get-remote-icons");
const svgo_1 = require("./svgo");
const icons_1 = require("./icons");
const json_minify_1 = require("./json-minify");
const icons_accents_1 = require("./icons-accents");
const icons_variants_1 = require("./icons-variants");
const icons_variants_jsons_1 = require("./icons-variants-jsons");
const ora = require("ora");
const spinner = ora('Running build').start();
get_remote_icons_1.default()
    .then(() => {
    spinner.succeed('Got remote icons');
    return svgo_1.default();
})
    .then(() => {
    spinner.succeed('Icon minimized');
    return icons_1.default();
})
    .then(() => {
    spinner.succeed('Icon built');
    return json_minify_1.default();
})
    .then(() => {
    spinner.succeed('Json minimized');
    return icons_accents_1.default();
})
    .then(() => {
    spinner.succeed('Icon accents built');
    return icons_variants_1.default();
})
    .then(() => {
    spinner.succeed('Icon variants built');
    return icons_variants_jsons_1.default();
})
    .then(() => {
    spinner.succeed('Icons variants jsons built');
    spinner.color = 'green';
    spinner.text = 'Finished.';
    spinner.stop();
    return Promise.resolve();
})
    .catch(error => {
    spinner.fail('Build failed');
    console.error(error);
});
//# sourceMappingURL=index.js.map