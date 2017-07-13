define([],function(){
	return function(addBtn,delBtn,navDiv,iframesDiv){
		// this module uses lessonId from global namespace.
		// lessonId needs to be initialized to null for 
		// error checking mechanism to work correctly. 
		var currClient=null;
		var clientArr=[];
		function toggleFocus(newClient){
			currClient.unfocus()
			newClient.focus();
			currClient=newClient;
		}
		client=function(){
			var clientObj=this;
			var clientLi=document.createElement("li");
			var clientA=document.createElement("a");
			var clientIframe=document.createElement("iframe")
			$(clientA).html("<span class='glyphicon glyphicon-certificate'></span>");
			$(clientA).click(function(){
				toggleFocus(clientObj);
			})
			$(clientLi).html(clientA)
			$(navDiv).append(clientLi);
			$(iframesDiv).append(clientIframe);
			clientIframe.src="app.html?lessonid="+lessonId;
			clientIframe.className="clientframe";
			clientIframe.onload=function(){
				// code closes client window when socket disconnects to prevent 
				// errors with no feedback.  
				try {
					clientIframe.contentWindow.passClientObj(clientObj);
				} catch(e) {
					// to address DOMException:
					// "Blocked a frame with origin "null" from accessing a cross-origin frame. 
					// at HTMLIFrameElement.clientIframe.onload"
					// when accessing file through browser without being served in a domain.
				}
			}
			this.focus=function(){
				$(clientLi).addClass('active');
				clientIframe.style.display="block";				
			}
			this.unfocus=function(){
				$(clientLi).removeClass('active');
				clientIframe.style.display="none";
			}
			this.remove=function(){
				$(clientLi).remove();
				$(clientIframe).remove()
			}
		}

		addBtn.onclick=function(){
			if(lessonId!=null){
				if (currClient!=null){
					currClient.unfocus();
				}
				currClient=new client();
				currClient.focus();
				clientArr.push(currClient);
			}
		}
		delBtn.onclick=function(){
			if (currClient!=null){
				var idx=clientArr.indexOf(currClient);
				currClient.remove();
				clientArr.splice(idx,1);
				if(clientArr.length>0){
					if (clientArr.length==idx){
						currClient=clientArr[idx-1];
					}else{
						currClient=clientArr[idx]
					}
					currClient.focus();
				}
			}
		}
	}
})