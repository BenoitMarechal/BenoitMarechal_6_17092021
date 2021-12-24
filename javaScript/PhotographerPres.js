import { utils } from './utilitaries.js';

export class Presentation {
	constructor(photographer) {
		this.photographer = photographer;
		this.elementsOfGalleryPresentation = {
			typeOfElement: [
				'div',
				'h1',
				'div',
				'p',
				'p',
				'div',
				'ul',
				'button',
				'img',
			],
			classOfElement: [
				'gallery__main__presentation__info',
				'gallery__main__presentation__info__name',
				'gallery__main__presentation__info__location',
				'gallery__main__presentation__info__location__city',
				'gallery__main__presentation__info__location__country',
				'gallery__main__presentation__info__tagline',
				'gallery__main__presentation__info__tags',
				'gallery__main__presentation__btn',
				'gallery__main__presentation__img',
			],

			extraClassOfElement: [
				undefined,
				'photographer__link__name',
				'photographer__link__location',
				'photographer__link__location__city',
				'photographer__link__location__country',
				'photographer__link__tagline',
				'photographer__link__tags',
				'pointer',
				'photographer__link__img',
			],

			parentOfElement: [
				'gallery__main__presentation',
				'gallery__main__presentation__info',
				'gallery__main__presentation__info',
				'gallery__main__presentation__info__location',
				'gallery__main__presentation__info__location',
				'gallery__main__presentation__info',
				'gallery__main__presentation__info',
				'gallery__main__presentation',
				'gallery__main__presentation',
			],
		};
		this.writePresentation();
	}
	writePresentation() {
		//generates upper content (photographer presentation)
		for (
			let i = 0;
			i < this.elementsOfGalleryPresentation.typeOfElement.length;
			i++
		) {
			let element = document.createElement(
				this.elementsOfGalleryPresentation.typeOfElement[i]
			);
			if (
				this.elementsOfGalleryPresentation.extraClassOfElement[i] !== undefined
			) {
				element.classList.add(
					this.elementsOfGalleryPresentation.extraClassOfElement[i]
				);
			}
			element.classList.add(
				this.elementsOfGalleryPresentation.classOfElement[i]
			);
			let byClass = document.getElementsByClassName(
				this.elementsOfGalleryPresentation.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED

		let articleToFill = '';
		articleToFill = document.querySelector('.gallery__main__presentation');

		articleToFill.querySelector(
			'.gallery__main__presentation__info__name'
		).innerText = this.photographer.name;

		articleToFill.querySelector(
			'.gallery__main__presentation__info__location__city'
		).innerText = this.photographer.city + ',';
		articleToFill.querySelector(
			'.gallery__main__presentation__info__location__country'
		).innerText = '\u00A0' + this.photographer.country;
		articleToFill.querySelector(
			'.gallery__main__presentation__info__tagline'
		).innerText = this.photographer.tagline;
		/////////////////////////////////////////////////////
		this.photographer.tags.forEach((tag) => {
			articleToFill
				.querySelector('.gallery__main__presentation__info__tags')
				.appendChild(utils.generateTagButtons(tag));
		});
		let allTagsBtns = document.querySelectorAll('.tag');
		console.log(allTagsBtns);
		allTagsBtns.forEach((btn) => {
			btn.classList.add('gallery__main__presentation__info__tags__btn');
		});

		//////////////////////////////////////////////////////////////////////
		articleToFill.querySelector('.gallery__main__presentation__btn').innerText =
			'Contactez moi';
		let clearedName = utils.removeSpacesInString(this.photographer.name);
		let path = 'images/Photographers ID Photos/' + clearedName + '.jpg';
		articleToFill.querySelector('.gallery__main__presentation__img').src = path;
		articleToFill.querySelector('.gallery__main__presentation__img').alt =
			this.photographer.name;
		//presentation filled
	}
}
