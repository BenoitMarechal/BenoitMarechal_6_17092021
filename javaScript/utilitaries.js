////////////////////UTILITARIES///////////////////////////////////////////////////
export class FishEyeUtilitaires {
	changeBoolean(boolean) {
		if (boolean === true) {
			boolean = false;
		} else {
			boolean = true;
		}
		return boolean;
	}
	removeHasgTagInString(string) {
		var reg = /[#,-]/g;
		return string.replace(reg, '');
	}
	removeSpacesInString(string) {
		var reg = /[ ,-]/g;
		return string.replace(reg, '');
	}
	replaceDashBySpaceInString(string) {
		var reg = /[-, ]/g;
		return string.replace(reg, ' ');
	}
	generateTagButtons(tag) {
		let liElem = document.createElement('li');
		let buttonElem = document.createElement('button');
		buttonElem.classList = 'tag';
		buttonElem.innerText = '#' + tag;
		buttonElem.setAttribute('aria-label', tag);
		liElem.appendChild(buttonElem);
		return liElem;
	}
}
// //////////////////////////////CREATING ARTISTS ARTICLES///////////////////

export let elementsOfArtistArticle = {
	typeOfElement: ['article', 'a', 'img', 'h2', 'div', 'p', 'p', 'p', 'p', 'ul'],
	classOfElement: [
		'photographer',
		'photographer__link',
		'photographer__link__img',
		'photographer__link__name',
		'photographer__link__location',
		'photographer__link__location__city',
		'photographer__link__location__country',
		'photographer__link__tagline',
		'photographer__link__price',
		'photographer__link__tags',
	],
	parentOfElement: [
		'main',
		'photographer',
		'photographer__link',
		'photographer__link',
		'photographer__link',
		'photographer__link__location',
		'photographer__link__location',
		'photographer__link',
		'photographer__link',
		'photographer__link',
	],
};

// //////////////////////////////CREATING MEDIA ARTICLES///////////////////
export let elementsOfMediaArticle = {
	typeOfElement: ['article', 'img', 'div', 'h2', 'div', 'div', 'button'],
	classOfElement: [
		'gallery__main__gallery__container',
		'gallery__main__gallery__container__thumbnail',
		'gallery__main__gallery__container__info',
		'gallery__main__gallery__container__info__title',
		'gallery__main__gallery__container__info__likes',
		'gallery__main__gallery__container__info__likes__number',
		'gallery__main__gallery__container__info__likes__heart',
	],
	parentOfElement: [
		'gallery__main__gallery',
		'gallery__main__gallery__container',
		'gallery__main__gallery__container',
		'gallery__main__gallery__container__info',
		'gallery__main__gallery__container__info',
		'gallery__main__gallery__container__info',
		'gallery__main__gallery__container__info',
	],
};
//////////////////////////////CREATING MEDIA ARTICLES///////////////////
export let utils = new FishEyeUtilitaires();
////////////////////END OF UTILITARIES///////////////////////////////////////////////////
