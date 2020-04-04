$(document).ready(function (){

    $('#Register').click(function() {
		var email = $('#email').val();
		var username = $('#username').val();
		var password = $('#password').val();
	
		var newUser = {
		  email: email,
		  username: username,
		  password: password
		};
	
		$.post('addUser', newUser, function(data, status) {
			console.log(data);
			if (data.success) {
				$('#msg').text(data.message);
				$('#msg').removeClass('fail');
				$('#msg').addClass('success');
		
				$('#name').val('');
				$('#idnum').val('');
				$("input[name='gender']:checked").prop("checked", false);
		  	} else {
				$('#msg').text(data.message);
				$('#msg').removeClass('success');
				$('#msg').addClass('fail');
		  	}
		});
	});

	// POST call [search post]
	$('#searchPost').click(function() {
		var title = $('#searchTitle').val();
	
		$.post('searchPost', { title: title }, function(data, status) {
			console.log(data);
	
			var postList = $('#postList');
			postList.empty(); // refresh results
	
			
		/*
			var studentListContainer = $('#studentList');
      		studentListContainer.empty(); // clear children every time (refresh results)

     		data.forEach((item, i) => {
        		addStudentDiv(item, studentListContainer);
			  });
		*/
		});
	});

	//POST call [verify user]
	$('#verifyLogin').click(function() {
		var user = $('#logusername').val();
		var pass = $('#logpassword').val();
	
		$.post('veriifyLogin', { user: user, pass: pass }, function(data, status) {
			console.log(data);
		});
	});
});