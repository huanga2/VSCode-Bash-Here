'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ChildProcess } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('vscode-bash-context is active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.BashHere', (selectedItem : vscode.Uri) => {
        // The code you place here will be executed every time your command is executed

        
        if (selectedItem == undefined) {
            return;
        }
        
        var onlyPath = selectedItem.fsPath;

        // console.log(onlyPath);

        const{spawn} = require("child_process");

        var WSLPath : string = vscode.workspace.getConfiguration("BashHere").WSLPath;
        // console.log(WSLPath);


        spawn('start', ['/D', `"${onlyPath}"`, WSLPath, '-c', 'bash'], {shell: true, cwd: onlyPath, detached: true});

        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}