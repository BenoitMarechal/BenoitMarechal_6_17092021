///listening to tags
export class LightBox {
	constructor(medias, visibleMedias, lightBox, index) {
		this.medias = medias;
		this.visibleMedias = [];
		this.lightBox = document.querySelector('.lightbox__modal');
		this.visibleMedias = undefined;
		this.index = undefined;
		this.getvisibleMedias();
		this.closeLightbox();
		this.openLightbox();
		this.navigateLightBox();
		this.keyboard();
	}
	async getvisibleMedias() {
		this.visibleMedias = []; //resets visibleMedias
		this.medias.forEach((media) => {
			if (media.returnArticle().style.display == 'block') {
				this.visibleMedias.push(media);
			}
		});
	}

	closeLightbox2() {
		this.lightBox.style.display = 'none';
	}
	next2() {
		//next.addEventListener('click', function (e) {
		this.index++;
		//index = index + 1;
		this.correctIndex();
		this.lightBoxDisplay(this.index);
		//});
	}

	closeLightbox() {
		let btnClose = document.getElementById('btnCloseLightbox'); //gets the "close" button
		//let page = this.Gallery;
		let box = this.lightBox;
		btnClose.addEventListener('click', function (e) {
			box.style.display = 'none';
		});
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
				// console.log(this);
				// console.log(page);
				page.getvisibleMedias();
				console.log(page);
				page.index = page.visibleMedias.indexOf(media);
				console.log(page.index);
				page.lightBox.style.display = 'block';

				page.lightBoxDisplay(page.index);
			});
		});
	}
	navigateLightBox() {
		let next = document.getElementById('btnNextLightbox');
		let prev = document.getElementById('btnPrevLightbox');
		let page = this;
		prev.addEventListener('click', function (e) {
			//index = index - 1;
			page.index--;
			page.correctIndex(); //manages limit conditions
			page.lightBoxDisplay(page.index);
		});
		next.addEventListener('click', function (e) {
			page.index++;
			//index = index + 1;
			page.correctIndex();
			page.lightBoxDisplay(page.index);
		});

		// next.addEventListener('click', function (e) {
		// 	page.index++;
		// 	//index = index + 1;
		// 	page.correctIndex();
		// 	page.lightBoxDisplay(page.index);
		// });
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

	keyboard() {
		let page = this;
		document.addEventListener('keydown', (e) => {
			console.log(e);
			if (e.key == 'Escape') {
				console.log('ESCAPE');
				page.closeLightbox2();
			}
		});
	}
}
