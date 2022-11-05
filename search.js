




//*********************************************************************************************************************************************
// START - search movies - START 
//*********************************************************************************************************************************************



$(document).on("click", "#search-Btn", function()
{
	$("#display-search").html("");
	$("#main-sub-container").hide();
	$(".next-page-container").hide();

	var searchInput = $("#search-input-style").val();
	var getClass = this.className;

		if(getClass == "search-movies-Btn") //console.log("search-movies-Btn");
		{
			
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "https://api.themoviedb.org/3/search/movie?&api_key=5175c4251906ecb9fc6ab01b124c19b4&query="+searchInput,
			  "method": "GET",
			  "headers": {},
			  "data": "{}"
			}
			searchForMovies(settings);
		}
		else //console.log("search-tv-Btn");
		{
			
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "https://api.themoviedb.org/3/search/tv?api_key=5175c4251906ecb9fc6ab01b124c19b4&language=en-US&query="+searchInput,
			  "method": "GET",
			  "headers": {},
			  "data": "{}"
			}
			searchForTvShow(settings);
		}



function searchForMovies(settings)
{

	$.ajax(settings).done(function (data) //console.log(data);
	{	
   		var insertToContainer = "#display-search";
	    addPopularMovies(data, insertToContainer);

		if( data.total_results == 0) 
		{
			$("#search-results").text('Search results for: '+searchInput+ 'no luck');
		}
		else
		{
			$("#search-results").text('Search results for: '+searchInput);
		}    	
	});
}
function searchForTvShow(settings)
{

	$.ajax(settings).done(function (data) //console.log(data);
	{	
   		var insertToContainer = "#display-search";
	    addTvShow(data, insertToContainer);

		if( data.total_results == 0) 
		{
			$("#search-results").text('Search results for: '+searchInput+ 'no luck');
		}
		else
		{
			$("#search-results").text('Search results for: '+searchInput);
		}    	
	});
}




	$("#search-input-style").val("");
	
});
$("#search-input-style").keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $("#search-Btn").click();//Trigger search button click event       
    }
});

//*********************************************************************************************************************************************
// END - search movies - END 
//*********************************************************************************************************************************************
