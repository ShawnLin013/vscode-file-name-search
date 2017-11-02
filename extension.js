const vscode = require('vscode');
const ncp = require("copy-paste");
const path = require("path");

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.searchFileName', function (fileUri) {
        if (fileUri != undefined) {
            var name = path.basename(fileUri.fsPath);
            ncp.copy(name, function() {
                vscode.commands.executeCommand('workbench.action.findInFiles');
                vscode.commands.executeCommand('editor.action.clipboardPasteAction');
                vscode.commands.executeCommand('toggleSearchWholeWord');
                vscode.commands.executeCommand('toggleSearchWholeWord');
            })
        }
    });
    context.subscriptions.push(disposable); 
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;