'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ComponentCreator } from './componentCreator';
import { FileTypes } from './InputProcessor';


async function createComponent(fileUri : any){
	let input : string = "";
	if(fileUri!==undefined){
		fileUri = fileUri.path;
		fileUri = fileUri.substring(1,fileUri.length);
	}
	else{
		fileUri = vscode.workspace.rootPath;
	}
	await vscode.window.showInputBox({placeHolder:"ComponentName"}).then(x=>input = x===undefined? "" : x.toString());
	if(!input || input===""){
		return;
	}
	let creator = new ComponentCreator(input);
	try{
	let allowDir =	!!vscode.workspace.getConfiguration("angularComponent").get("allowDir");
	creator.createComponent(fileUri,allowDir);
	let createdComponent = fileUri+"/";
	let TsFile = creator.processor.fileNameEquivalent(FileTypes.ts);
	if(allowDir){
		createdComponent += creator.processor.DirName+"/"+TsFile;
	}
	else{
		createdComponent+= TsFile;
	}
	vscode.window.showInformationMessage("Component \'"+ input + "\' created");
	let t = vscode.Uri.file(createdComponent);
	await	vscode.window.showTextDocument(t);
	}catch(err){
		vscode.window.showErrorMessage(err);
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

   
    // The commandId parameter must match the command field in package.json
    let create = vscode.commands.registerCommand('angularComponent.createComponent', createComponent);

		context.subscriptions.push(create);
		
}

// this method is called when your extension is deactivated
export function deactivate() {
}
