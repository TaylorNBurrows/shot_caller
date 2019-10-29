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
		var randomResult = response.drinks[0]
		var drinkId = response.drinks[0].idDrink
		console.log(drinkId)
        console.log(randomResult);
        
        //add drink title to the page
        var drinkNameDiv = document.querySelector("#drink-name")
        var drinkTitle = document.createElement("p")
        drinkTitle.classList.add("card-panel","grey","lighten-3")
        drinkTitle.innerHTML= randomResult.strDrink
        drinkNameDiv.appendChild(drinkTitle)

        var drinkImg = document.querySelector("#drink-image");
        drinkImg.setAttribute("src", randomResult.strDrinkThumb)
		
		var randInstructionsDiv = document.querySelector("#random-instructions")
		var randInstructionsTitle = document.createElement("h5")
		randInstructionsTitle.textContent= "Instructions: "
		var randInstructionsText = document.createElement("p")
		randInstructionsText.textContent = randomResult.strInstructions
		randInstructionsDiv.appendChild(randInstructionsTitle)
		randInstructionsTitle.appendChild(randInstructionsText)

		randomDrinkIngredients(randomResult)
	});

})

function randomDrinkIngredients(randomDrink) {
	var randomIngredientsArray = [];
	
}
