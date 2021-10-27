////////////////////UTILITARIES///////////////////////////////////////////////////
function getPathFromName(name) {
	name = replaceDashBySpaceInString(name);
	console.log(name);
	let array = [];
	array = name.split(' ');
	let folderTitle = array[0];
	console.log(array);

	if (array.length > 0) {
		array.pop();
		for (let i = 1; i < array.length; i++) {
			removeSpacesInString(array[i]);
			folderTitle = folderTitle + ' ' + array[i];
		}
	}
	folderTitle = 'images/' + folderTitle;
	console.log(folderTitle);
	return folderTitle;
}

// getPathFromName('Bob');
// getPathFromName('Jean mich dugenou');
// getPathFromName('Jean-Claude du genou');

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
