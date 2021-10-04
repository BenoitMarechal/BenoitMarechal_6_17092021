let dataFromJson = [];

async function global() {
	await extractData(); //gets data from json
	await buildTagNavBar();
	await buildAllArtistsArticles(); //builds tag Nav bar
	await clickOnNavTag(); //manages color
	//builds ALL artists articles
	//	await findArtistFromClickOnTag('travel');

	//await buildArtistsArticleByName('Mimi Keel');
}
global();

async function extractData() {
	let rep = await fetch('./public/dataBase.json');
	dataFromJson = await rep.json();
	return dataFromJson;
}

async function buildArtistsArticleByName(name) {
	dataFromJson.photographers.forEach((photographer) => {
		if (photographer.name === name) {
			newArtist(
				photographer.name,
				photographer.city,
				photographer.country,
				photographer.tagline,
				photographer.price,
				photographer.tags
			);
		}
	});
}

async function buildAllArtistsArticles() {
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

//utilitaries
function changeBoolean(boolean) {
	if (boolean === true) {
		boolean = false;
	} else {
		boolean = true;
	}
	return boolean;
}

function removeSpacesInString(string) {
	var reg = /[ ,-]/g;
	return string.replace(reg, '');
}

function removeHashTagsInString(string) {
	// var reg = /[ ,-]/g;
	return string.replace('#', '');
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

function newArtist(name, city, country, tagline, price, tags) {
	//faire plusieurs ajout d'elements plut^to qu'une grosse ligne

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

//////////////////////////////END OF CREATING ARTISTS ARTICLES///////////////////

//////////////////////////////MANAGING FILTERS ///////////////////

///////////////////////BUILDING TAG BUTTONS IN NAV BAR/////////////////////////
//declare constants
navBar = document.getElementById('header__nav__ul');

let everyTagArray = [];
let currentTagSelection = []; //creating array

//BUILDING NAV BAR nav bar with all tags
async function buildTagNavBar() {
	dataFromJson.photographers.forEach((photographer) => {
		//collect tags from photographers
		for (var i = 0; i < photographer.tags.length; i++) {
			everyTagArray.push(photographer.tags[i]);
		}
	});
	everyTagArray = [...new Set(everyTagArray)]; //delete all duplicates in list of every tags
	navBar.innerHTML = generateTagButtons(everyTagArray); //fill navbar with tag buttons
	//console.log(everyTagArray);
	return everyTagArray;
}

/////////END OF BUILDING NAV BAR nav bar with all tags

/////////MANAGE FILTER SELECTION//////////////////

// currentTagSelection.tag = everyTagArray;

//function initTags() {
// for (var i = 0; i < currentTagSelection.tag.length; i++) {
// 	currentTagSelection.selected.push(false);
// }

// element = document.getElementsByTagName('label');
// for (index = 0; index < element.length; index++) {
// 	element[index].parentNode.removeChild(element[index]);
// }
// function removeAllArticles() {
// 	allArticles = document.getElementsByClassName('photographer');
// 	console.log(allArticles);
// 	allArticles.forEach((article) => {
// 		main.removeChild(article);
// 	});
// 	console.log('fini ');
// }

function removeAllArticles() {
	main.innerHTML = '<h1>Nos photographes</h1>';
}

let selectedTags = [];

async function clickOnNavTag() {
	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	//allArtistArticles = document.getElementsByClassName('photographer');

	allNavBtn.forEach((btn) => {
		let selected = false;
		//let selectedTags = [];
		btn.addEventListener('click', function (e) {
			//looping through html buttons
			removeAllArticles();
			//let selectedTags = [];
			selected = changeBoolean(selected); //change state of individual buttons
			let currentTag = removeHashTagsInString(btn.innerText);

			if (selected === true) {
				btn.className = 'tag--On';
				selectedTags.push(currentTag);
				//console.log(selectedTags);
				//findArtistFromClickOnTag(currentTag);
			} else {
				btn.className = 'tag--Off';
				removeElementFromArray(selectedTags, currentTag);
			}

			if (selectedTags.length === 0) {
				buildAllArtistsArticles();
			}

			findArtistFromClickOnTag(selectedTags);

			return selectedTags;
		});
	});
}

// function clickOnNavTag() {
// 	allNavBtn = document.querySelectorAll('#header__nav__ul button');
// 	//allArtistArticles = document.getElementsByClassName('photographer');
// 	for (i = 0; i < allNavBtn.length; i++) {
// 		selectedTags.push(allNavBtn[i].innerText);
// 		allNavBtn[i].addEventListener('click', function (e) {

// 		});
// 	}
// }

function removeElementFromArray(array, element) {
	for (i = 0; i < array.length; i++) {
		if (array[i] === element) {
			array = array.splice(i);
		}
	}
	return array;
}

// function findArtistFromClickOnTag(array) {
// 	console.log(dataFromJson);
// 	console.log(selectedTags);
// 	console.log(dataFromJson.photographers);
// 	for (var a = 0; a < array.length; a++) {
// 		//looping through selected tags
// 		//dataFromJson.photographers.forEach((photographer) => {
// 		for (var b = 0; b < dataFromJson.photographers.length; b++) {
// 			//loop trough photograpahers
// 			for (var i = 0; i < dataFromJson.photographers[b].tags.length; i++) {
// 				//loop though photgrahper's tags
// 				if (dataFromJson.photographers[b].tags[i] === array[a]) {
// 					console.log(dataFromJson.photographers[b].name);
// 					buildArtistsArticleByName(dataFromJson.photographers[b].name);
// 					b = dataFromJson.photographers.length;
// 				}
// 			}
// 		}
// 	}
// }

function findArtistFromClickOnTag(array) {
	for (var a = 0; a < dataFromJson.photographers.length; a++) {
		for (var b = 0; b < dataFromJson.photographers[a].tags.length; b++) {
			for (var c = 0; c < array.length; c++) {
				if (dataFromJson.photographers[a].tags[b] === array[c]) {
					buildArtistsArticleByName(dataFromJson.photographers[a].name);
					b = dataFromJson.photographers[a].tags.length;
				}
			}
		}
	}
}
