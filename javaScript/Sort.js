import { utils } from './utilitaries.js';

export class Sort {
	constructor(parent) {
		this.parent = parent;
		this.medias = this.parent.medias;
		this.sortDefault();
		this.listenToBox();
	}

	//box input
	listenToBox() {
		let medias = this;
		let options = document.querySelectorAll('.select-items');
		let box = document.getElementById('sort');
		options.forEach((option) => {
			option.addEventListener('click', function (e) {
				medias.sortThisMedia(box.value);
				medias.sortArticles();
			});
		});
	}

	////sorting gallery's Media
	sortDefault() {
		//on init, sort per default value
		let box = document.getElementById('sort');
		this.sortThisMedia(box[0].value);
	}

	sortThisMedia(value) {
		//on new input from combobox
		if (value == 'likes') {
			this.medias.sort(function (a, b) {
				return a.likes - b.likes;
			});
		}
		if (value == 'date') {
			this.medias.sort(function (a, b) {
				return (
					utils.removeHasgTagInString(a.date) -
					utils.removeHasgTagInString(b.date)
				);
			});
		}
		if (value == 'title') {
			this.medias.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
		}
	}

	//sorting articles as per gallery media's order
	sortArticles() {
		let parentDiv = document.querySelector('.gallery__main__gallery'); //declares parent gallery
		for (let a = 0; a < this.medias.length; a++) {
			parentDiv.appendChild(this.medias[a].returnArticle()); //rebuilds this.articles from this.medias
		}
		this.parent.assignTabIndex(); //resets index
	}
}
