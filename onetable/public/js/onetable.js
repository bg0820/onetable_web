var dragged;
var totalPrice = 0;
var recipes = [];


$(document).ready(function() {
	countUpMoney(0);
	$('#recipeSearhBtn').click(function() {
		serverRequest("http://1.240.181.56:8080/onetable/search/recipe", "GET", {
			query: $('#recipeSearchValue').val()
		}, 'json').then(function(result) {
			for(var i = 0 ; i < result.data.length; i++)
			{
				let data = result.data[i];
				let listItemHTML  = addItem(data);

				$('#searchResultList').append(listItemHTML);
			}  
		});
	});


	$('#ontableEnrollBtn').click(function() {
		let postData = {};
		postData.title = $('#onetableTitle').val();
		postData.type = "기본";
		postData.userIdx = Number(sessionStorage.getItem("userIdx"));
		postData.recipes = recipes;

		serverRequestBody("http://1.240.181.56:8080/onetable/reg", "POST", JSON.stringify(postData)).then(function(result) {
			if(result.status === 'SUCCESS')	
				alert('성공적으로 등록되었습니다.');
			else
				alert(result.msg);

			location.reload();
		});
	});
});


function addItem(data) {
	var html = "";
	html +=	"<div class='item' id='" + data.recipeIdx + "' draggable='true' data-idx='" +  data.recipeIdx + "' price='" + data.price +  "'>";
	html +=	"<img src='" + data.recipeImg + "'>";
	html +=	"<p class='recipeName'>" +data.nickName + "님의 " +data.name + "</p>";
	html +=	"<p class='price'>" +data.price + "원</p>";
	html +=	"</div>";

	return html;
}

function countUpMoney(maxMoney) {
	let currentMoney = 0;

	var canvas = document.getElementById("totalPrice");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#7B6FF7";
	ctx.font = "40px Spoqa Han Sans";
	ctx.textAlign = "center";

	var timer = setInterval(function() { 
		if(currentMoney > maxMoney) {
			currentMoney = maxMoney;
			clearInterval(timer);
		} else
		{
			var addPoint = 1;

			if(Math.abs(maxMoney - currentMoney) < 100) {
				addPoint = 1;
			} else {
				if(maxMoney > 1000) {
					addPoint = 34;
				} 
				if(maxMoney > 10000) {
					addPoint = 345;
				} 
				if(maxMoney > 100000) {
					addPoint = 3456;
				}
			}

			currentMoney += addPoint;

		}

		ctx.beginPath();
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText(currentMoney + "원", (canvas.width / 2), 60);
	}, 1);
}


// 드래그중
document.addEventListener("drag", function(event) {

}, false);

// 드래그 시작할때
document.addEventListener("dragstart", function(event) {
  dragged = event.target;
  event.target.style.opacity = 0.3;
  event.dataTransfer.setData('text', event.target.id);
}, false);

// 드래그 끝났을때
document.addEventListener("dragend", function(event) {
  event.target.style.opacity = "";
}, false);

document.addEventListener("dragover", function(event) {
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // console.log(event.target);
    var target = event.target;
    var targetParent = target.parentNode;

}, false);

document.addEventListener("dragleave", function(event) {
    var target = event.target;
    var targetParent = target.parentNode;

}, false);

document.addEventListener("drop", function(event) {
	event.preventDefault();

	var target = event.target;
    var targetParent = target.parentNode; // 직속 부모
	var grabItem = document.getElementById(event.dataTransfer.getData("text"));

	if($(target).attr('isDropzone'))
	{
		let x = event.clientX - target.getBoundingClientRect().x;
		let y = event.clientY - target.getBoundingClientRect().y;

		target.appendChild(grabItem);

		grabItem.style.left = (x - (grabItem.offsetWidth / 2)) + 'px';
		grabItem.style.top = (y - (grabItem.offsetHeight / 2)) + 'px';

		totalPrice += Number($(grabItem).attr('price'));

		recipes.push({
			recipeIdx: Number($(grabItem).attr('data-idx')),
			x:  (x - (grabItem.offsetWidth / 2)),
			y:  (y - (grabItem.offsetHeight / 2))
		});

		countUpMoney(totalPrice);
	}
	
	
}, false);
