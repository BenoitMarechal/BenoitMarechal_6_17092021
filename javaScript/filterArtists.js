//////////////////////////////MANAGING FILTERS ///////////////////

let activeTags = [];

async function clickOnNavTag2() {
	//listends to click, manages button color, updates activeTags array, runs the array through article hide/show function
	console.log('listening with clickOnNavTag2');
	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	//allArtistArticles = document.getElementsByClassName('photographer');

	allNavBtn.forEach((btn) => {
		let selected = false;
		btn.addEventListener('click', function (e) {
			//looping through html buttons
			console.log('click');
			//hideAllArtistsArticles();
			selected = changeBoolean(selected); //change state of individual buttons
			let currentTag = removeHashTagsInString(btn.innerText);

			if (selected === true) {
				btn.className = 'tag--On';
				activeTags.push(currentTag);
			} else {
				btn.className = 'tag--Off';
				removeElementFromArray(activeTags, currentTag);
			}

			// if (activeTags.length === 0) {
			// 	console.log('selection nulle');
			// 	resetAllVisibles();
			// } else {
			// 	updateAllVisibilities(activeTags);
			// }

			console.log(activeTags);
			updateAllVisibilities(activeTags);
			hideOrShow();
		});
	});
}

// async function clickOnNavTag() {
// 	//listends to click, manages button color, updates activeTags array, runs the array through article hide/show function
// 	console.log('listening');
// 	allNavBtn = document.querySelectorAll('#header__nav__ul button');
// 	//allArtistArticles = document.getElementsByClassName('photographer');

// 	allNavBtn.forEach((btn) => {
// 		let selected = false;

// 		btn.addEventListener('click', function (e) {
// 			//looping through html buttons
// 			console.log('click');
// 			//hideAllArtistsArticles();
// 			selected = changeBoolean(selected); //change state of individual buttons
// 			let currentTag = removeHashTagsInString(btn.innerText);

// 			if (selected === true) {
// 				btn.className = 'tag--On';
// 				activeTags.push(currentTag);
// 			} else {
// 				btn.className = 'tag--Off';
// 				removeElementFromArray(activeTags, currentTag);
// 			}

// 			if (activeTags.length === 0) {
// 				showAllArtistsArticles();
// 			} else {
// 				//creatArticleFromClickOnTag(activeTags);
// 			}

// 			console.log(activeTags);
// 		});
// 	});
// }

// function creatArticleFromClickOnTag(array) {
// 	for (var a = 0; a < arrayOfArtists.length; a++) {
// 		//loop trough  photographers
// 		for (var b = 0; b < arrayOfArtists[a].tags.length; b++) {
// 			console.log(arrayOfArtists[a].name + '    hashtag number   ' + b);
// 			//loop trough photographers's tags
// 			for (var c = 0; c < array.length; c++) {
// 				////loop trough array (which will be activeTags)
// 				if (arrayOfArtists[a].tags[b] === array[c]) {
// 					console.log('match found');
// 					console.log('built with findArtistFromClickOnTag2');
// 					arrayOfArtists[a].show();
// 					//buildArtistArticleByName(dataFromJson.photographers[a].name);
// 					b = arrayOfArtists[a].tags.length; //breaks the loop so a photographer can't be diplayed twice
// 				} else {
// 					//arrayOfArtists[a].hide();
// 					console.log('No match');
// 				}
// 			}
// 		}
// 	}
// }

//////////////////////////////END OF MANAGING FILTERS ///////////////////
