import * as fs from "fs";
import { InputProcessor, FileTypes } from "./inputProcessor";
import { ComponentContentBuilder } from "./componentContentBuilder/componentContentBuilder";
export class ComponentCreator{

	private processor : InputProcessor;
	private componentBuilder : ComponentContentBuilder;
	
	public set componentName(value : string){
		this.processor.input = value;
	}
	public get componentName(){
		return this.processor.componentName;
	}
	public get dirName(){
		return this.processor.dirName;
	}
	constructor(_componentName : string){
		this.processor = new InputProcessor(_componentName);
		this.componentBuilder = new ComponentContentBuilder();
	}
	fileNameEquivalent(type : FileTypes | string){
		return this.processor.fileNameEquivalent(type);
	}
	createComponent(path : string, withDir : boolean=false, prefix : string = "app"){
		
		if(!this.processor.IsValid()){
			throw new Error("Bad input");
		}
		
		this.processor.defaultSelectorPrefix = prefix;

		if(withDir){
			path = path +"/"+ this.dirName;
			fs.mkdirSync(path);
		}
		for(let type of Object.keys(FileTypes)){
			let data = "";
			if(type === "ts"){
				data = this.getTsData();
			}
			let filename = path+"/"+this.fileNameEquivalent(type);
			let fd = fs.openSync(filename,"a");
			fs.appendFileSync(filename,data);
			fs.closeSync(fd);
		}

	}

	private getTsData(): string{

		return this.componentBuilder
		.imports()
			.import("Component")
			.from("@angular/core")
		.componentOuter()
			.setTemplateUrl(this.processor.fileNameEquivalent(FileTypes.html))
			.setSelector(this.processor.selectorName)
			.setModuleId("module.id")
			.addStyleUrl(this.processor.fileNameEquivalent(FileTypes.css))
			.build()
		.componentInner()
			.setIsExport(true)
			.setClassName(this.processor.componentName)
			.setWithConstructor(true)
			.build()
		.build();
	}
}