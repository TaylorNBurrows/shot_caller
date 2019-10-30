function renderDefinition(){
	var alcohol = document.querySelector("#drink-name p").textContent

var apiCall = {
	"async": true,
	"crossDomain": true,
	"url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + alcohol,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
		"x-rapidapi-key": "3b9ee90aaemsh39b75ecb88d5d4dp16a0edjsnee4dbbff852f"
	}
}

$.ajax(apiCall).then(function(response) {
	console.log(response.list.length);
	
	var results = response.list
	var targetDiv = document.querySelector('#def-drink')
	

	for (let i = 0; i < 1; i++) {
		console.log(results)
		
		var defDiv = document.createElement("div")
		$(targetDiv).empty();
		var titleDiv = document.createElement("div")
		var titleEl = document.createElement("h3")
		defDiv.classList.add("card-panel","grey","lighten-3")
		titleEl.textContent="Did you Know?"
		defDiv.innerHTML = response.list[i].definition
		targetDiv.appendChild(titleDiv)
		titleDiv.appendChild(titleEl)
		targetDiv.appendChild(defDiv)
	}

});
}
