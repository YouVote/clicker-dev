define(["modindex","config"],function(modEngine,config){
	return function(modSelectDropDown,runBtn,paramTextBox,webFrameDom){
		var modObj=new modEngine()
		var modChoices=modObj.availableMods;
		for(var m in modChoices){
			var opt=document.createElement("option")
			opt.innerHTML=modChoices[m];
			opt.value=modChoices[m];
			modSelectDropDown.appendChild(opt)
		}
		modSelectDropDown.onchange=function(){
			var modBaseAddr=config.modBaseAdd;
			var modName=modSelectDropDown.value;
			if(modName==""){modName="null"}
			require([modBaseAddr+modName+".js"],function(mod){
				var modObj = new mod.authEngine();
				paramTextBox.value=modObj.templateParams();
			});
		}
		runBtn.onclick=function(){
			jsFile=modSelectDropDown.value;
			if(jsFile==""){jsFile="null"}
			params=JSON.parse(paramTextBox.value);
			qnHandler.execQn(jsFile,params,{});
		}
	}
})