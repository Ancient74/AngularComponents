import { ComponentInnerBuilder, ComponentInner } from "./componentInnerBuilder";
import { ComponentOuterBuilder, ComponentOuter } from "./componentOuterBuilder";
import { ImportBuilder } from "./ImportBuilder";

export class ComponentContentBuilder{
	constructor(){
	}
	public _imports : ImportBuilder[] = [];
	public _componentOuter : ComponentOuter = new ComponentOuter();
	public _componentInner : ComponentInner = new ComponentInner();

	public imports() : ImportBuilder{
		let importer = new ImportBuilder(this);
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


