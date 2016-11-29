
	// <---------- USER SIGN IN ------->>  //

	function GetSignIn() {
		console.log("Signing in...");
		var email = document.getElementById('email').value;
		var password = document.getElementById('login-password').value;        
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
        }
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
        }
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
			//Hello
			console.log("...Signin Successful");
			
			username = result.displayName;
			LoginSetup();
			
			}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
		});
	}

	// <---------- NEW USER SIGN UP ------->>  // 

    function GetSignUp() {
		console.log("Registering Account...");
	  
		var firstName = document.getElementById('first_name').value;
		var lastName = document.getElementById('last_name').value;
		var email = document.getElementById('register_email').value;
		var password = document.getElementById('register_password').value;
		var passwordConfirm = document.getElementById('password_confirmation').value;
		if (email.indexOf('&') !==-1 || email.indexOf('?') !==-1 || email.indexOf('$') !==-1 || email.indexOf('^') !==-1 || email.indexOf('*') !==-1){
		alert('Enter a valid email address');
			return;
		}
		if (password.length < 6) {
			alert('Password is too weak.');
			return;
		}
		if(password !== passwordConfirm){
			alert('Password mismatched!');
			return;
		}
		console.log("Register Fields Successful...");
		//UserDescription();
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
			
			result.updateProfile({displayName: firstName + " " + lastName});
			username = result.displayName;
			
			firebase.database().ref('/users/' + result.uid).set({  
				firstname: firstName,
				lastname: lastName,
				AboutMe: "",
				Subjects: ""
				});   
				
			console.log("Register Successful...");
			$("#registerModal").modal('hide');
			
			userdisplay = document.getElementById("usernamedisplay");
			userdisplay.textContent = toTitleCase(firstName + " " + lastName);
			document.getElementById("usernamedisplay").href = "profile.html?" + "id=" + userId;

		});
	}
	
	//Useful function to capitalize 
	function toTitleCase(str)
		{
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
		
		//Get table row index
		function getRowIndex( el ) {
		while( (el = el.parentNode) && el.nodeName.toLowerCase() !== 'tr' );

		if( el ) 
			return el.rowIndex;
		}
	
	function LoginSetup(){
		var userId = firebase.auth().currentUser.uid;
		
		
		$("#loginModal").modal('hide');
		document.getElementById("navbar").children[5].style.display = "inline";
		document.getElementById("navbar").children[6].style.display = "inline";
		document.getElementById("navbar").children[1].style.display = "inline";
		
		userdisplay = document.getElementById("usernamedisplay");
		if (username != null){
			userdisplay.textContent = toTitleCase(username);
			document.getElementById("usernamedisplay").href = "profile.html?" + "id=" + userId;
		}
		
		document.getElementById("navbar").children[3].style.display = "none";
		document.getElementById("navbar").children[4].style.display = "none";
		
		loadSchedule();
	}
	
	function Login(){
		$("#loginModal").modal();
	}
	
	function Register(){
		$("#registerModal").modal();
	}
	
	function Logout(){
		document.getElementById("navbar").children[5].style.display = "none";
		document.getElementById("navbar").children[6].style.display = "none";
		document.getElementById("navbar").children[1].style.display = "none";
		
		document.getElementById("navbar").children[3].style.display = "inline";
		document.getElementById("navbar").children[4].style.display = "inline";
		
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			}, function(error) {
			// An error happened.
			});
	}
	
	function deleteClass(){
		if (add_edit == 1){
			firebase.database().ref("StudyRooms/" + editroom.RoomId).remove();
		}
	}
	
	function newclass(){
		
		var userId = firebase.auth().currentUser.uid;
		
		var subject = document.getElementById('subject').value;
		var date = document.getElementById('day').value;
		var time = document.getElementById('time').value;
		var descr = document.getElementById('descr').value;

		if (add_edit == 1){
			
			roomref = firebase.database().ref("StudyRooms/" + editroom.RoomId);
			
			roomref.update({
				Subject: subject,
				ClassDay: date,
				ClassTime: time,
				Description: descr,
				Host: editroom.Host,
				HostID: editroom.HostID,
				numberOfUsers: editroom.numberOfUsers,
				RoomId: editroom.RoomId
				
				});
		}
		
		else {
			var newroomid = firebase.database().ref('StudyRooms').push().key;
			var newroomref = firebase.database().ref('StudyRooms/' + newroomid);
			
			newroomref.set({
				Subject: subject,
				ClassDay: date,
				ClassTime: time,
				Description: descr,
				Host: username,
				HostID: userId,
				numberOfUsers: 1,
				RoomId: newroomid
				});
		}
		
		
		
	}

	function loadSchedule(){
		
		var userId = firebase.auth().currentUser.uid;
		var findUsersRooms = firebase.database().ref('StudyRooms').orderByChild("HostID").equalTo(userId);
		
		var userrooms;
		
		
		findUsersRooms.on("value", function(response) {
			userrooms = response.val();
			$("#myschedule-table tbody tr").remove(); 
			
			roomidlist = [];
			
			for (var key in userrooms) {
				roomidlist.push(userrooms[key]);
				
				var table = document.getElementById("myschedule-tablebody");
				var row = table.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				cell1.innerHTML = userrooms[key].Subject;
				cell2.innerHTML = userrooms[key].ClassDay;
				cell3.innerHTML = userrooms[key].ClassTime;
				cell4.innerHTML = userrooms[key].Description;
				cell5.innerHTML = '<button type="button" class="btn btn-info btn-block" onclick="joinclass(getRowIndex(this));">JOIN</button>';
				cell6.innerHTML = '<button href="#editClassModal" type="button" onclick="editclass(getRowIndex(this));" class="btn btn-info btn-block" data-toggle="modal" data-dismiss="modal">EDIT</button>';
				}
		});
		
	
	}
	
	function search(){	
		searchtxt = document.getElementById("srch-term-page").value;
		window.location.href = "index.html?search=" + searchtxt;

	}
	
	function searchnavbar(){
		searchnavtxt = document.getElementById("srch-term").value;
		window.location.href = "index.html?search=" + searchnavtxt;
		
	}
	
	function editclass(i){
		add_edit = 1;
		console.log(roomidlist[roomidlist.length - i]);
		editroom = roomidlist[roomidlist.length - i]
		document.getElementById("title-class-edit").innerHTML = "Edit Class";
		
		document.getElementById("subject").value = editroom.Subject;
		document.getElementById("day").value = editroom.ClassDay;
		document.getElementById("time").value = editroom.ClassTime;
		document.getElementById("descr").value = editroom.Description;
		
	}
	
	function joinclass(i){
		console.log(roomidlist[roomidlist.length - i]);
		joinroom = roomidlist[roomidlist.length - i]
		roomlink = "studyboard.html?roomid=" + joinroom.RoomId;
		window.location.href = roomlink;
		
	}
	
	function addclassLayout(){
		add_edit = 0;
		document.getElementById("title-class-edit").innerHTML = "Add Class";
		
		document.getElementById("subject").value = "";
		document.getElementById("day").value = "";
		document.getElementById("time").value = "";
		document.getElementById("descr").value = "";
	}
	
	function initApp() {
		var roomidlist;
		var searchroomidlist;
		var add_edit = 0;
		var editroom;
		
		document.getElementById('login-button').addEventListener('click', GetSignIn, false);
		document.getElementById('confirm-button').addEventListener('click', GetSignUp, false);
		
		//Hide items on load
		document.getElementById("navbar").children[5].style.display = "none";
		document.getElementById("navbar").children[6].style.display = "none";
		document.getElementById("navbar").children[1].style.display = "none";
		console.log("...init Complete.");
	}
	
	console.log("Navigation Script init...");
	initApp();
	
	


