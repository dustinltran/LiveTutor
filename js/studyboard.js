     //==================================================
	 //Java Script for the Whiteboad
	 //==================================================
	 //Varibles
	  var canvas = document.getElementById('myCanvas');
	  var canvasdiv = document.getElementById('canvasDiv');
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 70;
	  var mousedown = false;
	  var mouseX = 0;
	  var mouseY = 0;
	  var linesize = 5;
	  var rect = canvas.getBoundingClientRect();
	  var scale = 1;
	  var connected;

	  
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
		context.fillStyle = "#222222";
		context.fillRect(0, 0, 1000 * scale, 1000 * scale);
		context.fillStyle = "white";
		if (scale < .4){context.font="20px Georgia";}
		else if (scale < 1){context.font="40px Georgia";}
		else{context.font="80px Georgia";}
		context.fillText(":( OFFLINE",canvas.width / 4,canvas.height / 2);
		
	}
	
	function draw(x1, y1, x2, y2, color, ls){ //Draws users and Clients marks
		
		if (!connected){
			//No connection
		}
		
		else {
		
		//Drawing a path. This alrgorithim draws a line between the distance from the previous mouse
		//position x,y and the newst mouse position. 
		dist = distance(x1,y1,x2,y2);
		
		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.strokeStyle = color;
		lw = ls * scale;
		context.lineWidth=lw;
		context.lineCap = 'round';
		context.stroke();}

		
	}
	 //==================================================
	 //Key,Mouse, Button Input
	 //==================================================
	canvas.onmousedown = function(mouse){	//Funtion is called every time the mouse clicks
		mousedown=true;	
		
		linesize = parseInt(document.getElementById('selectThick').value);
		linecolor = document.getElementById('selectColor').value;
		rect = canvas.getBoundingClientRect();
		
		if (permission === "1")
			{
				draw(mouseX + 1, mouseY, mouse.clientX - rect.left, mouse.clientY - rect.top, linecolor, linesize);	
				sendDrawPath(mouseX/scale + 1, mouseY/scale, (mouse.clientX - rect.left)/scale,(mouse.clientY - rect.top)/scale, linecolor, linesize);
			}
		mouseX = mouse.clientX - rect.left; //Update mouse position
		mouseY = mouse.clientY - rect.top;
	}
	
	//Funtion is called every time the mouse unclicks
	document.onmouseup = function(mouse){	
		mousedown=false;
		//save();
	}
	
	//When the Mouse Moves Update Coordinates
	canvas.onmousemove = function(mouse){	
		if (mousedown)
		{
		linesize = parseInt(document.getElementById('selectThick').value);
		linecolor = document.getElementById('selectColor').value;
		rect = canvas.getBoundingClientRect();
		if (permission === "1")
			{
				sendDrawPath(mouseX/scale, mouseY/scale, (mouse.clientX - rect.left)/scale,(mouse.clientY - rect.top)/scale, linecolor, linesize);
			}
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
	
	//Clicking Send
	document.getElementById("thumb-glyphicon").onclick = function () {
		sendMessage('@#thumbsup#@'); //Send thumbsup to clients
		}
	
	//Clicking Clear
	document.getElementById("clear").onclick = function () {
		if (permission === "1")
			{
				clearAll();
				sendClear("clear"); //Send clear function to clients
			}
	
	}
	
	//==================================================
	//Math Functions
	//==================================================
	//Distance formula Square root of (x2 - x1) + (y2 - y1)
	function distance(x1, y1, x2, y2){ 
		return Math.abs(Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ));
	}

