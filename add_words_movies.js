





$(document).on("click", ".submit-movies-keys", function()
{	
	var userUid = firebase.auth().currentUser.uid;
	//get id of the Btn
	var getMovieId = this.id;
	$(".profile-movies-rating-container."+getMovieId+"").html("");
	var data_Key_Value = $(this).parent().parent().find(".toggle-Get-Value").map(function()
	{
		return $(this).text();
	}).get();


  // console.log(getWords);
   console.log(data_Key_Value);


	

		var refMoviesPointsCal = database.ref("MoviesPointsCal").child(getMovieId);
 		refMoviesPointsCal.once('value').then(function(snapPoints)
 		{
			//Remove all data(ratings) from this user
			var snapValue = snapPoints.val();
 			if (snapValue)
 			{
				var getKey = Object.keys(snapValue);
		        for (var i = 0; i < getKey.length; i++)
		        {
		          	refMoviesPointsCal.child(getKey[i]+"/"+userUid).remove();
		        }
 			}

		}).then(function()
		{
			//Then insert the data 
			for (var h = 0; h < data_Key_Value.length; h++)
			{
			    refMoviesPointsCal.child(data_Key_Value[h]).child(userUid).set(data_Key_Value[h]);
			}
		

//**************************************************************************************************************************
// 							  Start - check if user have this movie ratinged - Start 
//									if he have then replace only the ratings									
//**************************************************************************************************************************	

		
			var refUsersProfileMovies = database.ref("UsersProfileMovies").child(userUid).child(getMovieId);
			refUsersProfileMovies.once("value", function(snapCheck)
			{

		 		var exists = snapCheck.val();
			    if (exists)
			    {
			    	//insert movie ratings to user	
			    	var refUsersProfileMoviesRatings = database.ref("UsersProfileMovies").child(userUid).child(getMovieId);	
					var refGetPoints = database.ref("MoviesPointsGet").child(getMovieId);
					refGetPoints.orderByValue().once("value", function(snapGetPoints)
					{
						refUsersProfileMoviesRatings.child("ratings").remove(); // remove the node before insert it to the database --- look down at 
																				// refUsersProfileMoviesRatings.child("ratings").child(data_Key_Value[h]).set(objValue); 
						//Insert the Ratings
						snapGetPoints.forEach(function (snapName)
						{	

							var objValue = snapName.val();
							var objName = snapName.key;
							//console.log(objName+": "+objValue);
							for (var h = 0; h < data_Key_Value.length; h++)
							{
								if (objName == data_Key_Value[h])
								{
									//console.log(objName+": "+ data_Key_Value[h]+": "+objValue );		
									refUsersProfileMoviesRatings.child("ratings").child(data_Key_Value[h]).set(objValue); 
									//ratings_array[data_Key_Value[h]] = objValue;
									$(".profile-movies-rating-container."+getMovieId+"").prepend('<div class="word-container"><span class="count-value">'+objValue+'</span><p class="profile-user-value">'+data_Key_Value[h]+'</p><div>');
								}
							}	
						});
					});
			   		console.log("movie exists!");
			    }	
			    else
			    {

					var movie_Api = "https://api.themoviedb.org/3/movie/"+getMovieId+"?api_key=5175c4251906ecb9fc6ab01b124c19b4&language=en-US";
				    $.getJSON(movie_Api, function(data)
				    {
 
						//insert movie ratings to user
						var refGetPoints = database.ref("MoviesPointsGet").child(getMovieId);
						refGetPoints.once("value", function(snapGetPoints)
						{
		    
							var imagelink = "http://image.tmdb.org/t/p/w500";
						  	var movie_poster = imagelink+data.poster_path;
					    	var title = add3Dots(data.title);
					    	var year = getYear(data.release_date);
					    	// var id = data.id;    
					    	var genres_length = data.genres.length;  
					    	var genres_array={}; //console.log(genres_array);
							var ratings_array={};
							
							//insert the info
							var temp={};  
							temp["the_title"] = title;
							temp["the_year"] = year;
							temp["poster"] = movie_poster;
							temp["the_id"] = getMovieId;
							temp["the_genres"] = genres_array;
							temp["ratings"] = ratings_array;
							
							//insert the genres
							for (var i = 0; i < genres_length; i++)
							{
								//UsersProfile.child("the_genres").child(data.genres[i].name).set(data.genres[i].name);
								genres_array[data.genres[i].name] = data.genres[i].name;
							}

							//Insert the Ratings
							snapGetPoints.forEach(function (snapName)
							{	

								var objValue = snapName.val();
								var objName = snapName.key;
								//console.log(objName+": "+objValue);
								for (var h = 0; h < data_Key_Value.length; h++)
								{
									if (objName == data_Key_Value[h])
									{
										//console.log(objName+": "+ data_Key_Value[h]+": "+objValue );		
										ratings_array[data_Key_Value[h]] = objValue;
									}
								}	
							});


							refUsersProfileMovies.set(temp);

						});
					});
			    	 console.log(" not exists!");
			    }	

			});




//**************************************************************************************************************************
// 							  END - check if user have this movie ratinged - END 
//									else just insert it all to UsersProfile							
//**************************************************************************************************************************


		
		});


});









