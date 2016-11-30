
	// <---------- USER SIGN IN ------->>  //

	function GetSignIn() {
		console.log("Signing in...");
		var email = document.getElementById('email').value;
		var password = document.getElementById('login-password').value;        
		if (email.length < 4) {
			alert('Please enter a valid email address.');
			return;
        }
		if (password.length < 4) {
			alert('Please enter valid password.');
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
			alert("This user and password does not exist");
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
		if (firstName.length <1 && lastName.length <1){
		alert('Enter a name');
			return;
		}
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

		}, function(error){
				alert(error);
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
			window.location.href = "index.html";
			}, function(error) {
			// An error happened.
			});
	}
	
	function deleteClass(){
		if (add_edit == 1){
			firebase.database().ref("StudyRooms/" + editroom.RoomId).remove();
		}
	}
	
	//Creats new class and edits old classes
	function newclass(){
		
		var userId = firebase.auth().currentUser.uid;
		
		var subject = document.getElementById('subject').value;
		var sun = document.getElementById('sun');
		var mon = document.getElementById('mon');
		var tue = document.getElementById('tue');
		var wed = document.getElementById('wed');
		var thur = document.getElementById('thur');
		var fri = document.getElementById('fri');
		var sat = document.getElementById('sat');
		var fromtime = document.getElementById('fromtime').value;
		var fromzone = document.getElementById('fromzone').value;
		var totime = document.getElementById('totime').value;
		var tozone = document.getElementById('tozone').value;
		var descr = document.getElementById('descr').value;
		
		if (subject===""){alert("Subject Required!");return;}
		
		var date = "";
		var time = "";
		
		if (sun.checked){date = date + "Sun ";}
		if (mon.checked){date = date + "Mon ";}
		if (tue.checked){date = date + "Tue ";}
		if (wed.checked){date = date + "Wed ";}
		if (thur.checked){date = date + "Thur ";}
		if (fri.checked){date = date + "Fri ";}
		if (sat.checked){date = date + "Sat ";}
		
		if (date === ""){date="---";}
		if (descr === ""){descr="---";}
		
		if (fromtime.length < 5){fromtime = " " + fromtime;}
		
		time = fromtime + fromzone + " - " + totime + tozone;

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
				online: editroom.online,
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
				online: false,
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
		
		if (editroom.ClassDay.includes("Sun")){document.getElementById("sun").checked = true;}
		else {document.getElementById("sun").checked = false;}
		if (editroom.ClassDay.includes("Mon")){document.getElementById("mon").checked = true;}
		else {document.getElementById("mon").checked = false;}
		if (editroom.ClassDay.includes("Tue")){document.getElementById("tue").checked = true;}
		else {document.getElementById("tue").checked = false;}
		if (editroom.ClassDay.includes("Wed")){document.getElementById("wed").checked = true;}
		else {document.getElementById("wed").checked = false;}
		if (editroom.ClassDay.includes("Thur")){document.getElementById("thur").checked = true;}
		else {document.getElementById("thur").checked = false;}
		if (editroom.ClassDay.includes("Fri")){document.getElementById("fri").checked = true;}
		else {document.getElementById("fri").checked = false;}
		if (editroom.ClassDay.includes("Sat")){document.getElementById("sat").checked = true;}
		else {document.getElementById("sat").checked = false;}
		
		time1 = editroom.ClassTime.slice(0, 7);
		time2 = editroom.ClassTime.slice(10, editroom.ClassTime.length);
		
		console.log('time1: ' + time1);
		console.log('time2: ' + time2);
		
		fromtime = time1.replace('am',"")
		fromtime = fromtime.replace(" ","");
		fromtime = fromtime.replace('pm',"")
		totime = time2.replace('am',"")
		totime = totime.replace('pm',"")
		
		if (time1.includes('am')){
			fromzone = "am";
		}
		else {fromzone = "pm";}
		
		if (time2.includes('am')){
			tozone = "am";
		}
		else {tozone = "pm";}
		
		document.getElementById("subject").value = editroom.Subject;
		document.getElementById("totime").value = totime;
		document.getElementById("tozone").value = tozone;
		document.getElementById("fromtime").value = fromtime;
		document.getElementById("fromzone").value = fromzone;
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
		document.getElementById("title-class-edit").innerHTML = "Create Class";
		
		document.getElementById("subject").value = "";
		document.getElementById("sun").checked = false;
		document.getElementById("mon").checked = false;
		document.getElementById("tue").checked = false;
		document.getElementById("wed").checked = false;
		document.getElementById("thur").checked = false;
		document.getElementById("fri").checked = false;
		document.getElementById("sat").checked = false;
		document.getElementById("fromtime").value = "1:00";
		document.getElementById("totime").value = "1:00";
		document.getElementById("fromzone").value = "pm";
		document.getElementById("tozone").value = "am";
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
	
	


