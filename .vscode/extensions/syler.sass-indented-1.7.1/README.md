<span id="BADGE_GENERATION_MARKER_0"></span>
 [![circleci](https://github.com/TheRealSyler/vscode-sass-indented/raw/master/ https://img.shields.io/circleci/build/github/TheRealSyler/vscode-sass-indented)](https://app.circleci.com/github/TheRealSyler/vscode-sass-indented/pipelines) [![vscV](https://github.com/TheRealSyler/vscode-sass-indented/raw/master/ https://img.shields.io/visual-studio-marketplace/v/syler.sass-indented)](https://marketplace.visualstudio.com/items?itemName=syler.sass-indented) [![vscD](https://github.com/TheRealSyler/vscode-sass-indented/raw/master/ https://img.shields.io/visual-studio-marketplace/d/syler.sass-indented)](https://marketplace.visualstudio.com/items?itemName=syler.sass-indented) [![vscI](https://github.com/TheRealSyler/vscode-sass-indented/raw/master/ https://img.shields.io/visual-studio-marketplace/i/syler.sass-indented)](https://marketplace.visualstudio.com/items?itemName=syler.sass-indented) [![githubLastCommit](https://github.com/TheRealSyler/vscode-sass-indented/raw/master/ https://img.shields.io/github/last-commit/TheRealSyler/vscode-sass-indented)](https://github.com/TheRealSyler/vscode-sass-indented) [![githubIssues](https://github.com/TheRealSyler/vscode-sass-indented/raw/master/ https://img.shields.io/github/issues/TheRealSyler/vscode-sass-indented?color=lightgrey)](https://github.com/TheRealSyler/vscode-sass-indented)
<span id="BADGE_GENERATION_MARKER_1"></span>

[![Tested With](https://img.shields.io/badge/Syntax Tested With-test--grammar-red?style=for-the-badge)](https://www.npmjs.com/package/test-grammar)
[![Using](https://img.shields.io/badge/Using-sass--formatter-red?style=for-the-badge)](https://www.npmjs.com/package/sass-formatter)

# _Indented Sass syntax highlighting, autocomplete & Formatter for VSCode_

## **_Installing_**

Search for Sass from the extension installer within VSCode or put this into the command palette.

```cmd
ext install sass-indented
```

## **Features**

> Syntax Highlighting

> AutoCompletions / Intellisense

> [Formatter](#formatter)

#### 1.7.0 new additions

> Added unit testing for the grammar file with [test-grammar](https://www.npmjs.com/package/test-grammar), what this means for you is that i won't brake part of the syntax highlighting at every new release.

> Comments will now also be formatted.

> The `useExperimentalData` is now enabled by default, let me know if you get any strange css property completions.

> also a few minor bug fixes.

### **Formatter**

##### Commands

1. `///S` The formatter ignores empty lines until the next class, id or mixin.
2. `///R` The formatter uses the beginning of the command as the current indentation level.
3. `///I` The formatter ignores the next line.

Options can be set in the [Configuration](#Configuration)

![Formatter Example](https://media.giphy.com/media/fXhWNUfxr2bFNqgHzk/giphy.gif)

## **Configuration**

Configuration options can be set in the `Sass (Indented)` section of VSCode settings or by editing your `settings.json` directly.

### General

| Option                       | Type    | Default                                     | Description                                                                                               |
| ---------------------------- | ------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `sass.lint.enable`           | boolean | false                                       | Enables sass lint.                                                                                        |
| `sass.disableAutoIndent`     | boolean | false                                       | Stop the extension from automatically indenting when pressing Enter                                       |
| `sass.disableUnitCompletion` | boolean | true                                        | adds units to the intellisense completions if false.                                                      |
| `sass.andStared`             | array   | `["active", "focus", "hover", "nth-child"]` | items in this array will be at the top of the completion list (only for items that show after the & sign) |

### Formatter

| Option                         | Type    | Default | Description                                                    |
| ------------------------------ | ------- | ------- | -------------------------------------------------------------- |
| `sass.format.enabled`          | boolean | true    | enables the sass formatter.                                    |
| `sass.format.deleteWhitespace` | boolean | true    | removes trailing whitespace.                                   |
| `sass.format.deleteEmptyRows`  | boolean | true    | removes empty rows.                                            |
| `sass.format.deleteCompact`    | boolean | true    | removes empty rows that are near a property.                   |
| `sass.format.setPropertySpace` | boolean | true    | If true space between the property: value, is always set to 1. |

## **Bugs**

> **_IMPORTANT_**: if the bug is related to the formatter please open the issue in the formatter [repo](https://github.com/TheRealSyler/sass-formatter/issues/new?assignees=TheRealSyler&labels=bug&template=bug_report.md&title=).

If you encounter any bugs please [open a new issue](https://github.com/TheRealSyler/vscode-sass-indented/issues/new?assignees=TheRealSyler&labels=bug&template=bug_report.md&title=).

## **Contributing**

The source for this extension is available on [github](https://github.com/TheRealSyler/vscode-sass-indented). If anyone feels that there is something missing or would like to suggest improvements please [open a new issue](https://github.com/TheRealSyler/vscode-sass-indented/issues/new?assignees=TheRealSyler&labels=enhancement&template=feature_request.md&title=) or send a pull request! Instructions for running/debugging extensions locally [here](https://code.visualstudio.com/docs/extensions/overview).

> Note: if you want to contribute to the formatter go to this [repo](https://github.com/TheRealSyler/sass-formatter), there is no documentation at the moment, i should probably add it since kinda forgetting how the formatter works myself, so if you want to know how to change something open a new issue and i can probably explain what you need to do.

## **Credits**

- Thanks to [@robinbentley](https://github.com/robinbentley) for creating and maintaining the project until version 1.5.1.
- Property/Value Autocompletion - [Stanislav Sysoev (@d4rkr00t)](https://github.com/d4rkr00t) for his work on [language-stylus](https://github.com/d4rkr00t/language-stylus) extension
- Syntax highlighting - [https://github.com/P233/Syntax-highlighting-for-Sass](https://github.com/P233/Syntax-highlighting-for-Sass)
- Sass seal logo - [http://sass-lang.com/styleguide/brand](http://sass-lang.com/styleguide/brand)

## Changelog

The full changelog is available here: [changelog](https://github.com/TheRealSyler/vscode-sass-indented/blob/master/CHANGELOG.md).

## License

[MIT - https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
