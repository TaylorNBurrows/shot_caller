var alcoholImg = document.getElementsByClassName("modal-close");
var alcoholId;
var drinkId;
var drinkArray;
for (i = 0; i < alcoholImg.length; i++) {
	$(alcoholImg[i]).on("click", function () {
		alcoholId = this.id;
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + alcoholId,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
				"x-rapidapi-key": "c941fba9d6msh89d2c84a1b6155ap13fc7cjsn95e6f99347b9"
			}
		}
		console.log(alcoholId);
		$.ajax(settings).done(function (response) {
			console.log(response);
			drinkId = response.drinks[0].idDrink
			callRecipe(drinkId)
			listDrinks(response);
		});
	})
}

function listDrinks(response) {
	var drinkList = document.getElementById("drink-choices");
	drinkArray = response.drinks;
	console.log(drinkArray);
	for (i = 0; i < drinkArray.length; i++) {
		var drinkCard = document.createElement("div");
		drinkCard.setAttribute("class", "card-panel");
		var drinkText = document.createTextNode(drinkArray[i].strDrink);
		drinkCard.appendChild(drinkText);
		drinkList.appendChild(drinkCard);
	}
}

function callRecipe(drinkId) {
	var recipe = {
		"async": true,
		"crossDomain": true,
		"url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + drinkId,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
			"x-rapidapi-key": "c941fba9d6msh89d2c84a1b6155ap13fc7cjsn95e6f99347b9"
		}
	}

	$.ajax(recipe).done(function (recipeResponse) {
		console.log(recipeResponse);
		drinkRecipe(recipeResponse)
	});
}
function drinkRecipe(drinkResponse) {
	drinkArray = drinkResponse.drinks
	var recipeEl = document.getElementById("drink-recipe");
	var ingredientsEl = document.createElement('div');

	var ingredientsArray = [];
	drinkArray.forEach(drink => {
		var keys = Object.keys(drink);
		keys = keys.filter(function (key) {
			return key.indexOf("strIngredient") !== -1;
		})
		keys.forEach(function (key) {
			var ingredient = drink[key]
			if (ingredient) {
				ingredientsArray.push(ingredient);
				console.log(ingredient);
			}
		})

	});
	var ingredientsTitle = document.createElement('h3')
	ingredientsTitle.innerHTML = "Ingredients:"
	ingredientsEl.append(ingredientsTitle);
	console.log(ingredientsArray);
	for (i = 0; i < ingredientsArray.length; i++) {
		var ingredientsText = document.createElement("p");
		ingredientsText.innerText = ingredientsArray[i];
		console.log(ingredientsText)
		ingredientsEl.appendChild(ingredientsText);

	}
	
	recipeEl.appendChild(ingredientsEl);
}

$.ajax(settings).done(function (response) {
	console.log(response);
});

var random = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/random.php",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "21a3e5fe32mshddebc68d758fa0bp1c1c55jsnc99c698f891b"
	}
}



var generateRandom = document.getElementById("gen-random");

generateRandom.addEventListener("click", function(){
$.ajax(random).done(function (response) {
	console.log("random drink", response);

	var randomResult = response.drinks[0]
	console.log(randomResult);

});

})

