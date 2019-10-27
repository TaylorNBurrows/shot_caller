//global variables
var alcoholImg = document.getElementsByClassName("modal-close");
var alcoholId;
var drinkId;
var drinkArray;
var drinkImage = document.getElementById("drink-image");
var cardIndex;

//This loops through the images in the modal
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
		$.ajax(settings).done(function (intialResponse) {
			console.log(intialResponse);
			listDrinks(intialResponse);
			drinkImg(intialResponse)
			callRecipe(intialResponse);
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
		drinkCard.setAttribute("data-index", drinkArray[i].idDrink)
		var drinkText = document.createTextNode(drinkArray[i].strDrink);
		drinkCard.appendChild(drinkText);
		drinkList.appendChild(drinkCard);
	}
}

var drinkCard = document.querySelectorAll("#drink-choices");
console.log(drinkCard);
console.log(drinkCard.length);

for (i = 0; i < drinkCard.length; i++) {
	console.log(drinkCard.length);
	drinkCard[i].addEventListener("click", function (event) {
		event.stopPropagation;
		console.log(drinkCard[0].children[0].attributes[1].nodeValue)
		cardIndex = drinkCard[0].children[0].attributes[1].nodeValue;
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + cardIndex,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
				"x-rapidapi-key": "c941fba9d6msh89d2c84a1b6155ap13fc7cjsn95e6f99347b9"
			}
		}
		console.log(cardIndex);
		$.ajax(settings).done(function (response) {
			console.log(response);
			callRecipe(response);
		});
		//callRecipe(cardIndex);
		//alcoholId = this.id;
		// var settings = {
		// 	"async": true,
		// 	"crossDomain": true,
		// 	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + alcoholId,
		// 	"method": "GET",
		// 	"headers": {
		// 		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		// 		"x-rapidapi-key": "c941fba9d6msh89d2c84a1b6155ap13fc7cjsn95e6f99347b9"
		// 	}
		// }
		// console.log(alcoholId);
		// $.ajax(settings).done(function (response) {
		// 	console.log(response);
		// 	drinkId = response.drinks[0].idDrink
		// 	imageSource = response.drinks[0].strDrinkThumb
		// 	callRecipe(drinkId);
		// 	listDrinks(response);
		// 	drinkImg(imageSource)
		// });
	})
}

function drinkImg(response) {
	console.log(response);
	imageSource = response.drinks[0].strDrinkThumb;
	console.log(drinkImage.children[0].src);
	drinkImage.children[0].src = imageSource
}

function callRecipe(response) {
	console.log(response)
	if (typeof response === 'object'){
		drinkId = response.drinks[0].idDrink
	}
	
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
		drinkRecipe(recipeResponse);
		drinkImg(recipeResponse);
	});
}

function drinkRecipe(drinkResponse) {
	drinkArray = drinkResponse.drinks
	var recipeEl = document.getElementById("instructions");
	$(recipeEl).empty();
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
	var measureArray = [];
	drinkArray.forEach(drink => {
		var keys = Object.keys(drink);
		keys = keys.filter(function (key) {
			return key.indexOf("strMeasure") !== -1;
		})
		keys.forEach(function (key) {
			var measure = drink[key]
			if (measure) {
				measureArray.push(measure);
				console.log(measure);
			}
		})

	});
	var ingredientsTitle = document.createElement('h3')
	ingredientsTitle.innerHTML = "Ingredients:"
	ingredientsEl.append(ingredientsTitle);
	console.log(ingredientsArray);
	for (i = 0; i < ingredientsArray.length; i++) {
		var ingredientsText = document.createElement("p");
		ingredientsText.innerText = measureArray[i] + ingredientsArray[i];
		console.log(ingredientsText)
		ingredientsEl.appendChild(ingredientsText);
	}

	recipeEl.appendChild(ingredientsEl);
	var glass = drinkResponse.drinks[0].strGlass;
	var glassEl = document.createElement("p");
	glassEl.innerText = "Measure: " + glass;
	recipeEl.appendChild(glassEl);
	var instructions = drinkResponse.drinks[0].strInstructions;
	var instructionEl = document.createElement("div");
	var instructionTitle = document.createElement("h3");
	instructionTitle.innerText = "Instructions:"
	var instructionText = document.createElement("p");
	instructionText.innerText = instructions;
	instructionEl.appendChild(instructionTitle);
	instructionEl.appendChild(instructionText);
	recipeEl.appendChild(instructionEl);

}




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

generateRandom.addEventListener("click", function () {
	$.ajax(random).done(function (response) {
		console.log("random drink", response);

		var randomResult = response.drinks[0]
		console.log(randomResult);

	});

})

