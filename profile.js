


$("#profile-tvShow-container").hide();


$(document).on("click", "#show-movies", function()
{
    $("#profile-movies-container").show();
    $("#profile-tvShow-container").hide();
});




$(document).on("click", "#show-series", function()
{
   $("#profile-movies-container").hide();
   $("#profile-tvShow-container").show();
});





function showMoviesOnProfile(userUid)
{
	
    //**************************************************************************************************************************
    //                START - LOAD all you profile movies data when login - START 
    //**************************************************************************************************************************
          var refCheckProfileAdd = database.ref("UsersProfileMovies/" + userUid);
          refCheckProfileAdd.on("child_added", function(snapCheckProfile) // .limitToLast(5)
          {

            //console.log("child added" , snapCheckProfile.val());
            var get_infoSnap = snapCheckProfile.val();
            var getkey = Object.keys(snapCheckProfile);
            //  console.log(get_infoSnap); 

            //var getObjValue = get_infoSnap.val();
            var movie_poster = get_infoSnap.poster; 
            var title = get_infoSnap.the_title;
            var year = get_infoSnap.the_year; 
            var id = get_infoSnap.the_id; 
            //console.log(title); 
            $("#profile-movies-container").append('<div class="item-movie-container"><div class="movie-poster-container"><img src='+movie_poster+'></div><div class="movie-details-container"><h2 class="title">'+title+'</h2><div class="year-genres"><p>'+year+'</p><div class="profile-movies-genres-container '+id+'"></div></div><div class="main-rating-container"><h3 class="title-this-movie">This movie is: </h3><div class="profile-movies-rating-container '+id+'"></div></div></div></div>');

            var ratings = get_infoSnap.ratings; 

            var getObjRatings = Object.keys(ratings);
            var getObjRatingLength = Object.keys(ratings).length;

            //console.log(ratings);
            // console.log(getObjRatings); //["awsome", "hey guy"]
            // console.log(getObjRatingLength); //2
            // console.log(getObjRatings[0]); //awsome
            // console.log(ratings[getObjRatings[1]]); // value 2

            for (var i = 0; i < getObjRatingLength; i++)
            {
              // console.log("look "+ratings[getObjRatings[i]]);
              $(".profile-movies-rating-container."+id+"").append('<div class="word-container"><span class="count-value">'+ratings[getObjRatings[i]]+'</span><p class="profile-user-value">'+getObjRatings[i]+'</p><div>');
                  
            }


            var genres = get_infoSnap.the_genres; 
            var getObjGenres = Object.keys(genres);
            var getObjGenresLength = Object.keys(genres).length;

            for (var i = 0; i < getObjGenresLength; i++)
            {
              $(".profile-movies-genres-container."+id+"").append('<p class="genres-style">' +getObjGenres[i] +'</p>');
                  
            }

          });
    //**************************************************************************************************************************
    //                END - LOAD all you profile movies data when login - END 
    //**************************************************************************************************************************
}





function showSeriesOnProfile(userUid)
{
	
    //**************************************************************************************************************************
    //                START - LOAD all you profile tvShow data when login - START 
    //**************************************************************************************************************************
          var refCheckProfileTvShowAdd = database.ref("UsersProfileTvShow/" + userUid);
          refCheckProfileTvShowAdd.on("child_added", function(snapCheckProfile) // .limitToLast(5)
          {

            //console.log("child added" , snapCheckProfile.val());
            var get_infoSnap = snapCheckProfile.val();
            var getkey = Object.keys(snapCheckProfile);
            //  console.log(get_infoSnap); 

            //var getObjValue = get_infoSnap.val();
            var movie_poster = get_infoSnap.poster; 
            var title = get_infoSnap.the_title;
            var year = get_infoSnap.the_year; 
            var id = get_infoSnap.the_id; 
            //console.log(title); 
            $("#profile-tvShow-container").append('<div class="item-movie-container"><div class="movie-poster-container"><img src='+movie_poster+'></div><div class="movie-details-container"><h2 class="title">'+title+'</h2><div class="year-genres"><p>'+year+'</p><div class="profile-tvShow-genres-container '+id+'"></div></div><div class="main-rating-container"><h3 class="title-this-movie">This movie is: </h3><div class="profile-tvShow-rating-container '+id+'"></div></div></div></div>');

            var ratings = get_infoSnap.ratings; 

            var getObjRatings = Object.keys(ratings);
            var getObjRatingLength = Object.keys(ratings).length;

            //console.log(ratings);
            // console.log(getObjRatings); //["awsome", "hey guy"]
            // console.log(getObjRatingLength); //2
            // console.log(getObjRatings[0]); //awsome
            // console.log(ratings[getObjRatings[1]]); // value 2

            for (var i = 0; i < getObjRatingLength; i++)
            {
              // console.log("look "+ratings[getObjRatings[i]]);
              $(".profile-tvShow-rating-container."+id+"").append('<div class="word-container"><span class="count-value">'+ratings[getObjRatings[i]]+'</span><p class="profile-user-value">'+getObjRatings[i]+'</p><div>');
                  
            }


            var genres = get_infoSnap.the_genres; 
            var getObjGenres = Object.keys(genres);
            var getObjGenresLength = Object.keys(genres).length;

            for (var i = 0; i < getObjGenresLength; i++)
            {
              $(".profile-tvShow-genres-container."+id+"").append('<p class="genres-style">' +getObjGenres[i] +'</p>');
                  
            }


          });

    //**************************************************************************************************************************
    //                END - LOAD all you profile tvShow data when login - END 
    //**************************************************************************************************************************
}





























