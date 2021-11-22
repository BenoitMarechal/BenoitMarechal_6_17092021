/////////////////////////// import
import { dataFromJson } from './FetchData.js';
import { utils } from './utilitaries.js';
import { Media } from './Media.js';
import { ContactModal } from './ContactModal.js';
import { Like } from './GalleryLikes.js';
import { Presentation } from './PhotographerPres.js';
import { NavTags } from './GalleryTags.js';
import { Sort } from './Sort.js';
import { LightBox } from './Lightbox.js';

class Gallery {
	constructor(photographer, media, currentTag, lightBox, visibleMedia, index) {
		this.photographer = {};
		this.media = []; //passer au pluriel
		this.currentTag = undefined;
		this.lightBox = document.querySelector('.lightbox__modal');
		this.visibleMedia = [];
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
				page.media.push(media.defineType());
			}
		});
	}

	writePresentation() {
		let pres = new Presentation(this, this.photographer, '');
	}
	contact() {
		let contact = new ContactModal('', this.photographer, '');
	}
	writeAllArticles() {
		this.media.forEach((media) => {
			media.createMediaArticle();
		});
	}

	hideAllArticles() {
		this.media.forEach((media) => {
			media.hideArticle();
		});
	}
	showAllArticles() {
		this.media.forEach((media) => {
			media.displayArticle();
		});
	}

	fillBottomPrice() {
		let target = document.querySelector('.bottom__price');
		target.innerText = this.photographer.price + '€ par jour';
	}

	countAllLikes() {
		let totalOfLikes = 0;
		for (let a = 0; a < this.media.length; a++) {
			totalOfLikes = totalOfLikes + this.media[a].likes;
		}
		return totalOfLikes;
	}
	fillBottomLikes() {
		let target = document.querySelector('.bottom__likes__score');
		target.innerText = this.countAllLikes();
	}
	manageTags() {
		let tags = new NavTags(this);
	}
	/////LIKES
	mediaLikes() {
		let likes = new Like(this, this.media);
	}
	/////end of LIKES

	/////////SORT
	sortMedias() {
		let sorting = new Sort(this);
	}
	/////////END OF SORT

	///////////// lightbox
	enableLightBox() {
		let lghtbox = new LightBox(this);
	}
	// 	getVisibleMedia() {
	// 		this.visibleMedia = [];
	// 		this.media.forEach((media) => {
	// 			if (media.returnArticle().style.display == 'block') {
	// 				this.visibleMedia.push(media);
	// 			}
	// 		});
	// 	}

	// 	closeLightbox() {
	// 		let btnClose = document.getElementById('btnCloseLightbox'); //gets the "close" button
	// 		let page = this;
	// 		btnClose.addEventListener('click', function (e) {
	// 			page.lightBox.style.display = 'none';
	// 		});
	// 	}
	// 	lightBoxDisplay(index) {
	// 		let container = document.querySelector(
	// 			'.lightbox__modal__container__mediaContainer'
	// 		);
	// 		let media = this.visibleMedia[index];
	// 		let child = ''; //html eleemnt to be inserted
	// 		if (media.image !== undefined) {
	// 			//case of photo
	// 			child = document.createElement('img');
	// 		} else {
	// 			//case of video
	// 			child = document.createElement('video');
	// 			child.setAttribute('controls', 'controls');
	// 		}
	// 		child.classList.add('lightbox__modal__container__mediaContainer__media'); //filling element
	// 		child.src = media.getPath();
	// 		child.alt = media.title;
	// 		container.innerHTML = ''; //delete previous picture
	// 		container.appendChild(child); //filling container
	// 	}

	// 	openLightbox() {
	// 		let page = this;
	// 		this.media.forEach((media) => {
	// 			media.returnThumbnail().addEventListener('click', function (e) {
	// 				page.getVisibleMedia();
	// 				page.index = page.visibleMedia.indexOf(media);
	// 				page.lightBox.style.display = 'block';
	// 				page.lightBoxDisplay(page.index);
	// 			});
	// 		});
	// 	}

	// 	navigateLightBox() {
	// 		let next = document.getElementById('btnNextLightbox');
	// 		let prev = document.getElementById('btnPrevLightbox');
	// 		let gallery = this;
	// 		prev.addEventListener('click', function (e) {
	// 			//index = index - 1;
	// 			gallery.index--;
	// 			gallery.correctIndex(); //manages limit conditions
	// 			gallery.lightBoxDisplay(gallery.index);
	// 		});
	// 		next.addEventListener('click', function (e) {
	// 			gallery.index++;
	// 			//index = index + 1;
	// 			gallery.correctIndex();
	// 			gallery.lightBoxDisplay(gallery.index);
	// 		});
	// 	}
	// 	correctIndex() {
	// 		//limit conditions
	// 		let min = 0;
	// 		let max = this.visibleMedia.length;
	// 		if (this.index > max - 1) {
	// 			this.index = min;
	// 		}
	// 		if (this.index < min) {
	// 			this.index = max - 1;
	// 		}
	// 		return this.index;
	// 	}
	// }
	////////////END OF lightBox
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
	//gallery.listenToBox(); //sorting with combobox
	//gallery.updateSelectionOnClick(); //hide/show with tags
	// gallery.openCloseContact(); //open/close contact modal

	//gallery.closeLightbox(); //Close lightbox modal
	//	gallery.openLightbox(); //Open lightbox modal (loaded with first media)
	//	gallery.navigateLightBox(); //lightbox navigation
	gallery.enableLightBox();
	gallery.mediaLikes(); //likes management
})();

//modal contact dans un autre fichier JS
//import-export JS
//definir classe dans un fichier
//accessibilité à voir après
//faire un fichier spécial pour dataFrom Json
//deadline fin novembre
