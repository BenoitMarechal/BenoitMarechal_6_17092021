//////////////////////////////MANAGING FILTERS ///////////////////

let activeTags = [];

async function clickOnNavTag() {
	allNavBtn = document.querySelectorAll('#header__nav__ul button');
	//allArtistArticles = document.getElementsByClassName('photographer');

	allNavBtn.forEach((btn) => {
		let selected = false;

		btn.addEventListener('click', function (e) {
			//looping through html buttons
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
			}

			findArtistFromClickOnTag(activeTags);

			return activeTags;
		});
	});
}

function findArtistFromClickOnTag(array) {
	for (var a = 0; a < dataFromJson.photographers.length; a++) {
		for (var b = 0; b < dataFromJson.photographers[a].tags.length; b++) {
			for (var c = 0; c < array.length; c++) {
				if (dataFromJson.photographers[a].tags[b] === array[c]) {
					buildArtistArticleByName(dataFromJson.photographers[a].name);
					b = dataFromJson.photographers[a].tags.length; //breaks the loop so a photographer can't be diplayed twice
				}
			}
		}
	}
}

//////////////////////////////END OF MANAGING FILTERS ///////////////////
