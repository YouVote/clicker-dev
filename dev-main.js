require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"modindex","location":config.baseProdUrl+"mods/"},
		{"name":"ctype","location":config.baseProdUrl+"ctype/"},
		{"name":"webKernel","location":"../clicker-web/yvWebKernel"},
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min",
		"d3js":"https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.0/d3.min",
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		"studentview":"studentview",
		"sandboxhost":"sandbox-host",
		"sandboxclients":"sandbox-clients",
	}
});
require(["webKernel","studentview","sandboxhost","sandboxclients"],
function(webKernel,studentViewEngine,sandboxhost,sandboxclients){
	// still uses youVote from global namespace.
	// Todo: fix this. 
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
	youVote=new webKernel(
		document.createElement("div"),
		document.getElementById("qnOpts"),
		document.getElementById("qnResp")
	);
	youVote.setKernelParam(
		"connectPass",
		function(lessonId){
			lessonIdDom=document.getElementById("lessonIdDiv");
			lessonIdDom.innerHTML=lessonId;
		}
	);
	youVote.setKernelParam("yvWebKernelBaseAddr","../clicker-web/yvWebKernel/");
	youVote.setKernelParam("yvProdBaseAddr","../clicker-prod/");
	youVote.setKernelParam("viewAddStudent",studentViewObj.addStudent);
	youVote.setKernelParam("viewMarkReconnected",studentViewObj.markReconnected);
	youVote.setKernelParam("viewMarkDisconnected",studentViewObj.markDisconnected);
	youVote.setKernelParam("viewMarkAnswered",studentViewObj.markAnswered);
	youVote.setKernelParam("viewRestorePrevAnswered",studentViewObj.resetAnswered);
	youVote.execQn("","null",null,{});
});