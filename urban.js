var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "3b9ee90aaemsh39b75ecb88d5d4dp16a0edjsnee4dbbff852f"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
