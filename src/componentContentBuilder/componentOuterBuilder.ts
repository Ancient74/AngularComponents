import { ComponentContentBuilder } from "./componentContentBuilder";

export class ComponentOuter{
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

export class ComponentOuterBuilder{
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
