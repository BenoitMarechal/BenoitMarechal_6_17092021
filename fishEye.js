//liste tous les auteurs de la base
async function getData() {
	let rep = await fetch('./public/dataBase.json');
	let dataFromJson = await rep.json();
	console.log(dataFromJson.photographers);
	dataFromJson.photographers.forEach((photographer) => {
		newArtist(
			photographer.name,
			photographer.city,
			photographer.country,
			photographer.tagline,
			photographer.price,
			photographer.tags
		);
	});
}

getData();

function newArtist(name, city, country, tagline, price, tags) {
	let photographerPresentation = document.createElement('article'); //creates an article
	photographerPresentation.classList.add('photographer'); // Adds a class
	photographerPresentation.innerHTML = //fills the article
		'<a href="" class="photographer__link"><img class="photographer__link__img" src="images/Photographers ID Photos/' +
		removeSpacesInString(name) + //inserts profile picture
		'.jpg" alt=""/><h2 class="photographer__link__name">' +
		name + //inserts name
		'</h2><div class="photographer__link__location"><p class="photographer__link__location__city">' +
		city + //inserts city
		'</p><p class="photographer__link__location__country">, ' +
		country + //inserts COUNTRY
		'</p></div><p class="photographer__link__tagline">' +
		tagline + //inserts TAGLINE
		'</p><p class="photographer__link__price">' +
		price + //inserts PRICE
		'€/jour</p><ul class="photographer__link__tags">' +
		generateTagButtons(tags) +
		'</ul></a>';

	main.appendChild(photographerPresentation); //add the article to the bottom of the list
}

function removeSpacesInString(string) {
	var reg = /[ ,-]/g;
	return string.replace(reg, '');
}

function generateTagButtons(tagsArray) {
	let resultString = '';
	let firstHalfOfString = '<li><button class="tag">#';
	let secondHalfOfString = '</button></li>';

	tagsArray.forEach((tag) => {
		resultString = resultString + firstHalfOfString + tag + secondHalfOfString;
	});
	return resultString;
}

//list all articles

let allLinkTagsArray = document.getElementsByClassName(
	'photographer__link__tags'
);
console.log(allLinkTagsArray);
