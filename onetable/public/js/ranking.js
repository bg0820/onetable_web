$(document).ready(function() {
  /*serverRequest("http://1.240.181.56:8080/ingredient/search/all", "GET", {
  page: 1,
  itemNum: 15
}, 'json').then(function(result) {
for(var i = 0 ; i < result.data.length; i++)
{
let data = result.data[i];
let listItemHTML  = addItem(data);

$('#rankingListArea').append(listItemHTML);
}
});*/
});

$(document).ready(function(){
  ranking_1Page();
});

function rangking_1() {
  serverRequest("./ajax-page/ranking_1.html", "GET", {}, "html").then(function(result) {
    document.getElementById('subContent').innerHTML = result;
  });
}

function ranking_2()
{
  serverRequest("./ajax-page/ranking_2.html", "GET", {}, "html").then(function(result) {
    document.getElementById('subContent').innerHTML = result;
    getRecipeListAll();
  });
}

function rangking_3() {
  serverRequest("./ajax-page/ranking_3.html", "GET", {}, "html").then(function(result) {
    document.getElementById('subContent').innerHTML = result;
  });
}

$("li[jControll='navBar']").click(function() {
  let clickElem = this;
  $("li[jControll='navBar']").removeClass('select');
  $(clickElem).addClass('select');

  if($(clickElem).attr("jData") == 'ranking_1')
  ranking_1();

  else	if($(clickElem).attr("jData") == 'ranking_2')
  ranking_2();

  else if($(clickElem).attr("jData") == 'ranking_3')
  ranking_3();

});


function addItem(data) {
  var priceStr =  data.price == null ? '가격 미제공' : addComma(data.price) + "원";
  var recipeDate = getFormdate(new Date(data.recipeDate), 'min');

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
