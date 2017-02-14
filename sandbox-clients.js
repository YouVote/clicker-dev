define([],function(){
	return function(addBtn,delBtn,navDiv,iframesDiv){
		// this module also uses lessonId which is not passed explicitly.
		var currClient=null;
		var clientArr=[];

		var clientUlTag=document.createElement("ul");
		clientUlTag.className="ui-grid-d";
		$(navDiv).html(clientUlTag);

		function numToAlpha(n){
			return String.fromCharCode(97+n);
		}		
		function toggleFocus(newClient){
			currClient.unfocus()
			newClient.focus();
			currClient=newClient;
		}
		function reTabClients(startIdx){
			for(var i=startIdx;i<clientArr.length;i++){
				clientArr[i].relabelTab(i);
			}
		}
		client=function(){
			var clientObj=this;
			var clientLi=document.createElement("li");
			var clientA=document.createElement("a");
			var clientIframe=document.createElement("iframe")
			$(clientA).html("+");
			$(clientA).click(function(){
				toggleFocus(clientObj);
			})
			$(clientLi).html(clientA)
			$(clientUlTag).append(clientLi);
			$(iframesDiv).append(clientIframe);

			clientLi.className="ui-block-"+numToAlpha(clientArr.length%5);
			clientA.className="ui-btn"
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
				$(clientA).addClass('ui-btn-active');
				clientIframe.style.display="block";				
			}
			this.unfocus=function(){
				$(clientA).removeClass('ui-btn-active');
				clientIframe.style.display="none";
			}
			this.remove=function(){
				$(clientLi).remove();
				$(clientIframe).remove()
			}
			this.relabelTab=function(newIdx){
				clientLi.className="ui-block-"+numToAlpha(newIdx%5);
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
					reTabClients(idx);
				}
			}
		}
	}
})