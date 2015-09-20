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


});