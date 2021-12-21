import { dataFromJson } from './FetchData.js';

import { elementsOfMediaArticle } from './utilitaries.js';
import { utils } from './utilitaries.js';

export class Media {
	constructor(data) {
		this.id = data.id;
		this.photographerId = data.photographerId;
		this.title = data.title;
		this.image = data.image;
		this.video = data.video;
		this.tags = data.tags;
		this.likes = data.likes;
		this.date = data.date;
		this.price = data.price;
	}

	getPath() {
		//generates acces path for media
		for (let i = 0; i < dataFromJson.photographers.length; i++) {
			if (dataFromJson.photographers[i].id == this.photographerId) {
				let name = utils.replaceDashBySpaceInString(
					dataFromJson.photographers[i].name
				);
				let array = [];
				array = name.split(' ');
				let path = array[0];
				if (array.length > 0) {
					array.pop();
					for (let i = 1; i < array.length; i++) {
						utils.removeSpacesInString(array[i]);
						path = path + ' ' + array[i];
					}
				}
				if (this.type === 'photo') {
					path = 'images/' + path + '/' + this.image;
				} else if (this.type === 'video') {
					path = 'images/' + path + '/' + this.video;
				}
				return path;
			}
		}
	}

	createArticle() {
		//writes media article in gallery page
		for (let i = 0; i < elementsOfMediaArticle.typeOfElement.length; i++) {
			let element = document.createElement(
				elementsOfMediaArticle.typeOfElement[i]
			);
			element.classList.add(elementsOfMediaArticle.classOfElement[i]);

			if (i === 0) {
				element.id = 'id' + this.id;
				element.style.display = 'block';
			}
			let byClass = document.getElementsByClassName(
				elementsOfMediaArticle.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent

			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED
		let articleToFill = '';
		articleToFill = document.getElementById('id' + this.id);

		if (this.type === 'photo') {
			articleToFill.querySelector(
				'.gallery__main__gallery__container__thumbnail'
			).src = this.getPath();
			articleToFill.querySelector(
				'.gallery__main__gallery__container__thumbnail'
			).alt = this.title;
		} else {
			let target = articleToFill.querySelector(
				'.gallery__main__gallery__container__thumbnail'
			);
			let newElement = document.createElement('video');
			newElement.classList.add('gallery__main__gallery__container__thumbnail');
			newElement.src = this.getPath();
			newElement.setAttribute('controls', 'controls');
			let parentDiv = target.parentNode;
			parentDiv.replaceChild(newElement, target);
		}

		articleToFill.querySelector(
			'.gallery__main__gallery__container__info__title'
		).innerText = this.title;
		articleToFill.querySelector(
			'.gallery__main__gallery__container__info__likes__number'
		).innerText = this.likes;

		articleToFill.querySelector(
			'.gallery__main__gallery__container__info__likes__heart'
		).innerHTML = '<i class="far fa-heart"></i>';
		return articleToFill;
	}

	returnArticle() {
		return document.getElementById('id' + this.id);
	}

	displayArticle() {
		this.returnArticle().style.display = 'block';
	}

	hideArticle() {
		this.returnArticle().style.display = 'none';
	}

	returnThumbnail() {
		return this.returnArticle().querySelector(
			'.gallery__main__gallery__container__thumbnail'
		);
	}

	returnHeart() {
		return this.returnArticle().querySelector(
			'.gallery__main__gallery__container__info__likes__heart'
		);
	}

	returnLikeCount() {
		return this.returnArticle().querySelector(
			'.gallery__main__gallery__container__info__likes__number'
		);
	}
}

export class Photo extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
		this.type = 'photo';
	}
}

export class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
		this.type = 'video';
	}
}

export class MediaFactory {
	constructor(media) {
		if (media.image === undefined) {
			return new Video(media);
		}

		if (media.video === undefined) {
			return new Photo(media);
		} else {
			throw 'unknown format';
		}
	}
}
