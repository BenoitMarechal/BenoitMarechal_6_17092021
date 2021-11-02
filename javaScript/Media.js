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
		//console.log('check type of  ');
		let newObject = {};
		// console.log(this.image);
		// console.log(this.video);
		if (this.image !== undefined) {
			//console.log(this.title + ' is an image');
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
			//console.log(newObject);
		}
		if (this.video !== undefined) {
			//	console.log(this.title + ' is a video');
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

	getPath() {
		//console.log('getPath ' + this.title);
		//	console.log(this.photographerId);
		for (let i = 0; i < dataFromJson.photographers.length; i++) {
			if (dataFromJson.photographers[i].id == this.photographerId) {
				let name = replaceDashBySpaceInString(
					dataFromJson.photographers[i].name
				);
				//console.log('name  ' + name);
				let array = [];
				array = name.split(' ');
				let path = array[0];
				//	console.log(array);

				if (array.length > 0) {
					array.pop();
					for (let i = 1; i < array.length; i++) {
						removeSpacesInString(array[i]);
						path = path + ' ' + array[i];
					}
				}
				path = 'images/' + path + '/' + this.image;
				//	console.log(folderTitle);
				return path;
			}
		}
	}

	async createMediaArticle2() {
		this.getPath();
		for (let i = 0; i < elementsOfMediaArticle.typeOfElement.length; i++) {
			let element = document.createElement(
				elementsOfMediaArticle.typeOfElement[i]
			);
			element.classList.add(elementsOfMediaArticle.classOfElement[i]);
			//	console.log(element);
			let tour = i; //assigns media ID as article ID
			if (tour === 0) {
				// element.id = this.clearedName;
				element.id = 'id' + this.id;
			}
			let byClass = document.getElementsByClassName(
				elementsOfMediaArticle.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			//	console.log('parent  ' + parent);
			//	console.log('element   ' + element);

			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED
		let articleToFill = '';
		articleToFill = document.getElementById('id' + this.id);
		//	console.log(articleToFill);
		//	console.log(this.photographerId);

		articleToFill.querySelector(
			'.gallery__main__gallery__container__thumbnail'
		).src = this.getPath();
		articleToFill.querySelector(
			'.gallery__main__gallery__container__thumbnail'
		).alt = this.title;
		articleToFill.querySelector(
			'.gallery__main__gallery__container__info__title'
		).innerText = this.title;
		articleToFill.querySelector(
			'.gallery__main__gallery__container__info__likes__number'
		).innerText = this.likes;
		articleToFill.querySelector(
			'.gallery__main__gallery__container__info__likes__heart'
		).innerHTML = '<i class="fas fa-heart"></i>';
	}
}

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
