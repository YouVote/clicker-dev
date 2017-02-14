// further refinements to code possible. 
// to work on it when using this as starting point
// for authoring interface.

require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"webcore","location":"../clicker-web/core"},
		{"name":"modindex","location":"../clicker-prod/mods"}
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min",
		"jquery-mobile":"https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min",
		"d3js":"https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.0/d3.min",
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		"interface":"web-interface",
		"sandboxweb":"sandbox-host",
		"sandboxapp":"sandbox-clients",
		"config":"config"
	}
});

require(["webcore","interface","sandboxweb","sandboxapp","config"],
function(webCore,interface,sandboxweb,sandboxapp,config){
	var socketURL=config.socketURL;
	var interfaceObj=new interface(
		document.getElementById("lessonIdDiv")
		);	
	var sandboxWebObj=new sandboxweb(
		document.getElementById("mods"),
		document.getElementById("run"),
		document.getElementById("params"),
		document.getElementById("host")
		);	
	var sandboxAppObj=new sandboxapp(
		addBtn=document.getElementById("addclient"),
		delBtn=document.getElementById("delclient"),
		clientNav=document.getElementById("clientNav"),
		clientDiv=document.getElementById("clientIframes")
		);
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
		socketURL,
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
		document.getElementById("qnStem"),
		document.getElementById("studAns")
		);
})