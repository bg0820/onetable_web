$(document).ready(function() {
	if(sessionStorage.getItem('login') == null)
	{
		location.href = 'login.html';
		return;
	}

	$('#nicknameInfo').text(sessionStorage.getItem("nickname") + " 님");
})


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

    // modal 백그라운드 클릭시 모달창 닫기
	var modal = document.getElementById('modalBack');
    if (eventTarget == modal)
        modal.style.display = "none";

   
    switch (jControll) {
        case 'menuLink':
			if(jData ==='myPage')
				location.href="mypage.html";
			else if(jData === 'favorite')
				location.href="favorite.html";

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

            if(jData == 'logout')
                location.href="login.html";
                
            break;
        case 'ingredientDetailView':
            showModal(jControll, jData);
           
            break;
        case 'leftSlide':
                document.getElementById('popula').scrollLeft -= document.getElementById('popula').offsetWidth;
            break;
        case 'rightSlide':
                document.getElementById('popula').scrollLeft += document.getElementById('popula').offsetWidth;
            break;
    }
}

function modalClose()
{
	var modal = document.getElementById('modalBack');
	modal.style.display = 'none';
}



async function showModal(_type, _data) {
    switch(_type)
    {
        case 'ingredientDetailView':
            await initModal('/ajax-page/ingredientDetail_modal.html', _data);

            let resp = await serverRequest("http://1.240.181.56:8080/ingredient/price", "GET", {ingredientItemId: _data}, "json");

            var x =[];
            var y = [];
            
            var firstPrice = resp.data[0].price ;
            var yMin = firstPrice - (firstPrice * 0.1);
            var yMax = firstPrice + (firstPrice * 0.1);

            for(var i = 0 ; i < resp.data.length; i++)
            {
                x.push(resp.data[i].priceDate);
                y.push(resp.data[i].price)
            }
            
            y.reverse();
            x.reverse();

            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: x,
                    datasets: [{
                        label: null,
                        data: y,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: yMin,
                                max: yMax
                            }
                        }]
                    }
                }

            });

            
            break;
    }
    
}


async function initModal(_url, _data) {
	var modal = document.getElementById('modalBack');
	modal.style.display = "flex";
    
    let modalResult = await serverRequest(_url, "GET", {}, "html");
    document.getElementById('modal').innerHTML = modalResult;
}

async function serverRequestBody(url, method, param)
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url, // 요청 할 주소
            async: false, // false 일 경우 동기 요청으로 변경
            headers: {'API_Version': '1.0'},
            type: method, // GET, PUT
			data: param, // 전송할 데이터
			contentType: "application/json; charset=utf-8",
			processData: true,
            dataType: 'json', // xml, json, script, html
                success: function(result) {
                    resolve(result);
                }, // 요청 완료 시
                error: function(error) {
                    resolve(error.responseJSON);
                } // 요청 실패
        });
    });    
}


async function serverRequest(url, method, param, dataType)
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
