let dataFromJson = [];
// let navBar = document.getElementById('header__nav__ul');
// let arrayOfArtists = [];
// let allNavBtn = [];
// let selected = [];

class HomePage {
	constructor(
		photographers,
		tags
		//selected
	) {
		this.photographers = [];
		this.tags = [];
		//this.selected = [];
	}

	async extractData() {
		console.log('extraction');
		let rep = await fetch('./public/dataBase.json');
		dataFromJson = await rep.json();
		//console.log(dataFromJson);
		dataFromJson.photographers.forEach((photographer) => {
			let artist = new Photographer(
				photographer.name,
				photographer.id,
				photographer.city,
				photographer.country,
				photographer.tagline,
				photographer.price,
				photographer.tags
				//photographer.visible
				//photographer.clearedName //will be used to access to photo
			);
			this.photographers.push(artist);
		});
		console.log(this.photographers);
	}

	async getAllTags() {
		let navBar = document.getElementById('header__nav__ul');
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
		navBar.innerHTML = generateTagButtons(this.tags); //fills navbar with tag buttons (function also used when building Artists Articles)
	}

	async writeAllArtistsArticles() {
		this.photographers.forEach((artist) => {
			artist.createArticle();
		});
		//console.log('all created');
	}

	deleteAll() {
		main.innerHTML = '<h1>Nos photographes</h1>';
	}

	async updateSelectionOnClick2() {
		console.log('listening2');
		let allNavBtn = document.querySelectorAll('#header__nav__ul button');

		let homepage = this; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		// let currentTag = '';
		let emptySelection = true;
		// console.log(allNavBtn);
		// console.log('emptySelection  ' + emptySelection);

		allNavBtn.forEach((btn) => {
			let currentTag = ''; //will store the value of selected tag, empty at first
			btn.addEventListener('click', function (e) {
				//listens to click
				homepage.deleteAll(); //deletes all articles
				// console.log('emptySelection  ' + emptySelection);

				if (
					//if click happens on the same tag that was already selected at the previous click
					(currentTag === removeHasgTagInString(btn.innerText)) &
					(emptySelection === false) //a button button is selected
				) {
					btn.classList = 'tag--Off'; //de-select tag button
					homepage.writeAllArtistsArticles(); //display all artists
					emptySelection = true; //state that no button is selected
					console.log('emptySelection  ' + emptySelection);
					return;
				}

				currentTag = removeHasgTagInString(btn.innerText);
				console.log('currentTag   ' + currentTag);
				emptySelection = false;
				console.log('emptySelection  ' + emptySelection);

				for (let a = 0; a < homepage.photographers.length; a++) {
					for (let b = 0; b < homepage.photographers[a].tags.length; b++) {
						if (homepage.photographers[a].tags[b] === currentTag) {
							homepage.photographers[a].createArticle();
							console.log('creation');
							break;
						}
						for (let b = 0; b < allNavBtn.length; b++) {
							allNavBtn[b].classList = 'tag--Off';
							if (
								removeHasgTagInString(allNavBtn[b].innerText) === currentTag
							) {
								allNavBtn[b].classList = 'tag--On';
							}
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
	await homepage.writeAllArtistsArticles();
	await homepage.updateSelectionOnClick2();
})();
