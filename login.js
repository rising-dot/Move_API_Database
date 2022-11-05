
$("#sign-out-menu-Btn").hide();



  var usernameTxt = document.getElementById("username"); 
  var emailTxt = document.getElementById("email"); 
  var passwordTxt = document.getElementById("password"); 


$(document).on("click", "#login-Btn", function()
{
  var email = emailTxt.value;
  var password = passwordTxt.value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error)
  {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

    	if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found' )
      {
    	    alert('Wrong password or invalid-email');
    	}
    	else
    	{
    	    alert(errorMessage);
    	}

    	console.log(error);
  });
});




// create accont
$(document).on("click", "#sign-up-Btn", function()
{

    var name = usernameTxt.value;
    //TO DO real Email ??
    var email = emailTxt.value;
    var password = passwordTxt.value;

    //chack for username if exists
    var ref = database.ref('Users');

    ref.orderByChild("username").equalTo(name).once("value", function(snapshot)
    {
      var userData = snapshot.val();
      if (userData)
      {
           console.log("username exists!");
           alert("username exists!");
      }
      else
      {
       
           firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user)
           {
                var user = firebase.auth().currentUser;
                logUser(user); // Optional

            }, 
            function(error)
            {      
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode == "auth/email-already-in-use")
                {
                     alert("email-already-in-use.");
                }
                else
                {
                     alert(errorMessage);
                }

                console.log("my error: "+error);
            });

            function logUser(user)
            {
                var ref = firebase.database().ref("Users/"+ user.uid);

                var obj = {
                    username: name,
                    email: user.email,
                    uid : user.uid   
                };
                ref.set(obj);


                //new root with only username
                var UsersName = database.ref("UsersName");
                UsersName.child(name).set(user.uid);
            


                user.sendEmailVerification().then(function()
                {
                    // Email sent.
                    console.log("we have sent a email to you to verifer");
                    alert("we have sent a email to you to verifer!");

                    $("#main-login-container").hide();
                    
                },
                function(error)
                {
                    console.log("sendEmailVerification error: " + error);
                });
            }
      }
    });
});



  


$(document).on("click", "#sign-out-menu-Btn", function()
{

    firebase.auth().signOut().then(function()
    {
      console.log("Sign-out successful.");

      $("#login-username").text("");
       $("#main-profile-container").empty();


      $("#sign-out-menu-Btn").hide();
      $("#login-menu-Btn").show();
      $("#sign-up-menu-Btn").show();

    }, 
    function(error)
    {
      console.log("An error happened.");  
    });

});






