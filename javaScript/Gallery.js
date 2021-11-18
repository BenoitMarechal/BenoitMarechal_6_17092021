let dataFromJson = [];
class Gallery {
	constructor(
		pageId,
		photographer,
		media,
		currentTag,
		lightBox,
		visibleMedia,
		index
	) {
		this.pageId = undefined;
		this.photographer = {};
		this.media = []; //passer au pluriel
		this.currentTag = undefined;
		this.lightBox = document.querySelector('.lightbox__modal');
		this.visibleMedia = [];
		this.index = undefined;
	}
	async getId() {
		//extracts id from url
		let url = new URLSearchParams(window.location.search);
		this.pageId = url.get('id');
	}
	async extractData() {
		//extracts dataFromJson
		let rep = await fetch('./public/dataBase.json');
		dataFromJson = await rep.json();
	}

	async getPhotographer() {
		//finds photographer matching id in dataFromJson, assigns to gallery
		for (let i = 0; i < dataFromJson.photographers.length; i++) {
			if (dataFromJson.photographers[i].id == this.pageId) {
				this.photographer = dataFromJson.photographers[i];
				break;
			}
		}
	}
	async writePresentation() {
		//generates upper content (photographer presentation)
		for (
			let i = 0;
			i < elementsOfGalleryPresentation.typeOfElement.length;
			i++
		) {
			let element = document.createElement(
				elementsOfGalleryPresentation.typeOfElement[i]
			);
			if (elementsOfGalleryPresentation.extraClassOfElement[i] !== undefined) {
				element.classList.add(
					elementsOfGalleryPresentation.extraClassOfElement[i]
				);
			}
			element.classList.add(elementsOfGalleryPresentation.classOfElement[i]);
			let byClass = document.getElementsByClassName(
				elementsOfGalleryPresentation.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED

		let articleToFill = '';
		articleToFill = document.querySelector('.gallery__main__presentation');
		articleToFill.querySelector('.photographer__link__name').innerText =
			this.photographer.name;
		articleToFill.querySelector(
			'.photographer__link__location__city'
		).innerText = this.photographer.city + ',';
		articleToFill.querySelector(
			'.photographer__link__location__country'
		).innerText = '\u00A0' + this.photographer.country;
		articleToFill.querySelector('.photographer__link__tagline').innerText =
			this.photographer.tagline;
		articleToFill.querySelector('.photographer__link__tags').innerHTML =
			generateTagButtons(this.photographer.tags);
		articleToFill.querySelector('.gallery__main__presentation__btn').innerText =
			'Contactez moi';
		let clearedName = removeSpacesInString(this.photographer.name);
		let path = 'images/Photographers ID Photos/' + clearedName + '.jpg';
		articleToFill.querySelector('.photographer__link__img').src = path;
		articleToFill.querySelector('.photographer__link__img').alt =
			this.photographer.name;
		//presentation filled
	}

	async getGalleryMedia() {
		//gets all the media from the photographer, assigns to gallery page
		dataFromJson.media.forEach((media) => {
			if (media.photographerId == this.pageId) {
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
				this.media.push(media);
			}
		});
		for (let a = 0; a < this.media.length; a++) {
			this.media[a] = await this.media[a].defineType();
		}
		//this.visibleMedia = this.media;
	}
	async writeAllArticles() {
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

	////////////////contact modal (voire pour export)
	async openCloseContact() {
		let modal = document.querySelector('.contact__modal');
		let btnLaunch = document.querySelector('.gallery__main__presentation__btn'); //gets the "contact" button
		let btnClose = document.getElementById('btnClose'); //gets the "close" button
		// launch modal event
		btnLaunch.addEventListener('click', function (e) {
			modal.style.display = 'block';
		});
		//close modal event
		btnClose.addEventListener('click', function (e) {
			modal.style.display = 'none';
		});
	}
	async fillContact() {
		let name = document.querySelector('.modal__container__name');
		name.innerText = this.photographer.name;
	}
	///listening to tags
	async updateSelectionOnClick() {
		//manages click on NAvtag
		let allNavBtn = document.querySelectorAll('.tag');
		let page = this; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		let emptySelection = true;
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				let btnInput = removeHasgTagInString(btn.innerText);
				// particular case: if click happens on the same tag that was already selected at the previous click
				if (
					(page.currentTag === btnInput) &
					(emptySelection === false) //and a button is selected ie not coming from an "empty bar" (which happens if 3 clicks on the same button, then regular behaviour is needed)
				) {
					btn.classList = 'tag--Off'; //set btn off
					page.currentTag = '';
					emptySelection = true; //state that no button is selected
				}
				// end of particular case
				else {
					//Filtering
					page.currentTag = btnInput; //sets the value of currentTag
					emptySelection = false; //state that selection is not empty
				}
				page.hideShowArticles(page.currentTag); //calls update method
				//management of ON/OFF state of btns
				allNavBtn.forEach((btn) => {
					btn.classList = 'tag--Off'; //set all of them OFF

					if (
						removeHasgTagInString(btn.innerText) === page.currentTag //find the one that is selected
					) {
						btn.classList = 'tag--On'; //set it ON
					}
				});
			});
		});
	}
	////hide/show
	hideShowArticles(tag) {
		this.hideAllArticles();
		if (tag == '') {
			this.showAllArticles();
		} else {
			for (let a = 0; a < this.media.length; a++) {
				//loop through media
				for (let b = 0; b < this.media[a].tags.length; b++) {
					//loop through each media's tags (only one tag per media for now)
					if (this.media[a].tags[b] === this.currentTag) {
						//if tag matches selection
						this.media[a].displayArticle(); //push media in visibleMedia
						break; //stop looping through their tags and move on to next media
					}
				}
			}
		}
	}
	/////LIKES
	async mediaLikes() {
		let page = this;
		this.media.forEach((media) => {
			let liked = false;
			let heart = media.returnHeart();
			let likeCount = media.returnLikeCount();
			heart.addEventListener('click', function (e) {
				if (liked == false) {
					liked = true;
					media.like = media.likes++;
					heart.innerHTML = '<i class="fas fa-heart"></i>';
				} else {
					liked = false;
					media.like = media.likes--;
					heart.innerHTML = '<i class="far fa-heart"></i>';
				}
				likeCount.innerHTML = media.likes;
				page.fillBottomLikes();
			});
		});
	}
	/////end of LIKES

	/////////SORT
	async listenToBox() {
		let gallery = this;
		let box = document.getElementById('filter');
		box.addEventListener('change', function (e) {
			gallery.sortThisMedia(box.value);
			gallery.sortArticles();
		});
	}

	sortThisMedia(value) {
		if (value == 'likes') {
			this.media.sort(function (a, b) {
				return a.likes - b.likes;
			});
		}
		if (value == 'date') {
			this.media.sort(function (a, b) {
				return removeHasgTagInString(a.date) - removeHasgTagInString(b.date);
			});
		}
		if (value == 'title') {
			this.media.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
		}
	}
	//END sorting this.media
	//sorting articles
	sortArticles() {
		let parentDiv = document.querySelector('.gallery__main__gallery'); //declares parent gallery
		for (let a = 0; a < this.media.length; a++) {
			parentDiv.appendChild(this.media[a].returnArticle()); //rebuilds this.articles from this.media
		}
	}
	/////////END OF SORT
	///////////// lightbox
	getVisibleMedia() {
		this.visibleMedia = [];
		this.media.forEach((media) => {
			if (media.returnArticle().style.display == 'block') {
				this.visibleMedia.push(media);
			}
		});
	}

	async closeLightbox() {
		let btnClose = document.getElementById('btnCloseLightbox'); //gets the "close" button
		let page = this;
		btnClose.addEventListener('click', function (e) {
			page.lightBox.style.display = 'none';
		});
	}
	lightBoxDisplay(index) {
		let container = document.querySelector(
			'.lightbox__modal__container__mediaContainer'
		);
		let media = this.visibleMedia[index];
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

	async openLightbox() {
		let page = this;
		this.media.forEach((media) => {
			media.returnThumbnail().addEventListener('click', function (e) {
				page.getVisibleMedia();
				page.index = page.visibleMedia.indexOf(media);
				page.lightBox.style.display = 'block';
				page.lightBoxDisplay(page.index);
			});
		});
	}

	async navigateLightBox() {
		let next = document.getElementById('btnNextLightbox');
		let prev = document.getElementById('btnPrevLightbox');
		let gallery = this;
		prev.addEventListener('click', function (e) {
			//index = index - 1;
			gallery.index--;
			gallery.correctIndex(); //manages limit conditions
			gallery.lightBoxDisplay(gallery.index);
		});
		next.addEventListener('click', function (e) {
			gallery.index++;
			//index = index + 1;
			gallery.correctIndex();
			gallery.lightBoxDisplay(gallery.index);
		});
	}
	correctIndex() {
		//limit conditions
		let min = 0;
		let max = this.visibleMedia.length;
		if (this.index > max - 1) {
			this.index = min;
		}
		if (this.index < min) {
			this.index = max - 1;
		}
		return this.index;
	}
}
////////////END OF lightBox

(async function launchGallery() {
	let gallery = new Gallery();
	///loading
	await gallery.extractData();
	await gallery.getId();
	await gallery.getPhotographer();
	await gallery.getGalleryMedia();
	////building
	await gallery.writePresentation();
	gallery.sortThisMedia('likes'); //so articles are first displayed as per default value of combobox
	await gallery.writeAllArticles();
	gallery.fillBottomLikes();
	gallery.fillBottomPrice();
	await gallery.fillContact(); //insert photographer's name in contact modal
	/////running
	await gallery.listenToBox(); //sorting with combobox
	await gallery.updateSelectionOnClick(); //hide/show with tags
	await gallery.openCloseContact(); //open/close contact modal
	await gallery.closeLightbox(); //Close lightbox modal
	await gallery.openLightbox(); //Open lightbox modal (loaded with first media)
	await gallery.navigateLightBox(); //lightbox navigation
	await gallery.mediaLikes(); //likes management
})();

//modal contact dans un autre fichier JS
//import-export JS
//definir classe dans un fichier
//accessibilité à voir après
//faire un fichier spécial pour dataFrom Json
//deadline fin novembre
