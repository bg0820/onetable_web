$(document).ready(function() {
	$('#idFindBtn').click(function() {
		serverRequest("http://1.240.181.56:8080/auth/find/id", "POST", {
			email: $('#idFindEmail').val()
		}).then(function(result) {
			if(result.status === 'SUCCESS') 
				$('#idError').text("성공적으로 메일을 보냈습니다.");
			else
				$('#idError').text(result.msg);

		});	
		
	});

	$('#pwFindBtn').click(function() {
		serverRequest("http://1.240.181.56:8080/auth/find/pw", "POST", {
			id: $('#pwFindEmail').val(),
			email: $('#pwFindId').val()
		}).then(function(result) {
			if(result.status === 'SUCCESS') 
				$('#pwFindId').text("성공적으로 메일을 보냈습니다.");
			else
				$('#pwFindId').text(result.msg);
		});	
	});

	$('#backBtn').click(function() {
		location.href = "/login.html";
	})
})


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