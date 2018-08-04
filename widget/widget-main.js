require.config({ urlArgs: "v=" +  (new Date()).getTime() });

var config={};
config.baseProdUrl="../../clicker-prod/";

require.config({
	packages:[
		{"name":"webKernel","location":"../../yvWebKernel"},
		{"name":"authKernel","location":"../../yvAuthKernel"},
		{"name":"ctype","location":config.baseProdUrl+"ctype/"},
		{"name":"async","location":config.baseProdUrl+"async/"},
		{"name":"modindex","location":config.baseProdUrl+"mods/"} // needed by authKernel
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min",
		"socket-router":"https://youvote.github.io/socket-router/main",
		// "socket-router":"http://localhost/socket-router/main",
		"d3js":"https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.0/d3.min",
		"vue":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.3/vue",
		"studentview":"studentview",
		"sandboxhost":"sandbox-host",
		"sandboxclients":"sandbox-clients",
		"qneditor":"qneditor", // Todo: move modEditor into yvAuthKernel 
	}
});
require(["webKernel","studentview","sandboxhost","sandboxclients"],
function(webKernel,studentViewEngine,sandboxhost,sandboxclients){
	// still uses youVote and lessonId from global namespace.
	// Todo: fix this by passing youVote into sandboxHostObj/ sandboxClientObj
	var sandboxHostObj=new sandboxhost(
		document.getElementById("modSelected"),
		document.getElementById("modMenu"),
		document.getElementById("modParams"),
		document.getElementById("modRun")
	)
	var sandboxClientObj=new sandboxclients(
		document.getElementById("clientAddBtn"),
		document.getElementById("clientDelBtn"),
		document.getElementById("clientNavBar"),
		document.getElementById("clientIframes")
	)

	studentViewObj=new studentViewEngine(
		document.getElementById("studentView")
	);

	youVote=new webKernel(document.createElement("div"),"#qnOpts","#respDiv","#respGhost","head");
	youVote.setKernelParam(
		"onConnectPass",
		function(newlessonId){
			lessonIdDom=document.getElementById("lessonIdDiv");
			lessonIdDom.innerHTML=newlessonId;
			// sandbox-client requires global lessonId variable
			// to be defined. iron this out on next refactor.
			lessonId=newlessonId;
			youVote.execQn("","null",{},{});
		}
	);
	youVote.setKernelParam("yvWebKernelBaseAddr","../../clicker-web/yvWebKernel/");
	youVote.setKernelParam("yvProdBaseAddr","../../clicker-prod/");
	youVote.setKernelParam("viewAddStudent",studentViewObj.addStudent);
	youVote.setKernelParam("viewMarkReconnected",studentViewObj.markReconnected);
	youVote.setKernelParam("viewMarkDisconnected",studentViewObj.markDisconnected);
	youVote.setKernelParam("viewMarkAnswered",studentViewObj.markAnswered);
	youVote.setKernelParam("viewRestorePrevAnswered",studentViewObj.resetAnswered);
	youVote.connect();
});