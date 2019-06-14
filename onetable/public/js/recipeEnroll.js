var lastFocus;

window.onclick = function(event) {
    var eventTarget = event.target;
	var jEventTarget = $(event.target);
    var parentElem = jEventTarget.parents();
    var jControll = jEventTarget.attr('jControll');
    var jData = jEventTarget.attr('jData');

	switch (jControll) {
        case 'addIngredient':
			let trElem = jEventTarget.closest("tr")[0];
			let cloneElem = $(trElem).clone()[0];
			$(cloneElem).find("input").val("");
			trElem.after(cloneElem);

			getUnitTypeList();
			addEvent();

			break;
		case 'ingredientSelect':
			$(lastFocus).attr('ingredientIdx', jData);
			$(lastFocus).val($(eventTarget).attr('displayName'));
			$('#ingredientSearchList').hide();
			break;
	}
}

$(document).ready(function() {
	getUnitTypeList();
	addEvent();

	$('#imgFile').change(function() {
		imgUpload();
	});

	$('#recipeEnrollBtn').click(function() {
		let data = {
			name: $('#recipeName').val(),
			servingMin: $('#servingMin').val(),
			kcal: $('#kcal').val(),
			recipeIngredient: [],
			recipeMethod: []
		};

		var ingredientItemList = $("div[class='ingredientItem']");
		for(var i = 0; i < ingredientItemList; i++)
		{
			var item = ingredientItemList[i];
			var inputItem = $(item).find('input');
			var data = {
				
			}

			recipeIngredient.push(data);
			
		}
		
	});
});

function imgUpload() {
    var form = $('form')[0];
    var formData = new FormData();
    //첫번째 파일태그
    formData.append("multipartFile", $("input[name=imgFile]")[0].files[0]);
    $.ajax({
		url: 'http://1.240.181.56:8080/recipe/reg',
		headers: {'API_Version': '1.0'},
        processData: false,
        contentType: false,
        data: formData,
        type: 'POST',
        success: function(data){
			if(data.status == 'SUCCESS')
			{
				let html = "";
				html += "<tr class='recipeMethod'>";
				html += "<td><img src='http://1.240.181.56:8080" + data.data + "' placeholder='조리 과정을 적어주세요.'></td>";
				html += "<td class='method'>";
				html += "<textarea class='form-control'></textarea>";
				html += "</td>";
				html += "</tr>";

				$('#recipeMethod').after(html);
			}
        }
    });
}


function addEvent() {
	$("input[name='ingredient']").focusout(function() {
		//$('#ingredientSearchList').hide();
	});

	$("input[name='ingredient']").focusin(function() {
		lastFocus = this;
		$('#ingredientSearchList').show();
		$('#ingredientSearchList').empty();
		$('#ingredientSearchList').css("left", $(this).offset().left + "px");
		$('#ingredientSearchList').css("top", ($(this).offset().top + 50) + "px");
		$('#ingredientSearchList').css("width", ($(this).width() + 13) + "px");
		
	});

	$("input[name='ingredient']").keyup(function() {
		if($(this).val() !== '' && $(this).val() .length >= 1) 
		{
			serverRequest("http://1.240.181.56:8080/ingredient/search", "GET", { 
				query: $(this).val(),
				itemNum: 30,
				page: 1
			}, 'json').then(function(result) {
				$('#ingredientSearchList').empty();
				for(var i = 0 ; i < result.data.length; i++)
				{
					var item = result.data[i];
					var html = "";
					html += "<div class='item' displayName='" + item.displayName +"' jData='" + item.ingredientIdx + "' jControll='ingredientSelect'>";
					html +=	"<img displayName='" + item.displayName +"' jData='" + item.ingredientIdx + "' jControll='ingredientSelect' src='" + item.imgUrl + "'>"
					html += "<p displayName='" + item.displayName +"' jData='" + item.ingredientIdx + "' jControll='ingredientSelect'>" + item.displayName +"</p>"
					html += "</div>";	
					$('#ingredientSearchList').append(html);
				}
			});
		}
	});
}

function clickIngredientItem(ingredientIdx, displayName)
{
	console.log(ingredientIdx);
	console.log(displayName);
}

function getUnitTypeList() {
	serverRequest("http://1.240.181.56:8080/recipe/unit", "GET", null, "json").then(function(result) {
		$("select[name='unit']").empty();
		for(var i = 0 ; i < result.data.length; i++)
		{
			var item = result.data[i];
			$("select[name='unit']").append("<option value='" + item.unitIdx + "'>" + item.unitName + "</option>");
		}
	});
}