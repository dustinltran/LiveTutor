	
	var qsParm = new Array();
	var profile_user;

	function sendMessage(){
		var outgoing = document.getElementById("messageinput");
		if (outgoing.value.length > 0) {
		
		var newmessageref = firebase.database().ref('users/' + qsParm.id + '/Messages').push({
			user: username,
			message: outgoing.value,
			timestamp: getDate()
			});
			
		outgoing.value = "";
		}
		
	}

	function loadprofile(str){
		console.log("Loading profile...");
		firebase.database().ref('/users/' + str).once('value', function(snapshot) {
			profile_user = snapshot.val();
			//Look at the console log to see what this object contains
			console.log(profile_user);
			console.log("... Loading profile complete.");
			
			//Example of using profile_user:
			document.getElementById('contacttag').innerHTML = firebase.auth().currentUser.email;
			
			document.getElementById('nametag2').innerHTML = toTitleCase(profile_user.firstname) + " " + toTitleCase(profile_user.lastname);
			if (profile_user.AboutMe != ""){document.getElementById('aboutme').innerHTML = profile_user.AboutMe;}
			
		});
	}
	
	//SEARCHING DATABASE -- This function search the database for matches to the profile_users id and creates listitems to display the results/////////
	function searchdatabase(str){
		
		console.log("Attempting to search Database...");
		
		var searchroomref = firebase.database().ref('StudyRooms');
		var searchusersroomref = searchroomref.orderByChild("HostID").equalTo(str);	
		var rooms;
		
		searchusersroomref.once("value", function(response) {
			rooms = response.val();
			
			console.log("Search complete.");
			
			searchroomidlist = [];
			
			for (var key in rooms) {
					console.log(key);
					searchroomidlist.push(rooms[key].RoomId);

					
					
					var searchlist = document.getElementById('profile-searchlist');
					var newitem = document.createElement('li');
					
					var div = document.createElement('div');
					div.setAttribute("class","col-sm-12 col-md-12 col-lg-12");
					div.setAttribute("id","testid");
					
					var img = document.createElement('img');
					img.setAttribute("src","img/board.png");
					img.setAttribute("alt","board");
					img.setAttribute("style","width:100px;height:70px; float:left; margin-right:10px");
					
					var joinbutton = document.createElement('div');
					joinbutton.setAttribute("type","button");
					joinbutton.setAttribute("class","btn btn-info");
					joinbutton.setAttribute("style","float:right; padding:10px");
					roomlink = "studyboard.html?roomid=" + rooms[key].RoomId;
					joinbutton.addEventListener("click", function(){window.location.href = roomlink;});
					joinbutton.innerHTML = 'JOIN'
					
					var h1 = document.createElement('p');
					h1.innerHTML = "Subject: " + rooms[key].Subject;
					var h2 = document.createElement('p');
					h2.innerHTML = "Tutor: " + toTitleCase(rooms[key].Host);
					var h3 = document.createElement('p');
					h3.innerHTML = "Day: " + rooms[key].ClassDay;
					var h4 = document.createElement('p');
					h4.innerHTML = "Time: " + rooms[key].ClassTime;
					var h5 = document.createElement('p');
					h5.innerHTML = "Description: " + rooms[key].Description;
					
					div.appendChild(img);
					div.appendChild(joinbutton);
					div.appendChild(h1);
					div.appendChild(h2);
					div.appendChild(h3);
					div.appendChild(h4);
					div.appendChild(h5);
					newitem.appendChild(div);
					searchlist.appendChild(newitem);
				
				console.log("Search results: " + searchroomidlist);
				
				
			}
		
		});
		
	}


	//This function does not work for multiple timezones
	function getDate(){
		var date = new Date();
		dateSeconds = date.getSeconds();
		if (dateSeconds < 10){dateSeconds = "0" + dateSeconds;}
		dateMinutes = date.getMinutes();
		if (dateMinutes < 10){dateMinutes = "0" + dateMinutes;}
		dateHour = date.getHours();
		timeslot = "am";
		if (dateHour > 12){dateHour = dateHour - 12; timeslot = "pm"}
		date = dateHour + ":" + dateMinutes + ":" + date.getSeconds() + timeslot + " " + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
		return date;
	}
	
	function createEventListeners(){
		
		//Listens for new messages
		//Checks database for added users to userlist	
		firebase.database().ref('users/' + qsParm.id + '/Messages').on('child_added', function (snapshot){
			data = snapshot.val();
			var messageboard = document.getElementById('messages');
			var message = document.createElement('li');
			var div = document.createElement('div');
			
			div.setAttribute('class', 'col-lg-12');
			div.style.height = "35px";
			div.style.borderTop = "1px solid #EEEEEF";
			div.style.padding = "5px"
			
			var messagediv = document.createElement('div');
			var timestampdiv = document.createElement('div');
			messagediv.style.float = 'left';
			timestampdiv.style.float = 'right';
			
			messagediv.innerHTML = data.user + ": " + data.message;
			timestampdiv.innerHTML = data.timestamp;
			
			div.appendChild(messagediv);
			div.appendChild(timestampdiv);
			
			message.appendChild(div);
			messageboard.insertBefore(message, messageboard.childNodes[0]);
			
			});
	}

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
		loadprofile(qsParm.id);
		searchdatabase(qsParm.id);
		createEventListeners();
		}
	
	
	window.onload = function() {
		qs();
		};