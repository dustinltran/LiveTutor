
	
	//SEARCHING DATABASE -- This function search the database for matches to the users search and creates listitems to display the results/////////
	function searchdatabase(str){
		
		console.log("Attempting to search Database...");
		
		var searchRooms = firebase.database().ref('StudyRooms');	
		var rooms;
		
		searchRooms.once("value", function(response) {
			rooms = response.val();
			
			console.log("Search complete." );
			
			searchroomidlist = [];
			
			for (var key in rooms) {
				if (rooms[key].Subject.toLowerCase().includes(str.toLowerCase()) || rooms[key].Host.toLowerCase().includes(str.toLowerCase())){
					searchroomidlist.push(rooms[key].RoomId);

					var searchlist = document.getElementById('searchlist');
					var newitem = document.createElement('li');
					
					var div = document.createElement('div');
					div.setAttribute("class","col-sm-12 col-md-12 col-lg-12");
					div.setAttribute("id","testid");
					
					var img = document.createElement('img');
					img.setAttribute("src","img/board.png");
					img.setAttribute("alt","board");
					img.setAttribute("style","width:180px;height:130px; float:left; margin-right:10px");
					
					var joinbutton = document.createElement('div');
					joinbutton.setAttribute("type","button");
					joinbutton.setAttribute("class","btn btn-info");
					joinbutton.setAttribute("style","float:right; padding:10px");
					var roomlink = "studyboard.html?roomid=" + rooms[key].RoomId;
					joinbutton.addEventListener("click", function(){window.location.href = roomlink;});
					joinbutton.innerHTML = 'JOIN'
					
					var h1 = document.createElement('h4');
					h1.innerHTML = "Subject: " + rooms[key].Subject;
					var h2 = document.createElement('h4');
					h2.innerHTML = "Tutor: " + toTitleCase(rooms[key].Host);
					var h3 = document.createElement('h4');
					h3.innerHTML = "Day: " + rooms[key].ClassDay;
					var h4 = document.createElement('h4');
					h4.innerHTML = "Time: " + rooms[key].ClassTime;
					var h5 = document.createElement('h4');
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
					
					
				}
				
				console.log("Search results: " + searchroomidlist);
				
				
			}
		
		});
		
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
			if (qsParm.search!=null)
				{
					var res = qsParm.search.replace(/%20/g, " ");
					searchdatabase(res);
					document.getElementById("searchbody").style.display = "inline"
					document.getElementById("theCarousel").style.display = "none";
					document.getElementById("searchbar").style.display = "none";
					document.getElementById("navbar").children[0].style.display = "inline";
					var classestxt = document.getElementById("classes-div");
					classestxt.innerHTML = "Classes: " + res;
					classestxt.style.fontSize = "xx-large";
				}
			
			}
		
	
	window.onload = function() {
			document.getElementById("searchbody").style.display = "none"
			document.getElementById("navbar").children[0].style.display = "none";
			qs();
		};

 