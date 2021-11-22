import { utils } from './utilitaries.js';
///listening to tags
export class LightBox {
	constructor(Gallery) {
		this.Gallery = Gallery;
		this.getVisibleMedia();
		this.closeLightbox();
		this.openLightbox();
		this.navigateLightBox();
	}
	getVisibleMedia() {
		this.Gallery.visibleMedia = [];
		this.Gallery.media.forEach((media) => {
			if (media.returnArticle().style.display == 'block') {
				this.Gallery.visibleMedia.push(media);
			}
		});
	}

	closeLightbox() {
		let btnClose = document.getElementById('btnCloseLightbox'); //gets the "close" button
		let page = this.Gallery;
		btnClose.addEventListener('click', function (e) {
			page.lightBox.style.display = 'none';
		});
	}

	lightBoxDisplay(index) {
		let container = document.querySelector(
			'.lightbox__modal__container__mediaContainer'
		);
		let media = this.Gallery.visibleMedia[index];

		let child = ''; //html eleemnt to be inserted
		if (media.image !== undefined) {
			//case of photo
			child = document.createElement('img');
		} else {
			//case of video
			child = document.createElement('video');
			child.setAttribute('controls', 'controls');
		}
		child.classList.add('lightbox__modal__container__mediaContainer__media'); //filling element
		child.src = media.getPath();
		child.alt = media.title;
		container.innerHTML = ''; //delete previous picture
		container.appendChild(child); //filling container
	}

	openLightbox() {
		let page = this;
		this.Gallery.media.forEach((media) => {
			media.returnThumbnail().addEventListener('click', function (e) {
				page.getVisibleMedia();
				page.Gallery.index = page.Gallery.visibleMedia.indexOf(media);
				page.Gallery.lightBox.style.display = 'block';
				page.lightBoxDisplay(page.Gallery.index);
			});
		});
	}
	navigateLightBox() {
		let next = document.getElementById('btnNextLightbox');
		let prev = document.getElementById('btnPrevLightbox');
		let gallery = this;
		prev.addEventListener('click', function (e) {
			//index = index - 1;
			gallery.Gallery.index--;
			gallery.correctIndex(); //manages limit conditions
			gallery.lightBoxDisplay(gallery.Gallery.index);
		});
		next.addEventListener('click', function (e) {
			gallery.Gallery.index++;
			//index = index + 1;
			gallery.correctIndex();
			gallery.lightBoxDisplay(gallery.Gallery.index);
		});
	}

	correctIndex() {
		//limit conditions
		let min = 0;
		let max = this.Gallery.visibleMedia.length;
		if (this.Gallery.index > max - 1) {
			this.Gallery.index = min;
		}
		if (this.Gallery.index < min) {
			this.Gallery.index = max - 1;
		}
		return this.index;
	}
}

// function getVisibleMedia() {
// 	this.visibleMedia = [];
// 	this.media.forEach((media) => {
// 		if (media.returnArticle().style.display == 'block') {
// 			this.visibleMedia.push(media);
// 		}
// 	});
// }

// function lightBoxDisplay(index) {
// 	let container = document.querySelector(
// 		'.lightbox__modal__container__mediaContainer'
// 	);
// 	let media = this.visibleMedia[index];
// 	let child = ''; //html eleemnt to be inserted
// 	if (media.image !== undefined) {
// 		//case of photo
// 		child = document.createElement('img');
// 	} else {
// 		//case of video
// 		child = document.createElement('video');
// 		child.setAttribute('controls', 'controls');
// 	}
// 	child.classList.add('lightbox__modal__container__mediaContainer__media'); //filling element
// 	child.src = media.getPath();
// 	child.alt = media.title;
// 	container.innerHTML = ''; //delete previous picture
// 	container.appendChild(child); //filling container
// }

// function openLightbox() {
// 	let page = this;
// 	this.media.forEach((media) => {
// 		media.returnThumbnail().addEventListener('click', function (e) {
// 			page.getVisibleMedia();
// 			page.index = page.visibleMedia.indexOf(media);
// 			page.lightBox.style.display = 'block';
// 			page.lightBoxDisplay(page.index);
// 		});
// 	});
// }

// function navigateLightBox() {
// 	let next = document.getElementById('btnNextLightbox');
// 	let prev = document.getElementById('btnPrevLightbox');
// 	let gallery = this;
// 	prev.addEventListener('click', function (e) {
// 		//index = index - 1;
// 		gallery.index--;
// 		gallery.correctIndex(); //manages limit conditions
// 		gallery.lightBoxDisplay(gallery.index);
// 	});
// 	next.addEventListener('click', function (e) {
// 		gallery.index++;
// 		//index = index + 1;
// 		gallery.correctIndex();
// 		gallery.lightBoxDisplay(gallery.index);
// 	});
// }
// function correctIndex() {
// 	//limit conditions
// 	let min = 0;
// 	let max = this.visibleMedia.length;
// 	if (this.index > max - 1) {
// 		this.index = min;
// 	}
// 	if (this.index < min) {
// 		this.index = max - 1;
// 	}
// 	return this.index;
// }
