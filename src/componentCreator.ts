import * as fs from "fs";
import { InputProcessor, FileTypes } from "./InputProcessor";
export class ComponentCreator{
	private processor : InputProcessor;
	public set componentName(value : string){
		this.processor.input = value;
	}
	public get componentName(){
		return this.processor.componentName;
	}
	constructor(_componentName : string){
		this.processor = new InputProcessor(_componentName);
	}
	fileNameEquivalent(type : FileTypes | string){
		return this.processor.fileNameEquivalent(type);
	}
	createComponent(path : string, withDir : boolean=false){
		
		if(!this.processor.IsValid){
			throw new Error("Bad input");
		}

		if(withDir){
			path = path +"/"+ this.processor.componentName;
			fs.mkdirSync(path);
		}
		for(let type of Object.keys(FileTypes)){
			let data = "";
			if(type === "ts"){
				data = this.getTsData();
			}
			let filename = path+"/"+this.processor.fileNameEquivalent(type);
			let fd = fs.openSync(filename,"a");
			fs.appendFileSync(filename,data);
			fs.closeSync(fd);
		}

	}

	private getTsData(): string{
		let data : string = "";
		data += "import { Component } from '@angular/core';\n\n";
		data += "@Component({\n";
		data += "\ttemplateUrl:'"+this.processor.fileNameEquivalent(FileTypes.html)+"',\n";
		data += "\tstyleUrls:['"+this.processor.fileNameEquivalent(FileTypes.css)+"'],\n";
		data += "\tmoduleId: module.id\n";
		data += "})\n";
		data += "export class "+this.processor.componentName + "{\n";
		data += "\tconstructor(){\n\t}\n}";
		return data;
	}
}