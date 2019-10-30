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
var randomDrinksArr = []

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
		}
		renderDrinks()
		renderDefinition()
	})

	
	// var randInstructionsDiv = document.querySelector("#random-instructions")
	// var randInstructionsTitle = document.createElement("h5")
	// randInstructionsTitle.textContent= "Instructions: "
	// var randInstructionsText = document.createElement("p")
	// randInstructionsText.textContent = randomResult.strInstructions
	// randInstructionsDiv.appendChild(randInstructionsTitle)
	// randInstructionsTitle.appendChild(randInstructionsText)

	// randomDrinkIngredients(randomResult)
})

function renderDrinks() {
	var drinkNameDiv = document.querySelector("#drink-name")
	drinkNameDiv.innerHTML = ''
	randomDrinksArr.forEach(function (drink) {
		console.log(randomDrinksArr.length)
		var drinkTitleText = document.createElement("p")
		drinkTitleText.classList.add("card-panel", "grey", "lighten-3")
		drinkTitleText.setAttribute("id", drink.strDrink)
		drinkTitleText.textContent = drink.strDrink
		drinkNameDiv.append(drinkTitleText)

		var drinkImg = document.querySelector("#drink-image");
		drinkImg.setAttribute("src", drink.strDrinkThumb)
		drinkImg.setAttribute("style", "height:400px; width:300px")
	})
}

