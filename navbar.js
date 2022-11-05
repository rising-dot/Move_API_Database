
$(document).on("click", ".key-words-style", function()
{
    $( this ).toggleClass( "toggle-Get-Value" );
});






$("#main-login-container").hide();
$("#main-profile-container").hide();
$("#page-tvShow").hide();




$(document).on("click", "#login-menu-Btn", function()
{
	$("#username").hide();
	$("#sign-up-Btn").hide();

	$("#main-login-container").toggle();

	$("#login-Btn").show();

});
$(document).on("click", "#sign-up-menu-Btn", function()
{
	$("#login-Btn").hide();

	$("#main-login-container").toggle();

	$("#username").show();
	$("#sign-up-Btn").show();

});












$(document).on("click", "#tvShow-menu-Btn", function(){
	$("#main-profile-container").hide();
	$("#main-sub-container").show();
	$("#page-popularMovies").hide();
	$("#page-tvShow").show();
	$("#display-search").html("");

	$(".next_page").addClass("tv_pages");

	page_Number=1;

 	top_page(page_Number);
	bottom_page(page_Number);
	tv_pages(page_Number);

	$(".next-page-container").show();



$("#search-Btn").removeClass( "search-movies-Btn" ).addClass( "search-tvShow-Btn" );

});


$(document).on("click", "#movies-menu-Btn", function(){
	$("#main-profile-container").hide();
	$("#main-sub-container").show();
	$("#page-popularMovies").show();
	$("#page-tvShow").hide();
	$("#display-search").html("");

	$(".next_page").removeClass("tv_pages");

	page_Number=1;

	top_page(page_Number);
	bottom_page(page_Number);
	movies_pages(page_Number);

	$(".next-page-container").show();

$("#search-Btn").removeClass( "search-tvShow-Btn" ).addClass( "search-movies-Btn" );

});




$(document).on("click", "#profile-menu-Btn", function(){
	$("#main-profile-container").show();
	$("#main-sub-container").show();
	$("#page-popularMovies").hide();
	$("#page-tvShow").hide();
	$("#display-search").html("");

	$(".next-page-container").hide();
	$("#main-display-search-container").hide();

});





//**************************************************************************************************************************
// 							  START - Check for the length of the (add word btn) - START 
//**************************************************************************************************************************
$(document).on("keyup", ".count-length", function()
{
	var getId = this.id;
    var el = $(this);

    if(el.val().length >= 16)
    {
        el.val( el.val().substr(0, 15) ); // delete the value if over 15 
    } 
    else 
    {
        $(".charNum-"+getId+"").text(15-el.val().length + " Max");
    }
});
//**************************************************************************************************************************
// 							  END - Check for the length of the (add word btn) - END 
//**************************************************************************************************************************











//**************************************************************************************************************************
// 							  START - add words btn - START 
//**************************************************************************************************************************


$(document).on("click", ".submitWordsBtn", function()
{

	var getMovieId = this.id;
	var getWords = $(".add-input-"+getMovieId+"").val();
	// console.log(getWords);
	// console.log(getMovieId);

	if (getWords)
	{

		var check_Key_Value = $(this).parent().parent(".movie-rating-container").find(".key-words-style").map(function()
		{
			return $(this).text();
		}).get();

			// console.log(getWords);
			// console.log(check_Key_Value);
		if($.inArray(getWords,check_Key_Value) == -1)
		{
			//console.log("hi");
			$(".rating-container."+getMovieId+"").append('<p class="key-words-style toggle-Get-Value">'+getWords+'</p>');
		}
		else
		{
			console.log("we will not insert this word");	
			$(".error-message-exist."+getMovieId+"").show();
			$(".error-message-exist."+getMovieId+"").text('This word exist!').fadeOut(1600);
		}
	}

});
$(".add-input-style").keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $(".submitWordsBtn").click();//Trigger search button click event       
    }
});


//**************************************************************************************************************************
// 							  END - add words btn - END 
//**************************************************************************************************************************










//**************************************************************************************************************************
// 							  START - Menu- START 
//**************************************************************************************************************************


// username click - display the sign out Btn
$(document).on("click", "#login-username", function(){
	$("#sign-out-menu-Btn").toggle();

});





// toggle mobil menu
$(document).on("click", ".toggle", function(){
  $(".show-toggle").toggleClass('active');
});

//**************************************************************************************************************************
// 							  END - Menu - END 
//**************************************************************************************************************************










































