// let dataFromJson = [];

import { utils } from './utilitaries.js';
import { dataFromJson } from './FetchData.js';
import { Photographer } from './Photographers.js';
import { Media } from './Media.js';

class HomePage {
	constructor(photographers, tags, media) {
		this.photographers = [];
		this.tags = [];
		this.media = [];
	}

	async extractData() {
		// let rep = await fetch('./public/dataBase.json');
		// dataFromJson = await rep.json();
		console.log(dataFromJson);
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
		console.log(this.photographers);
	}

	async getAllTags() {
		let navBar = document.getElementById('header__nav__ul');
		//	console.log('build tag nav bar');
		this.photographers.forEach((photographer) => {
			//collect tags from photographers
			for (var i = 0; i < photographer.tags.length; i++) {
				this.tags.push(photographer.tags[i]);
			}
		});
		this.tags = [...new Set(this.tags)]; //delete all duplicates in list of every tags
		navBar.innerHTML = utils.generateTagButtons(this.tags); //fills navbar with tag buttons (function also used when building Artists Articles)
	}

	// displays all artists
	async writeAllArtistsArticles() {
		this.photographers.forEach((artist) => {
			artist.createArtistArticle();
		});
	}

	//deletes all artists
	deleteAll() {
		main.innerHTML = '<h1>Nos photographes</h1>';
	}

	//filters
	async updateSelectionOnClick() {
		let allNavBtn = document.querySelectorAll('#header__nav__ul button');
		console.log(allNavBtn);
		let page = this; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		let currentTag = '';
		let emptySelection = true;

		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				//listens to click
				page.deleteAll(); //deletes all articles at click

				// particular case: if click happens on the same tag that was already selected at the previous click
				if (
					(currentTag === utils.removeHasgTagInString(btn.innerText)) &
					(emptySelection === false) //and a button is selected ie not coming from an "empty bar" (which happens if 3 clicks on the same button, then regular behaviour is needed)
				) {
					btn.classList = 'tag--Off'; //de-select tag button
					page.writeAllArtistsArticles(); //display all artists
					emptySelection = true; //state that no button is selected
					return;
				}
				// end of particular case

				currentTag = utils.removeHasgTagInString(btn.innerText); //sets the value of currentTag
				emptySelection = false; //state that selection is not empty

				for (let a = 0; a < page.photographers.length; a++) {
					//loop through photographers of homepage
					for (let b = 0; b < page.photographers[a].tags.length; b++) {
						//looop through photographers' tags
						if (page.photographers[a].tags[b] === currentTag) {
							//if tag matches selection
							page.photographers[a].createArtistArticle(); //display artist
							break; //stop looping through their tags and move on to next artist
						}
						//management of ON/OFF state of btns
						for (let b = 0; b < allNavBtn.length; b++) {
							//loop through all btns
							allNavBtn[b].classList = 'tag--Off'; //set all of them OFF
							if (
								utils.removeHasgTagInString(allNavBtn[b].innerText) ===
								currentTag //find the one that is selected
							) {
								allNavBtn[b].classList = 'tag--On'; //set it ON
							}
						}
					}
				}
			});
		});
	}

	async getAllMedia() {
		dataFromJson.media.forEach((media) => {
			media = new Media(
				media.id,
				media.photographerId,
				media.title,
				media.image,
				media.video,
				media.tags,
				media.likes,
				media.date,
				media.price
			);
			//	console.log(media); //correct
			this.media.push(media);
		});
		// console.log(this.media);
		for (let a = 0; a < this.media.length; a++) {
			//console.log(this.media[a].title);
			this.media[a] = await this.media[a].defineType();
		}
		//console.log(this.media);
	}
}

(async function launch() {
	let homepage = new HomePage();
	await homepage.extractData();
	await homepage.getAllMedia();
	await homepage.getAllTags();
	await homepage.writeAllArtistsArticles();
	await homepage.updateSelectionOnClick();
})();
