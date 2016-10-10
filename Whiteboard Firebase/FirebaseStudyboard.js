//Varibles
var roomid = "room_1"
var username = "user"
var connected = false
var messagenumber = "0";
var userarray = ["User List:"];

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA73g2_ftrqz5zddX8AatrGTT7ByLGqF44",
    authDomain: "shanetestdatabase.firebaseapp.com",
    databaseURL: "https://shanetestdatabase.firebaseio.com",
    storageBucket: "shanetestdatabase.appspot.com",
    messagingSenderId: "408165980052"
  };
  firebase.initializeApp(config);

//Firebase Reference Varibles
var mRefRoom = firebase.database().ref('StudyRooms/' + roomid);
var mRefChat = firebase.database().ref('StudyRooms/' + roomid + '/Chat');
var mRefDraw = firebase.database().ref('StudyRooms/' + roomid + '/Draw');
	
//
//=======================================================
//This Code Creates/Joins a Studyroom
//=======================================================
//
function init(){
	
	
	firebase.database().ref('/StudyRooms/').once('value', function(snapshot) {
	
	if (snapshot.hasChild(roomid)) {
		//If studyroom already exsists.
		firebase.database().ref('/StudyRooms/' + roomid + '/numberOfUsers').once('value', function(snapshot) {
			numberofusers = parseInt(snapshot.val()) + 1;
			username = 'User' + numberofusers;
			mRefRoom.child('numberOfUsers').set(numberofusers);
			
			mRefRoom.child('/UserList/' + username + '/username').set(username);
			mRefRoom.child('/UserList/' + username + '/permission').set("0");
			
			//Set on disconnect Function
			firebase.database().ref('/StudyRooms/' + roomid + '/UserList/' + username).onDisconnect().remove();
			//Send Joined Chat Message
			sendNoTagMessage(username + " has joind the Chat");
		});
		
		firebase.database().ref('/StudyRooms/' + roomid + '/Chat/messagenumber').once('value', function(snapshot) {
			messagenumber = parseInt(snapshot.val());
		});
		
		
		displayChatMessage("Connected to Chat");
		connected = true;
		clearAll();
		//alert("CONNECTED!");
		
		
	}
	
	else {
		//If studyroom doesnt exsist Create one.
		mRefRoom.child('numberOfUsers').set("1");
		mRefRoom.child('/UserList/Host0/username').set("Host0");
		mRefRoom.child('/UserList/Host0/permission').set("1");
		
		username = 'Host0';
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

//Checks database for changes (new chat entries) to the Chat field.	
mRefChat.on('child_added', function (snapshot1){
			if (connected){displayChatMessage(snapshot1.val());}
	});

//Sends Draw Paths to the Database.
function sendDrawPath (x1, y1, x2, y2, color, thickness) {
	if (connected){

		var drawpath = x1 + " " + y1 + " " + x2 + " " + y2 + " " + color + " " + thickness;
	
		mRefDraw.child('draw').remove();
		mRefDraw.child('username').set(username);
		mRefDraw.child('draw').set(drawpath);
		}
	}
	
//Sends Clear canvas comand.
function sendClear(clear) {
	if (connected){
		mRefDraw.child('draw').remove();
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
			
			var res = snapshot1.val().split(" ");
			//Draw on client side
			draw(parseInt(res[0]),parseInt(res[1]),parseInt(res[2]),parseInt(res[3]),res[4],parseInt(res[5]));
	}});
	
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
    chatPane.appendChild(msg);
    
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

	//Checks database for changes (new chat entries) to the Chat field.	
	mRefRoom.child('/UserList/').on('child_added', function (snapshot){
			data = snapshot.val();
			userarray.push(data.username);
			populateList();
			});
	//Checks database for changes (new chat entries) to the Chat field.	
	mRefRoom.child('/UserList/').on('child_removed', function (snapshot){
			data = snapshot.val();
			removeListOption(data.username);
			displayChatMessage(data.username + " has left the Chat");
			});

			//
//=======================================================
//This Code Handles Current Users in Chat
//=======================================================

  function addListOption (name, value) {
    var li = document.createElement("li");
    li.className = "userlistItem";
    li.id = value;
    li.appendChild(document.createTextNode(name));
  
    // Append the new message to the chat
    var userlist = document.getElementById("userList");
    userlist.appendChild(li);
  }
  
  function removeListOption (value) {
    var list = document.getElementById("userList");
    var listItems = list.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      if (listItems[i].id == value) {
        list.removeChild(listItems[i]);
        
      }
    }

	for (var i = 0; i < userarray.length; i++) {
      str = "" + userarray[i];
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
  
//This initializes a Connection with Studyroom

init();