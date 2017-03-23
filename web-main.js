require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"webcore","location":config.webCoreBaseAddr},
		{"name":"modindex","location":config.baseProdUrl+"mods/"},
		{"name":"ctype","location":config.baseProdUrl+"ctype/"},
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min",
		"d3js":"https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.0/d3.min",
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		"interface":"web-interface",
		"sandboxhost":"sandbox-host",
		"sandboxclients":"sandbox-clients",
	}
});
require(["webcore","interface","sandboxhost","sandboxclients"],
function(webCore,interface,sandboxhost,sandboxclients){
	var interfaceObj=new interface(
		document.getElementById("lessonIdDiv")
		);	
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

	var webCoreObj=new webCore();
	studentViewObj=new webCoreObj.studentViewEngine(
		document.getElementById("studentView")
		);
	studentModelObj=new webCoreObj.studentModelEngine(
		studentViewObj.addStudent,
		studentViewObj.markConnected,
		studentViewObj.markDisconnected
		);
	socket=new webCoreObj.socketHostEngine(
		config.socketURL,
		interfaceObj.onSocketError,
		interfaceObj.updateLessonId,
		interfaceObj.studentJoin,
		interfaceObj.studentLost,
		interfaceObj.studentResp
		);
	qnHandler=new webCoreObj.questionHandler(
		studentViewObj.resetAnswered,
		studentViewObj.markAnswered,
		studentModelObj.getStudents
		);
	qnHandler.passDivs(
		document.getElementById("qnOpts"),
		document.getElementById("qnResp")
		);
	qnHandler.execQn("null",null,{});
});