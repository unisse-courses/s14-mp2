$(document).ready(function (){

    function addFeatured(parentDiv){

        var mainDiv = document.createElement('div');
        var rowDiv = document.createElement('div');
        var innerDiv = document.createElement('div');
        var head = document.createElement('h1');
        var par = document.createElement('p');
        
        $(mainDiv).addClass("container");
        $(rowDiv).addClass("row");
        $(innerDiv).addClass("col-lg-8 mx-auto");
        $(head).addClass("text-black mb-4");
        $(par).addClass("text-black-50");


        $(head).text('FEATURED POSTS');
        $(par).text("Here is a featured list of charities of which you could help with.");
        
        innerDiv.append(head);
        innerDiv.append(par)
        rowDiv.append(innerDiv);
        mainDiv.append(rowDiv);
        parentDiv.append(mainDiv);
    }

    function postList(item,parentDiv){

    var figDiv = document.createElement('figure');
	var img  = document.createElement('img');
	var head = document.createElement('h2');
	var figCap = document.createElement('figcaption');
	var par = document.createElement('p');
    
    // button 
	var btnDiv = document.createElement('div');
	var btnSlide = document.createElement('div');
    var aTag = document.createElement('a');
    
        $(btnDiv).addClass('button');
        $(btnDiv).attr('id','button-2');
        $(btnSlide).attr('id','slide');
        $(aTag).attr('data-toggle','modal');
        $(aTag).attr('data-target','#modal');
        $(aTag).attr('style','color: black; margin-bottom: 18px;');
        $(aTag).attr('id','reg');
        $(aTag).text('Donate Now');
		

   	 	$(figDiv).addClass("item1");
		$(figCap).addClass("caption");
	
		$(img).attr("src",item.img);
		console.log(item.img);
		$(head).text(item.header);
        $(par).text(item.tags);
        $(figCap).text(item.caption);
		
		figCap.append(par);
		figDiv.append(img);
		figDiv.append(head);
		figDiv.append(figCap);
		
		var containerDiv = document.createElement('div');
		var myModalDiv = document.createElement('div');
		var dialogDiv = document.createElement('div');
		var contentDiv = document.createElement('div');
		var headerDiv = document.createElement('div');
		var head4 = document.createElement('h4');
		
		var bodyDiv = document.createElement('div');
		var Form =document.createElement('form');
		var int1 = document.createElement('INPUT');
		var int2 = document.createElement('INPUT');
		var int3 = document.createElement('INPUT');
		var btnSub = document.createElement('BUTTON');
		var footDiv = document.createElement('div');
		var clsbtn= document.createElement('BUTTON');
		
// eto yung Donation Form na di lumalabas 	
		$(containerDiv).attr('id','container');
		$(myModalDiv).attr('id','myModal');
		$(myModalDiv).addClass('modal fade');
		$(myModalDiv).attr('role','dialog');
		$(dialogDiv).addClass('modal-dialog');
		$(contentDiv).addClass('modal-content');
		$(headerDiv).addClass('modal-header');
		$(head4).addClass('modal-title');
		$(head4).text("Donation Form");
		$(bodyDiv).addClass('modal-body');
		$(Form).addClass('form-inline d-flex flex-column');
		Form.action = "";
		$(Form).attr("onsubmit","");

		
	int1.setAttribute("type","text");
	int2.setAttribute("type","text");
	int3.setAttribute("type","password");
	
	int1.setAttribute("placeholder","Card no.");
	int2.setAttribute("placeholder","Amount");
	int3.setAttribute("placeholder","password");

		$(int1).addClass('form-control flex-fill mr-auto mr-sm-2 mb-3 mb-sm-0');
		$(int2).addClass('form-control flex-fill mr-auto mr-sm-2 mb-3 mb-sm-0');
		$(int3).addClass('form-control flex-fill mr-auto mr-sm-2 mb-3 mb-sm-0');
		$(int1).attr('id','username');
		$(int2).attr('id','email');
		$(int3).attr('id','password1');

		$(btnSub).attr('type','submit');
		$(btnSub).addClass('btn btn-primary btn-space mx-auto');
		$(btnSub).text("Donate");
		$(footDiv).addClass('modal-footer');

		$(clsbtn).attr('type','button');
		$(clsbtn).addClass('btn btn-default');
		$(clsbtn).attr('data-dismiss','modal');
		$(clsbtn).text("close");
		
		headerDiv.append(head4);
		Form.append(int1);
		Form.append(int2);
		Form.append(int3);
		Form.append(btnSub);
		bodyDiv.append(Form);
		footDiv.append(clsbtn);
		contentDiv.append(headerDiv);
		contentDiv.append(bodyDiv);
		contentDiv.append(footDiv);
		dialogDiv.append(contentDiv);
		myModalDiv.append(dialogDiv);
		containerDiv.append(myModalDiv);
		
		btnDiv.append(btnSlide);
		btnDiv.append(aTag);
		figDiv.append(btnDiv);
		figDiv.append(containerDiv);
		parentDiv.append(figDiv);    
    }

    $.get('putFeaturedhead', function(data, status){
        var studentListContainer = $('#try');
        addFeatured(studentListContainer);
		
	});
	
	
  
/*	$.get('PostList', function(data, status){
        var PostContainer = $('#columns');
		
		data.forEach(item => {
			postList(item,PostContainer);
		  });

		
	});
	
*/ 




});