///listening to tags
export class LightBox {
	constructor(medias) {
		this.medias = medias;
		this.visibleMedias = [];
		this.lightBox = document.querySelector('.lightbox__modal');
		this.visibleMedias = undefined;
		this.index = undefined;
		this.getvisibleMedias();
		this.closeLightbox();
		this.openLightbox();
		this.navigateLightBox();
	}
	async getvisibleMedias() {
		this.visibleMedias = []; //resets visibleMedias
		this.medias.forEach((media) => {
			if (media.returnArticle().style.display == 'block') {
				this.visibleMedias.push(media);
			}
		});
	}

	closeLightbox() {
		this.lightBox.style.display = 'none';
	}
	next() {
		this.index++;
		this.correctIndex();
		this.lightBoxDisplay(this.index);
	}
	prev() {
		this.index--;
		this.correctIndex();
		this.lightBoxDisplay(this.index);
	}
	lightBoxDisplay(index) {
		let container = document.querySelector(
			'.lightbox__modal__container__mediaContainer'
		);
		let media = this.visibleMedias[index];
		let child = ''; //html element to be inserted
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
		this.medias.forEach((media) => {
			media.returnThumbnail().addEventListener('click', function (e) {
				page.getvisibleMedias();
				page.index = page.visibleMedias.indexOf(media);
				page.lightBox.style.display = 'block';

				page.lightBoxDisplay(page.index);
			});
		});
	}
	navigateLightBox() {
		let page = this;
		let next = document.getElementById('btnNextLightbox');
		let prev = document.getElementById('btnPrevLightbox');
		let close = document.getElementById('btnCloseLightbox'); //gets the "close" button
		//////clicks
		prev.addEventListener('click', function (e) {
			page.next();
		});
		next.addEventListener('click', function (e) {
			page.next();
		});
		close.addEventListener('click', function (e) {
			page.closeLightbox();
		});
		////////keyboard
		document.addEventListener('keydown', (e) => {
			if (e.key == 'Escape') {
				page.closeLightbox();
			}
			if (e.key == 'ArrowRight') {
				page.next();
			}
			if (e.key == 'ArrowLeft') {
				page.prev();
			}
		});
	}

	correctIndex() {
		//limit conditions
		let min = 0;
		let max = this.visibleMedias.length;
		if (this.index > max - 1) {
			this.index = min;
		}
		if (this.index < min) {
			this.index = max - 1;
		}
		return this.index;
	}
}
