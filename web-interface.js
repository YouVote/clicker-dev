define([],function(){
	return function(lessonIdDiv){
		this.updateLessonId=function(lId){
			lessonId=lId;
			lessonIdDiv.innerHTML=lessonId;
			// enable add student button
		}
		this.onSocketError=function(errMsg){
			console.log(errMsg)
		}
		this.studentJoin=function(socketId, data){
			var student=studentModelObj.studentEnter(socketId,data.studentName,data.uuid);
			qnHandler.initConnectedStudent(data.uuid)
		}
		this.studentLost=function(socketId){
			var studentUuid=studentModelObj.socIdToUuid(socketId);
			studentModelObj.studentLeave(studentUuid);
		}
		this.studentResp=function(socketId,data){
			var studentUuid=studentModelObj.socIdToUuid(socketId);
			qnHandler.procAns(studentUuid,data.data);
		}
	}
})