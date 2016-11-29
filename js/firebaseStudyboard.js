//Varibles
var roomid = "roomid"
var messagenumber = "0";
var userarray = [];
var permission = "0";
var host = "";

//Firebase Reference Varibles
var mRefRoom = "";
var mRefChat = "";
var mRefDraw = "";

// Create a root reference for Storage
var storageRef = "";
var roomimage = "";
		
//
//=======================================================
//This Code Creates/Joins a Studyroom
//=======================================================
//
function init(){
	
	var user = firebase.auth().currentUser;
	
	firebase.database().ref('/StudyRooms/').once('value', function(snapshot) {
	
	if (snapshot.hasChild(roomid)) {
		//If studyroom already exsists.
		firebase.database().ref('/StudyRooms/' + roomid + '/numberOfUsers').once('value', function(snapshot) {
			numberofusers = parseInt(snapshot.val()) + 1;
			
			firebase.database().ref('StudyRooms/' + roomid + "/HostID").once("value", function(response) {
					host = response.val();
					populateList();
				});
			
			if (username == "")
				{
					
					
					username = "Guest" + numberofusers;
					mRefRoom.child('/UserList/' + username).set({
							username:username,
							permission: "0",
							userID:username
					});
					permission = "0";
					mRefRoom.child('numberOfUsers').set(numberofusers);
					
					//Set on disconnect Function for guest
					firebase.database().ref('/StudyRooms/' + roomid + '/UserList/' + username).onDisconnect().remove();
				}
				
			else 
				{
					username = toTitleCase(username);
					mRefRoom.child('/UserList/' + user.uid).set({
							username:username,
							userID:user.uid
					});

				mRefRoom.child('numberOfUsers').set(numberofusers);
			
			
			
			
			
			if (firebase.auth().currentUser)
			{
				var userId = firebase.auth().currentUser.uid;
			}
			
			var findHost = firebase.database().ref('StudyRooms/' + roomid + "/HostID");
			
			findHost.once("value", function(response) {
				
				if (response.val() === userId)
					{
						mRefRoom.child('/UserList/' + user.uid + '/permission').set("1");
						permission = "1";
					}
					
				else {
					mRefRoom.child('/UserList/' + user.uid + '/permission').set("0");
					permission = "0";
				}
				
				});
			
			//Set on disconnect Function
			firebase.database().ref('/StudyRooms/' + roomid + '/UserList/' + user.uid).onDisconnect().remove();
			
			
			}});
	
		
		
		
		connected = true;
		if (username === ""){sendNoTagMessage("Guest has joind the Chat");}
		else {sendNoTagMessage(username + " has joind the Chat");}
		
		clearAll();
		loadDraws();
		//Send Joined Chat Message
		displayChatMessage("Connected to Chat");
		createDrawEventListeners();
		createEventListeners();
		//alert("CONNECTED!");
		
		
	}
	
	else {
		//If studyroom doesnt exsist Create one.
		//save();
		
		mRefRoom.child('numberOfUsers').set("1");
		mRefRoom.child('/UserList/Host0/username').set("Host: " + toTitleCase(username));
		mRefRoom.child('/UserList/Host0/permission').set("1");
		
		
		//Set on disconnect Function
		firebase.database().ref('/StudyRooms/' + roomid + '/UserList/' + username).onDisconnect().remove();
		
		displayChatMessage("Connected to Chat");
		connected = true;
		clearAll();
		//alert("CONNECTED!");
	}});
}

//
//=======================================================
//This Code Handles Sending/Recieving Chat Messages, Draw Paths, and Other Instructions
//=======================================================
//
//Send message without user tag to the Database.
function sendNoTagMessage (message) {
	if (connected){
		mRefChat.child('message').remove();
		mRefChat.child('username').set(username);
		mRefChat.child('message').set(message);
		}
	}


//Sends Message to the Database.
function sendMessage (message) {
	if (connected){
		mRefChat.child('message').remove();
		mRefChat.child('username').set(username);
		mRefChat.child('message').set(username + ": " + message);
		}
	}

//Sends Draw Paths to the Database.
function sendDrawPath (x1, y1, x2, y2, color, thickness) {
	if (connected){

		var drawpath = x1 + " " + y1 + " " + x2 + " " + y2 + " " + color + " " + thickness;
	
		var newPostRef = mRefDraw.push({
			draw: drawpath
			});
		}
	}
	
//Sends Clear canvas comand.
function sendClear(clear) {
	if (connected){
		mRefDraw.remove();
		mRefDraw.child('username').set(username);
		mRefDraw.child('draw').set(clear);
		}
	}
	
//Sends Disconnect Signal
function sendDisconnect(disconn) {
	if (connected){
		sendNoTagMessage(username + " ended the connection")
		mRefDraw.child('draw').remove();
		mRefDraw.child('username').set(username);
		mRefDraw.child('draw').set(disconn);
		firebase.database().ref('/StudyRooms').remove();
		}
	}

function createDrawEventListeners(){
	//Checks database for changes (new chat entries) to the Chat field.	
	mRefChat.on('child_added', function (snapshot1){
			if (connected){displayChatMessage(snapshot1.val());}
		});
	
	//Checks database for changes (new draw path entries) to the Draw Path field.		
	mRefDraw.on('child_added', function (snapshot1){
	
			if (connected){
			//if clear canvas
			if (snapshot1.val() === "clear"){
				clearAll();
			}
			//if disconnect
			if (snapshot1.val() === "disconnect"){
				disconnection();
			}
			
			if (snapshot1.child("draw").val() != null){
			var res = snapshot1.child("draw").val().split(" ");
			
			//Draw on client side
			draw(parseInt(res[0]) * scale,parseInt(res[1]) * scale,parseInt(res[2]) * scale,parseInt(res[3]) * scale, res[4], parseInt(res[5]));
			draw(parseInt(res[0]) * scale,parseInt(res[1]) * scale,parseInt(res[2]) * scale,parseInt(res[3]) * scale, res[4], parseInt(res[5]));
			}
				
	}})}
	
