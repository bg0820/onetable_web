
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

    case 'menuLink':
    menuLink(jData);

    switch(jData) {
      case 'home' :
      break;
      case 'ingredient' :
      break;
      case 'recipe':
      serverRequest("http://1.240.181.56:8080/ingredient/search/all", "GET", {
        startNum: 30,
        itemNum: 60
      }, 'json').then(function(result) {
        for(var i = 0 ; i < result.data.obj.length; i++)
        {
          var data = result.data.obj[i];

          var priceStr = addComma(data.price) + "원";
          var recipeDate = getFormdate(new Date(data.priceDate), 'min');
          var listItemHTML = "";
          listItemHTML += "<li>";
          listItemHTML += "<div class='listItem'>";
          listItemHTML += "<div class='listItemHeader'>";
          listItemHTML += "<img src='img/user.svg' width='32px' height='32px'/>";
          listItemHTML += "<p>" + data.displayName + "</p>";
          listItemHTML += "</div>";
          listItemHTML += "<div class='listItemContent'>";
          listItemHTML += "<div class='imgWrap'>";
          listItemHTML += "<img src='" + data.imgUrl + "'>";
          listItemHTML += "</div>";
          listItemHTML += "<div class='info'>";
          listItemHTML += "<p class='title'>" + data.displayName + "</p>";
          listItemHTML += "<div class='footerInfo'>";
          listItemHTML += "<p class='price'>" + priceStr + "</p>";
          listItemHTML += "<p class='createDate'>" +priceDate + "</p>";
          listItemHTML += "</div>";
          listItemHTML += "</div>";
          listItemHTML += "</div>";
          listItemHTML += "<div class='wrapper'></div>";
          listItemHTML += "</div>";
          listItemHTML += "</li>";

          $('#listArea').append(listItemHTML);
        }
      });

      break;
    }
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

$(document).ready(function(){
  serverRequest("/e.json", "GET", {}, "json").then(function(result) {
    console.log(result);
    var cnt = 0;
    for(var i = 0 ; i < result.L.length; i++)
    {
      var l = result.L[i];

      for(var j = 0 ; j < l.L.length; j++)
      {
        var ll = l.L[j];

        for(var k = 0 ;  k < ll.L.length; k++)
        {
          var kl = ll.L[k];

          if(kl.L.length > 0)
          {
            for(var f = 0 ; f < kl.L.length; f++)
            {
              var ff = kl.L[f];

              var spl = ff.N.split('/');

              if(spl.length > 0)
              {
                for(var fff = 0 ; fff < spl.length; fff++)
                {
                  console.log(ff.C + "," + spl[fff]);
                }
              }
              else
              {
                console.log(ff.C  + "," + ff.C);
              }

            }
          }
          else {
            var spl = kl.N.split('/');

            if(spl.length > 0)
            {
              for(var f = 0 ; f < spl.length; f++)
              {
                console.log(kl.C  + ","+spl[f]);
              }
            }
            else
            {
              console.log(kl.C + "," +kl.C);
            }
          }
        }

      }


    }
  });
});

function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
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



function menuLink(type)
{
  menuSelect(type);

  serverRequest('./ajax-page/' + type + '.html', 'GET', {}, 'html').then(function(result) {
    document.getElementById('content').innerHTML = result;
  });

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
