
//connect to the datebase



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOIL8h2C_VL3cgZ-0NVxp-J5MLm8m8gF0",
    authDomain: "w-ratings.firebaseapp.com",
    databaseURL: "https://w-ratings.firebaseio.com",
    projectId: "w-ratings",
    storageBucket: "w-ratings.appspot.com",
    messagingSenderId: "732025802319"
  };
  firebase.initializeApp(config);


var database = firebase.database();