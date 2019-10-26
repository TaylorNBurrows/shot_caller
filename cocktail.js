var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "c941fba9d6msh89d2c84a1b6155ap13fc7cjsn95e6f99347b9"
	}
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


