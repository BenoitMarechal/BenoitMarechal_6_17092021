////////////////////UTILITARIES///////////////////////////////////////////////////

function changeBoolean(boolean) {
	if (boolean === true) {
		boolean = false;
	} else {
		boolean = true;
	}
	return boolean;
}

function removeHasgTagInString(string) {
	var reg = /[#,-]/g;
	return string.replace(reg, '');
}

function removeSpacesInString(string) {
	var reg = /[ ,-]/g;
	return string.replace(reg, '');
}

function replaceDashBySpaceInString(string) {
	var reg = /[-, ]/g;
	return string.replace(reg, ' ');
}

function generateTagButtons(tagsArray) {
	let resultString = '';
	let firstHalfOfString = '<li><button class="tag">#';
	let secondHalfOfString = '</button></li>';
	tagsArray.forEach((tag) => {
		resultString = resultString + firstHalfOfString + tag + secondHalfOfString;
	});
	return resultString;
}

//////////////////////////////CREATING ARTISTS ARTICLES///////////////////

let elementsOfArtistArticle = {
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
////////////////////////////// END OF CREATING ARTISTS ARTICLES///////////////////

//////////////////////////////CREATING MEDIA ARTICLES///////////////////
let elementsOfMediaArticle = {
	typeOfElement: ['article', 'img', 'div', 'div', 'div', 'div', 'div'],
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

//////////////////////////////CREATING GALLERY PRESENTATION///////////////////

let elementsOfGalleryPresentation = {
	typeOfElement: ['div', 'h1', 'div', 'p', 'p', 'div', 'ul', 'button', 'img'],
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
		//'gallery__main__presentation',
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

//////////////////////////////CREATING MEDIA ARTICLES///////////////////

////////////////////END OF UTILITARIES///////////////////////////////////////////////////
