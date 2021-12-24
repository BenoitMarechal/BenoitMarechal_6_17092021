import { dataFromJson } from './FetchData.js';
import { utils } from './utilitaries.js';
import { Photographer } from './Photographers.js';
import { NavTags } from './RunTags.js';

class HomePage {
	constructor() {
		//loading
		this.getAllArtists();
		this.getAllMedias();
		this.getAllTags();
		//building
		this.buildNavBar();
		this.writeAllArticles();
		//running
		this.manageTags();
		this.hideShowLink();
	}
	hideShowLink() {
		let link = document.querySelector('.header__linkContainer__link');
		link.style.display = 'none';
		document.addEventListener('keydown', function (e) {
			link.style.display = 'block';
		});
		document.addEventListener('mouseover', function (e) {
			link.style.display = 'block';
		});
	}

	getAllArtists() {
		this.photographers = [];
		dataFromJson.photographers.forEach((photographer) => {
			let artist = new Photographer(
				photographer.name,
				photographer.id,
				photographer.city,
				photographer.country,
				photographer.tagline,
				photographer.price,
				photographer.tags
			);
			this.photographers.push(artist);
		});
	}
	getAllMedias() {
		this.medias = dataFromJson.media;
	}

	getAllTags() {
		this.tags = [];
		this.photographers.forEach((photographer) => {
			//get all tags from artists
			for (var i = 0; i < photographer.tags.length; i++) {
				this.tags.push(photographer.tags[i]);
			}
		});
		this.medias.forEach((media) => {
			//get all tags from medias
			for (var i = 0; i < media.tags.length; i++) {
				this.tags.push(media.tags[i]);
			}
		});
		this.tags = [...new Set(this.tags)]; //deletes all duplicates in list of every tags
	}
	manageTags() {
		let tags = new NavTags(this, this.photographers);
	}

	buildNavBar() {
		let navBar = document.getElementById('header__content__nav__ul');
		this.tags.forEach((tag) => {
			navBar.appendChild(utils.generateTagButtons(tag));
		});
	}
	// displays all artists
	writeAllArticles() {
		this.photographers.forEach((artist) => {
			artist.createArticle();
		});
	}

	hideAllArticles() {
		this.photographers.forEach((photographer) => {
			photographer.hideArticle();
		});
	}
	showAllArticles() {
		this.photographers.forEach((photographers) => {
			photographers.displayArticle();
		});
	}
}

let homepage = new HomePage();
