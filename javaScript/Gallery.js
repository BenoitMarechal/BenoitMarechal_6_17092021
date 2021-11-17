let dataFromJson = [];
let currentTag = '';
let index = 0;

class Gallery {
	constructor(pageId, photographer, media, visibleMedia) {
		this.pageId = [];
		this.photographer = [];
		this.media = [];
		this.visibleMedia = [];
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
		).innerText = this.photographer.city + ', ';
		articleToFill.querySelector(
			'.photographer__link__location__country'
		).innerText = this.photographer.country;
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
		this.visibleMedia = this.media;
		console.log(this);
	}
	async writeAllArticles() {
		console.log('called writeAllArticles');
		this.media.forEach((media) => {
			media.createMediaArticle();
		});
	}

	hideAllArticles() {
		console.log('called hideAllArticles');
		this.visibleMedia.forEach((media) => {
			media.hideArticle();
		});
	}
	displayVisibleArticles() {
		console.log('called displayVisibleArticles');
		this.visibleMedia.forEach((media) => {
			media.displayArticle();
		});
	}

	async updateArticles(tag) {
		this.hideAllArticles();
		this.visibleMedia = [];
		if (tag == '') {
			console.log('no tag selected');
			this.visibleMedia = this.media;
		} else {
			//loop through medias
			for (let a = 0; a < this.media.length; a++) {
				//loop through each media's tags (only one for now)
				for (let b = 0; b < this.media[a].tags.length; b++) {
					if (this.media[a].tags[b] === currentTag) {
						//if tag matches selection
						this.visibleMedia.push(this.media[a]); //display media
						break; //stop looping through their tags and move on to next media
					}
					// else {
					// 	this.media[a].hideArticle();
					// }
				}
			}
			//END of Filtering
		}
		this.displayVisibleArticles();
		console.log(this);
	}

	// deleteAll() {
	// 	document.querySelector('.gallery__main__gallery').innerHTML = '';
	// }
	// sortMediaBy(value) {
	// 	if (value == 'likes') {
	// 		this.media.sort(function (a, b) {
	// 			return a.likes - b.likes;
	// 		});
	// 	}

	// 	if (value == 'date') {
	// 		this.media.sort(function (a, b) {
	// 			return removeHasgTagInString(a.date) - removeHasgTagInString(b.date);
	// 		});
	// 	}
	// 	if (value == 'title') {
	// 		this.media.sort(function (a, b) {
	// 			return a.title.localeCompare(b.title);
	// 		});
	// 	}
	// 	console.log(this.media);
	// 	this.updateArticles(currentTag);
	// 	this.openLightbox();
	// }

	sortMediaBy2(value) {
		//sorting visible media

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
		//end ofsorting visible media
		let parentDiv = document.querySelector('.gallery__main__gallery');
		let sortedArr = [];
		for (let a = 0; a < this.visibleMedia.length; a++) {
			sortedArr.push(this.visibleMedia[a].returnArticle()); //push article in sorted array
		}
		console.log(sortedArr);
		for (let a = 0; a < sortedArr.length; a++) {
			parentDiv.appendChild(sortedArr[a]);
		}
	}

	async listenToBox() {
		let gallery = this;
		let box = document.getElementById('filter');
		box.addEventListener('change', function (e) {
			console.log('box was changed');
			//gallery.hideAllArticles();
			//	console.log('effacé');
			gallery.sortMediaBy2(box.value);
		});
	}
	///////////////////////////
	async updateSelectionOnClick() {
		//manages click on NAvtag
		let allNavBtn = document.querySelectorAll('.tag');
		//console.log(allNavBtn);
		let page = this; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		//let currentTag = '';
		let emptySelection = true;
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				//listens to click
				//console.log(btn.innerText);
				//page.deleteAll(); //deletes all articles at click

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
				console.log('currentTag=  ' + currentTag);
				page.updateArticles(currentTag); //calls update method

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
	countAllLikes() {
		let totalOfLikes = 0;
		for (let a = 0; a < this.media.length; a++) {
			totalOfLikes = totalOfLikes + this.media[a].likes;
		}
		//	console.log(totalOfLikes);
		return totalOfLikes;
	}
	fillBottomLikes() {
		let target = document.querySelector('.bottom__likes__score');
		//let space = ' ';
		//let icon="<i class="fas fa-heart"></i>";
		target.innerText = this.countAllLikes();
		// this.countAllLikes() + ' yeah yeah yeah' +
		//icon;
	}

	mediaLikes() {
		let gallery = this;
		let hearts = document.querySelectorAll(
			'.gallery__main__gallery__container__info__likes__heart'
		);
		// let articles = document.querySelectorAll(
		// 	'.gallery__main__gallery__container'
		// );
		let arr = Array.from(hearts);
		//console.log(arr);
		arr.forEach((heart) => {
			let liked = false;
			heart.addEventListener('click', function (e) {
				//////essai refresh
				hearts = document.querySelectorAll(
					'.gallery__main__gallery__container__info__likes__heart'
				);
				arr = Array.from(hearts);
				let articles = document.querySelectorAll(
					'.gallery__main__gallery__container'
				);

				//////fin essai refresh
				// console.log(liked);
				let number = arr.indexOf(heart);
				console.log('article numero' + number);
				let targetMedia = gallery.media[number];
				console.log(targetMedia);
				let targetArticle = articles[number];
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

	fillBottomPrice() {
		let target = document.querySelector('.bottom__price');
		target.innerText = this.photographer.price + '€ par jour';
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
		);
		console.log('thumbnails');
		console.log(thumbnails);
		let arrayOfthumbnails = Array.from(thumbnails);
		let gallery = this;
		arrayOfthumbnails.forEach((thumbnail) => {
			thumbnail.addEventListener('click', function (e) {
				console.log('click');
				////essai refresh
				let articles = document.querySelectorAll(
					'.gallery__main__gallery__container'
				);

				let arrayOfArticles = Array.from(articles);
				console.log(articles);
				console.log(arrayOfArticles);
				//////fin essai refresh

				modal.style.display = 'block';
				index = arrayOfthumbnails.indexOf(thumbnail);
				console.log('index article cliqué' + index);

				gallery.lightBoxDisplay(index); //index de l'article cliqué

				//return index;
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
		let max = this.media.length;
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
	//await updateArticles('');
	//await gallery.displayVisibleArticles();
	gallery.fillBottomLikes();
	gallery.fillBottomPrice();
	await gallery.listenToBox();
	await gallery.updateSelectionOnClick();
	await gallery.fillContact();
	await gallery.openCloseContact();
	await gallery.closeLightbox();
	//await gallery.openLightbox();
	await gallery.navigateLightBox();
	await gallery.mediaLikes();

	//export default Gallery;
})();
//get data from form
let contactForm = {
	id: ['first', 'last', 'email', 'message'],
	value: ['none', 'none', 'none', 'none'],
};

for (let i = 0; i < contactForm.id.length; i++) {
	document
		.getElementById(contactForm.id[i])
		.addEventListener('input', function (e) {
			contactForm.value[i] = this.value;
		});
}

let modal = document.querySelector('.modal');
modal.addEventListener('submit', function (e) {
	e.preventDefault();
	for (let i = 0; i < contactForm.id.length; i++) {
		console.log(contactForm.id[i] + ' ' + contactForm.value[i]);
	}
});

// export default Gallery;
/////////////contact modal

////////////////end contact modal

//lightbox: cadre avec plusieurs media, capacité à changer de média
//position par défaut (courant) incrémentée/décré suivant actions
//exceptions: début et fin de tableau
//ouverture sur le média clické

//formulaire de contact
//bouton de contact --> OK
//cleaner le code
//modal contact dans un autre fichier JS
//import-export JS
//definir classe dans un fichier
//submit: afficher les infos dans la console -->ok
//finir de travailler sur les likes

//compter les likes --> OK

//accessibilité à voir après
