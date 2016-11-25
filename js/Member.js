document.addEventListener('DOMContentLoaded', function() {

  // FIREBASE CONFIG
  var config = {
    apiKey: "AIzaSyAw7K-ok0pec6dYkqropUCYlOhQBfF4VWo",
    authDomain: "myproject-80d6f.firebaseapp.com",
    databaseURL: "https://myproject-80d6f.firebaseio.com",
    storageBucket: "myproject-80d6f.appspot.com",
    messagingSenderId: "334115835207"
  };
  firebase.initializeApp(config);


  var db = firebase.database();
  var auth = firebase.auth();
  var str = ''; 
  var value = '';
  var value1 = '';
  var name;
  var email = null;
  var displayName = null;
  var uid = null;    
  var accountbutton = document.getElementById('account-menu-button'); 
      
  //FIREBASE AUTH STATE CHANGE METHOD
  auth.onAuthStateChanged(function(user) {
    if (user) {
      email = user.email ? user.email : null;
      uid = user.uid ? user.uid : null;
      
      
    } else {
      
      //NULLIFY SHARED USER VARIABLES
      email = null;
     uid = null;
     }
     // LoadUsername();  // this will show up in another html file
 });

      //document.getElementById('sign-in-button').style.display= "inline";
     document.getElementById('login-button').addEventListener("click", function(){GetSignIn();});
//     document.getElementById('sign-in-button').addEventListener("click", function(){
//         Signin();

//       });
//     document.getElementById('register-button').addEventListener("click", function(){
//         Signup(); 
//       });

//     document.getElementById('add-class-button').addEventListener("click", function(){
//         addclass();
//       });

//     document.getElementById('back-button2').addEventListener("click", function(){
//         Back2();
//       });

//     document.getElementById('sign-up-button').addEventListener("click", function(){
//         signout();
//        // window.location="tri_part.html";
//       });
      
//     document.getElementById('submit-button').addEventListener("click", function(){
//         confirm();
//       });

//     document.getElementById('back1-button').addEventListener("click", function(){
//         Back1();
//       });  
      
//     document.getElementById('back-button').addEventListener("click", function(){
//         Back();
//       });
      
    document.getElementById('confirm-button').addEventListener("click", function(){
        GetSignUp();
      });  
      
//     document.getElementById('add-button3').addEventListener("click", function(){
//         AddNewClass();
//       });


// /// testing here 
//     document.getElementById('view-button').addEventListener("click", function(){
      

// //ViewSchedule();
// //});
// document.getElementById('sign-in-button').style.display= "none";

//       window.location = "table.html";
//     });
//     //document.getElementById('main-card').style.display = "inline";
    
//     document.getElementById('search-button').addEventListener("click", function(){
//         ViewAllClass();
//       });
      
//     document.getElementById('delete-button').addEventListener("click", function(){
//         DeleteAccount();
//       });     
    
//     document.getElementById('search').addEventListener("click", function(){
//         ViewProfile();
//       });     
//     document.getElementById('exit-profile').addEventListener("click", function(){
//         exitprofile();
//       });     
// 	document.getElementById('exit-profile-check').addEventListener("click", function(){
//         Profile();
//         document.getElementById('login-card').style.display = "inline";   
//       });     
//     document.getElementById('exit-myschedule').addEventListener("click", function(){
//         exitmyschedule();
//       });
//     document.getElementById('exit-allschedule').addEventListener("click", function(){
//         exitallschedule();
//       });     
//     document.getElementById('exit-searchschedule').addEventListener("click", function(){
//         exitsearchschedule();
//       });     
//     document.getElementById('add-button4').addEventListener("click", function(){
//         done();
//       });     
    





    function Signin() {
      document.getElementById('login-card').style.display = "inline";   
      document.getElementById('register-card').style.display = "none";    
      document.getElementById('logout-card').style.display = "none";  
        }  
    
    
    function exitprofile() {
      document.getElementById('profile-page').style.display= "none";
        }


    function Signup() {
      document.getElementById('login-card').style.display = "none";    
      document.getElementById('register-card').style.display = "inline";    
        }
    
        
    function Back() {
      document.getElementById('login-card').style.display = "inline";    
      document.getElementById('register-card').style.display = "none";    
        }


    function Back1() {
      document.getElementById('profile-card').style.display = "none";    
      document.getElementById('register-card').style.display = "inline";    
        }


    function Back2() {
      document.getElementById('login-card').style.display = "none";    
      document.getElementById('main-card').style.display = "inline";  
      document.getElementById('add-class-card').style.display = "none";    
        }    
        

    function Signout() {
      document.getElementById('login-card').style.display = "none";    
      document.getElementById('register-card').style.display = "none";
      document.getElementById('logout-card').style.display = "inline";   
        }


    function confirm() {
      document.getElementById('login-card').style.display = "none";    
      document.getElementById('register-card').style.display = "none";
      document.getElementById('profile-card').style.display = "inline";   
        } 
        
        
    function addclass(){   
      document.getElementById('main-card').style.display = "none";    
      document.getElementById('add-class-card').style.display = "inline";      
        }    


function redirect(path){
    var baseURL = window.location.protocol + '//' + window.location.host;
    var hasSlash = path.charAt(0) == '/';
    
    if(path == '/') {
      path = baseURL;
    }
    
    if(!hasSlash){
      path = '/' + path;
    }
    
    var onThisPage = (window.location.href.indexOf(baseURL + path) > -1);
    
    if (!onThisPage) {
      //redirect them to login page for message
       location = path;
    }
  }


  // <<---------- USER SIGN IN ------->>  //



    function GetSignIn() {
      var email = document.getElementById('username-input').value;
      var password = document.getElementById('password-input').value;        
      if (email.length < 4) {
        alert('Please enter an email address.');
          return;
        }
      if (password.length < 4) {
        alert('Please enter a password.');
          return;
        }
      firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        LoadUsername();
        document.getElementById('login-card').style.display="none";
        document.getElementById('main-card').style.display="inline";
        document.getElementById('username-input').value ='';
        document.getElementById('password-input').value ='';        
         });
       document.getElementById('sign-in-button').style.display= "none";
     
        }



  // <<---------- NEW USER SIGN UP ------->>  // 



    function GetSignUp() {
      var firstName = document.getElementById('first_name').value;
      var lastName = document.getElementById('last_name').value;;
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
      console.log('here');
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
	    var user = firebase.auth().currentUser;
	    logUser(user); // Optional
		}, function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		});



      //UserDescription();
      // firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      // firebase.database().ref('/users/' + result.uid).set({    
      //      fullname: firstName, 
      //      description: lastName 
      //   });      
      
      alert('You successfully created your account!');
      SendEmailVerification();

      window.open("./courses.html", "_self");
      document.getElementById('register-card').style.display = "none"; 
      document.getElementById('profile-card').style.display = "none";       
        });
      }



  // <<---------- SEND EMAIL TO VERIFY NEW ACCOUNT ------->>  //



    function SendEmailVerification() {
      document.getElementById('account-menu-button').innerHTML = '';
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('check your email to verify your account!');
        });
      }  



  // <<---------- LOAD USERNAME TO NAVIGATION ------->>  //



    function LoadUsername(){
      var user = firebase.auth().currentUser;
     // document.getElementById('account-menu-button').style.display= "inline";
      //document.getElementById('sign-in-button').style.display= "none";
      //var accountbutton = document.getElementById('account-menu-button'); 
      var userId = firebase.auth().currentUser.uid;
          return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().fullname;
      accountbutton.innerHTML = username;
        });
      }



  // <<---------- VIEW CURRENT USER (TUTOR) SCHEDULE ------->>  //



    function ViewSchedule(){
      var user = firebase.auth().currentUser;
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().fullname;
          name = username;
     
      var playersRef = firebase.database().ref(name + '/');
          playersRef.orderByChild("Subject").on("child_added", function(data) {
      var cell1 = data.val().Subject;     
      var cell2 = data.val().ClassName;
      var cell3 = data.val().ClassDay;
      var cell4 = data.val().ClassTime;
      addRow1(cell1,cell2,cell3,cell4);

        });
        });
      document.getElementById('table-card1').style.display = "inline";
      document.getElementById('main-card').style.display = "none";
      }
              
       

  // <<---------- SEARCH OPTIONS IN GENERAL ------->>  // 



    function ViewProfile(){
      var searchresult = document.getElementById('tfq').value;
      var playersRef = firebase.database().ref('users/');
          playersRef.orderByChild("fullname").on("child_added", function(data) {
      var fullname = data.val().fullname;     
      var Tutorer = data.val().fields;
      var description = data.val().description;
      s1 = fullname.toLowerCase();
      s2 = searchresult.toLowerCase();
      if (s1==s2){
      document.getElementById('title').innerHTML = fullname;
      document.getElementById('sub').innerHTML = Tutorer;
      document.getElementById('other').innerHTML = description;
      document.getElementById('profile-page').style.display = "inline";
      }
        });
      var playersRef1 = firebase.database().ref('users/');
          playersRef1.orderByChild("fields").on("child_added", function(data) {
      var myfield = data.val().fields;
      var fullname = data.val().fullname;
      s1 = myfield.toLowerCase();
      s2 = searchresult.toLowerCase();
      if (s1==s2){
      var playersRef1 = firebase.database().ref(fullname + '/');
          playersRef1.orderByChild("Subject").on("child_added", function(data) {
      var cell1 = data.val().Subject;     
      var cell2 = data.val().ClassName;
      var cell3 = data.val().ClassDay;
      var cell4 = data.val().ClassTime;
      var cell5 = fullname;
      addRow3(cell1,cell2,cell3,cell4,cell5);
      document.getElementById('table-card3').style.display = "inline";
      document.getElementById('main-card').style.display = "none"; 
        });
      }
        });
      document.getElementById('tfq').value = '';
      }





