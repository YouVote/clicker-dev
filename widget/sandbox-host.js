// shared with clicker-lite/lite-main.js
// Todo: refactor the two into a yvAuthKernel. 
define(["modindex","qneditor"],function(modIdx,qnEditEngine){
	//return function(modSelectDropDown,runBtn,paramTextBox,webFrameDom){
	return function (currMod,modsMenu,modParamsDom,runBtn){
		var modBaseAddr=config.baseProdUrl+"mods/";
		var modObj=new modIdx()
		var modChoices=modObj.availableMods;

		var modEditor=new qnEditEngine(
			document.createElement("input"),
			currMod,modsMenu,modParamsDom
		)
		// // load mod index and put mods into dropdown menu
		// for (var i in modChoices){
		// 	var opt=document.createElement("li");
		// 	opt.innerHTML="<a href='#'>"+modChoices[i]+"</a>";
		// 	$(opt).data('modName',modChoices[i]);
		// 	opt.onclick=function(){
		// 		modChoice=$(this).data('modName');
		// 		currMod.innerHTML=modChoice;
		// 		require([modBaseAddr+modChoice+".js"],function(mod){
		// 			// mods may not have implemented author method
		// 			if(typeof(mod)=="object"){
		// 				if(typeof(mod.author)=="function"){
		// 					var modObj = new mod.author();
		// 					// may need to handle possibility that author defined, but coreTemplate is not. 
		// 					modParams.value=modObj.coreTemplate;
		// 				}else{
		// 					modParams.value="";
		// 					console.warn(modChoice+" did not implement the author method.\nYou are on your own about what parameters to use.");
		// 				}
		// 			}else{
		// 				modParams.value="";
		// 				console.warn(modChoice+" is not a properly defined object");
		// 			}
		// 		})
		// 	}
		// 	modsMenu.appendChild(opt);
		// }

		// get and put params into url 
		var url = new URL(location.href);
		var m = url.searchParams.get("m");
		var p = url.searchParams.get("p");
		// quite a bit of repeated code with multiple sources of truth here.
		// refactor this in time. (modChoices vs currMod.innerHTML vs m)
		if(m!=null & modChoices.indexOf(m)>-1){
			modChoice=m;
			modEditor.putModName(modChoice); 
			if(p!=null ){
				// modParams.value=decodeURIComponent(p);
				modEditor.putModParams(decodeURIComponent(p)); 
			} else {
				require([modBaseAddr+modChoice+".js"],function(mod){
					var modObj = new mod.author();
					// putModName
					// modParams.value=modObj.coreTemplate;
					modEditor.putModparams(modObj.coreTemplate); 
				})
			}
		}

		runBtn.onclick=function(){
			// jsFile=modChoice; //getModName
			// paramString=modParams.value; // getModParams
			jsFile=modEditor.getModName(); 
			console.log(jsFile)
			paramString=modEditor.getModParams(); 
			if(jsFile!=null){
				try{
					params=JSON.parse(paramString);
					// need to change index.html here if file name is changed. 
					// Todo: find a more robust solution - check if can get file part of url
					// from url object.
					history.pushState({},"", "index.html?m="+jsFile+"&p="+encodeURIComponent(paramString));
					youVote.execQn("",jsFile,params,{});
				}catch(e){
					console.warn("params string not json format")
				}
			}
		}
	}
})