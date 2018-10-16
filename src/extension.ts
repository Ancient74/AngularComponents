'use strict';
import * as vscode from 'vscode';
import { ComponentCreator } from './componentCreator';
import { FileTypes } from './InputProcessor';
import { PathProcessor } from './pathProcessor';

async function createComponent(fileUri : vscode.Uri | undefined){
	let input : string = "";

	
	await vscode.window.showInputBox({placeHolder:"ComponentName"}).then(x=>input = x===undefined? "" : x.toString());
	
	if(!input || input.trim()===""){//if input is empty => return
		return;
	}
	let pathProcessor = new PathProcessor(vscode.window.activeTextEditor,vscode.workspace.workspaceFolders);
	let validPath = pathProcessor.getValidPath(fileUri);

	if(validPath === undefined){
		return;
	}

	let creator = new ComponentCreator(input);
	try{
		let allowDir =	!!vscode.workspace.getConfiguration("angularComponent").get("allowDir");
		creator.createComponent(validPath,allowDir);
		let createdComponent = validPath+"/";
		let TsFile = creator.fileNameEquivalent(FileTypes.ts);
		if(allowDir){
			createdComponent += creator.dirName+"/"+TsFile;
		}
		else{
			createdComponent += TsFile;
		}
		vscode.window.showInformationMessage("Component \'"+ creator.componentName + "\' created");
		await	vscode.window.showTextDocument(vscode.Uri.file(createdComponent));
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
