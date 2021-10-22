let dataFromJson = [];
let navBar = document.getElementById('header__nav__ul');
let arrayOfArtists = [];
let allNavBtn = [];
let selected = [];

class HomePage {
	constructor(photographers, tags, selected) {
		this.photographers = [];
		this.tags = [];
		this.selected = [];
	}

	async extractData() {
		console.log('extraction');
		let rep = await fetch('./public/dataBase.json');
		dataFromJson = await rep.json();
		console.log(dataFromJson);
		dataFromJson.photographers.forEach((photographer) => {
			let artist = new Photographer(
				photographer.name,
				photographer.id,
				photographer.city,
				photographer.country,
				photographer.tagline,
				photographer.price,
				photographer.tags,
				photographer.visible
				//photographer.clearedName //will be used to access to photo
			);
			this.photographers.push(artist);
		});
		console.log(this.photographers);
	}

	async getAllTags() {
		console.log('build tag nav bar');
		//	let everyTagArray = [];
		this.photographers.forEach((photographer) => {
			//collect tags from photographers
			for (var i = 0; i < photographer.tags.length; i++) {
				this.tags.push(photographer.tags[i]);
			}
		});
		this.tags = [...new Set(this.tags)]; //delete all duplicates in list of every tags
		//this.tags = everyTagArray;
		navBar.innerHTML = generateTagButtons(this.tags); //fill navbar with tag buttons
		//remplacer par appendChild

		// return everyTagArray;
	}

	async initSelected() {
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

	async updateSelectionOnClick() {
		//A SIMPLIFIER
		//un seul tag à la fois
		//listends to click in the nav bar, updates values of "selected", hides/showns articles
		console.log('listening with filter');
		let allNavBtn = document.querySelectorAll('#header__nav__ul button');
		let homepage = this;
		for (let i = 0; i < allNavBtn.length; i++) {
			allNavBtn[i].addEventListener('click', function (e) {
				let emptyBar = true;
				//let matches = 0;
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
										//matches++;
										homepage.photographers[b].visible = true;
										console.log('next photograpaher');
										break;
									}
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
					//case where 0 tags are selecteds
					homepage.setAllVisibleTrue(); //all photographers become visible
				}

				homepage.hideOrShow(); //adapts visibility of all articles based on photographers "visible" value
				//console.log(matches + '  matches found');
				console.log(homepage);
			});
		}
	}

	async updateSelectionOnClick2() {
		//A SIMPLIFIER
		//un seul tag à la fois
		//listends to click in the nav bar, updates values of "selected", hides/showns articles
		console.log('listening2');
		let allNavBtn = document.querySelectorAll('#header__nav__ul button');
		console.log(allNavBtn);
		let homepage = this;
		let currentTag = '';
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				console.log('yo!');
				//homepage.initSelected();
				currentTag = removeHasgTagInString(btn.innerText);
				for (let a = 0; a < homepage.photographers.length; a++) {
					for (let b = 0; b < homepage.photographers[a].tags.length; b++) {
						if (homepage.photographers[a].tags[b] === currentTag) {
							homepage.photographers[a].createArticle;
						}
					}
				}
			});
		});
	}
}

(async function launch() {
	let homepage = new HomePage();
	await homepage.extractData();
	await homepage.getAllTags();
	//await homepage.getPhotographers();
	await homepage.initSelected();
	await homepage.writeAllArtistsArticles();

	await homepage.updateSelectionOnClick2();
})();
