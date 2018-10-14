export enum FileTypes{
	html="html",
	css="css",
	ts="ts"
}
export class InputProcessor{
	private _input : string = "";
	set input(value:string){
		this._input = this.processInput(value.trim());
	}
	get input(){
		return this._input;
	}
	constructor(){
	}

	get IsValid():boolean{
		let r = new RegExp("\\b(\\w*\\w\\w*)\\b");
		let res = r.exec(this.input);
		if(res===null){
			return false;
		}
		else if(res.length>2)
		{
			return false;
		}
		else{
			return true;
		}
	}
	private processInput(inp : string):string{
		if(inp.toLowerCase().endsWith("component")){
			return inp.substring(0,inp.length-9);
		}
		return inp;
	}
	get DirName(){
		return this.input.charAt(0) + this.input.slice(1) + "Component";
	}

	fileNameEquivalent(type : FileTypes | string):string{
		return this.input.toLowerCase() + ".component."+type;
	}
}