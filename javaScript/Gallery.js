let dataFromJson = [];
let currentTag = '';
let index = 0;
//let visibleArticles = [];

class Gallery {
	constructor(pageId, photographer, media, articles) {
		this.pageId = undefined;
		this.photographer = {};
		this.media = []; //passer au pluriel
		//this.visibleMedia = []; //passer au pluriel
		this.articles = [];
		//this.visibleArticles=[]
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
		//finds photographer matching id in dataFrom Json, assigns to gallery
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
			if (
				elementsOfGalleryPresentation.extraClassOfElement[i] !==
				elementsOfGalleryPresentation.classOfElement[i]
			) {
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
		articleToFill
			.querySelector('.gallery__main__presentation__btn')
			.classList.add('pointer');

		let clearedName = removeSpacesInString(this.photographer.name);
		let path = 'images/Photographers ID Photos/' + clearedName + '.jpg';
		articleToFill.querySelector('.photographer__link__img').src = path;
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
			this.articles.push(media.createMediaArticle());
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

	///listening
	async updateSelectionOnClick() {
		//fonction OK, gets currentTag
		//manages click on NAvtag
		let allNavBtn = document.querySelectorAll('.tag');
		//console.log(allNavBtn);
		let page = this; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		//let currentTag = '';
		let emptySelection = true;
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				// particular case: if click happens on the same tag that was already selected at the previous click
				if (
					(currentTag === removeHasgTagInString(btn.innerText)) &
					(emptySelection === false) //and a button is selected ie not coming from an "empty bar" (which happens if 3 clicks on the same button, then regular behaviour is needed)
				) {
					btn.classList = 'tag--Off'; //set btn off
					currentTag = '';
					emptySelection = true; //state that no button is selected
				}
				// end of particular case
				else {
					//Filtering
					currentTag = removeHasgTagInString(btn.innerText); //sets the value of currentTag
					emptySelection = false; //state that selection is not empty
				}
				//console.log('currentTag=  ' + currentTag);
				page.hideShowArticles(currentTag); //calls update method

				//management of ON/OFF state of btns
				for (let b = 0; b < allNavBtn.length; b++) {
					//loop through all btns
					allNavBtn[b].classList = 'tag--Off'; //set all of them OFF
					if (
						removeHasgTagInString(allNavBtn[b].innerText) === currentTag //find the one that is selected
					) {
						allNavBtn[b].classList = 'tag--On'; //set it ON
					}
				}
			});
		});
	}
	///end of listening
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
					if (this.media[a].tags[b] === currentTag) {
						//if tag matches selection
						this.media[a].displayArticle(); //push media in visibleMedia
						break; //stop looping through their tags and move on to next media
					}
				}
			}
		}
	}
	////End of hide/show
	//////////END of navBar Tags

	/////LIKES

	async mediaLikes2() {
		let page = this;
		this.media.forEach((media) => {
			let liked = false;
			let heart = media.returnHeart();
			let likeCount = media.returnLikeCount();
			heart.addEventListener('click', function (e) {
				console.log('click ' + media.title);
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

		// let gallery = this;
		// let hearts = document.querySelectorAll(
		// 	'.gallery__main__gallery__container__info__likes__heart'
		// );
		// let arr = Array.from(hearts);
		// arr.forEach((heart) => {
		// 	let liked = false;
		// 	heart.addEventListener('click', function (e) {
		// 		gallery.refreshVisibleArticlesArray();
		// 		let targetArticle = heart.parentNode.parentNode;
		// 		let numero = visibleArticles.indexOf(targetArticle);
		// 		console.log('numero ' + numero);
		// 		console.log('media cible');
		// 		let targetMedia = gallery.visibleMedia[numero];
		// 		console.log(targetMedia);
		// 		//let targetArticle = articles[number];
		// 		let targetLikes = targetArticle.querySelector(
		// 			'.gallery__main__gallery__container__info__likes__number'
		// 		);

		// 		// console.log(targetLikes);

		// 		if (liked == false) {
		// 			liked = true;
		// 			//console.log(liked);
		// 			targetMedia.like = targetMedia.likes++;
		// 			heart.innerHTML = '<i class="fas fa-heart"></i>';
		// 		} else {
		// 			liked = false;
		// 			targetMedia.like = targetMedia.likes--;
		// 			heart.innerHTML = '<i class="far fa-heart"></i>';
		// 		}
		// 		//console.log(liked);

		// 		targetLikes.innerText = targetMedia.likes;
		// 		gallery.fillBottomLikes();
		// 	});
		// });
	}

	/////end of LIKES

	///////////////FIN REFACTORING//////////////////////////////////////

	// displayVisibleArticles() {
	// 	//Displays articles depending on this.visibleMedia (used for tags only)
	// 	this.visibleMedia.forEach((media) => {
	// 		media.displayArticle();
	// 	});
	// }
	refreshVisibleArticlesArray() {
		//will be used for navigating lightbox
		let visibleArticles = [];
		for (let i = 0; i < this.articles.length; i++) {
			if (this.articles[i].style.display == 'block') {
				visibleArticles.push(articlesArr[i]);
			}
		}
		return visibleArticles;
	}

	async updateArticles(tag) {
		this.hideAllArticles();
		this.visibleMedia = []; //resets this.visibleMedia
		if (tag == '') {
			this.visibleMedia = this.media;
		} else {
			for (let a = 0; a < this.media.length; a++) {
				//loop through media
				for (let b = 0; b < this.media[a].tags.length; b++) {
					//loop through each media's tags (only one tag per media for now)
					if (this.media[a].tags[b] === currentTag) {
						//if tag matches selection
						this.visibleMedia.push(this.media[a]); //push media in visibleMedia
						break; //stop looping through their tags and move on to next media
					}
				}
			}
			//END of updating this.visibleMedia
		}
		this.displayVisibleArticles();
	}

	sortMediaBy(value) {
		//sorting this.visibleMedia --> Trier tous les medias?
		//console.log(this.visibleMedia);
		if (value == 'likes') {
			this.visibleMedia.sort(function (a, b) {
				return a.likes - b.likes;
			});
		}
		if (value == 'date') {
			this.visibleMedia.sort(function (a, b) {
				return removeHasgTagInString(a.date) - removeHasgTagInString(b.date);
			});
		}
		if (value == 'title') {
			this.visibleMedia.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
		}
		//END sorting this.visibleMedia
		let parentDiv = document.querySelector('.gallery__main__gallery');
		let sortedArr = [];
		for (let a = 0; a < this.visibleMedia.length; a++) {
			sortedArr.push(this.visibleMedia[a].returnArticle()); //push article in sorted array
		}
		for (let a = 0; a < sortedArr.length; a++) {
			parentDiv.appendChild(sortedArr[a]);
		}
	}

	async listenToBox() {
		let gallery = this;
		let box = document.getElementById('filter');
		box.addEventListener('change', function (e) {
			//	gallery.hideAllArticles();
			gallery.sortMediaBy(box.value);
		});
	}
	///////////////////////////

	mediaLikes() {
		let gallery = this;
		let hearts = document.querySelectorAll(
			'.gallery__main__gallery__container__info__likes__heart'
		);
		let arr = Array.from(hearts);
		arr.forEach((heart) => {
			let liked = false;
			heart.addEventListener('click', function (e) {
				gallery.refreshVisibleArticlesArray();
				let targetArticle = heart.parentNode.parentNode;
				let numero = visibleArticles.indexOf(targetArticle);
				console.log('numero ' + numero);
				console.log('media cible');
				let targetMedia = gallery.visibleMedia[numero];
				console.log(targetMedia);
				//let targetArticle = articles[number];
				let targetLikes = targetArticle.querySelector(
					'.gallery__main__gallery__container__info__likes__number'
				);

				// console.log(targetLikes);
				if (liked == false) {
					liked = true;
					//console.log(liked);
					targetMedia.like = targetMedia.likes++;
					heart.innerHTML = '<i class="fas fa-heart"></i>';
				} else {
					liked = false;
					targetMedia.like = targetMedia.likes--;
					heart.innerHTML = '<i class="far fa-heart"></i>';
				}
				//console.log(liked);

				targetLikes.innerText = targetMedia.likes;
				gallery.fillBottomLikes();
			});
		});
	}

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

	async closeLightbox() {
		let modal = document.querySelector('.lightbox__modal');
		let btnClose = document.getElementById('btnCloseLightbox'); //gets the "close" button
		btnClose.addEventListener('click', function (e) {
			modal.style.display = 'none';
		});
	}

	async openLightbox() {
		let modal = document.querySelector('.lightbox__modal');
		let thumbnails = document.querySelectorAll(
			'.gallery__main__gallery__container__thumbnail'
		); //images or videos for click detection
		let arrayOfthumbnails = Array.from(thumbnails);
		let gallery = this;
		////////detection
		arrayOfthumbnails.forEach((thumbnail) => {
			thumbnail.addEventListener('click', function (e) {
				gallery.refreshVisibleArticlesArray();
				index = visibleArticles.indexOf(thumbnail.parentNode);
				modal.style.display = 'block';
				gallery.lightBoxDisplay(index);
			});
		});
	}
	lightBoxDisplay(index) {
		//index de l'article cliqué
		//va voir l'index dans gallery.visibleMedia
		let container = document.querySelector(
			'.lightbox__modal__container__mediaContainer'
		);
		let media = this.visibleMedia[index];
		console.log(media);
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
		child.alt = media.getPath();
		container.innerHTML = ''; //delete previous picture
		container.appendChild(child); //filling container
		console.log('index vaut maintenant ' + index);
		//return index;
	}
	correctIndex() {
		//limit conditions
		console.log('correct index');
		let min = 0;
		let max = this.visibleMedia.length;
		console.log('index au départ ' + index);
		console.log('min ' + min);
		console.log('max ' + max);
		if (index > max - 1) {
			console.log('max attenint');
			index = min;
		}
		if (index < min) {
			console.log('min atteint');
			index = max - 1;
		}
		console.log('apres traitement ' + index);
		return index;
	}

	async navigateLightBox() {
		let next = document.getElementById('btnNextLightbox');
		let prev = document.getElementById('btnPrevLightbox');
		let gallery = this;

		prev.addEventListener('click', function (e) {
			console.log('prev');
			index = index - 1;
			console.log(index);
			gallery.correctIndex(); //manages limit conditions
			gallery.lightBoxDisplay(index);
		});
		next.addEventListener('click', function (e) {
			console.log('next');
			index = index + 1;
			gallery.correctIndex();
			console.log(index);
			gallery.lightBoxDisplay(index);
		});
	}
}

(async function launchGallery() {
	let gallery = new Gallery();
	await gallery.extractData();
	await gallery.getId();
	await gallery.getPhotographer();
	await gallery.writePresentation();
	await gallery.getGalleryMedia();
	await gallery.writeAllArticles();
	gallery.fillBottomLikes();
	gallery.fillBottomPrice();
	await gallery.listenToBox();
	await gallery.updateSelectionOnClick();
	await gallery.fillContact();
	await gallery.openCloseContact();
	await gallery.closeLightbox();
	await gallery.openLightbox();
	await gallery.navigateLightBox();
	await gallery.mediaLikes2();
})();

//cleaner le code
//modal contact dans un autre fichier JS
//import-export JS
//definir classe dans un fichier
//submit: afficher les infos dans la console -->ok
//finir de travailler sur les likes

//compter les likes --> OK

//accessibilité à voir après

//faire un fichier spécial pour dataFrom Json

//deadline fin novembre
