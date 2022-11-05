 




function compareMovies(the_username)
{





 //*********************************************************************************************************************************************
          // START - Compare movies - START 
          //*********************************************************************************************************************************************
          
          var firstArrayCompare = {};
          var refCompareMoviesOn = database.ref("MoviesCompare").child(the_username);
          refCompareMoviesOn.once("value", function(snapCompare)
          { 
           // console.log(refCompareMoviesOn.toString());
            
            var objName = snapCompare.key;
            var objValue = snapCompare.val();
            var makeKey = Object.keys(objValue);
            var makeKeyLength = Object.keys(objValue).length; // console.log(makeKeyLength); 
           // console.log(objName);
           // console.log(objValue); 
            snapCompare.forEach(function(snap)
            {
                var objNameSnap = snap.key;
                var objValueSnap = snap.val();
                // console.log(objNameSnap);
                // console.log(objValueSnap);
                firstArrayCompare[objNameSnap] = objValueSnap;
            });

            var jsObj = {};
            var secondArray = {};
            var refCompareMovies = database.ref("MoviesCompare");
            refCompareMovies.once("value", function(compareData)
            { 
                  // var objNameCompare = compareData.key;
                  // var objValueCompare = compareData.val();
                  // console.log(objNameCompare);
                  // console.log(objValueCompare);
              compareData.forEach(function(snapMoviesNumbers)
              {
                 
                var objNameCompare = snapMoviesNumbers.key;   // console.log(objNameCompare);
                var objValueCompare = snapMoviesNumbers.val();  //  console.log(objValueCompare);
                secondArray[objNameCompare] = objValueCompare;
              });

              
                //console.log(secondArray);
                for (var k in secondArray)
                {
                  var max = [];
                 
                  
                  //console.log(secondArray[k]); //Object {166426: Object, 283995: Object, 297762: Object, 321612: Object, 335797: Object}
                  var newArray = secondArray[k];
                  for( var x in newArray)
                  {  
                     //console.log(x); // 68453
                     //console.log(newArray[x]); //like: 2, good:1
                     for(var h in firstArrayCompare )
                     {
                        //console.log(h);
                        if(x == h)
                        {
                          // console.log(x);
                          // console.log(firstArray[h]);
                          // console.log(newArray[h]);
                          // console.log("---------------------------");

                          //find the totalt length
                          var object1 = firstArrayCompare[h];
                          var object2 = newArray[h];
                          var object = $.extend({}, object1, object2);
                          var objectLength = Object.keys(object).length; //console.log( objectLength );
                          
                          var arrayTotalt = [];

                          for (var l in object1)
                          {  
                            for (var j in object2)
                            {  
                              if (l == j)
                              {     
                                //console.log(l );
                                arrayTotalt.push(l);  
                              }
                            }
                          }
                         
                          var addTotaltNumber = (arrayTotalt.length / objectLength)*100; //console.log( addTotaltNumber );
                          max.push(addTotaltNumber); // console.log( max );     
                          
                        }
                     }
                  } 
            

                  var my_Y = 0;
                  for (var s = 0; s < max.length; s++)
                  {
                    my_Y = my_Y + max[s];
                  }
                 // console.log(my_Y);
                 // console.log( max.length *100 );

                  //console.log(k); // rising
                  // The compare result !!!!
                  var theCompareResult = parseInt( (my_Y / (max.length *100) *100).toFixed(2) );
                  //console.log( theCompareResult );
                 

                 
                  //refMoviesProfileCompare.child("test").remove();

                  if(theCompareResult > 0)
                  {
                    jsObj[k] = theCompareResult;

                      //refMoviesProfileCompare.child(k).set(theCompareResult);
                  }
                }

                // START - Sort the compare Procent and insert it to the database ( max 20 )
                var refMoviesProfileCompare = database.ref("MoviesProfileCompare"); 
                var arr = [];
                for (var key in jsObj)
                {
                  var object = 
                  {
                      "name": key,
                      "value": jsObj[key]
                  }; 
                  arr.push(object);
                }
                //console.log(arr);

                var sorted = arr.sort(function(a, b) {
                  return b.value - a.value;
                });
                sorted.length = 20;
                //console.log(sorted);
                refMoviesProfileCompare.set(sorted);
               // END - Sort the compare Procent and insert it to the database ( max 20 )




            });

   




          });


        // START/movies - append the compare procent data to the profile
        var refMoviesProfileCompare = database.ref("MoviesProfileCompare");
        refMoviesProfileCompare.orderByValue().limitToLast(8).once("value", function(dataProcent)
        {
           dataProcent.forEach(function(snapProcent)
           {
              //console.log( snapProcent.val());
              var getValue = snapProcent.val();
              //console.log( getValue.name );
              //console.log( getValue.value );
              $("#the-compare-result").append('<div id="'+getValue.name+'" class="mini-profile-movies"><h3>'+ getValue.name+'</h3><h2>'+ getValue.value+'<span>%</span></h2></div>');
           });
        });
        // END/movies  - append the compare procent data to the profile




          //*********************************************************************************************************************************************
          // END - Compare movies - END 
          //*********************************************************************************************************************************************

}