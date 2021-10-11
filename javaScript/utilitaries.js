////////////////////UTILITARIES///////////////////////////////////////////////////
function removeAllArticles() {
	//used both in filter management and page initialisation, remove all photographer articles and sets up H1
	main.innerHTML = '<h1>Nos photographes</h1>';
}

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
function removeDotsInString(string) {
	// var reg = /[ ,-]/g;
	return string.replace('.', '');
}

function removeElementFromArray(array, element) {
	for (i = 0; i < array.length; i++) {
		if (array[i] === element) {
			array = array.splice(i);
		}
	}
	return array;
}

////////////////////END OF UTILITARIES///////////////////////////////////////////////////
