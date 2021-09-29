//Generating all artists articles
//fetch data
async function buildArtistsArticles() {
	let rep = await fetch('./public/dataBase.json');
	let dataFromJson = await rep.json();
	//console.log(dataFromJson.photographers);
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

console.log('true ' + changeBoolean(true));
console.log('false ' + changeBoolean(false));

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
buildArtistsArticles();

//////////////////////////////END OF CREATING ARTISTS ARTICLES///////////////////

//////////////////////////////MANAGING FILTERS ///////////////////

///////////////////////BUILDING TAG BUTTONS IN NAV BAR/////////////////////////
//declare constants
navBar = document.getElementById('header__nav__ul');
let everyTagArray = [];

//filling nav bar with all tags found in media and photographers
async function getAllTags() {
	let rep = await fetch('./public/dataBase.json'); //fetch data
	let dataFromJson = await rep.json();
	dataFromJson.photographers.forEach((photographer) => {
		//collect tags from photographers
		for (var i = 0; i < photographer.tags.length; i++) {
			everyTagArray.push(photographer.tags[i]);
		}
	});
	dataFromJson.media.forEach((med) => {
		//collect tags from media
		for (var i = 0; i < med.tags.length; i++) {
			//console.log(photographer.tags[i]);
			everyTagArray.push(med.tags[i]);
		}
	});

	everyTagArray = [...new Set(everyTagArray)]; //delete all duplicates in list of every tags
	navBar.innerHTML = generateTagButtons(everyTagArray); //fill navbar with tag buttons
	///////////////END OF BUILDING TAG BUTTONS IN NAV BAR////////////////
	/////////MANAGE FILTER SELECTION//////////////////
	let currentTagSelection = { tag: [], selected: [] }; //creating object
	currentTagSelection.tag = everyTagArray;
	//function initTags() {
	for (var i = 0; i < currentTagSelection.tag.length; i++) {
		currentTagSelection.selected.push(false);
	}
	//}
	//initTags();
	//console.log(currentTagSelection); //initializing object

	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	//console.log(allNavBtn);
	allNavBtn.forEach((btn) => {
		//console.log(removeHashTagsInString(btn.innerText));
		btn.addEventListener('click', function (e) {
			//console.log('click on ' + removeHashTagsInString(btn.innerText)); //detect click on individual tag btn

			for (var i = 0; i < currentTagSelection.tag.length; i++) {
				if (
					removeHashTagsInString(btn.innerText) === currentTagSelection.tag[i]
				) {
					console.log('yeah' + currentTagSelection.tag[i]);
					currentTagSelection.selected[i] = changeBoolean(
						currentTagSelection.selected[i]
					);
					console.log(currentTagSelection);
				}
			}
		});
	});
}

getAllTags();
