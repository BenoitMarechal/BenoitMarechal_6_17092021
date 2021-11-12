let dataFromJson = [];
let currentTag = '';

class Gallery {
	constructor(pageId, photographer, media) {
		this.pageId = [];
		this.photographer = [];
		this.media = [];
	}
	async getId() {
		let url = new URLSearchParams(window.location.search);
		this.pageId = url.get('id');
		//console.log(this);
		//console.log(pageId);
	}
	async extractData() {
		let rep = await fetch('./public/dataBase.json');
		dataFromJson = await rep.json();
		//console.log(dataFromJson);
	}

	async getPhotographer() {
		for (let i = 0; i < dataFromJson.photographers.length; i++) {
			// console.log(
			// 	'checking ' +
			// 		dataFromJson.photographers[i].name +
			// 		'  id =  ' +
			// 		dataFromJson.photographers[i].id +
			// 		'looking for  ' +
			// 		this.pageId
			// );
			if (dataFromJson.photographers[i].id == this.pageId) {
				//console.log('match! ' + dataFromJson.photographers[i].name);
				this.photographer = dataFromJson.photographers[i];
				//	console.log(this);
				break;
			}
		}
	}
	async writePresentation() {
		//this.getPath();

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
			//	console.log(element);
			let tour = i; //assigns media ID as article ID
			// if (tour === 0) {
			// 	// element.id = this.clearedName;
			// 	element.id = 'id' + this.pageId;
			// }
			let byClass = document.getElementsByClassName(
				elementsOfGalleryPresentation.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			//	console.log('parent  ' + parent);
			//	console.log('element   ' + element);

			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED

		let articleToFill = '';
		articleToFill = document.querySelector('.gallery__main__presentation');
		//articleToFill = document.getElementById('id' + this.pageId);

		//console.log(articleToFill);

		// articleToFill.querySelector('.photographer__link__img').alt =
		// 	this.photographer.name;
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
		// articleToFill.querySelector('.photographer__link__price').innerText =
		// 	'500 boules maggle';
		//this.photographer.price + ' €/jour';
		articleToFill.querySelector('.photographer__link__tags').innerHTML =
			generateTagButtons(this.photographer.tags);
		// <button class="gallery__main__presentation__btn">Contactez-moi</button>
		articleToFill.querySelector('.gallery__main__presentation__btn').innerText =
			'Contactez moi';
		articleToFill
			.querySelector('.gallery__main__presentation__btn')
			.classList.add('pointer');

		let clearedName = removeSpacesInString(this.photographer.name);
		let path = 'images/Photographers ID Photos/' + clearedName + '.jpg';
		// console.log('coucou');
		// console.log(clearedName);
		// console.log(path);
		//articleToFill.querySelector.src = path;
		articleToFill.querySelector('.photographer__link__img').src = path;
		// 	'images/Photographers ID Photos/' + clearedName + '.jpg';
	}

	async getGalleryMedia() {
		dataFromJson.media.forEach((media) => {
			if (media.photographerId == this.pageId) {
				//console.log('match ' + media.title);
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
				//	console.log(media); //correct
				this.media.push(media);
			}
		});
		//console.log(this);
		for (let a = 0; a < this.media.length; a++) {
			//console.log(this.media[a].title);
			this.media[a] = await this.media[a].defineType();
		}
		//console.log(this);
	}

	async updateArticles(tag) {
		if (tag == '') {
			this.media.forEach((media) => {
				media.createMediaArticle();
				//console.log('tout écrit');
			});
		} else {
			//loop through medias
			for (let a = 0; a < this.media.length; a++) {
				//loop through each media's tags (only one for now)
				for (let b = 0; b < this.media[a].tags.length; b++) {
					if (this.media[a].tags[b] === currentTag) {
						//if tag matches selection
						this.media[a].createMediaArticle(); //display artist
						break; //stop looping through their tags and move on to next artist
					}
				}
			}
			//END of Filtering
		}
	}
	deleteAll() {
		document.querySelector('.gallery__main__gallery').innerHTML = '';
	}
	sortMediaBy(value) {
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
		this.updateArticles(currentTag);
	}

	async listenToBox() {
		let gallery = this;
		let box = document.getElementById('filter');
		box.addEventListener('change', function (e) {
			gallery.deleteAll();
			//console.log('effacé');
			gallery.sortMediaBy(box.value);
		});
	}
	///////////////////////////
	async updateSelectionOnClick() {
		let allNavBtn = document.querySelectorAll('.tag');
		//console.log(allNavBtn);
		let page = this; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		//let currentTag = '';
		let emptySelection = true;
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				//listens to click
				//console.log(btn.innerText);
				page.deleteAll(); //deletes all articles at click

				// particular case: if click happens on the same tag that was already selected at the previous click
				if (
					(currentTag === removeHasgTagInString(btn.innerText)) &
					(emptySelection === false) //and a button is selected ie not coming from an "empty bar" (which happens if 3 clicks on the same button, then regular behaviour is needed)
				) {
					btn.classList = 'tag--Off'; //de-select tag button
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
				page.updateArticles(currentTag);

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
		let articles = document.querySelectorAll(
			'.gallery__main__gallery__container'
		);
		const arr = Array.from(hearts);
		console.log(arr);
		arr.forEach((heart) => {
			heart.addEventListener('click', function (e) {
				let number = arr.indexOf(heart);
				let targetMedia = gallery.media[number];
				let targetArticle = articles[number];
				let targetLikes = targetArticle.querySelector(
					'.gallery__main__gallery__container__info__likes__number'
				);
				// console.log(targetLikes);

				targetMedia.like = targetMedia.likes++;
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
		let modal = document.querySelector('.modal');
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

	// async closeContact() {
	// 	let modal = document.querySelector('.modal');

	// 	//	let btnLaunch = document.querySelector('.gallery__main__presentation__btn'); //gets the "contact" button
	// 	// close modal event

	// }

	async fillContact() {
		let name = document.querySelector('.modal__form__name');
		name.innerText = this.photographer.name;
	}
}

(async function launchGallery() {
	let gallery = new Gallery();
	await gallery.extractData();
	await gallery.getId();
	await gallery.getPhotographer();
	await gallery.writePresentation();
	await gallery.getGalleryMedia();
	gallery.fillBottomLikes();
	gallery.fillBottomPrice();
	await gallery.updateArticles(currentTag);
	await gallery.listenToBox();
	await gallery.updateSelectionOnClick();
	gallery.mediaLikes();
	await gallery.fillContact();
	await gallery.openCloseContact();
	// await gallery.closeContact();
})();

/////////////contact modal
let modal = document.querySelector('.modal');
modal.addEventListener('submit', function (e) {});

////////////////end contact modal

//lightbox: cadre avec plusieurs media, capacité à changer de média
//position par défaut (courant) incrémentée/décré suivant actions
//exceptions: début et fin de tableau
//ouverture sur le média clické

//formulaire de contact
//bouton de contact
//cleaner le code
//modal dans un autre fichier JS
//import-export JS
//definir classe dans un fichier
//submit: afficher les infos dans la console
//finir de travailler sur les likes

//compter les likes

//accessibilité à voir après
