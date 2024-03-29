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
var cardArray;
var generateRandom = document.getElementById("gen-random");
var randomDrinksArr = []
function randomRecipe() {
	$.ajax(random).done(function (response) {
		var randomResult = response.drinks[0]
		console.log(randomResult);
		var ingredientsEl = document.createElement("div")
		var recipeEl = document.getElementById("instructions")
		$(recipeEl).empty();
		//this loop is looking for keys in the drink object and selecting the ones that contain strIngredient
		var ingredientsArray = [];
		var keys = Object.keys(randomResult);
		keys = keys.filter(function (key) {
			return key.indexOf("strIngredient") !== -1;
		})
		keys.forEach(function (key) {
			var ingredient = randomResult[key]
			if (ingredient) {
				ingredientsArray.push(ingredient);
				console.log(ingredient);
			}
		})

		//this loop is looking for keys in the drink object and selecting the ones that contain strMeasure
		var measureArray = [];

		var keys = Object.keys(randomResult);
		keys = keys.filter(function (key) {
			return key.indexOf("strMeasure") !== -1;
		})
		keys.forEach(function (key) {
			var measure = randomResult[key]
			if (measure) {
				measureArray.push(measure);
				console.log(measure);
			}
		})

		//render out the different ingredients with their measure

		var drinkTitle = document.createElement('h3')
		drinkTitle.innerText = randomResult.strDrink;
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
		var glass = randomResult.strGlass;
		var glassEl = document.createElement("p");
		glassEl.innerText = "Measure: " + glass;
		recipeEl.appendChild(glassEl);
		var instructions = randomResult.strInstructions;
		var instructionEl = document.createElement("div");
		var instructionTitle = document.createElement("h3");
		instructionTitle.innerText = "Instructions:"
		var instructionText = document.createElement("p");
		instructionText.innerText = instructions;
		instructionEl.appendChild(instructionTitle);
		instructionEl.appendChild(instructionText);
		recipeEl.appendChild(instructionEl);

		randomDrinksArr.unshift(randomResult)
		if (randomDrinksArr.length > 5) {
			randomDrinksArr.length = 5
		}
		renderDrinks()
		renderRandomDefinition()
	})


}

generateRandom.addEventListener("click", function () {

	$.ajax(random).done(function (response) {
		var randomResult = response.drinks[0]
		console.log(randomResult);
		var ingredientsEl = document.createElement("div")
		var recipeEl = document.getElementById("instructions")
		$(recipeEl).empty();
		//this loop is looking for keys in the drink object and selecting the ones that contain strIngredient
		var ingredientsArray = [];
		var keys = Object.keys(randomResult);
		keys = keys.filter(function (key) {
			return key.indexOf("strIngredient") !== -1;
		})
		keys.forEach(function (key) {
			var ingredient = randomResult[key]
			if (ingredient) {
				ingredientsArray.push(ingredient);
				console.log(ingredient);
			}
		})

		//this loop is looking for keys in the drink object and selecting the ones that contain strMeasure
		var measureArray = [];

		var keys = Object.keys(randomResult);
		keys = keys.filter(function (key) {
			return key.indexOf("strMeasure") !== -1;
		})
		keys.forEach(function (key) {
			var measure = randomResult[key]
			if (measure) {
				measureArray.push(measure);
				console.log(measure);
			}
		})

		//render out the different ingredients with their measure

		var drinkTitle = document.createElement('h3')
		drinkTitle.innerText = randomResult.strDrink;
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
		var glass = randomResult.strGlass;
		var glassEl = document.createElement("p");
		glassEl.innerText = "Measure: " + glass;
		recipeEl.appendChild(glassEl);
		var instructions = randomResult.strInstructions;
		var instructionEl = document.createElement("div");
		var instructionTitle = document.createElement("h3");
		instructionTitle.innerText = "Instructions:"
		var instructionText = document.createElement("p");
		instructionText.innerText = instructions;
		instructionEl.appendChild(instructionTitle);
		instructionEl.appendChild(instructionText);
		recipeEl.appendChild(instructionEl);

		randomDrinksArr.unshift(randomResult)
		if (randomDrinksArr.length > 5) {
			randomDrinksArr.length = 5
			renderDrinks();
		}

		console.log("random drinks array", randomDrinksArr)
		renderDrinks()
		renderRandomDefinition()

	})
})

function renderDrinks() {
	var drinkNameDiv = document.querySelector("#drink-name")
	$(drinkNameDiv).empty();
	randomDrinksArr.forEach(function (drink) {
		console.log(randomDrinksArr.length)
		var drinkTitleText = document.createElement("div")
		drinkTitleText.classList.add("card-panel", "grey", "lighten-3", "drink2")
		drinkTitleText.setAttribute("id", drink.idDrink)
		drinkTitleText.setAttribute("style", "color: black")
		drinkTitleText.setAttribute("button-style", "inactive")
		drinkTitleText.textContent = drink.strDrink
		drinkNameDiv.append(drinkTitleText)
		var drinkImg = document.querySelector("#drink-img");
		drinkImg.setAttribute("src", randomDrinksArr[0].strDrinkThumb)
		drinkImg.setAttribute("style", "width: 100%")

	})
	var drinkCards = document.querySelectorAll(".drink2")
	drinkCards[0].setAttribute("style", "background-color: #FFBF00")
}

// function callRecipe(response) {
// 	console.log(response)
// 	drinkId = response;


// 	//this is the api call to get all the info on a drink
// 	var recipe = {
// 		"async": true,
// 		"crossDomain": true,
// 		"url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + drinkId,
// 		"method": "GET",
// 		"headers": {
// 			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
// 			"x-rapidapi-key": "c941fba9d6msh89d2c84a1b6155ap13fc7cjsn95e6f99347b9"
// 		}
// 	}
// 	$.ajax(recipe).done(function (recipeResponse) {
// 		console.log(recipeResponse);
// 		drinkRecipe(recipeResponse);
// 		drinkImg(recipeResponse);
// 	});
// }

function resetColor() {
	var cardList = document.querySelectorAll(".drink2");
	console.log(cardList)
	for (i = 0; i < cardList.length; i++) {
		console.log(cardList[i])
		cardList[i].attributes[3].value = "inactive";
		cardList[i].attributes[2].value = "background-color: white; color: black"
	}
}

$("div").on("click", ".drink2", function (event) {
		event.stopPropagation()
		resetColor();
		var cardSiblings = this;
		var cardSiblingVal = this.getAttribute("button-style")
		console.log(cardSiblings.getAttribute("button-style"))
		console.log(this.getAttribute("id"));
		var clickDrinkID = this.getAttribute("id");
		if (cardSiblingVal === "inactive") {
			cardSiblings.setAttribute("button-style", "active") 
			cardSiblings.setAttribute("style", "background-color: #FFBF00; color: black")
			cardSiblings.classList.remove("grey", "lighten-3") 
		}
	


	callRecipe(clickDrinkID);
})