$(document).ready(function(){

    serverRequest("http://1.240.181.56:8080/recipe/search/all", "GET", {
        page: 1,
        itemNum: 80
    }, 'json').then(function(result) {
        
        for(var i = 0 ; i < result.data.obj.length; i++)
        {
            var data = result.data.obj[i];
            
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

            $('#listArea').append(listItemHTML);
        }
    });  
});