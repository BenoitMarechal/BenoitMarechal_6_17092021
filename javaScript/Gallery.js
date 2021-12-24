/////////////////////////// import
import { dataFromJson } from './FetchData.js';
import { ContactModal } from './Contact.js';
import { Like } from './GalleryLikes.js';
import { Presentation } from './PhotographerPres.js';
import { NavTags } from './RunTags.js';
import { Sort } from './Sort.js';
import { LightBox } from './Lightbox.js';

class Gallery {
	constructor() {
		//loading
		this.getPhotographer();
		this.getAllMedias();
		this.sortMedias(); //also gets the sorting running
		//building
		this.writePresentation();
		this.contact();
		this.writeAllArticles();
		this.fillBottomLikes();
		this.fillBottomPrice();
		this.assignTabIndex();
		/////running
		this.manageTags(); //tags
		this.enableLightBox(); //lightbox
		this.mediaLikes(); //likes management
	}

	getPhotographer() {
		let pageId = new URLSearchParams(window.location.search).get('id');
		//finds photographer matching id in dataFromJson, assigns to gallery
		for (let i = 0; i < dataFromJson.photographers.length; i++) {
			if (dataFromJson.photographers[i].id == pageId) {
				this.photographer = dataFromJson.photographers[i];
				break;
			}
		}
	}

	getAllMedias() {
		this.medias = [];
		dataFromJson.media.forEach((media) => {
			if (media.photographerId == this.photographer.id) {
				this.medias.push(media);
			}
		});
	}

	writePresentation() {
		let pres = new Presentation(this.photographer);
	}
	contact() {
		let contact = new ContactModal(this.photographer);
	}
	writeAllArticles() {
		this.medias.forEach((media) => {
			media.createArticle();
		});
	}

	hideAllArticles() {
		this.medias.forEach((media) => {
			media.hideArticle();
		});
	}
	showAllArticles() {
		this.medias.forEach((media) => {
			media.displayArticle();
		});
	}

	fillBottomPrice() {
		let target = document.querySelector('.bottom__price');
		target.innerText = this.photographer.price + '€ par jour';
	}

	countAllLikes() {
		let totalOfLikes = 0;
		for (let a = 0; a < this.medias.length; a++) {
			totalOfLikes = totalOfLikes + this.medias[a].likes;
		}
		return totalOfLikes;
	}
	fillBottomLikes() {
		let target = document.querySelector('.bottom__likes__score');
		target.innerText = this.countAllLikes();
	}
	manageTags() {
		let tags = new NavTags(this, this.medias);
	}
	/////LIKES
	mediaLikes() {
		let likes = new Like(this);
	}
	/////end of LIKES

	/////////SORT
	sortMedias() {
		let sorting = new Sort(this);
	}
	/////////END OF SORT

	///////////// lightbox
	enableLightBox() {
		let lightbox = new LightBox(this.medias);
	}
	assignTabIndex() {
		//logo link tabIndex is 1
		let index = 2;
		//tag buttons
		let tagBar = document.querySelectorAll('.tag');
		for (let i = 0; i < tagBar.length; i++) {
			tagBar[i].tabIndex = index;
			index++;
		}
		//contact button
		document.querySelector('.gallery__main__presentation__btn').tabIndex =
			index;
		index++;
		// /////contact form fields
		let contactModalElements = Array.from(
			document.querySelectorAll('input , textarea')
		);
		let close = document.getElementById('btnClose');
		contactModalElements.push(close);
		for (let i = 0; i < contactModalElements.length; i++) {
			contactModalElements[i].tabIndex = index;
			index++;
		}
		////Select
		let listOfDivs = [];
		listOfDivs.push(document.querySelector('.select-selected')); //gets the first div
		let options = document.querySelectorAll('.select-items div'); //gets the other divs
		options.forEach((options) => {
			listOfDivs.push(options);
		}); //assembles all divs
		for (let i = 0; i < listOfDivs.length; i++) {
			listOfDivs[i].tabIndex = index;
			index++;
		}

		//media articles and like buttons
		this.visibleMedias = [];
		let gallery = this;
		this.medias.forEach((media) => {
			if (media.returnArticle().style.display == 'block') {
				gallery.visibleMedias.push(media);
			}
		}); //makes a list of all visible  medias
		for (let i = 0; i < gallery.visibleMedias.length; i++) {
			gallery.visibleMedias[i].returnThumbnail().tabIndex = index;
			index++;
			gallery.visibleMedias[i].returnHeart().tabIndex = index;
			index++; //assigns index to clickable thumbnails and like buttons
		}
	}
}
let gallery = new Gallery();
