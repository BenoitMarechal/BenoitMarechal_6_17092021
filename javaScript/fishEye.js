//ne pas tout mettre dans le meme fichier js --OK
//mieux organiser: prog orientée objet
//création d'une class photographer avec les propriétés
//capacité à instancer la classe (constructor)
//une classe a des méthodes: exemple afficher l'article d'un photographer
//chercher "méthodes d'instances" pour afficher
//design pattern factory

//faire constructor
//remanier en plusieurs fichiers
//méthodes d'instance

//-------------------------------------------------------------------
//mettre fonction newArtist dans la classe
//EFFI

// home => afficher lensemble des photographers, filtre par les tags

// class Photographer{

// 	constructor(name, id, city, country, tagline, price, tags) {
// 		this.name = name;
// 		this.id = id;
// 		this.city = city;
// 		this.country = country;
// 		this.tagline = tagline;
// 		this.price = price;
// 		this.tags = tags;
// 	}

// 	show() {
// 		// create alement div
// 		//

// 		return div;
// 	}
// }

// class HomePage {

// 	constructor() {
// 		this.photographers = [];
// 		this.tags = [];
// 	}

// 	async getPhotgraphers() {

// 		let rep = await fetch('./public/dataBase.json');
// 		dataFromJson = await rep.json();
// 		for(let i = 0; i < dataFromJson.photographers.length; i++) {
// 			this.photographers.push(new Photographer(
// 			dataFromJson.photographers[i].name,
// 			dataFromJson.photographers[i].id,
// 			......
// 			))
// 		}

// 	}

// 	displayePhotographers() {

// 	}

// 	getTags() {

// 	}

// 	showTags() {

// 	}

// 	filter() {

// 	}
// }

(async function () {
	let homepage = new Homepage();
	await homepage.getPhotgraphers();
	homepage.displayePhotographers();
	homepage.getTags();
	homepage.showTags();
})();
