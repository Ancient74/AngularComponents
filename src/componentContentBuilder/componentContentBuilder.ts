export class ComponentContentBuilder{
	constructor(){
	}
	public _imports : Importer[] = [];
	public _componentOuter : ComponentOuter = new ComponentOuter();
	public _componentInner : ComponentInner = new ComponentInner();

	public imports() : Importer{
		let importer = new Importer(this);
		this._imports.push(importer);
		return importer;
	}

	public componentOuter():ComponentOuterBuilder{
		return new ComponentOuterBuilder(this);
	}

	public componentInner():ComponentInnerBuilder{
		return new ComponentInnerBuilder(this);
	}

	public build():string{
		let code = "";
	
		let frm = this._imports.map(x=>x._lineFrm).filter((v,i,a)=>{
			return a.indexOf(v) == i;
		})//get distincted froms values
		for(let fr of frm){//all froms
			code += "import { ";
				for(let line of this._imports.filter(x=>x._lineFrm==fr)){//get all lines with that from
					for(let imp of line._lineImp){//import all lines from fr
					if(!line.isValid()){
						throw new Error("Building Error, invalid imports");
					}
					code+= imp + ", "; 
				}
			}
			code = code.substring(0,code.length-2) + " } from '" + fr +"';\n";
		}

		code+="\n";
		code+="@Component({\n";
		code+=this._componentOuter.toString();
		code+="\n})\n";
		code+=this._componentInner.toString();
		return code;
	}
}

class ComponentInnerBuilder{
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

class ComponentInner{
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

class ComponentOuter{
	selector : string = "";
	moduleId : string = "";
	templateUrl : string = "";
	styleUrls : string[] = [];

	public toString() :string{
		let res = "";
		if(this.selector !== ""){
			res += "\tselector:'"+this.selector+"',\n";
		}
		if(this.moduleId !== ""){
			res += "\tmoduleId:"+this.moduleId+",\n";
		}
		if(this.templateUrl !== ""){
			res += "\ttemplateUrl:'"+this.templateUrl+"',\n";
		}
		if(this.styleUrls.length>0){
			res += "\tstyleUrls:['";
			for (let index = 0; index < this.styleUrls.length; index++) {
				const element = this.styleUrls[index];
				res+=element+"',";
			}
			res = res.substring(0,res.length-1);
			res+="]";
		}
		return res;
	}

}

class ComponentOuterBuilder{
	private component : ComponentOuter = new ComponentOuter();
	constructor(public builder : ComponentContentBuilder){
	}
	setSelector(selector : string){
		this.component.selector = selector;
		return this;
	}
	setModuleId(moduleId : string){
		this.component.moduleId = moduleId;
		return this;
	}
	setTemplateUrl(url : string){
		this.component.templateUrl = url;
		return this;
	}
	addStyleUrl(url : string){
		this.component.styleUrls.push(url);
		return this;
	}
	build(){
		this.builder._componentOuter = this.component;
		return this.builder;
	}
}

class Importer{
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