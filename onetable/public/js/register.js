
const idre = /^[a-zA-Z0-9]{4,12}$/ // 아이디와 패스워드가 적합한지 검사할 정규식
const pwre = /^[a-zA-Z0-9]{6,16}$/ // 아이디와 패스워드가 적합한지 검사할 정규식
const emailre = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// 이메일이 적합한지 검사할 정규식

var idValid = false;
var pwValid = false;
var pwConfirmValid = false;
var emailValid = false;
var nickNameValid = false;

window.onclick = function(event) {
    var eventTarget = event.target;
	var jEventTarget = $(event.target);
    var parentElem = jEventTarget.parents();
    var jControll = jEventTarget.attr('jControll');
    var jData = jEventTarget.attr('jData');

    switch (jControll) {

        case 'register':

            if($('#birthday').val() == "") {
                $('#registerError').text("생년월일을 입력해주세요");
                return false;
            }

            if(idValid && pwValid && pwConfirmValid && emailValid && nickNameValid)
            {
                var parm = {
                    id: $('#id').val(),
                    pw: $('#pw').val(),
                    email: $('#email').val(),
                    nickname: $('#nickname').val(),
                    birthday: $('#birthday').val().replace(/-/gi, '')
                };

                serverRequest('http://1.240.181.56:8080/auth/register', 'POST', parm).then(function(result) {
                    if(result.status == 'SUCCESS')
                        location.href="/login.html"
                    else
                        $('#registerError').text(result.msg);
                });
            }
             else{
                $('#registerError').text("모든 값을 올바르게 입력해주세요.");
             }
        
            break;
        case 'backBtn':
            location.href="/login.html"
             break;
    }
}

$(document).ready(function(){
    $('#id').focusout(idCheck);
    $('#pw').focusout(pwCheck);
    $('#pwConfirm').focusout(pwConfirmCheck);
    $('#email').focusout(emailCheck);
    $('#nickname').focusout(nickCheck);
    
});

function check(regex, what) {
    if(regex.test(what))
        return true;
        
    return false;
}

function pwCheck(ev)
{
    pwValid = false;
    if(!check(pwre, this.value))
    {
        $('#pwError').text("형식이 올바르지 않습니다."); 
    }
    else
    {    
        $('#pwError').text(""); 
        pwValid = true;
    }
}

function pwConfirmCheck(ev) {
    pwConfirmValid = false;
    if($('#pw').val() == $('#pwConfirm').val())
    {
        $('#pwConfirmError').addClass('success');
        $('#pwConfirmError').text('비밀번호가 일치합니다.');    
        pwConfirmValid = true;
    } else {
        $('#pwConfirmError').removeClass('success');
        $('#pwConfirmError').text('비밀번호가 일치하지 않습니다.');
    }
}

async function idCheck(ev) {
    idValid = false;
    if(!check(idre, this.value))
    {
        $('#idError').removeClass('success');
        $('#idError').text("형식이 올바르지 않습니다.");
        return false;
    }
    else
        $('#idError').text(""); 

    let result = await serverRequest("http://1.240.181.56:8080/auth/register/duplicate/id", "GET", {id: this.value});

    if(result.data == 0)
    {
        $('#idError').addClass('success');
        $('#idError').text('사용 가능합니다.');       
        idValid = true; 
    } else {
        $('#idError').removeClass('success');
        $('#idError').text('이미 존재하는 아이디 입니다.');
    }
}

async function emailCheck(ev) {
    emailValid = false;

    if(!check(emailre, this.value)){
        $('#emailError').removeClass('success');
        $('#emailError').text("형식이 올바르지 않습니다."); 
        return false;
    }
    else
        $('#emailError').text(""); 

    let result = await serverRequest("http://1.240.181.56:8080/auth/register/duplicate/email", "GET", {email: this.value});

    if(result.data == 0)
    {
        $('#emailError').addClass('success');
        $('#emailError').text('사용 가능합니다.');        
        emailValid = true; 
    } else {
        $('#emailError').removeClass('success');
        $('#emailError').text('이미 존재하는 이메일 입니다.');
    }
}


async function nickCheck(ev) {
    nickNameValid = false;
    if(this.value.length > 8)
    {
        $('#nickNameError').removeClass('success');
        $('#nickNameError').text("형식이 올바르지 않습니다."); 
        return false;
    }
    let result = await serverRequest("http://1.240.181.56:8080/auth/register/duplicate/nickname", "GET", {nickname: this.value});

    if(result.data == 0)
    {
        $('#nickNameError').addClass('success');
        $('#nickNameError').text('사용 가능합니다.');       
        nickNameValid = true; 
    } else {
        $('#nickNameError').removeClass('success');
        $('#nickNameError').text('이미 존재하는 닉네임 입니다.');
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