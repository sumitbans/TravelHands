$(document).ready(function(){		
		$('.dateRangePicker').daterangepicker({
		      autoUpdateInput: false,
		      locale: {
		          cancelLabel: 'Clear'
		      }
		  });

		  $('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
		      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
		  });

		  $('#dateRangePicker').on('cancel.daterangepicker', function(ev, picker) {
		      $(this).val('');
		  });


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

//************************ Initialize Firebase *********************//
	  var config = {
	    apiKey: "AIzaSyAmpsaHBe-JSRoBxc-WRK9VU9xF4u3wNoE",
	    authDomain: "travelhands-3903d.firebaseapp.com",
	    databaseURL: "https://travelhands-3903d.firebaseio.com",
	    storageBucket: "travelhands-3903d.appspot.com",
	  };
	  firebase.initializeApp(config);

	  firebase.database().ref('/organizationInfo').once('value').then(function(snapshot) {
	  	console.log(snapshot.val());	
		  var orgName = snapshot.child('orgName').val();
		  console.log(orgName);		
		});
})