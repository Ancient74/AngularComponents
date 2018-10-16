import { TextEditor, WorkspaceFolder, Uri } from "vscode";
import { dirname, join } from 'path'
import { lstatSync } from 'fs'
export class PathProcessor{
	constructor(
		public activeTextEditor : TextEditor | undefined,
		public workspaceFolders : WorkspaceFolder[] | undefined
	){
	}
	getValidPath(fileUri : Uri | undefined):string | undefined{
		//get file path from explorer
		if(fileUri !== undefined){
			if(lstatSync(fileUri.fsPath).isFile())
				return dirname(fileUri.fsPath);
			else
				return fileUri.fsPath;
		}
		
		//get file path from command line
		if(this.workspaceFolders === undefined){
			return undefined;
		}
		
		//path to root folder
		if(this.activeTextEditor === undefined){
			return this.workspaceFolders[0].uri.fsPath;
		}
		let activePath =dirname(this.activeTextEditor.document.fileName);//active text editor folder
		if(this.workspaceFolders[0].uri.fsPath !== activePath){
			return join(activePath,"..");//if it is not root folder - create component at parent dir
		}
		return activePath;
	}
}
