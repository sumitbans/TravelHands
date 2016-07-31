$(document).ready(function(){	
//************************ Initialize Firebase *********************//
	var config = {
	    apiKey: "AIzaSyAmpsaHBe-JSRoBxc-WRK9VU9xF4u3wNoE",
	    authDomain: "travelhands-3903d.firebaseapp.com",
	    databaseURL: "https://travelhands-3903d.firebaseio.com",
	    storageBucket: "travelhands-3903d.appspot.com",
	};
	firebase.initializeApp(config);	

	var user = firebase.auth().currentUser;
	if (user) {
	  // User is signed in.
	  console.log(user.uid);
	  loginUser(user.uid);
	} else {
	  // No user is signed in.
	}

	$('[data-toggle="popover"]').popover({ 
	    html : true,
	    content: function() {

	    	var mainpopoverDiv = $("<div></div>").attr("id", "loginPopover");
			var userIdDiv = $('<div><span>Username/Email:</span><input id="userName" type="text" placeholder="email"></input></div>');
			var pworddiv = $('<div><span>Password:</span><input id="pword" type="password" placeholder="********"></input></div></br>');
			var loginButton = $('<div><button id="loginButton" class="btn btn-danger">Login</button></div>').click(function(){
					var username = $('#userName').val();
					var pword = $('#pword').val();

					console.log(username + ":  " + pword);

					if(username.length < 1 || pword.length < 1){
						alert("Please enter your credentials!");
					}else{
						var promise = firebase.auth().signInWithEmailAndPassword(username, pword).catch(function(error) {
						  // Handle Errors here.
						  var errorCode = error.code;
						  var errorMessage = error.message;
						  alert("error: " + errorCode + " " + errorMessage);
						  // ...
						});

						var user = promise.then(function(val){
							console.log(val.uid);
							loginUser(val.uid);
						});
					}
				});;

				mainpopoverDiv.append(userIdDiv)
					.append(pworddiv)
					.append(loginButton);

				//loginButton

	      	return mainpopoverDiv;
	    }
	});	
	
	var loginUser = function(userId){

		firebase.database().ref('/travelerInfo/' + userId).once('value').then(function(snapshot){
			console.log(snapshot.toString());
			console.log(snapshot.child('/travFirstName').val() + " " + snapshot.child('/travelLastName').val());

			$('[data-toggle="popover"]').popover('destroy');

			$('[data-toggle="popover"]').html("Welcome! " + snapshot.child('/travFirstName').val());
			$('[data-toggle="popover"]').prop("title", "Click to Logout");
			$('[data-toggle="popover"]').popover({ 
			    html : true,
			    content: function() {

			    	var mainpopoverDiv = $("<div></div>").attr("id", "logoutPopover");
					var signoutButton = $('<div><button id="signoutButton" class="btn btn-danger">Logout</button></div>').click(function(){
						firebase.auth().signOut().then(function() {
						  // Sign-out successful.
						}, function(error) {
						  // An error happened.
						});							
					});

					mainpopoverDiv.append(signoutButton);

			      	return mainpopoverDiv;
			    }
			});	
		});
		return true;
	}

	// Add smooth scrolling to all links in navbar + footer link
  	$(".navbar a, footer a[href='#myPage']").on('click', function(event) {
	    // Make sure this.hash has a value before overriding default behavior
	    if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();

	      // Store hash
	      var hash = this.hash;

	      // Using jQuery's animate() method to add smooth page scroll
	      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
	      $('html, body').animate({
	        scrollTop: $(hash).offset().top
	      }, 900, function(){
	   
	        // Add hash (#) to URL when done scrolling (default click behavior)
	        window.location.hash = hash;
	      });
	    } // End if
	});
	  
	$(window).scroll(function() {
	    $(".slideanim").each(function(){
	      var pos = $(this).offset().top;

	      var winTop = $(window).scrollTop();
	        if (pos < winTop + 600) {
	          $(this).addClass("slide");
	        }
	    });
	});

	$('#searchForm').submit(function(event){
	})
 
});