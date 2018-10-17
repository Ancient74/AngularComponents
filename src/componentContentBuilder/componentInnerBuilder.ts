import { ComponentContentBuilder } from "./componentContentBuilder";

export class ComponentInnerBuilder{
	private inner : ComponentInner = new ComponentInner();
	constructor(public builder : ComponentContentBuilder){
	}
	setIsExport(isExport : boolean){
		this.inner.isExport = isExport;
		return this;
	}
	setClassName(name : string){
		this.inner.className = name;
		return this;
	}
	setWithConstructor(withConstrucror : boolean){
		this.inner.withConstrucror = withConstrucror;
		return this;
	}
	build(){
		this.builder._componentInner = this.inner;
		return this.builder;
	}
}

export class ComponentInner{
	isExport : boolean = false;
	className : string = "";
	withConstrucror : boolean  = false;
	toString():string{
		let res ="";
		if(this.isExport){
			res += "export "
		}
		res+="class " + this.className + "{\n";
		if(this.withConstrucror){
			res+="\tconstructor(){\n\t}"
		}
		res+="\n}"
		return res;
	}
}
