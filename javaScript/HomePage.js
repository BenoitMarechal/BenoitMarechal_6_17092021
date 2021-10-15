//let dataFromJson = [];
let navBar = document.getElementById('header__nav__ul');
let arrayOfArtists = [];
//let allNavBtn = [];
let selected = [];
// let everyTagArray = [];

class HomePage {
	constructor(photographers, tags, selected) {
		this.photographers = photographers;
		this.tags = tags;
		this.selected = selected;
	}

	async extractData() {
		console.log('extraction');
		let rep = await fetch('./public/dataBase.json');
		dataFromJson = await rep.json();
		this.photographers = dataFromJson.photographers;
		//test
		// console.log('essai rempliassage classe');
		//console.log(HomePage);
		return dataFromJson;
	}

	async getPhotographers() {
		this.photographers.forEach((photographer) => {
			let artist = new Photographer(
				photographer.name,
				photographer.id,
				photographer.city,
				photographer.country,
				photographer.tagline,
				photographer.price,
				photographer.tags,
				photographer.visible,
				photographer.clearedName
			);

			arrayOfArtists.push(artist);
			///console.log(arrayOfArtists);
			this.photographers = arrayOfArtists;
			//console.log(artist);
			return arrayOfArtists;
		});
	}

	async getAllTags() {
		console.log('build tag nav bar');
		this.photographers.forEach((photographer) => {
			//collect tags from photographers
			for (var i = 0; i < photographer.tags.length; i++) {
				everyTagArray.push(photographer.tags[i]);
			}
		});
		everyTagArray = [...new Set(everyTagArray)]; //delete all duplicates in list of every tags
		navBar.innerHTML = generateTagButtons(everyTagArray); //fill navbar with tag buttons
		this.tags = everyTagArray;
		return everyTagArray;
	}

	async init() {
		console.log('initialize selection');
		//collect tags from photographers
		for (var i = 0; i < this.tags.length; i++) {
			selected.push(false);
		}
		this.selected = selected;
		return selected;
	}

	async writeAllArtistsArticles() {
		this.photographers.forEach((artist) => {
			artist.createArticle();
		});
		console.log('all created');
	}

	hideOrShow() {
		//reads photographers "visible" variable value and calls hide or show
		for (let i = 0; i < this.photographers.length; i++) {
			if (this.photographers[i].visible === true) {
				this.photographers[i].showArticle();
			} else {
				this.photographers[i].hideArticle();
			}
		}
	}

	setAllVisibleTrue() {
		this.photographers.forEach((photographer) => {
			photographer.visible = true;
		});
		//hideOrShow();
	}

	setAllVisibleFalse() {
		this.photographers.forEach((photographer) => {
			photographer.visible = false;
		});
		//hideOrShow();
	}

	// 	async filter() {
	// 		//listends to click, manages button color, updates activeTags array, runs the array through article hide/show function
	// 		console.log('listening with filter');
	// 		allNavBtn = document.querySelectorAll('#header__nav__ul button');
	// 		//allArtistArticles = document.getElementsByClassName('photographer');
	// 		allNavBtn.forEach((btn) => {
	// 			let selected = false;
	// 			btn.addEventListener('click', function (e) {
	// 				//looping through html buttons
	// 				console.log('click');
	// 				//hideAllArtistsArticles();
	// 				selected = changeBoolean(selected); //change state of individual buttons
	// 				let currentTag = removeHashTagsInString(btn.innerText);

	// 				if (selected === true) {
	// 					btn.className = 'tag--On';
	// 					activeTags.push(currentTag);
	// 				}
	// 				if (selected === false) {
	// 					btn.className = 'tag--Off';
	// 					removeElementFromArray(activeTags, currentTag);
	// 				}

	// 				// if (activeTags.length === 0) {
	// 				// 	console.log('selection nulle');
	// 				// 	resetAllVisibles();
	// 				// } else {
	// 				// 	updateAllVisibilities(activeTags);
	// 				// }

	// 				console.log(activeTags);
	// 				// updateAllVisibilities(activeTags);
	// 				// hideOrShow();
	// 			});
	// 		});
	// 	}
	// }

	async updateSelectionOnClick() {
		//listends to click, manages button color, updates activeTags array, runs the array through article hide/show function
		console.log('listening with filter');
		let allNavBtn = document.querySelectorAll('#header__nav__ul button');
		let homepage = this;
		//let photographers = this.photographers;

		//allArtistArticles = document.getElementsByClassName('photographer');
		for (let i = 0; i < allNavBtn.length; i++) {
			allNavBtn[i].addEventListener('click', function (e) {
				let emptyBar = true;
				let matches = 0;
				console.log('CLICK!');
				homepage.setAllVisibleFalse();
				selected[i] = changeBoolean(selected[i]);
				this.selected = selected;
				for (let a = 0; a < homepage.selected.length; a++) {
					if (homepage.selected[a] === true) {
						emptyBar = false;
						//only looking for seletected tags
						allNavBtn[a].className = 'tag--On';
						//console.log('allumé');
						console.log('looking for ' + homepage.tags[a]);
						for (let b = 0; b < homepage.photographers.length; b++) {
							console.log(homepage.photographers[b].name);
							if (homepage.photographers[b].visible === false) {
								//only looking for unselected photograpahers
								for (
									let c = 0;
									c < homepage.photographers[b].tags.length;
									c++
								) {
									console.log(
										'scanning....    ' + homepage.photographers[b].tags[c]
									);
									if (homepage.photographers[b].tags[c] === homepage.tags[a]) {
										console.log('MATCH FOUND!!!');
										matches++;
										homepage.photographers[b].visible = true;
										console.log('next photograpaher');
										break;
									}

									// 	homepage.photographers[b].visible = true;
									// 	c = homepage.photographers[b].tags.length;
									// 	b = homepage.photographers.length;
									// 	console.log('next artist');
									// } else {
									// 	homepage.photographers[b].visible = false;
									// }
								}
							} else {
								console.log('already selected');
							}
						}
					} else {
						//console.log('eteint');
						allNavBtn[a].className = 'tag--Off';
					}
				}
				//console.log(emptyBar);
				if (emptyBar === true) {
					homepage.setAllVisibleTrue();
				}

				homepage.hideOrShow();
				console.log(matches + '  matches found');
				//console.log(homepage);
			});
		}
	}
}

(async function launch() {
	let homepage = new HomePage([], []);
	await homepage.extractData();
	await homepage.getAllTags();
	await homepage.getPhotographers();
	await homepage.init();
	await homepage.writeAllArtistsArticles();
	await homepage.updateSelectionOnClick();
	//console.log(homepage.Photographers[2]);

	//console.log(homepage);
})();
