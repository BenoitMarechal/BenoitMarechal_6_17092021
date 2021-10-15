class Photographer {
	constructor(
		name,
		id,
		city,
		country,
		tagline,
		price,
		tags,
		visible = true,
		clearedName = ''
	) {
		this.name = name;
		this.id = id;
		this.city = city;
		this.country = country;
		this.tagline = tagline;
		this.price = price;
		this.tags = tags;
		this.visible = visible;
		clearedName = removeSpacesInString(this.name);
		this.clearedName = clearedName;
	}

	// create() {
	// 	newArtist(
	// 		elementsOfArticle,
	// 		this.name,
	// 		this.city,
	// 		this.country,
	// 		this.tagline,
	// 		this.price,
	// 		this.tags
	// 	);
	// }

	createArticle() {
		//let clearedName = removeSpacesInString(this.name);
		for (let i = 0; i < elementsOfArticle.typeOfElement.length; i++) {
			let element = document.createElement(elementsOfArticle.typeOfElement[i]);
			element.classList.add(elementsOfArticle.classOfElement[i]);
			let tour = i; //assigns photg name as article ID
			if (tour === 0) {
				element.id = this.clearedName;
			}
			let byClass = document.getElementsByClassName(
				elementsOfArticle.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED
		let articleToFill = '';
		articleToFill = document.getElementById(this.clearedName);
		articleToFill.querySelector('.photographer__link').href = '';
		articleToFill.querySelector('.photographer__link__img').src =
			'images/Photographers ID Photos/' + this.clearedName + '.jpg';
		articleToFill.querySelector('.photographer__link__img').alt = this.name;
		articleToFill.querySelector('.photographer__link__name').innerText =
			this.name;
		articleToFill.querySelector(
			'.photographer__link__location__city'
		).innerText = this.city + ', ';
		articleToFill.querySelector(
			'.photographer__link__location__country'
		).innerText = this.country;
		articleToFill.querySelector('.photographer__link__tagline').innerText =
			this.tagline;
		articleToFill.querySelector('.photographer__link__price').innerText =
			this.price + ' €/jour';
		articleToFill.querySelector('.photographer__link__tags').innerHTML =
			generateTagButtons(this.tags); //ARTICLE COMPLETED
		return articleToFill;
	}
	hideArticle() {
		//hides article
		let cible = document.getElementById(this.clearedName);
		cible.style.display = 'none';
	}

	showArticle() {
		//showns article
		let cible = document.getElementById(this.clearedName);
		cible.style.display = 'block';
	}
}

// async function hideAllArtistsArticles() {
// 	arrayOfArtists.forEach((artist) => {
// 		artist.hide();
// 	});
// 	console.log('all hidden');
// }

async function setAllShown() {
	arrayOfArtists.forEach((artist) => {
		artist.visible = true;
	});
	hideOrShow();
}

async function setAllHidden() {
	arrayOfArtists.forEach((artist) => {
		artist.visible = false;
	});
	hideOrShow();
}

async function updateAllVisibilities(array) {
	if (array.length === 0) {
		console.log('tableau vide');
		setAllShown();
	} else {
		for (var a = 0; a < arrayOfArtists.length; a++) {
			//loop trough  photographers
			console.log(arrayOfArtists[a].name);
			arrayOfArtists[a].visible = false;
			for (var b = 0; b < arrayOfArtists[a].tags.length; b++) {
				//loop trough photographers's tags
				console.log(arrayOfArtists[a].name + '  ' + arrayOfArtists[a].tags[b]);
				for (var c = 0; c < array.length; c++) {
					console.log('looking for   ' + array[c]);
					////loop trough array (which will be activeTags)
					if (arrayOfArtists[a].tags[b] === array[c]) {
						console.log('match found');
						arrayOfArtists[a].visible = true;
						b = arrayOfArtists[a].tags.length; //breaks the loop so a photographer can't be diplayed twice
					} else {
						//arrayOfArtists[a].hide();
						console.log('No match');
					}
				}
			}
		}
	}
}
