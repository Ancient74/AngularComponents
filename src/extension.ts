'use strict';
import * as vscode from 'vscode';
import {dirname, join} from 'path'
import { ComponentCreator } from './componentCreator';
import { FileTypes } from './InputProcessor';

async function createComponent(fileUri : any){
	let input : string = "";

	
	await vscode.window.showInputBox({placeHolder:"ComponentName"}).then(x=>input = x===undefined? "" : x.toString());
	
	if(!input || input.trim()===""){//if input is empty => return
		return;
	}

	if(fileUri!==undefined){//get file path from explorer
		fileUri = fileUri.path;
		fileUri = fileUri.substring(1,fileUri.length);
	}
	else{//get file path from command line
		if(vscode.workspace.workspaceFolders===undefined){
			return;
		}
		if(vscode.window.activeTextEditor===undefined){
			fileUri = vscode.workspace.workspaceFolders[0].uri.fsPath;//path to root folder
		}
		else{
			let activePath =dirname(vscode.window.activeTextEditor.document.fileName);//active text editor folder
			if(
				fileUri = vscode.workspace.workspaceFolders[0].uri.fsPath !== activePath){
			fileUri = join(activePath,"..");//if it is not root folder - create component at parent dir
				}
				else{
					fileUri = activePath;// create component at active text editor dir
				}
		}
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
