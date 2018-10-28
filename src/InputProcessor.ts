export enum FileTypes{
	html="html",
	css="css",
	ts="ts"
}
export class InputProcessor{
	private _input : string = "";
	public defaultSelectorPrefix = "app";
	set input(value:string){
		this._input = this.processInput(value);
	}
	get input(){
		return this._input;
	}
	constructor(inp : string){
		this.input = inp;
	}

	public IsValid():boolean{
		let r = /\b[A-Za-z]\w*\b/;
		let text = this.input;
		let res = text.match(r);
		
		return res == null ? false : res[0] == text;
	}
	private processInput(inp : string):string{
		inp = inp.trim();
		if(inp.toLowerCase().endsWith("component")){
			return inp.substring(0,inp.length-9);
		}
		return inp;
	}
	get componentName(){
		return this.input.charAt(0).toUpperCase() + this.input.slice(1) + "Component";
	}

	get selectorName(){
		let res = this.input.split(/(?=[A-Z])/);
		if(res===null){
			return this.input.toLowerCase();
		}
		return this.defaultSelectorPrefix + "-" + res.join("-").toLowerCase();
	}

	fileNameEquivalent(type : FileTypes | string):string{
		return this.input.toLowerCase() + ".component."+type;
	}
}