let dataFromJson = [];

async function global() {
	removeAllArticles();
	await extractData(); //gets data from json
	await buildTagNavBar();
	await buildAllArtistsArticles(); //builds tag Nav bar
	await clickOnNavTag(); //manages color
}
global();

//////////////////////FETCH/////////////////

async function extractData() {
	let rep = await fetch('./public/dataBase.json');
	dataFromJson = await rep.json();
	return dataFromJson;
}

//////////////////////END OF FETCH/////////////////

////////////////////UTILITARIES///////////////////////////////////////////////////
function removeAllArticles() {
	//used both in filter management and page initialisation, remove all photographer articles and sets up H1
	main.innerHTML = '<h1>Nos photographes</h1>';
}

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
function removeDotsInString(string) {
	// var reg = /[ ,-]/g;
	return string.replace('.', '');
}

function removeElementFromArray(array, element) {
	for (i = 0; i < array.length; i++) {
		if (array[i] === element) {
			array = array.splice(i);
		}
	}
	return array;
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

let elementsOfArticle = {
	typeOfElement: ['article', 'a', 'img', 'h2', 'div', 'p', 'p', 'p', 'p', 'ul'],
	classOfElement: [
		'photographer',
		'photographer__link',
		'photographer__link__img',
		'photographer__link__name',
		'photographer__link__location',
		'photographer__link__location__city',
		'photographer__link__location__country',
		'photographer__link__tagline',
		'photographer__link__price',
		'photographer__link__tags',
	],
	parentOfElement: [
		'main',
		'photographer',
		'photographer__link',
		'photographer__link',
		'photographer__link',
		'photographer__link__location',
		'photographer__link__location',
		'photographer__link',
		'photographer__link',
		'photographer__link',
	],
};

////////////////////END OF UTILITARIES///////////////////////////////////////////////////

//////////////////////////////CREATING ARTISTS ARTICLES///////////////////

function newArtist(object, name, city, country, tagline, price, tags) {
	let clearedName = removeSpacesInString(name);
	for (let i = 0; i < object.typeOfElement.length; i++) {
		let element = document.createElement(object.typeOfElement[i]);
		element.classList.add(object.classOfElement[i]);
		let tour = i; //assigns photg name as article ID
		if (tour === 0) {
			element.id = clearedName;
		}
		let byClass = document.getElementsByClassName(object.parentOfElement[i]);
		let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
		parent.appendChild(element);
	} //EMPTY ARTICLE CREATED
	articleToFill = document.getElementById(clearedName);
	articleToFill.querySelector('.photographer__link').href = '';
	articleToFill.querySelector('.photographer__link__img').src =
		'images/Photographers ID Photos/' + removeSpacesInString(name) + '.jpg';
	articleToFill.querySelector('.photographer__link__img').alt = name;
	articleToFill.querySelector('.photographer__link__name').innerText = name;
	articleToFill.querySelector('.photographer__link__location__city').innerText =
		city + ', ';
	articleToFill.querySelector(
		'.photographer__link__location__country'
	).innerText = country;
	articleToFill.querySelector('.photographer__link__tagline').innerText =
		tagline;
	articleToFill.querySelector('.photographer__link__price').innerText =
		price + ' €/jour';
	articleToFill.querySelector('.photographer__link__tags').innerHTML =
		generateTagButtons(tags); //ARTICLE COMPLETED
}

async function buildArtistArticleByName(name) {
	dataFromJson.photographers.forEach((photographer) => {
		if (photographer.name === name) {
			newArtist(
				elementsOfArticle,
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
			elementsOfArticle,
			photographer.name,
			photographer.city,
			photographer.country,
			photographer.tagline,
			photographer.price,
			photographer.tags
		);
	});
}

//////////////////////////////END OF CREATING ARTISTS ARTICLES///////////////////

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

//////////////////////////////MANAGING FILTERS ///////////////////

let activeTags = [];

async function clickOnNavTag() {
	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	//allArtistArticles = document.getElementsByClassName('photographer');

	allNavBtn.forEach((btn) => {
		let selected = false;

		btn.addEventListener('click', function (e) {
			//looping through html buttons
			removeAllArticles();
			selected = changeBoolean(selected); //change state of individual buttons
			let currentTag = removeHashTagsInString(btn.innerText);

			if (selected === true) {
				btn.className = 'tag--On';
				activeTags.push(currentTag);
			} else {
				btn.className = 'tag--Off';
				removeElementFromArray(activeTags, currentTag);
			}

			if (activeTags.length === 0) {
				buildAllArtistsArticles();
			}

			findArtistFromClickOnTag(activeTags);

			return activeTags;
		});
	});
}

function findArtistFromClickOnTag(array) {
	for (var a = 0; a < dataFromJson.photographers.length; a++) {
		for (var b = 0; b < dataFromJson.photographers[a].tags.length; b++) {
			for (var c = 0; c < array.length; c++) {
				if (dataFromJson.photographers[a].tags[b] === array[c]) {
					buildArtistArticleByName(dataFromJson.photographers[a].name);
					b = dataFromJson.photographers[a].tags.length;
				}
			}
		}
	}
}
