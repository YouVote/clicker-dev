require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"webKernel","location":"../../yvWebKernel"},
		{"name":"ctype","location":"../../clicker-prod/ctype/"},
		{"name":"modindex","location":"../../clicker-prod/mods/"},
		{"name":"layouts","location":"../../clicker-prod/layout/"},
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min",
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		"d3js":"https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.0/d3.min",
		"vue":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.3/vue",
	}
});

require(["webKernel","layouts"], function(webKernel,layoutIdx){
	var layoutMenu=document.getElementById("layoutOptions");
	var runBtn=document.getElementById("runBtn");
	var layoutObj=new layoutIdx();
	var layoutChoices=layoutObj.availableLayouts;

	for (var i in layoutChoices){
		var opt=document.createElement("option");
		opt.innerHTML=layoutChoices[i];
		layoutMenu.appendChild(opt);
	}
	
	var layoutObj=new (function(){
		var baseProdUrl="../../clicker-prod/layout";
		var currQnSpec={"modName":"mcq","qnStem":{"data":"1. At which of the following points is the pendulum bob <b>stationary</b>? $x^2$ <br/><br/>","mathjax":true},"modParams":{"options":[{"data":"$3x$","mathjax":true}, {"data":"$$\\frac{2}{6}$$","mathjax":true}, "1 and 5", "1, 2 and 3", "None of these points"]}};
		var youVote=new webKernel("#qnStem","#qnOpts","#qnResp","head");
		youVote.execQn(currQnSpec.qnStem,currQnSpec.modName,currQnSpec.modParams,null);
		this.execute=function(layoutName){
			var oldQnStemDom=document.getElementById("qnStem");
			var oldQnOptsDom=document.getElementById("qnOpts");
			var oldQnRespDom=document.getElementById("qnResp");
			$("#lesson-main").load(baseProdUrl+"/"+layoutName+".html",function(){
				$("#qnStem").replaceWith(oldQnStemDom);
				$("#qnOpts").replaceWith(oldQnOptsDom);
				$("#qnResp").replaceWith(oldQnRespDom);
			})
		}
	})();

	runBtn.onclick=function(){
		layoutObj.execute(layoutMenu.value)
	}
})