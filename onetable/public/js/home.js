
$(document).ready(function(){
    getPopularRecipe();
});

async function getPopularRecipe() {
    let resp = await serverRequest('http://1.240.181.56:8080/home/popular/recipe', "GET", {}, "json");

    console.log(resp);

    for(var  i = 0 ;  i< resp.data.length; i++)
    {
        let item =  resp.data[i];

        var html = "";

        html += "<div class='item'>";
        html += "<div class='listItem'>";
        html += "<div class='listItemHeader'><img src='img/user.svg' width='32px' height='32px'>";
        html += "<p>system</p>";
        html += "</div>";
        html += "<div class='listItemContent'>";
        html += "<div class='imgWrap'>";
        html += "<img src='https://cloudfront.haemukja.com/vh.php?url=https://d1hk7gw6lgygff.cloudfront.net/uploads/direction/image_file/66892/mid_thumb________.jpg&amp;convert=jpgmin&amp;rt=600'>";
        html += "<p class='evaluate'>평점</br>4.5점</p>";
        html += "</div>";
        html += "<div class='info'>";
        html += "<div class='interaction'>";
        html += "<span class='I_BLANK_LIKE select'></span>";
        html += "<p>3명</p>";
        html += "</div>";
        html += "<p class='title'>알리오올리오</p>";
        html += "<div class='footerInfo'>";
        html += "<p class='price'>92,680원</p>";
        html += "<p class='createDate'>2019.05.17</p>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "<div class='wrapper'></div>";
        html += "</div>";
        html += "</div>";


        $('#popula').append(html);
    }
}
