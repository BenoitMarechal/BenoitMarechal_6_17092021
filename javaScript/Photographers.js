import { elementsOfArtistArticle } from './utilitaries.js';
import { utils } from './utilitaries.js';

export class Photographer {
	constructor(name, id, city, country, tagline, price, tags) {
		this.name = name;
		this.id = id;
		this.city = city;
		this.country = country;
		this.tagline = tagline;
		this.price = price;
		this.tags = tags;
	}

	createArticle() {
		//writes an article for a photographer
		let clearedName = utils.removeSpacesInString(this.name);
		for (let i = 0; i < elementsOfArtistArticle.typeOfElement.length; i++) {
			let element = document.createElement(
				elementsOfArtistArticle.typeOfElement[i]
			);
			element.classList.add(elementsOfArtistArticle.classOfElement[i]);

			if (i === 0) {
				element.id = 'id' + this.id;
			}
			let byClass = document.getElementsByClassName(
				elementsOfArtistArticle.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED
		let articleToFill = document.getElementById('id' + this.id);
		articleToFill.querySelector('.photographer__link').href =
			'gallery.html' + '?id=' + this.id;

		articleToFill.querySelector('.photographer__link__img').src =
			'images/Photographers ID Photos/' + clearedName + '.jpg';
		articleToFill.querySelector('.photographer__link__img').alt = this.name;
		articleToFill.querySelector('.photographer__link__name').innerText =
			this.name;
		articleToFill.querySelector(
			'.photographer__link__location__city'
		).innerText = this.city + ', ' + '\u00A0';
		articleToFill.querySelector(
			'.photographer__link__location__country'
		).innerText = this.country;
		articleToFill.querySelector('.photographer__link__tagline').innerText =
			this.tagline;
		articleToFill.querySelector('.photographer__link__price').innerText =
			this.price + ' €/jour';
		this.tags.forEach((tag) => {
			articleToFill
				.querySelector('.photographer__link__tags')
				.appendChild(utils.generateTagButtons(tag));
		});
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
}
