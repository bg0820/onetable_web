$(document).ready(function(){

    serverRequest("http://1.240.181.56:8080/recipe/search/all", "GET", {
        startNum: 0,
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


function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}


function getFormdate(date, type)
{
	var year = date.getFullYear();
	var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

	var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

	if(type =='full')
	    return year + '.' + month + '.' + day + ' ' + hour + ':' + min + ':' + sec;
	else if(type == 'min')
		return year + '.' + month + '.' + day;
}
