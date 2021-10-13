class Photographers {
	constructor(name, id, city, country, tagline, price, tags) {
		this.name = name;
		this.id = id;
		this.city = city;
		this.country = country;
		this.tagline = tagline;
		this.price = price;
		this.tags = tags;
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

		return arrayOfArtists;
	});
}

async function buildAllArtistsArticles() {
	arrayOfArtists.forEach((artist) => {
		artist.create();
	});
}
