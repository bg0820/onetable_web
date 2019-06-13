var allPage = 1;
var _itemNum = 30;
var type = 'all'
$(document).ready(function() {
	getIngredientList();

	$('#listArea').scroll(function() {
		var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
		var scrollH = $(this).height() + 20; //스크롤바를 갖는 div의 높이
		var contentH = $('#listArea').prop('scrollHeight'); //문서 전체 내용을 갖는 div의 높이

		if(scrollT  + scrollH >= contentH) { // 스크롤바가 맨 아래에 위치할 때
			allPage++;
			getIngredientList();
		}
	});

	$('#ingredientSearhBtn').click(function() {
		allPage = 1;
		$('#listArea').empty();
		type = 'search';
		getIngredientList();
	});
})



function getIngredientList() {
	if(type === 'all') {
		serverRequest("http://1.240.181.56:8080/ingredient/search/all", "GET", {
			page: allPage,
			itemNum: _itemNum
		}, 'json').then(function(result) {
		for(var i = 0 ; i < result.data.length; i++) {
			let data = result.data[i];
			let listItemHTML  = addItem(data);
		
			$('#listArea').append(listItemHTML);
		}
		});
	} else {
		serverRequest("http://1.240.181.56:8080/ingredient/search", "GET", {
		page: allPage,
		itemNum: _itemNum,
		query: $('#ingredientSearchValue').val()
		}, 'json').then(function(result) {
			for(var i = 0 ; i < result.data.length; i++)
			{
			let data = result.data[i];
			let listItemHTML  = addItem(data);
			
			$('#listArea').append(listItemHTML);
			}  
		});
	}
}

function addItem(data) {
  var priceStr = addComma(data.price) + "원";
  var recipeDate = getFormdate(new Date(data.priceDate), 'min');

  var listItemHTML = "";
  listItemHTML += "<li>";
  listItemHTML += "<div class='listItem'>";
  listItemHTML += "<div class='listItemContent'>";
  listItemHTML += "<div class='imgWrap'>";
  listItemHTML += "<img src='" + data.imgUrl + "'>";
  listItemHTML += "</div>";
  listItemHTML += "<div class='info'>";
  listItemHTML += "<p class='title'>" + data.displayName + "</p>";
  listItemHTML += "<div class='footerInfo'>";
  listItemHTML += "<p class='price'>" + priceStr + "</p>";
  listItemHTML += "<p class='createDate'>" +recipeDate + "</p>";
  listItemHTML += "</div>";
  listItemHTML += "</div>";
  listItemHTML += "</div>";
  listItemHTML += "<div class='wrapper' jControll='ingredientDetailView' jData='" + data.ingredientItemId +"'></div>";
  listItemHTML += "</div>";
  listItemHTML += "</li>";

  return listItemHTML;
}

