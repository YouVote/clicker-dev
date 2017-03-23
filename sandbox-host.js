define(["modindex"],function(modIdx){
	//return function(modSelectDropDown,runBtn,paramTextBox,webFrameDom){
	return function (currMod,modsMenu,modParams,runBtn){
		var modBaseAddr=config.baseProdUrl+"mods/";
		var modObj=new modIdx()
		var modChoices=modObj.availableMods;
		
		// load mod index and put mods into dropdown menu
		for (var i in modChoices){
			var opt=document.createElement("li");
			opt.innerHTML="<a href='#'>"+modChoices[i]+"</a>";
			$(opt).data('modName',modChoices[i]);
			opt.onclick=function(){
				modChoice=$(this).data('modName');
				currMod.innerHTML=modChoice;
				require([modBaseAddr+modChoice+".js"],function(mod){
					var modObj = new mod.authEngine();
					modParams.value=modObj.templateParams();
				})
			}
			modsMenu.appendChild(opt);
		}

		runBtn.onclick=function(){
			jsFile=modChoice;
			if(jsFile==null){jsFile="null"}
			params=JSON.parse(modParams.value);
			qnHandler.execQn(jsFile,params,{});
		}
	}
})