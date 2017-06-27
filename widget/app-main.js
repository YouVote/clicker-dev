// further refinements to code possible. 
// to work on it when using this as starting point
// for authoring interface.

require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"appKernel","location":"../../yvAppKernel"}
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min",
		//used in playsoc
		"socketio-server":"https://avalon-gabrielwu84.rhcloud.com/socket.io/socket.io",
		//"socketio-server":"http://localhost:8080/socket.io/socket.io.js" //dev server
	}
});

require(['jquery'],function(){
	// $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css">');
	// $('head').append('<link rel="stylesheet" type="text/css" href="'+config.appCoreBaseAddr+'clicker.css">');
	$('head').append('<link rel="stylesheet" type="text/css" href="appview.css">');
});

require(["appKernel"],function(appKernel){
	var optDiv=document.getElementById('options');
	var submitBtn=document.getElementById("submitBtn");
	var lessonId=$_GET("lessonid");
	var studentName=localStorage.getItem("playerName");
	var deviceUuid=device.uuid;
	youVote=new appKernel(lessonId,studentName,deviceUuid);
	youVote.setKernelParam("optDiv",optDiv);
	youVote.setKernelParam("submitBtn",submitBtn);
	youVote.setKernelParam("onConnectFail",function(errmsg){
		console.log(errmsg);
	})
	youVote.connect();
})