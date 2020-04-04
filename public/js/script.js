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


});