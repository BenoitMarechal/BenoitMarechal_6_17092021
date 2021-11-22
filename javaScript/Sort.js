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
			this.Gallery.media.sort(function (a, b) {
				return a.likes - b.likes;
			});
		}
		if (value == 'date') {
			this.Gallery.media.sort(function (a, b) {
				return (
					utils.removeHasgTagInString(a.date) -
					utils.removeHasgTagInString(b.date)
				);
			});
		}
		if (value == 'title') {
			this.Gallery.media.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
		}
	}

	//sorting articles as per gallery media's order
	sortArticles() {
		let parentDiv = document.querySelector('.gallery__main__gallery'); //declares parent gallery
		for (let a = 0; a < this.Gallery.media.length; a++) {
			parentDiv.appendChild(this.Gallery.media[a].returnArticle()); //rebuilds this.articles from this.media
		}
	}
}

/////////SORT
// function listenToBox() {
// 	let gallery = this;
// 	let box = document.getElementById('sort');
// 	box.addEventListener('change', function (e) {
// 		gallery.sortThisMedia(box.value);
// 		gallery.sortArticles();
// 	});
// }
// function sortDefault() {
// 	let box = document.getElementById('sort');
// 	this.sortThisMedia(box[0].value);
// }

// function sortThisMedia(value) {
// 	if (value == 'likes') {
// 		this.media.sort(function (a, b) {
// 			return a.likes - b.likes;
// 		});
// 	}
// 	if (value == 'date') {
// 		this.media.sort(function (a, b) {
// 			return (
// 				utils.removeHasgTagInString(a.date) -
// 				utils.removeHasgTagInString(b.date)
// 			);
// 		});
// 	}
// 	if (value == 'title') {
// 		this.media.sort(function (a, b) {
// 			return a.title.localeCompare(b.title);
// 		});
// 	}
// }
//END sorting this.media
//sorting articles
// function sortArticles() {
// 	let parentDiv = document.querySelector('.gallery__main__gallery'); //declares parent gallery
// 	for (let a = 0; a < this.media.length; a++) {
// 		parentDiv.appendChild(this.media[a].returnArticle()); //rebuilds this.articles from this.media
// 	}
// }
/////////END OF SORT