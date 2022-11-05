


tv_pages();
function tv_pages(tvNextPage)
{
		$("#page-tvShow").empty();
		var dataItemOfTv = "https://api.themoviedb.org/3/tv/popular?page=1&language=en-US&api_key=5175c4251906ecb9fc6ab01b124c19b4&page="+tvNextPage;
	    $.getJSON(dataItemOfTv, function(data)
	    {
	    	//console.log(data);
	 		var insertToContainer = "#page-tvShow";
	 		addTvShow(data, insertToContainer)
		});

}


function addTvShow(data, insertToContainer)
{
var imagelink = "http://image.tmdb.org/t/p/w500";

   	for (var i = 0; i < data.results.length; i++)
	{
		  var movie_poster = imagelink+data.results[i].poster_path;
	  	var title = add3Dots(data.results[i].name);
	   	var year = getYear(data.results[i].first_air_date);
	   	var id = data.results[i].id;
		
	   	$(""+insertToContainer+"").append('<div class="item-movie-container"><div class="movie-poster-container"><img src='+movie_poster+'></div><div class="movie-details-container"><div class="movie-rating-container"><h2 class="title">'+title+'</h2><div class="year-genres"><p class="year">'+year+'</p><div class="main-genres-container '+id+'"></div></div><div class="wrapper-input"><button class="submitWordsBtn" id="'+id+'">This serie is:</button><input id="'+id+'" class="add-input-'+id+' count-length add-input-style" type="text" placeholder=""><div class="charNum-'+id+'"></div><div class="error-message-exist '+id+'"></div></div><div class="rating-container '+id+'"></div></div><div class="wrapper-submit-all-keys"><button id="'+id+'" class="submit-tvShow-keys">Submit Your Rating</button></div></div></div>');	
	   	
		var data_length = data.results[i].genre_ids.length; // i
		var genres_length = tv_genres["genres"].length;

		for (var k = 0; k < data_length; k++)
		{ 
			for (var x = 0; x < genres_length; x++)
			{  
				//console.log(data.results[i].genre_ids[x]);
				if (data.results[i].genre_ids[k] == tv_genres["genres"][x].id)
				{
					//console.log(tv_genres["genres"][x].name);
					$(".main-genres-container."+id+"").append('<p class="genres-style">' +tv_genres["genres"][x].name +'</p>');
				}
			}
		}
		addRatingsTvShows(id);	
	}
}





//*********************************************************************************************************************************************
// START - Add Movies Ratings to the page - START 
//*********************************************************************************************************************************************

function addRatingsTvShows(passId)
{
  //console.log(passId);
  // // add the last child that was added <p class="key-words-style">'+objName+'</p><span>: '+objLength+'</span>
  var RefMoviesPointsGetOrder = database.ref("TvShowsPointsGet").child(passId);
  RefMoviesPointsGetOrder.orderByValue().once("value", function(snapMovieId)
  {
    //console.log(snapInfo.key +": "+snapInfo.val() ); //10195  
    //console.log(snapMovieId.key);
    var getMovieId = snapMovieId.key;
    snapMovieId.forEach(function(snapData)
    {
      var objValue = snapData.val();
      var objName = snapData.key;
      //console.log(objName +": "+objValue ); 
      $(".rating-container."+getMovieId+"").prepend('<div class="word-container"><span class="count-value">'+objValue+'</span><p class="key-words-style">'+objName+'</p></div>');
    });
  });
}

//*********************************************************************************************************************************************
// END -  Add Movies Ratings to the page - END 
//*********************************************************************************************************************************************







var tv_genres = {
  "genres": [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
};














