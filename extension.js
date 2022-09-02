const vscode = require('vscode');
const ncp = require("copy-paste");
const path = require("path");

function addCommand(context, command, matchCase, matchWholeWord, withoutExtension) {
    console.log('test');
    let searchFileName = vscode.commands.registerCommand(command, function (fileUri) {
        if (fileUri != undefined) {
            var name = path.basename(fileUri.fsPath);
            if (withoutExtension) {
                name=path.parse(name).name
            }
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
    addCommand(context, 'extension.searchFileName', false, false,false);
    addCommand(context, 'extension.searchFileNameWithoutExtension', false, false, true);
    addCommand(context, 'extension.searchFileName.matchCase', true, false, false);
    addCommand(context, 'extension.searchFileName.matchWholeWord', false, true, false);
    addCommand(context, 'extension.searchFileName.matchCaseAndWholeWord', true, true, false);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;