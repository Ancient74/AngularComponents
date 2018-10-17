import { ComponentContentBuilder } from "./componentContentBuilder";

export class ImportBuilder{
	constructor(public builder : ComponentContentBuilder){
	}
	public _lineImp : string[] = [];
	public _lineFrm : string = "";

	private imp : boolean = false;
	private frm : boolean = false;

	public import(imp : string){
		this._lineImp.push(imp);
		this.imp = true;
		return this;
	}
	public from(from : string){
		this._lineFrm=from;
		this.frm = true;
		return this.builder;
	}
	public isValid(){
		return this.imp && this.frm;
	}
}