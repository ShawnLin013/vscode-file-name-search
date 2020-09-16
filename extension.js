const vscode = require('vscode');
const ncp = require("copy-paste");
const path = require("path");

function addCommand(context, command, matchCase, matchWholeWord) {
    let searchFileName = vscode.commands.registerCommand(command, function (fileUri) {
        if (fileUri != undefined) {
            var name = path.basename(fileUri.fsPath);
            ncp.copy(name, function() {
                vscode.commands.executeCommand('workbench.action.findInFiles', {
                    query: name,
                    triggerSearch: true,
                    matchWholeWord: matchWholeWord,
                    isCaseSensitive: matchCase,
                });
            });
        }
    });
    context.subscriptions.push(searchFileName);
}

function activate(context) {
    addCommand(context, 'extension.searchFileName', false, false);
    addCommand(context, 'extension.searchFileName.matchCase', true, false);
    addCommand(context, 'extension.searchFileName.matchWholeWord', false, true);
    addCommand(context, 'extension.searchFileName.matchCaseAndWholeWord', true, true);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;