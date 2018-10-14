'use strict';
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
		let TsFile = creator.fileNameEquivalent(FileTypes.ts);
		if(allowDir){
			createdComponent += creator.componentName+"/"+TsFile;
		}
		else{
			createdComponent+= TsFile;
		}
		vscode.window.showInformationMessage("Component \'"+ creator.componentName + "\' created");
		let t = vscode.Uri.file(createdComponent);
		await	vscode.window.showTextDocument(t);
	}catch(err){
		await vscode.window.showErrorMessage(err.toString());
	}
}
export function activate(context: vscode.ExtensionContext) {
    let create = vscode.commands.registerCommand('angularComponent.createComponent', createComponent);
		context.subscriptions.push(create);
}
export function deactivate() {
}
