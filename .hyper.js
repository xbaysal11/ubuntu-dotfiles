// C:\Users\xbaysal11\AppData\Roaming\Hyper\.hyper.js
module.exports = {
	config: {
		updateChannel: 'stable',
		lineHeight: 1.1,
		fontSize: 11,
		letterSpacing: 0,
		fontWeight: 'normal',
		fontWeightBold: 'normal',
		fontFamily: '"Fira Code", Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
		shell: 'C:\\Program Files\\Git\\git-cmd.exe',
		shellArgs: ['--command=usr/bin/bash.exe', '-l', '-i'],
		// set to false for no bell
		bell: 'SOUND',

		// if true, selected text will automatically be copied to the clipboard
		copyOnSelect: false,
		cursorShape: 'BEAM',
		cursorColor: 'rgba(248,28,229,0.8)',
		cursorBlink: true,
		webGLRenderer: false,
	},
	plugins: [
        'hyper-font-ligatures',
        "hyper-night-owl"
    ],
}
