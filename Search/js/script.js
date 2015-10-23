// SearchBar Handler
$(function(){
	
	var searchField = $('#query');
	
	var icon = $('#search-btn');
	
	//Focus Event Handler
	
	
	$(searchField).on('focus',function(){
	
		$(this).animate({
			
			width:'100%'
		
		},400);
		
		$(icon).animate({
		
			right:'10px'
			
		
		
		},400);
	});
	
	
	//Blur Event Handler
	
		$(searchField).on('blur',function(){
	
		if(searchField.val() == ''){
			
			$(searchField).animate({
			
				width:'45%'			
			
			},400,function(){});
			
			$(icon).animate({
						
				right:'330px'		
			
			},400,function(){});
		
		
		
		}
	});
	
	
	$('#search-form').submit(function(e){
	
	
	
		//doesn't not submit
		e.preventDefault();
	
	
	});


})

function search(){
//clear result
	$('#results').html(' ');
	$('#buttons').html(' ');
	
//get form input
	q = $('#query').val();	
	
	
	//get method
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
		
			part: 'snippet, id',
			q: q,
			type:'video',
			key: 'AIzaSyA6UI6PrZIZZpxhbPwFIPjKALfxu5MhB8s'},
			function(data){
				
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				
				console.log(data);
				
				
				//loop through the item
				$.each(data.items, function(i, item){
					//Get Output
					var output = getOutput(item);
					
					//Display Results
					$('#results').append(output);
									
				});
				
				var buttons = getButtons(prevPageToken,nextPageToken);
				
				$('#buttons').append(buttons)

				
			
			}
	
	
	);
}

function getOutput(item){
	//define all variable
	
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoData = item.snippet.publishedAt;
	

	//Build the Output String
	var output = '<li>'+
	'<div class="list-left">'+
	'<img src="'+thumb+'">'+
	'</div>'+
	'<div class="list-right">' +
	'<h3>'+title+'</h3>'+
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoData+'</small>'+
	'<p>'+description+'</p>'+
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>'+
	' ';
	
	return output;
	

}
//Build the buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	}
	
	return btnoutput;
}