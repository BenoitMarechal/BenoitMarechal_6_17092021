let dataFromJson = [];

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
				//this.photographer = 'suacisse';
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

		let clearedName = removeSpacesInString(this.photographer.name);
		let path = 'images/Photographers ID Photos/' + clearedName + '.jpg';
		// console.log('coucou');
		// console.log(clearedName);
		// console.log(path);
		//articleToFill.querySelector.src = path;
		articleToFill.querySelector('.photographer__link__img').src = path;
		// 	'images/Photographers ID Photos/' + clearedName + '.jpg';

		//ARTICLE COMPLETED

		//	console.log(this.photographerId);

		// 	articleToFill.querySelector('.gallery__container__thumbnail').src =
		// 		this.getPath();
		// 	articleToFill.querySelector('.gallery__container__thumbnail').alt =
		// 		this.title;
		// 	articleToFill.querySelector('.gallery__container__info__title').innerText =
		// 		this.title;
		// 	articleToFill.querySelector(
		// 		'.gallery__container__info__likes__number'
		// 	).innerText = this.likes;
		// 	articleToFill.querySelector(
		// 		'.gallery__container__info__likes__heart'
		// 	).innerHTML = '<i class="fas fa-heart"></i>';
		// }

		// <!-- <div class="gallery__main__presentation__info">
		// 			<h1
		// 				class="
		// 					photographer__link__name
		// 					gallery__main__presentation__info__name
		// 				"
		// 			>
		// 				Mimi Keel
		// 			</h1>
		// 			<div
		// 				class="
		// 					photographer__link__location
		// 					gallery__main__presentation__info__location
		// 				"
		// 			>
		// 				<p
		// 					class="
		// 						photographer__link__location__city
		// 						gallery__main__presentation__info__location__city
		// 					"
		// 				>
		// 					London
		// 				</p>
		// 				<p
		// 					class="
		// 						photographer__link__location__country
		// 						gallery__main__presentation__info__location__country
		// 					"
		// 				>
		// 					, UK
		// 				</p>
		// 			</div>
		// 			<div
		// 				class="
		// 					photographer__link__tagline
		// 					gallery__main__presentation__info__tagline
		// 				"
		// 			>
		// 				Voir le beau dans le quotidien
		// 			</div>
		// 			<ul
		// 				class="
		// 					photographer__link__tags
		// 					gallery__main__presentation__info__tags
		// 				"
		// 			>
		// 				<li><button class="tag">#Portait</button></li>
		// 				<li><button class="tag">#Events</button></li>
		// 				<li><button class="tag">#Travel</button></li>
		// 				<li><button class="tag">#Animals</button></li>
		// 			</ul>
		// 		</div>
		// 		<button class="gallery__main__presentation__btn">Contactez-moi</button>

		// 		<img
		// 			class="photographer__link__img gallery__main__presentation__img"
		// 			src="images\Photographers ID Photos\MimiKeel.jpg"
		// 			alt=""
		// 		/> -->
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

	async writeAllMediaArticles() {
		this.media.forEach((media) => {
			media.createMediaArticle2();
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

	await gallery.writeAllMediaArticles();
})();
