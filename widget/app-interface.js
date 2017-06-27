define([],function(){
	return function interfaceHandler(playerName,titleDiv){
		var currPage="#play";
		this.windowLocation=function(href){
			currPage=href;
			window.location=href;
		}
		this.updateGameId=function(gameId){
			titleDiv.innerHTML=playerName+"|<font class='gameId'>"+gameId+"</font>";
		}

		this.relayHandler=function(packet){
			switch(packet.title){
				case 'studentParams?':
				console.log(device.uuid)
					socket.relay({'title':'studentParams=','studentName':playerName,'uuid':device.uuid}); 
					question.initBaseProdUrl(packet.baseUrl);
					break;
				case 'execModule':
					question.execute(packet.modName,packet.modParams,packet.currAns);
					break;
				case 'qnStatus':
					break;
			};
		}
		this.disconnectHandler=function(msg){
			clientObj.remove();
		}
	}
})