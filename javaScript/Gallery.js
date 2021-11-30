/////////////////////////// import
import { dataFromJson } from './FetchData.js';
import { Media } from './Media.js';
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
		this.getGalleryMedia();
		this.sortMedias(); //also gets the sorting running
		//building
		this.writePresentation();
		this.contact();
		this.writeAllArticles();
		this.fillBottomLikes();
		this.fillBottomPrice();
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

	getGalleryMedia() {
		//gets all the media from the photographer, assigns to gallery page
		this.medias = [];
		let page = this;
		dataFromJson.media.forEach((media) => {
			if (media.photographerId == page.photographer.id) {
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
				page.medias.push(media.defineType());
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
		let sorting = new Sort(this.medias);
	}
	/////////END OF SORT

	///////////// lightbox
	enableLightBox() {
		let lightbox = new LightBox(this.medias);
	}
}
let gallery = new Gallery();
