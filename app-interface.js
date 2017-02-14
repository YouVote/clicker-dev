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
					socket.relay({'title':'studentParams=','studentName':playerName,'uuid':device.uuid}); 
					break;
				case 'execModule':
					question.execute(packet.modPath,packet.modParams,packet.currAns);
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