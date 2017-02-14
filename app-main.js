// further refinements to code possible. 
// to work on it when using this as starting point
// for authoring interface.

require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"appcore","location":"../clicker-app/core"},
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min",
		"jquery-mobile":"https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min",
		//used in playsoc
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		//"socketio-server":"http://localhost:8080/socket.io/socket.io.js" //dev server
		"interface":"app-interface",
		// other external frameworks:
		// mathjax
		"config":"config"
	}
});

require(['jquery','jquery-mobile'],function(){
	var appBase = "../clicker-app/";
	$('head').append('<link rel="stylesheet" type="text/css" href="'+appBase+'jquery/jquery.mobile-1.4.5.min.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="'+appBase+'clicker.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="appview.css">');
});
var titleDiv=document.createElement("div");
require(["appcore","interface","config"],
function(appCore,interfaceHandler,config){
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