// <<---------- TESTING ------->>  // 



    function Profile(){
       var userId = firebase.auth().currentUser.uid;
     
      var searchresult = document.getElementById('tfq').value;
      var playersRef = firebase.database().ref('users/');
          playersRef.orderByChild("fullname").on("child_added", function(data) {
      var fullname = data.val().fullname;     
      var Tutorer = data.val().fields;
      var description = data.val().description;
      document.getElementById('title').innerHTML = fullname;
      document.getElementById('sub').innerHTML = Tutorer;
      document.getElementById('other').innerHTML = description;
      document.getElementById('profile-page').style.display = "inline";
        alert(userId);
        });
   
      }









  // <<---------- VIEW ALL USER (TUTOR) SCHEDULE BASED ON THE SUBJECT ------->>  //
       


    function ViewAllClass(){
      show_selected();
      var playersRef = firebase.database().ref('users/');
          playersRef.orderByChild("fields").equalTo(value).on("child_added", function(data) {
      var fullname = data.val().fullname;
      var playersRef = firebase.database().ref(fullname + '/');
          playersRef.orderByChild("Subject").on("child_added", function(data) {
      var cell1 = data.val().Subject;     
      var cell2 = data.val().ClassName;
      var cell3 = data.val().ClassDay;
      var cell4 = data.val().ClassTime;
      var cell5 = fullname;
      addRow2(cell1,cell2,cell3,cell4,cell5);

        });
        });
      document.getElementById('table-card2').style.display = "inline";
      document.getElementById('main-card').style.display = "none";
      document.getElementById('table-card1').style.display = "none";
      }



  // <<---------- SECLECT SUBJECT IN VIEW ALL CLASS ------->>  // 



    function show_selected() {
      var selector = document.getElementById('select');
          value = selector[selector.selectedIndex].value;
      }



  // <<---------- SECLECT SUBJECT IN ADD NEW CLASS ------->>  //



    function show_selected1() {
      var selector = document.getElementById('select1');
          value1 = selector[selector.selectedIndex].value;
      }



  // <<---------- COMPLETE ADDING NEW COURSE ------->>  //



    function done(){
      var user = firebase.auth().currentUser;
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().fullname;
          name = username;
      var playersRef = firebase.database().ref(name + '/');
          playersRef.orderByChild("Subject").on("child_added", function(data) {
      var cell1 = data.val().Subject;     
      var cell2 = data.val().ClassName;
      var cell3 = data.val().ClassDay;
      var cell4 = data.val().ClassTime;
      addRow1(cell1,cell2,cell3,cell4);
      var table = document.getElementById('myTableData1');
      if (table.rows.length>0){
          for(var i = table.rows.length - 1; i > 0; i--)
            {
              table.deleteRow(i);
            }
        }
          });
          });
      show_selected();
      var playersRef = firebase.database().ref('users/');
          playersRef.orderByChild("fields").equalTo(value).on("child_added", function(data) {
      var fullname = data.val().fullname;
      var playersRef = firebase.database().ref(fullname + '/');
          playersRef.orderByChild("Subject").on("child_added", function(data) {
      var cell1 = data.val().Subject;     
      var cell2 = data.val().ClassName;
      var cell3 = data.val().ClassDay;
      var cell4 = data.val().ClassTime;
      var cell5 = fullname;
      addRow2(cell1,cell2,cell3,cell4,cell5);
          });
          });
      var table = document.getElementById('myTableData2');
          for(var i = table.rows.length - 1; i > 0; i--)
            {
               table.deleteRow(i);
            }
      document.getElementById('main-card').style.display = "inline";
      document.getElementById('add-class-card').style.display = "none";    
        }



  // <<---------- SIGN OUT ------->>  // 



    function signout (){
      firebase.auth().signOut().then(function() {
    document.getElementById('account-menu-button').style.display= "none";
      document.getElementById('sign-in-button').style.display= "inline";
      document.getElementById('main-card').style.display= "none";
         
//redirect('tri_part.html');

      }, function(error) {
      Alert('Sign out Failed');
      });

      }
   


  // <<---------- ADD NEW CLASS ------->>  //


      
    function AddNewClass(){
      var userId = firebase.auth().currentUser.uid;
      show_selected1();
      var classname = document.getElementById('name').value;
      var date = document.getElementById('date').value;
      var time = document.getElementById('time').value;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().fullname;
          name = username;
      firebase.database().ref(name).push({
          Subject: value1,
          ClassName: classname,
          ClassDay: date,
          ClassTime: time
          });
          });
      document.getElementById('name').value = '';
      document.getElementById('date').value = '';
      document.getElementById('time').value = '';
      document.getElementById('table-card1').style.display = "none";
    }



  // <<---------- USER DESCRIPTION ------->>  //



    function UserDescription() {
      var checks =document.getElementsByClassName('checkbox');
        for ( i=0; i<6; i++) {
          if ( checks[i].checked === true){
              str = checks[i].value;     
                }
              }    
            }
       
    

  // <<---------- TABLE OF TUTOR SCHEDULE ------->>  //



    function addRow1(cell1,cell2,cell3,cell4) { 
      var table = document.getElementById("myTableData1");
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);
          row.insertCell(0).innerHTML= '<input type="button" style = "background-color:#90ee90; color: red" value = "Delete" onClick="Javascript:deleteRow(this)">'; 
          row.insertCell(1).innerHTML= cell1;
          row.insertCell(2).innerHTML= cell2;
          row.insertCell(3).innerHTML= cell3;
          row.insertCell(4).innerHTML= cell4;
        }

    

  // <<---------- TABLE OF ALL COURSES USING SEARCH SUBJECT ------->>  //



    function addRow2(cell1,cell2,cell3,cell4,cell5) { 
      var table = document.getElementById("myTableData2");
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);
          row.insertCell(0).innerHTML= cell1;
          row.insertCell(1).innerHTML= cell2;
          row.insertCell(2).innerHTML= cell3;
          row.insertCell(3).innerHTML= cell4;
          row.insertCell(4).innerHTML= cell5;
           row.insertCell(5).innerHTML= '<input type="button" style="background-color:#90ee90" value = "JOIN" onClick="JointClass(this)">';
          

          
        }

    

  // <<---------- TABLE OF ALL COURSES USING SEARCH WITOUT MEMBER ------->>  //



    function addRow3(cell1,cell2,cell3,cell4,cell5) { 
      var table = document.getElementById("myTableData3");
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);
          row.insertCell(0).innerHTML= cell1;
          row.insertCell(1).innerHTML= cell2;
          row.insertCell(2).innerHTML= cell3;
          row.insertCell(3).innerHTML= cell4;
          row.insertCell(4).innerHTML= cell5;   
        }



  // <<---------- DELETE USER ACCOUNT ------->>  //



    function DeleteAccount() {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().fullname;
      var playersRef = firebase.database().ref(username + '/');
          playersRef.remove();
      var playersRef1 = firebase.database().ref('users/' + userId + '/');
          playersRef1.remove();
        });  
    firebase.auth().currentUser.delete().then(function() {
        alert("NO estoy feliz de que te vaya"); 
     signout();
        });     
      }



  // <<---------- DELETE COURSE ------->>  //



    function deleteRow(obj) {
      var index = obj.parentNode.parentNode.rowIndex;
      var table = document.getElementById("myTableData1");
      var xclass = table.rows[index].cells[2].innerText;
      var xdate = table.rows[index].cells[3].innerText;
      var xtime = table.rows[index].cells[4].innerText;
      var ysub;
      var yclass;
      var ydate;
      var ytime;
      deletepart1();
      var playersRef = firebase.database().ref(name + '/');
          playersRef.orderByChild("Subject").on("child_added", function(data) {
          ysub = data.val().Subject;
          yclass = data.val().ClassName;
          ydate = data.val().ClassDay;
          ytime = data.val().ClassTime;
            if(yclass==xclass && ydate==xdate && ytime==xtime)
              {
                playersRef.orderByChild("ClassDay").equalTo(ydate).on("child_added", function(snapshot) {
                var me = snapshot.key;
                playersRef.child(me).remove();
                  });
                }   
              });
    
      table.deleteRow(index);
      }
     


  // <<---------- DELETE HELPER ------->>  //



    function deletepart1(){
      var user = firebase.auth().currentUser;
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().fullname;
          name = username;
          });
        }



  // <<---------- JOINT THE COURSE ------->>  //



    function JointClass(abj) {      
      var index = obj.parentNode.parentNode.rowIndex;
        alert("Shane' s part here"); 
        }



  // <<---------- EXIT TUTOR TABLE SCHEDULE ------->>  //



    function exitmyschedule(){
      document.getElementById('table-card1').style.display= "none";
      document.getElementById('main-card').style.display = "inline";
      var table = document.getElementById('myTableData1');
        for(var i = table.rows.length - 1; i > 0; i--)
          {
           table.deleteRow(i);
          }
        }



  // <<---------- EXIT ALL COURSE TABLE ------->>  //



    function exitallschedule(){
      document.getElementById('table-card2').style.display= "none";
      document.getElementById('main-card').style.display = "inline";
      var table = document.getElementById('myTableData2');
        for(var i = table.rows.length - 1; i > 0; i--)
          {
            table.deleteRow(i);
          }
        }



  // <<---------- EXIT SEARCH COURSE TABLE ------->>  //



    function exitsearchschedule(){
      document.getElementById('table-card3').style.display= "none";
      var table = document.getElementById('myTableData3');
        for(var i = table.rows.length - 1; i > 0; i--)
          {
            table.deleteRow(i);
          }
        }

     //Helper Functions
    function logUser(user) {
	    var ref = firebase.database().ref("users");
	    var obj = {
	        "user": user
	    };
	    ref.push(obj); // or however you wish to update the node
	}
    

}, false);



  