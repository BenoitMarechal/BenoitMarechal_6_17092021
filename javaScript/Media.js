// "id": 8520927,
// 			"photographerId": 82,
// 			"title": "Fashion Urban Jungle",
// 			"image": "Fashion_Urban_Jungle.jpg",
// 			"tags": ["fashion"],
// 			"likes": 11,
// 			"date": "2011-11-06",
// 			"price": 55

class Media {
	constructor(
		id,
		photographerId,
		title,
		image,
		video,
		tags,
		likes,
		date,
		price
	) {
		this.id = id;
		this.photographerId = photographerId;
		this.title = title;
		this.image = image;
		this.video = video;
		this.tags = tags;
		this.likes = likes;
		this.date = date;
		this.price = price;
	}

	async defineType() {
		console.log('check type of  ');
		let newObject = {};
		// console.log(this.image);
		// console.log(this.video);
		if (this.image !== undefined) {
			console.log(this.title + ' is an image');
			//this.type = 'photo';
			newObject = new Photo(
				this.id,
				this.photographerId,
				this.title,
				this.image,
				undefined,
				this.tags,
				this.likes,
				this.date,
				this.price
			);
			console.log(newObject);
		}
		if (this.video !== undefined) {
			console.log(this.title + ' is a video');
			//this.type = 'video';
			newObject = new Video(
				this.id,
				this.photographerId,
				this.title,
				undefined,
				this.video,
				this.tags,
				this.likes,
				this.date,
				this.price
			);
			//console.log(newObject);
		}
		return newObject;
	}
	async createMediaArticle2() {
		for (let i = 0; i < elementsOfMediaArticle.typeOfElement.length; i++) {
			let element = document.createElement(
				elementsOfMediaArticle.typeOfElement[i]
			);
			element.classList.add(elementsOfMediaArticle.classOfElement[i]);
			let tour = i; //assigns media ID as article ID
			if (tour === 0) {
				// element.id = this.clearedName;
				element.id = 'id' + this.id;
			}
			let byClass = document.getElementsByClassName(
				elementsOfMediaArticle.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED
		//let articleToFill = '';
		let articleToFill = document.getElementById('id' + this.id);
		console.log(articleToFill);
		// 	articleToFill.querySelector('.photographer__link').href =
		// 		clearedName + '.html';

		// 	articleToFill.querySelector('.photographer__link__img').src =
		// 		'images/Photographers ID Photos/' + clearedName + '.jpg';
		// 	articleToFill.querySelector('.photographer__link__img').alt = this.name;
		// 	articleToFill.querySelector('.photographer__link__name').innerText =
		// 		this.name;
		// 	articleToFill.querySelector('.photographer__link__location__city').innerText =
		// 		this.city + ', ';
		// 	articleToFill.querySelector(
		// 		'.photographer__link__location__country'
		// 	).innerText = this.country;
		// 	articleToFill.querySelector('.photographer__link__tagline').innerText =
		// 		this.tagline;
		// 	articleToFill.querySelector('.photographer__link__price').innerText =
		// 		this.price + ' €/jour';
		// 	articleToFill.querySelector('.photographer__link__tags').innerHTML =
		// 		generateTagButtons(this.tags); //ARTICLE COMPLETED
		// 	return articleToFill;
	}
}

// <article class="gallery__container">
// 				<img
// 					src="images\Mimi\Animals_Rainbow.jpg"
// 					alt="jkhg"
// 					class="gallery__container__thumbnail"
// 				/>
// 				<div class="gallery__info">
// 					<div class="gallery__info__title">Ici, le titre</div>
// 					<div class="gallery__info__likes">
// 						<div class="gallery__info__likes__number">12</div>
// 						<div class="gallery__info__likes__heart">
// 							<i class="fas fa-heart"></i>
// 							<!-- <i class="far fa-heart"></i> -->
// 						</div>
// 					</div>
// 				</div>
// </article>

class Photo extends Media {
	constructor(
		id,
		photographerId,
		title,
		image,
		video = undefined,
		tags,
		likes,
		date,
		price
	) {
		super(id, photographerId, title, image, video, tags, likes, date, price);
		//this.image = image;
	}
}

class Video extends Media {
	constructor(
		id,
		photographerId,
		title,
		image = undefined,
		video,
		tags,
		likes,
		date,
		price
	) {
		super(id, photographerId, title, image, video, tags, likes, date, price);
		//this.video = video;
	}
	generateThumbNail() {}
}

function createMediaArticle() {
	//Creating elements

	let gallery__container = document.createElement('article');
	gallery__container.classList.add('gallery__container');
	let gallery__container__thumbnail = document.createElement('img');
	let galery__info = document.createElement('div');
	let gallery__info__title = document.createElement('div');
	let gallery__info__likes = document.createElement('div');
	let gallery__info__likes__number = document.createElement('div');
	let gallery__info__likes__heart = document.createElement('div');

	let array = [
		gallery__container,
		gallery__container__thumbnail,
		galery__info,
		gallery__info__title,
		gallery__info__likes,
		gallery__info__likes__number,
		gallery__info__likes__heart,
	];
	console.log(array[0]);
}

//createMediaArticle();

let elementsOfMediaArticle = {
	typeOfElement: ['article', 'img', 'div', 'div', 'div', 'div', 'div'],
	classOfElement: [
		'gallery__container',
		'gallery__container__thumbnail',
		'gallery__info',
		'gallery__info__title',
		'gallery__info__likes',
		'gallery__info__likes__number',
		'gallery__info__likes__heart',
	],
	parentOfElement: [
		'gallery',
		'gallery__container',
		'gallery',
		'gallery__info',
		'gallery__info',
		'gallery__info',
		'gallery__info',
	],
};
