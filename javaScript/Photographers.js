class Photographers {
	constructor(name, id, city, country, tagline, price, tags, visible = true) {
		this.name = name;
		this.id = id;
		this.city = city;
		this.country = country;
		this.tagline = tagline;
		this.price = price;
		this.tags = tags;
		this.visible = visible;
	}

	create() {
		newArtist(
			elementsOfArticle,
			this.name,
			this.city,
			this.country,
			this.tagline,
			this.price,
			this.tags
		);
	}

	hide() {
		let cible = document.getElementById(removeSpacesInString(this.name));
		cible.style.display = 'none';
	}
	show() {
		let cible = document.getElementById(removeSpacesInString(this.name));
		cible.style.display = 'block';
	}
}

let arrayOfArtists = [];

async function fillarrayOfArtists() {
	//console.log('fillArray');

	dataFromJson.photographers.forEach((photographer) => {
		let artist = new Photographers(
			photographer.name,
			photographer.id,
			photographer.city,
			photographer.country,
			photographer.tagline,
			photographer.price,
			photographer.tags
		);

		arrayOfArtists.push(artist);
		//console.log(artist);
		return arrayOfArtists;
	});
}

async function createAllArtistsArticles() {
	arrayOfArtists.forEach((artist) => {
		artist.create();
		console.log('all created');
	});
}
async function hideOrShow() {
	for (let i = 0; i < arrayOfArtists.length; i++) {
		if (arrayOfArtists[i].visible === true) {
			arrayOfArtists[i].show();
		} else {
			arrayOfArtists[i].hide();
		}
	}
}

// async function hideAllArtistsArticles() {
// 	arrayOfArtists.forEach((artist) => {
// 		artist.hide();
// 	});
// 	console.log('all hidden');
// }

async function resetAllVisibles() {
	arrayOfArtists.forEach((artist) => {
		artist.visible = true;
	});
}

async function updateAllVisibilities(array) {
	if (array.length === 0) {
		console.log('tableau vide');
		resetAllVisibles();
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
