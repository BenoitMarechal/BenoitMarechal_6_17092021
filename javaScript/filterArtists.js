//////////////////////////////MANAGING FILTERS ///////////////////

let activeTags = [];

async function clickOnNavTag() {
	console.log('listening');
	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	//allArtistArticles = document.getElementsByClassName('photographer');

	allNavBtn.forEach((btn) => {
		let selected = false;

		btn.addEventListener('click', function (e) {
			//looping through html buttons
			console.log('click');
			removeAllArticles();
			selected = changeBoolean(selected); //change state of individual buttons
			let currentTag = removeHashTagsInString(btn.innerText);

			if (selected === true) {
				btn.className = 'tag--On';
				activeTags.push(currentTag);
			} else {
				btn.className = 'tag--Off';
				removeElementFromArray(activeTags, currentTag);
			}

			if (activeTags.length === 0) {
				buildAllArtistsArticles();
			} else {
				creatArticleFromClickOnTag(activeTags);
			}

			return activeTags;
		});
	});
}

// function findArtistFromClickOnTag(array) {
// 	for (var a = 0; a < dataFromJson.photographers.length; a++) {
// 		//loop trough dataFromJson photographers
// 		for (var b = 0; b < dataFromJson.photographers[a].tags.length; b++) {
// 			//loop trough dataFromJson photographers's tags
// 			for (var c = 0; c < array.length; c++) {
// 				////loop trough array (which will be activeTags)
// 				if (dataFromJson.photographers[a].tags[b] === array[c]) {
// 					console.log(dataFromJson.photographers[a].name);
// 					//dataFromJson.photographers[a].create();
// 					buildArtistArticleByName(dataFromJson.photographers[a].name);
// 					b = dataFromJson.photographers[a].tags.length; //breaks the loop so a photographer can't be diplayed twice
// 				}
// 			}
// 		}
// 	}
// }

function creatArticleFromClickOnTag(array) {
	for (var a = 0; a < arrayOfArtists.length; a++) {
		//loop trough  photographers
		for (var b = 0; b < arrayOfArtists[a].tags.length; b++) {
			console.log(arrayOfArtists[a].name + '    hashtag number   ' + b);
			//loop trough photographers's tags
			for (var c = 0; c < array.length; c++) {
				////loop trough array (which will be activeTags)
				if (arrayOfArtists[a].tags[b] === array[c]) {
					console.log('match found');
					console.log('built with findArtistFromClickOnTag2');
					arrayOfArtists[a].create();
					//buildArtistArticleByName(dataFromJson.photographers[a].name);
					b = arrayOfArtists[a].tags.length; //breaks the loop so a photographer can't be diplayed twice
				} else {
					console.log('No match');
				}
			}
		}
	}
}

//////////////////////////////END OF MANAGING FILTERS ///////////////////
