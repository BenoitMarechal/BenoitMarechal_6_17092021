////////////////////UTILITARIES///////////////////////////////////////////////////

function changeBoolean(boolean) {
	if (boolean === true) {
		boolean = false;
	} else {
		boolean = true;
	}
	return boolean;
}

function removeSpacesInString(string) {
	var reg = /[ ,-]/g;
	return string.replace(reg, '');
}

function removeHashTagsInString(string) {
	// var reg = /[ ,-]/g;
	return string.replace('#', '');
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

let elementsOfArticle = {
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

////////////////////END OF UTILITARIES///////////////////////////////////////////////////
