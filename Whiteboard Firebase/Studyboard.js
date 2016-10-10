     //==================================================
	 //Java Script for the Whiteboad
	 //==================================================
	 //Varibles
	  var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 70;
	  var mousedown = false;
	  var mouseX = 0;
	  var mouseY = 0;
	  var linesize = 5;
	  var rect = canvas.getBoundingClientRect();
	  
	 //==================================================
	 //Draw and Clear Commands
	 //==================================================
	function clearAll()
	{
		if (connected){
		context.clearRect(-300,-300,2000,6000);
		}	
	}

	function drawNoConnection(){
		context.fillStyle = "#696969";
		context.fillRect(0, 0, 1000, 1000);
		context.fillStyle = "white";
		context.font="40px Georgia";
		context.fillText("You are not connected",180,230);
		
	}
	
	function draw(x1, y1, x2, y2, color, ls){ //Draws users and Clients marks
		
		if (!connected){
			//No connection
		}
		
		else {
		
		//Drawing a path. This alrgorithim draws a line between the distance from the previous mouse
		//position x,y and the newst mouse position. 
		dist = distance(x1,y1,x2,y2);
		
		if ((dist > 5) || ls < 11){
		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.strokeStyle = color;
		lw = ls / (dist * .999/(ls*.02))
		if (lw < ls/2){lw = ls/2;}
		if (ls < 9){lw = ls;}
		context.lineWidth=lw;
		context.stroke();}

		//Draw solid dots when dististance is smaller to hide janky path edges
		if (dist < (ls * 2)){
		context.beginPath();
		context.arc(x2, y2, Math.abs((ls - dist)/3), 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();}
	
		}
	}
	 //==================================================
	 //Key,Mouse, Button Input
	 //==================================================
	canvas.onmousedown = function(mouse){	//Funtion is called every time the mouse clicks
		mousedown=true;	
		
		linesize = parseInt(document.getElementById('selectThick').value);
		linecolor = document.getElementById('selectColor').value;
		rect = canvas.getBoundingClientRect();
		draw(mouseX, mouseY, mouse.clientX - rect.left, mouse.clientY - rect.top, linecolor, linesize);	
		sendDrawPath(mouseX, mouseY, mouse.clientX - rect.left, mouse.clientY - rect.top, linecolor, linesize);
		
		mouseX = mouse.clientX - rect.left; //Update mouse position
		mouseY = mouse.clientY - rect.top;
	}
	
	//Funtion is called every time the mouse unclicks
	document.onmouseup = function(mouse){	
		mousedown=false;
	}
	
	//When the Mouse Moves Update Coordinates
	canvas.onmousemove = function(mouse){	
		if (mousedown)
		{
		linesize = parseInt(document.getElementById('selectThick').value);
		linecolor = document.getElementById('selectColor').value;
		rect = canvas.getBoundingClientRect();
		draw(mouseX, mouseY, mouse.clientX - rect.left, mouse.clientY - rect.top, linecolor, linesize);	
		sendDrawPath(mouseX, mouseY, mouse.clientX - rect.left, mouse.clientY - rect.top, linecolor, linesize);
		}		
		
		mouseX = mouse.clientX - rect.left; //Update mouse position
		mouseY = mouse.clientY - rect.top;
	}
	
	//Clicking Send
	document.getElementById("chatSend").onclick = function () {
		var outgoing = document.getElementById("chatOut");
		if (outgoing.value.length > 0) {
		sendMessage(outgoing.value); //Send chat to clients
		outgoing.value = "";
		}
	}
	
	//Clicking Clear
	document.getElementById("clear").onclick = function () {
		clearAll();
		sendClear("clear"); //Send clear function to clients
	
	}
	
	//Clicking Disconnect
	document.getElementById("disconnectbutton").onclick = function () {
		clearAll();
		drawNoConnection();
		sendDisconnect("disconnect"); //Send clear function to clients
		displayChatMessage("You have Disconnected");
	
	}
	
	//==================================================
	//Math Functions
	//==================================================
	//Distance formula Square root of (x2 - x1) + (y2 - y1)
	function distance(x1, y1, x2, y2){ 
		return Math.abs(Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ));
	}
	
	drawNoConnection();