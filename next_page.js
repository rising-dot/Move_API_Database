
//*********************************************************************************************************************************************
// START - NEXT page BTN left and rigth - START 
//*********************************************************************************************************************************************
var page_Number=1;
var page_1 = 0;
var page_2 = 1;
var page_3 = 2;
var page_4 = 3;




$(document).on("click", ".next-page-right-Btn", function(){
	page_Number++;
	//console.log(page_Number);
	var check_menu_page = $(".next-page-right-Btn").hasClass("tv_pages");
	if (check_menu_page)
	{
		tv_pages(page_Number);
	}
	else
	{
		movies_pages(page_Number);
	}
	
	top_page(page_Number);
	bottom_page(page_Number);

});



$(document).on("click", ".next-page-left-Btn", function(){

    if (page_Number<=1)
    {
    	page_Number=1;
    }
  	else
  	{
    page_Number--;	
  
	$(".top-page-1").text( page_Number + page_1 );
	$(".top-page-2").text( page_Number + page_2 );
	$(".top-page-3").text( page_Number + page_3 );
	$(".top-page-4").text( page_Number + page_4 );
	
	$(".bottom-page-1").text( page_Number + page_1 );
	$(".bottom-page-2").text( page_Number + page_2 );
	$(".bottom-page-3").text( page_Number + page_3 );
	$(".bottom-page-4").text( page_Number + page_4 );

    }

 	var check_menu_page = $(".next-page-left-Btn").hasClass("tv_pages");
	if (check_menu_page)
	{
		tv_pages(page_Number);
	}
	else
	{
		movies_pages(page_Number);
	}
});


function top_page(page_Number)
{
	$(".top-page-1").text(page_1 + page_Number);
	$(".top-page-2").text(page_2 + page_Number);
	$(".top-page-3").text(page_3 + page_Number);
	$(".top-page-4").text(page_4 + page_Number);
}
function bottom_page(page_Number)
{
	$(".bottom-page-1").text(page_1 + page_Number);
	$(".bottom-page-2").text(page_2 + page_Number);
	$(".bottom-page-3").text(page_3 + page_Number);
	$(".bottom-page-4").text(page_4 + page_Number);
}

//*********************************************************************************************************************************************
// END - NEXT page BTN left and rigth - END 
//*********************************************************************************************************************************************


