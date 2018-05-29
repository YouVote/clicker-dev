require.config({ urlArgs: "v=" +  (new Date()).getTime() });

require.config({
	packages:[
		{"name":"appKernel","location":"../../yvAppKernel"},
		{"name":"ctype","location":"https://youvote.github.io/clicker-prod/ctype/"},
	],
	paths:{
		"jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min",
		"d3js":"https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.0/d3.min",
		"vue":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue",
		"socket-router":"https://youvote.github.io/socket-router/main",
	},
});

require(["appKernel"],function(appKernel){
	var lessonId=$_GET("lessonid");
	var studentName=$_GET("studentname");
	var deviceUuid=device.uuid;
	if(studentName==undefined){studentName=deviceUuid;}
	var widFrame=document.getElementById("widFrame")
	var submitBtn=document.getElementById("submitBtn")
	var youVote=new appKernel(lessonId,studentName,deviceUuid);
	youVote.setKernelParam("widFrame",widFrame);
	youVote.setKernelParam("submitBtn",submitBtn);
	youVote.setKernelParam("onConnectFail",function(errmsg){
		console.log(errmsg)
	})
	youVote.connect();
})
