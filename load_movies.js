


   
//*********************************************************************************************************************************************
// START - front-page API   popular movies same as just movies - START 
//*********************************************************************************************************************************************




movies_pages();
function movies_pages(nextPage)
{

  $("#page-popularMovies").empty();	
	var movie_api = "https://api.themoviedb.org/3/movie/popular?api_key=5175c4251906ecb9fc6ab01b124c19b4&language=en-US&page="+nextPage;
	$.getJSON(movie_api, function(data) //console.log(data);
	{
	    var insertToContainer = "#page-popularMovies";
	    addPopularMovies(data, insertToContainer);

	});

}


//*********************************************************************************************************************************************
// END - front-page API   popular movies same as just movies - END 
//*********************************************************************************************************************************************






function addPopularMovies(data, insertToContainer)
{
	var imagelink = "http://image.tmdb.org/t/p/w500";

	for (var i = 0; i < data.results.length; i++)
	{
		var movie_poster = imagelink+data.results[i].poster_path;
	  	var title = add3Dots(data.results[i].title);
	   	var year = getYear(data.results[i].release_date);
	   	var id = data.results[i].id;
	
	   	$(""+insertToContainer+"").append('<div class="item-movie-container"><div class="movie-poster-container"><img src='+movie_poster+'></div><div class="movie-details-container"><div class="movie-rating-container"><h2 class="title">'+title+'</h2><div class="year-genres"><p class="year">'+year+'</p><div class="main-genres-container '+id+'"></div></div><div class="wrapper-input"><button class="submitWordsBtn" id="'+id+'">This movie is:</button><input id="'+id+'" class="add-input-'+id+' count-length add-input-style" type="text" placeholder=""><div class="charNum-'+id+'"></div><div class="error-message-exist '+id+'"></div></div><div class="rating-container '+id+'"></div></div><div class="wrapper-submit-all-keys"><button id="'+id+'" class="submit-movies-keys">Submit Your Rating</button></div></div></div>');	
	   	
	   	//console.log(data.results[0].genre_ids[0]);
		var data_length = data.results[i].genre_ids.length; 
		var genres_length = movies_genres["genres"].length;

		for (var k = 0; k < data_length; k++)
		{ 
			for (var x = 0; x < genres_length; x++)
			{  
				//console.log(data.results[i].genre_ids[x]);
				if (data.results[i].genre_ids[k] == movies_genres["genres"][x].id)
				{
					//console.log(genres["genres"][x].name);
					$(".main-genres-container."+id+"").append('<p class="genres-style">' +movies_genres["genres"][x].name +'</p>');
				}
			}
		}		
	   	addRatings(id);	
	}	
}


//*********************************************************************************************************************************************
// START - Add Movies Ratings to the page - START 
//*********************************************************************************************************************************************

function addRatings(passId)
{
  //console.log(passId);
  // // add the last child that was added <p class="key-words-style">'+objName+'</p><span>: '+objLength+'</span>
  var RefMoviesPointsGetOrder = database.ref("MoviesPointsGet").child(passId);
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







  var movies_genres = {"genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
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
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
};



















	






