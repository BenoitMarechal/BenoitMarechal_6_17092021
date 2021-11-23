import { utils } from './utilitaries.js';
///listening to tags
export class Sort {
	constructor(Gallery) {
		this.Gallery = Gallery;
		this.sortDefault();
		this.listenToBox();
	}

	//box input
	listenToBox() {
		let gallery = this;
		let box = document.getElementById('sort');
		box.addEventListener('change', function (e) {
			gallery.sortThisMedia(box.value);
			gallery.sortArticles();
		});
	}
	////sorting gallery's Media
	sortDefault() {
		//on init
		let box = document.getElementById('sort');
		this.sortThisMedia(box[0].value);
	}

	sortThisMedia(value) {
		//on new input from combobox
		if (value == 'likes') {
			this.Gallery.medias.sort(function (a, b) {
				return a.likes - b.likes;
			});
		}
		if (value == 'date') {
			this.Gallery.medias.sort(function (a, b) {
				return (
					utils.removeHasgTagInString(a.date) -
					utils.removeHasgTagInString(b.date)
				);
			});
		}
		if (value == 'title') {
			this.Gallery.medias.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
		}
	}

	//sorting articles as per gallery media's order
	sortArticles() {
		let parentDiv = document.querySelector('.gallery__main__gallery'); //declares parent gallery
		for (let a = 0; a < this.Gallery.medias.length; a++) {
			parentDiv.appendChild(this.Gallery.medias[a].returnArticle()); //rebuilds this.articles from this.media
		}
	}
}
