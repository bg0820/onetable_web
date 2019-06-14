$(document).ready(function(result) {
	let _recipeIdx = sessionStorage.getItem('viewRecipeIdx');

	serverRequest("http://1.240.181.56:8080/recipe/detail", "GET", {
		recipeIdx: _recipeIdx
	}, 'json').then(function(result) {
		if(result.status === 'SUCCESS') {
			console.log(result.data);
		}
	});

});