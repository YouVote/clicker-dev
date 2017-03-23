// further refinements to code possible. 
// to work on it when using this as starting point
// for authoring interface.

require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"appcore","location":config.appCoreBaseAddr}
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min",
		"jquery-mobile":"https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min",
		//used in playsoc
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		//"socketio-server":"http://localhost:8080/socket.io/socket.io.js" //dev server
		"interface":"app-interface",
	}
});

require(['jquery','jquery-mobile'],function(){
	$('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="'+config.appCoreBaseAddr+'clicker.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="appview.css">');
});
var titleDiv=document.createElement("div");
require(["appcore","interface"],
function(appCore,interfaceHandler){
	var socketURL=config.socketURL;
	var lessonId=$_GET("lessonid");
	var playerName=localStorage.getItem("playerName");
	interface=new interfaceHandler(
		playerName,
		titleDiv
		);
	var appCoreObj=new appCore();
	question=new appCoreObj.questionHandler(
		document.getElementById('options'),
		document.getElementById("submitBtn")
		);
	function socketDisconnect(){

	}
	socket=new appCoreObj.socketPlayEngine(socketURL,lessonId);
})