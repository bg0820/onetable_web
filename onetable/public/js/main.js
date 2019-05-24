
var contextVisible = false;

window.onclick = function(event) {
    var eventTarget = event.target;
	var jEventTarget = $(event.target);
    var parentElem = jEventTarget.parents();
    var jControll = jEventTarget.attr('jControll');
    var jData = jEventTarget.attr('jData');

    if($(parentElem[0]).attr('jControll'))
    {
        jControll = $(parentElem[0]).attr('jControll');
        jData = $(parentElem[0]).attr('jData')
    }

    contextVisible = false;
    $('#contextMenu').hide();

    switch (jControll) {
        case 'navBar' :
            $("li[jControll='navBar']").removeClass('select');
            jEventTarget.addClass('select');


            if(jData == 'search')
            {
                serverRequest("./ajax-page/recipeSearch.html", "GET", {}, "html").then(function(result) {
                    document.getElementById('subContent').innerHTML = result;
                });
            } else if(jData == 'enroll') {
                serverRequest("./ajax-page/recipeEnroll.html", "GET", {}, "html").then(function(result) {
                    document.getElementById('subContent').innerHTML = result;
                });
            }

            break;
        case 'menuLink':
            menuLink(jData);

            break;
        case 'contextMenu':
            if(contextVisible)
            {
                $('#contextMenu').hide();
                contextVisible = false;
            }
            else
            {
                $('#contextMenu').show();
                contextVisible = true;
            }
                
            break;
    }
}
/*
function splits(l) {
    var resu = [];

    console.log(l);
    if(l.length == 0)
        return null;

    for(var i = 0 ; i < l.length; i++)
    {
        var item = l[i];

        var itemSpl = item.N.split('/');

        if(itemSpl.length > 0)
        {
            for(var f = 0 ; f < itemSpl.length; f++)
                resu.push({'C': item.C, 'N': itemSpl[f]});
        }
        else
            resu.push({'C': item.C, 'N': item.N});

        var lItem = splits(item.L);
        
        if(lItem != null)
        {
            for(var j = 0 ; j < lItem.length; j++)
            {
                resu.push(lItem[j]);
            }
        }
            
    }

    return resu;
}*/

$(document).ready(function(){
    //serverRequest("/e.json", "GET", {}, "json").then(function(result) {
       //console.log(splits(result.L));
    //});
});

function menuLink(type)
{
    menuSelect(type);

    $('#content').load( './ajax-page/' + type + '.html' );    
}

function menuSelect(type)
{
    $("li[jControll='menuLink']").removeClass("select");
    
    var menuLink = $("li[jControll='menuLink']");
    
    for(var i = 0 ; i < menuLink.length; i++)
    {
        if($(menuLink[i]).attr('jData') == type) {
            $(menuLink[i]).addClass('select');
            break;
        }
    }
}


function serverRequest(url, method, param, dataType)
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url, // 요청 할 주소
            async: false, // false 일 경우 동기 요청으로 변경
            headers: {'API_Version': '1.0'},
            type: method, // GET, PUT
            data: param, // 전송할 데이터
            dataType: dataType, // xml, json, script, html
                success: function(result) {
                    resolve(result);
                }, // 요청 완료 시
                error: function(error) {
                    resolve(error.responseJSON);
                } // 요청 실패
        });
    });    
}