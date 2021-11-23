/////////////////////////// import
import { dataFromJson } from './FetchData.js';
import { Media } from './Media.js';
import { ContactModal } from './ContactModal.js';
import { Like } from './GalleryLikes.js';
import { Presentation } from './PhotographerPres.js';
import { NavTags } from './RunTags.js';
import { Sort } from './Sort.js';
import { LightBox } from './Lightbox.js';

class Gallery {
	constructor(
		photographer,
		medias,
		currentTag,
		lightBox,
		visibleMedias,
		index
	) {
		this.photographer = {};
		this.medias = []; //passer au pluriel
		this.currentTag = undefined;
		this.lightBox = document.querySelector('.lightbox__modal');
		this.visibleMedias = [];
		this.index = undefined;
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
		let pres = new Presentation(this.photographer, '');
	}
	contact() {
		let contact = new ContactModal('', this.photographer, '');
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
		let likes = new Like(this, this.medias);
	}
	/////end of LIKES

	/////////SORT
	sortMedias() {
		let sorting = new Sort(this.medias);
	}
	/////////END OF SORT

	///////////// lightbox
	enableLightBox() {
		let lightbox = new LightBox(this);
	}
}

(function launchGallery() {
	let gallery = new Gallery();
	///loading
	gallery.getPhotographer(); //gets photographer based on id
	gallery.getGalleryMedia(); //gets media nbased on photographer
	////building
	gallery.writePresentation(); //writes upper part with photographer data
	gallery.contact(); //fills contact modal with artist name and runs modal functions
	gallery.sortMedias(); //sorts medias with default combobox value (popularity), runs combobox
	gallery.writeAllArticles(); //generating all articles
	gallery.fillBottomLikes(); //
	gallery.fillBottomPrice();
	/////running
	gallery.manageTags();
	gallery.enableLightBox();
	gallery.mediaLikes(); //likes management
})();

//accessibilité à voir après
//faire un fichier spécial pour dataFrom Json
//deadline fin novembre
