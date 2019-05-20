window.onclick = function(event) {
    var eventTarget = event.target;
	var jEventTarget = $(event.target);
    var parentElem = jEventTarget.parents();
    var jControll = jEventTarget.attr('jControll');
    var jData = jEventTarget.attr('jData');

    switch (jControll) {

        case 'loginBtn':
            var parm = {
                id: $('#id').val(),
                pw: $('#pw').val()
            };

            serverRequest('http://1.240.181.56:8080/auth/login', 'POST', parm).then(function(result) {
                if(result.status == 'SUCCESS')
                    location.href="/main.html"
                else
                    $('#loginError').text(result.msg);
            });
        break;
    }
}


function serverRequest(url, method, param)
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url, // 요청 할 주소
            async: false, // false 일 경우 동기 요청으로 변경
            headers: {'API_Version': '1.0'},
            type: method, // GET, PUT
            data: param, // 전송할 데이터
            dataType: 'json', // xml, json, script, html
                success: function(result) {
                    resolve(result);
                }, // 요청 완료 시
                error: function(error) {
                    console.log(error.responseJSON);
                    resolve(error.responseJSON);
                } // 요청 실패
        });
    });    
}