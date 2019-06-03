$(document).ready(function(){
	recipeSearchPage();
});

function recipeSearchPage()
{
	serverRequest("./ajax-page/recipeSearch.html", "GET", {}, "html").then(function(result) {
		document.getElementById('subContent').innerHTML = result;
		getRecipeListAll();
	});
}

function recipeEnrollPage() {
	serverRequest("./ajax-page/recipeEnroll.html", "GET", {}, "html").then(function(result) {
		document.getElementById('subContent').innerHTML = result;
	});
}

$("li[jControll='navBar']").click(function() {
	let clickElem = this;
	$("li[jControll='navBar']").removeClass('select');
	$(clickElem).addClass('select');

	if($(clickElem).attr("jData") == 'recipeSearch')
		recipeSearchPage();
	else if($(clickElem).attr("jData") == 'recipeEnroll')
		recipeEnrollPage();
});

function getRecipeListAll() {
	serverRequest("http://1.240.181.56:8080/recipe/search/all", "GET", {
        page: 1,
        itemNum: 80
    }, 'json').then(function(result) {
        
        for(var i = 0 ; i < result.data.obj.length; i++)
        {
            var data = result.data.obj[i];
            var listItemHTML = addItem(data);

            $('#listArea').append(listItemHTML);
        }
    });  
}

function addItem(data) {
	var priceStr = data.price == null ? '가격 미제공' : addComma(data.price) + "원";
    var recipeDate = getFormdate(new Date(data.recipeDate), 'min');
  
	var listItemHTML = "";
	listItemHTML += "<li>";
    listItemHTML += "<div class='listItem'>";
    listItemHTML += "<div class='listItemHeader'>"; 
    listItemHTML += "<img src='img/user.svg' width='32px' height='32px'/>";
    listItemHTML += "<p>" + data.nickName + "</p>";
    listItemHTML += "</div>";
    listItemHTML += "<div class='listItemContent'>";
    listItemHTML += "<div class='imgWrap'>";
    listItemHTML += "<img src='" + data.recipeImg + "'>";
    listItemHTML += "</div>";
    listItemHTML += "<div class='info'>";
    listItemHTML += "<p class='title'>" + data.name + "</p>";
    listItemHTML += "<div class='footerInfo'>";
    listItemHTML += "<p class='price'>" + priceStr + "</p>";
    listItemHTML += "<p class='createDate'>" +recipeDate + "</p>";
    listItemHTML += "</div>";
    listItemHTML += "</div>";
    listItemHTML += "</div>";
    listItemHTML += "<div class='wrapper'></div>";
    listItemHTML += "</div>";
    listItemHTML += "</li>";
  
	return listItemHTML;
  }


$('#recipeSearhBtn').click(function() {
	$('#listArea').empty();

	serverRequest("http://1.240.181.56:8080/recipe/search", "GET", {
	  page: 1,
	  itemNum: 30,
	  query: $('#recipeSearhValue').val()
	}, 'json').then(function(result) {
	  for(var i = 0 ; i < result.data.obj.length; i++)
	  {
		let data = result.data.obj[i];
		let listItemHTML  = addItem(data);
	   
		$('#listArea').append(listItemHTML);
	  }  
	});
  });