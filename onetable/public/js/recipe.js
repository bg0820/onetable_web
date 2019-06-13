var allPage = 1;
var _itemNum = 30;
var type = 'all'

$(document).ready(function() {
	getRecipeList();

	$('#listArea').scroll(function() {
		var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
		var scrollH = $(this).height() + 150; //스크롤바를 갖는 div의 높이
		var contentH = $('#listArea').prop('scrollHeight'); //문서 전체 내용을 갖는 div의 높이

		if(scrollT  + scrollH >= contentH) { // 스크롤바가 맨 아래에 위치할 때
			allPage++;
			getRecipeList();
		}
	});
});


$('#ingredientSearhBtn').click(function() {
	allPage = 1;
	$('#listArea').empty();
	type = 'search';
	getRecipeList();
});

function getRecipeList() {
	if(type === 'all') {
		serverRequest("http://1.240.181.56:8080/recipe/search/all", "GET", {
			page: allPage,
			itemNum: _itemNum
		}, 'json').then(function(result) {
			for(var i = 0 ; i < result.data.obj.length; i++) {
				let data = result.data.obj[i];
            	let listItemHTML = addItem(data);
			
				$('#listArea').append(listItemHTML);
			}
		});
	} else {
		serverRequest("http://1.240.181.56:8080/recipe/search", "GET", {
		page: allPage,
		itemNum: _itemNum,
		query: $('#ingredientSearchValue').val()
		}, 'json').then(function(result) {
			for(var i = 0 ; i < result.data.obj.length; i++)
			{
				let data = result.data.obj[i];
				let listItemHTML = addItem(data);
			
			$('#listArea').append(listItemHTML);
			}  
		});
	}
}

function addItem(data) {
	var priceStr = data.price == null ? '가격 미제공' : addComma(data.price) + "원";
	var recipeDate = getFormdate(new Date(data.priceDate), 'min');

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