firebase.auth().onAuthStateChanged(function(user)
{ 

   //console.log(user);

  if(user.emailVerified)
  {
      // get username
      var userUid = firebase.auth().currentUser.uid;
      var refUsers = database.ref("Users");
      refUsers.orderByChild("uid").equalTo(userUid).once("value", function(snapshot)
      {

          var snapValue = snapshot.val();
          var getKey = Object.keys(snapValue);
          var the_username = snapValue[getKey[0]].username;

          console.log("you are login as: " + the_username);
          $("#login-username").text(snapValue[getKey[0]].username);


          $("#sign-up-menu-Btn").hide();
          $("#login-menu-Btn").hide();
          $("#main-login-container").hide();
          //$("#main-profile-container").append('<div id="compiere-other-users"><ul id="name-list"></ul></div><div id="profile-movies-container"></div><div id="profile-tvShow-container"></div>');
      

           showMoviesOnProfile(userUid);
           showSeriesOnProfile(userUid);

           compareMovies(the_username);
         

 

           
          //**************************************************************************************************************************
          //               START- UPDATE your users movies ratings points - START 
          //**************************************************************************************************************************

          var refMoviesPointsUpdataProfile = database.ref("UsersProfileMovies").child(userUid);
          refMoviesPointsUpdataProfile.on("value", function(snapUser)
          {
            var rootName = snapUser.key;  //console.log(rootName); //MoviesPointsGet
         
            snapUser.forEach(function(getId)
            {
                var movieId = getId.key;
                // console.log(movieId); //231465
                var userArrayOfWords = {};
                getId.forEach(function(snapRatings)
                {      
                  //console.log(snapRatings.key); //231465
                  snapRatings.forEach(function(snapGetRatings)
                  {
                    var objName = snapGetRatings.key;
                    var objValue = snapGetRatings.val(); 
                    // console.log(objName +": "+ objValue); 
                    userArrayOfWords[objName] = objValue;
                  });
                });
            
                var refMoviesPointsGetUpdata = database.ref("MoviesPointsGet").child(movieId);
                refMoviesPointsGetUpdata.on("value", function(snapMovieId)
                {
                              
                  var getMovieId = snapMovieId.key; //console.log(getMovieId);  //231465
                  var compareArrayToUser = {};
                  snapMovieId.forEach(function(snapData)
                  {
              
                    var objValue = snapData.val();
                    var objName = snapData.key;
                    // console.log(objName+": "+ objValue);
                    // console.log(objName);
                    compareArrayToUser[objName] = objValue;
                  });

                  //console.log(userArrayOfWords); 
                  //console.log(compareArrayToUser); 
                  
                  var updateDataRatings = {};
                  for ( var e in userArrayOfWords )
                  {
                    for ( var i in compareArrayToUser )
                    {
                      // console.log(origArrayGroups[i]);
                      if ( e == i )
                      {
                        // console.log(e +": "+ userArrayOfWords[e]);
                        // console.log(i +": "+ compareArrayToUser[i]);               
                        updateDataRatings[i] = compareArrayToUser[i];
                      }
                    }
                  }
                  // console.log(updateDataRatings);
                  var refUsersProfileMoviesRatings = database.ref("UsersProfileMovies").child(userUid).child(getMovieId).child("ratings");
                  refUsersProfileMoviesRatings.set(updateDataRatings);  

                  //add to the Compare database
                  var refMoviesCompare = database.ref("MoviesCompare");
                  refMoviesCompare.child(the_username).child(getMovieId).set(updateDataRatings);

                });
            });
          });
          //**************************************************************************************************************************
          //               END- UPDATE your users movies ratings points - END 
          //**************************************************************************************************************************



  
          //**************************************************************************************************************************
          //               START- UPDATE your users tvShow ratings points - START 
          //**************************************************************************************************************************

          var refProfileTvShowUpdata = database.ref("UsersProfileTvShow").child(userUid);
          refProfileTvShowUpdata.on("value", function(snapUser)
          {
            var rootName = snapUser.key;  //console.log(rootName); //MoviesPointsGet
         
            snapUser.forEach(function(getId)
            {
                var movieId = getId.key;
                // console.log(movieId); //231465
                var userArrayOfWords = {};
                getId.forEach(function(snapRatings)
                {      
                  //console.log(snapRatings.key); //231465
                  snapRatings.forEach(function(snapGetRatings)
                  {
                    var objName = snapGetRatings.key;
                    var objValue = snapGetRatings.val(); 
                    // console.log(objName +": "+ objValue); 
                    userArrayOfWords[objName] = objValue;
                  });
                });
            
                var refTvShowsGetUpdata = database.ref("TvShowsPointsGet").child(movieId);
                refTvShowsGetUpdata.on("value", function(snapMovieId)
                {
                              
                  var getMovieId = snapMovieId.key; //console.log(getMovieId);  //231465
                  var compareArrayToUser = {};
                  snapMovieId.forEach(function(snapData)
                  {
              
                    var objValue = snapData.val();
                    var objName = snapData.key;
                    // console.log(objName+": "+ objValue);
                    // console.log(objName);
                    compareArrayToUser[objName] = objValue;
                  });

                  //console.log(userArrayOfWords); 
                  //console.log(compareArrayToUser); 
                  
                  var updateDataRatings = {};
                  for ( var e in userArrayOfWords )
                  {
                    for ( var i in compareArrayToUser )
                    {
                      // console.log(origArrayGroups[i]);
                      if ( e == i )
                      {
                        // console.log(e +": "+ userArrayOfWords[e]);
                        // console.log(i +": "+ compareArrayToUser[i]);               
                        updateDataRatings[i] = compareArrayToUser[i];
                      }
                    }
                  }
                  // console.log(updateDataRatings);
                  var refUsersProfileTvShowRatings = database.ref("UsersProfileTvShow").child(userUid).child(getMovieId).child("ratings");
                  refUsersProfileTvShowRatings.set(updateDataRatings);  

                  //add to the Compare database
                  var refTvShowsCompare = database.ref("TvShowsCompare");
                  refTvShowsCompare.child(the_username).child(getMovieId).set(updateDataRatings);
                });
            });
          });
          //**************************************************************************************************************************
          //               END- UPDATE your users tvShow ratings points - END 
          //**************************************************************************************************************************
 











      });









      //*********************************************************************************************************************************************
      // START - Calculate movies points - START 
      //*********************************************************************************************************************************************
      //every time you add words it will calculate the totalt and add it to MoviesPointsGet
      var RefMoviesPointsCalOn = database.ref("MoviesPointsCal");
      RefMoviesPointsCalOn.on("value", function(snapCal)
      { 
        //console.log("Cal is on!!!");
        var userUid = firebase.auth().currentUser.uid;
        snapCal.forEach(function(objMovieIdSnap)
        {
          var objMovieId = objMovieIdSnap.key;
          //console.log(objMovieId);
        
          objMovieIdSnap.forEach(function(objWordsSnap)
          {

          var objWords = objWordsSnap.val();
          var objWordsKey = objWordsSnap.key;
          var countWords = Object.keys(objWords).length;
          //console.log(objWordsKey+": "+countWords);   

          // save the calculation to MoviesPointsGet
          var RefMoviesPointsGet = database.ref("MoviesPointsGet");
          RefMoviesPointsGet.child(objMovieId).child(objWordsKey).set(countWords);    


          // var refUsersProfileMoviesMovies = database.ref("UsersProfileMoviesMovies").child(userUid).child(objMovieId);
          // refUsersProfileMoviesMovies.child("ratings").child(objWordsKey).set(countWords);  
          
          });
        });

      });
      //*********************************************************************************************************************************************
      // END - Calculate movies points - END 
      //********************************************************************************************************************************************



 //*********************************************************************************************************************************************
      // START - Calculate TvShow points - START 
      //*********************************************************************************************************************************************
      //every time you add words it will calculate the totalt and add it to MoviesPointsGet
      var RefTvShowPointsCalOn = database.ref("TvShowPointsCal");
      RefTvShowPointsCalOn.on("value", function(snapCal)
      { 
        //console.log("Cal is on!!!");
        var userUid = firebase.auth().currentUser.uid;
        snapCal.forEach(function(objMovieIdSnap)
        {
          var objMovieId = objMovieIdSnap.key;
          //console.log(objMovieId);
        
          objMovieIdSnap.forEach(function(objWordsSnap)
          {

            var objWords = objWordsSnap.val();
            var objWordsKey = objWordsSnap.key;
            var countWords = Object.keys(objWords).length;
            //console.log(objWordsKey+": "+countWords);   

            // save the calculation to MoviesPointsGet
            var RefTvShowsPointsGet = database.ref("TvShowsPointsGet");
            RefTvShowsPointsGet.child(objMovieId).child(objWordsKey).set(countWords);    

          });
        });

      });
      //*********************************************************************************************************************************************
      // END - Calculate TvShow points - END 
      //*********************************************************************************************************************************************



















 



  }
  else
  {
      console.log('Email is not verified');
      console.log("No user is signed in.");

  }


});




























