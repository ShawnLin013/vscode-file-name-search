const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.sayHello', function (fileUri) {
        if (fileUri != undefined) {
            var path = fileUri.fsPath.split("\"")[0];
            var name = path.split("\\")[path.split("\\").length - 1];
            vscode.commands.executeCommand('workbench.action.findInFiles');
        }
    });
    context.subscriptions.push(disposable); 
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;