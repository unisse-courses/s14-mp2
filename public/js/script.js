$(document).ready(function (){

    $('#Register').click(function() {
		// Get the data from the form
		var name = $('#name').val();
		var idnum = $('#idnum').val();
		var gender = $("input[name='gender']:checked").val();
	
		var newStudent = {
		  name: name,
		  id: idnum,
		  gender: gender
		};
	
		$.post('addStudent', newStudent, function(data, status) {
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