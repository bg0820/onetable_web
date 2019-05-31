$(document).ready(function() {
  serverRequest("http://1.240.181.56:8080/ingredient/search/all", "GET", {
        page: 1,
        itemNum: 30
      }, 'json').then(function(result) {
        for(var i = 0 ; i < result.data.length; i++)
        {
          let data = result.data[i];
          let listItemHTML  = addItem(data);
         
          $('#listArea').append(listItemHTML);
        }
      });
})

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

$('#ingredientSearhBtn').click(function() {
  $('#listArea').empty();
  serverRequest("http://1.240.181.56:8080/ingredient/search", "GET", {
    page: 1,
    itemNum: 30,
    query: $('#ingredientSearchValue').val()
  }, 'json').then(function(result) {
    for(var i = 0 ; i < result.data.length; i++)
    {
      let data = result.data[i];
      let listItemHTML  = addItem(data);
     
      $('#listArea').append(listItemHTML);
    }  
  });
});