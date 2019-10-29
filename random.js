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
		var randomResult = response.drinks
		console.log(randomResult);
		var ingredientsEl = document.createElement("div")
		var recipeEl = document.getElementById("instructions")
		$(recipeEl).empty();
		//this loop is looking for keys in the drink object and selecting the ones that contain strIngredient
		var ingredientsArray = [];
		randomResult.forEach(drink => {
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
		randomResult.forEach(drink => {
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



			//render out the different ingredients with their measure

			var drinkTitle = document.createElement('h3')
			drinkTitle.innerText = randomResult[0].strDrink;
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
			var glass = randomResult[0].strGlass;
			var glassEl = document.createElement("p");
			glassEl.innerText = "Measure: " + glass;
			recipeEl.appendChild(glassEl);
			var instructions = randomResult[0].strInstructions;
			var instructionEl = document.createElement("div");
			var instructionTitle = document.createElement("h3");
			instructionTitle.innerText = "Instructions:"
			var instructionText = document.createElement("p");
			instructionText.innerText = instructions;
			instructionEl.appendChild(instructionTitle);
			instructionEl.appendChild(instructionText);
			recipeEl.appendChild(instructionEl);

			// add drink title to the page
			var drinkNameDiv = document.querySelector("#drink-name")
			var drinkTitle = document.createElement("p")
			drinkTitle.classList.add("card-panel", "grey", "lighten-3")
			drinkTitle.innerHTML = randomResult[0].strDrink
			drinkNameDiv.appendChild(drinkTitle)

			var drinkImg = document.querySelector("#drink-image");
			drinkImg.setAttribute("src", randomResult[0].strDrinkThumb)
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
