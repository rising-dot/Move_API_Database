








$(document).on("click", ".mini-profile-movies", function()
{

	var getId = this.id;
	//console.log(getId);
	  $("#profile-movies-container").html("");

	var refGetUserInfo = database.ref("UsersName").child(getId);

	refGetUserInfo.once("value", function(snapUser)
	{
		//console.log(snapUser.val());
		var theUser = snapUser.val();
		showMoviesOnProfile(theUser);
	});

});










