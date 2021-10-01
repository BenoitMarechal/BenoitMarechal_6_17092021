//Generating all artists articles
//fetch data
//let dataFromJson = null;
let dataFromJson = [];

async function global() {
	await extractData(); //gets data from json
	await buildTagNavBar(); //builds tag Nav bar
	await clickOnNavTag(); //manages color
	//	await findArtistFromClickOnTag('travel');

	await getSelectedTags(); //assembles selected tags
	await buildAllArtistsArticles(); //builds artists articles
}
global();

async function extractData() {
	let rep = await fetch('./public/dataBase.json');
	dataFromJson = await rep.json();
	return dataFromJson;
}

let filteredData = {};

async function selectData() {}

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

//calling
//buildArtistsArticles();

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
	console.log(everyTagArray);
	return everyTagArray;
}

/////////END OF BUILDING NAV BAR nav bar with all tags

/////////MANAGE FILTER SELECTION//////////////////
async function getSelectedTags() {}

// currentTagSelection.tag = everyTagArray;

//function initTags() {
// for (var i = 0; i < currentTagSelection.tag.length; i++) {
// 	currentTagSelection.selected.push(false);
// }

function clickOnNavTag() {
	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	allArtistArticles = document.getElementsByClassName('photographer');
	allNavBtn.forEach((btn) => {
		let selected = false;
		//console.log(removeHashTagsInString(btn.innerText));
		btn.addEventListener('click', function (e) {
			selected = changeBoolean(selected);
			//console.log(btn.innerText + ' ' + selected);
			if (selected === true) {
				btn.className = 'tag--On';
				//console.log(removeHashTagsInString(btn.innerText));
				//findArtistFromClickOnTag(removeHashTagsInString(btn.innerText));
				findArtistFromClickOnTag(removeHashTagsInString(btn.innerText));
			} else {
				btn.className = 'tag--Off';
			}
		});
	});
}

async function findArtistFromClickOnTag(tag) {
	//console.log(dataFromJson);
	dataFromJson.photographers.forEach((photographer) => {
		//collect tags from photographers
		for (var i = 0; i < photographer.tags.length; i++) {
			if (photographer.tags[i] === tag) {
				console.log(photographer.name);
			}
		}
	});
}
