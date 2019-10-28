//global variables
var alcoholImg = document.getElementsByClassName("modal-close");
var alcoholId;
var drinkId;
var drinkArray;
var drinkImage = document.getElementById("drink-image");
var cardIndex;

//This loops through the images in the modal
for (i = 0; i < alcoholImg.length; i++) {
	//when the user clicks an image in the modal, search for drinks made with that alcohol
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

//this lists out drinks made from selected alcohol
function listDrinks(response) {
	var drinkList = document.getElementById("drink-choices");
	$(drinkList).empty();
	drinkArray = response.drinks;
	console.log(drinkArray);
	for (i = 0; i < drinkArray.length; i++) {
		var drinkCard = document.createElement("div");
		drinkCard.setAttribute("class", "card-panel drink");
		drinkCard.setAttribute("data-index", drinkArray[i].idDrink)
		console.log(drinkCard.getAttribute('data-index'))
		var drinkText = document.createTextNode(drinkArray[i].strDrink);
		drinkCard.appendChild(drinkText);
		drinkList.appendChild(drinkCard);
	}
}

//this is listening for a click on one of the drink list cards
$('div').on("click", ".drink", function (event) {
	event.stopPropagation();
	console.log(this.getAttribute("data-index"))
	cardIndex = this.getAttribute("data-index");
	//pass the value of the data index to the call recipe function
	callRecipe(cardIndex);
})

//this renders the image of the current drink
function drinkImg(response) {
	console.log(response);
	imageSource = response.drinks[0].strDrinkThumb;
	console.log(drinkImage.children[0].src);
	drinkImage.children[0].src = imageSource
}

//this is the heart of BYO drink page. It gets info on a drink by the drink id. It either gets a default or selected value
function callRecipe(response) {
	console.log(response)
	//this is the default value
	if (typeof response === 'object') {
		console.log(typeof response)
		drinkId = response.drinks[0].idDrink
	}
	//this is the user selected value
	else if (typeof response === "string"){
		console.log(typeof response);
		drinkId = response;
	}

	//this is the api call to get all the info on a drink
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

//this takes info from the call recipe api call and renders it to the screen
function drinkRecipe(drinkResponse) {
	drinkArray = drinkResponse.drinks
	var recipeEl = document.getElementById("instructions");
	$(recipeEl).empty();
	var ingredientsEl = document.createElement('div');

	//this loop is looking for keys in the drink object and selecting the ones that contain strIngredient
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

	//this loop is looking for keys in the drink object and selecting the ones that contain strMeasure
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

	//render out the different ingredients with their measures
	var drinkTitle = document.createElement('h3')
	drinkTitle.innerText = drinkResponse.drinks[0].strDrink;
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