function disconnection(){
		clearAll();
		drawNoConnection();
		connected=false;
}
	
//
//=======================================================
//This Code Handles Chat Box Display
//=======================================================
//
 function displayChatMessage (message) {
    // Make the new chat message element
    var msg = document.createElement("div");
    msg.className = "chatMessage diagonalGradient";
    msg.appendChild(document.createTextNode(message));
  
    // Append the new message to the chat
    var chatPane = document.getElementById("chat");
	if (message === toTitleCase(username)){}
	else {
		chatPane.appendChild(msg);
	}
    
    // Trim the chat to 500 messages
    if (chatPane.childNodes.length > 500) {
      chatPane.removeChild(chatPane.firstChild);
    }
    chatPane.scrollTop = chatPane.scrollHeight;
  }
  
//
//=======================================================
//This Code Handles Current User in Chat Display
//=======================================================

function createEventListeners(){

	//Checks database for added users to userlist	
	mRefRoom.child('/UserList/').on('child_added', function (snapshot){
			data = snapshot.val();
			userarray.push(data);
			populateList();
			});
	//Checks database for removed users from userlist
	mRefRoom.child('/UserList/').on('child_removed', function (snapshot){
			data = snapshot.val();
			removeListOption(data.userID);
			displayChatMessage(data.username + " has left the Chat");
			});
	}
			//
//=======================================================
//This Code Handles Current Users in Chat
//=======================================================

  function addListOption (obj) {
    var li = document.createElement("li");
    li.className = "userlistItem";
    li.id = obj.userID;
	li.addEventListener("dblclick", function (){window.location.href = "profile.html?id=" + obj.userID});
	if (host === obj.userID)
	{
		li.style.fontWeight = 'bold';
		li.style.color = "#8b0000";
		li.appendChild(document.createTextNode("Host: " + obj.username));
	}
	else 
	{	
		li.appendChild(document.createTextNode(obj.username));
	}
  
    // Append the new message to the chat
    var userlist = document.getElementById("userList");
    userlist.appendChild(li);
  }
  
  function removeListOption (value) {
    var list = document.getElementById("userList");
    var listItems = list.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      if (listItems[i].id === value) {
        list.removeChild(listItems[i]);
        
      }
    }

	for (var i = 0; i < userarray.length; i++) {
      str = "" + userarray[i].userID;
	  if (str === value) {
	  userarray.splice(i,1);
	  }
	}
	
	populateList();

	return;
	
  }
  
  function populateList () {
    clearList();
    for (var i = 0; i < userarray.length; i++) {
      addListOption (userarray[i]);
    }
  }
  
  function clearList () {
    var node = document.getElementById("userList");
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }
  
  //Save image
  function save() {

    canvas.toBlob(blob => {

      var task = roomimage.put(blob);
      task.on('state_changed', function(snapshot) {
      }, function(error) {
        console.error("Unable to save image.");
        console.error(error);
      }, function() {
        var url = task.snapshot.downloadURL;
        console.log("Saved to " + url);
		
      });
    });
  };
  
  //load Image
  function load(){
	  
	roomimage.getDownloadURL().then(function(url) {
		// Get the download URL for 'images/stars.jpg'
		
		var img = new Image;
		img.onload = function(){
		context.drawImage(img,0,0); // Or at whatever offset you like
			};
		img.src = url;
		
		});
	}
	
	function loadDraws()
	{
	mRefDraw.once('value').then(function(snapshot) {
		
			snapshot.forEach(function(snap) {
				if (snap.child("draw").val() != null){
				var res = snap.child("draw").val().split(" ");
				//Draw on client side
				draw(parseInt(res[0]) * scale,parseInt(res[1]) * scale,parseInt(res[2]) * scale,parseInt(res[3]) * scale, res[4], parseInt(res[5]));
				}
			});
		});
	}
	
	function resizeCanvas() {
	
				if (window.innerWidth > 1400){
					canvas.width = 900;
					canvas.height = 600;
					scale = 1;
				}
				
				else if (window.innerWidth > 1100){
					canvas.width = 540;
					canvas.height = 390;
					scale = .75;
				}
				
				else if (window.innerWidth > 600){ //scaled / 2
					canvas.width = 360;
					canvas.height = 260;
					scale = .5;
				}
				
				if (!connected){drawNoConnection();}
				else {loadDraws();}
	}
		
	var qsParm = new Array();

	function qs() {
		var query = window.location.search.substring(1);
		var parms = query.split('&');

		for (var i=0; i<parms.length; i++) {
			var pos = parms[i].indexOf('=');
			if (pos > 0) {
				var key = parms[i].substring(0,pos);
				var val = parms[i].substring(pos+1);
				qsParm[key] = val;
				}
			}
		console.log(parms);
		roomid = qsParm.roomid;
		
		//Firebase Reference Varibles
		mRefRoom = firebase.database().ref('StudyRooms/' + roomid);
		mRefChat = firebase.database().ref('StudyRooms/' + roomid + '/Chat');
		mRefDraw = firebase.database().ref('StudyRooms/' + roomid + '/Draw');

		// Create a root reference for Storage
		storageRef = firebase.storage().ref()
		roomimage = storageRef.child(roomid).child('roomid.png');
		
		//This initializes a Connection with Studyroom
		init();
		}