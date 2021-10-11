//////////////////////////////CREATING ARTISTS ARTICLES///////////////////

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
