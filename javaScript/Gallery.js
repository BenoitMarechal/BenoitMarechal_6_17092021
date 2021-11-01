let dataFromJson = [];
class Gallery {
	constructor(photographer, media) {
		this.photographer = [];
		this.media = [];
	}

	async extractData() {
		let rep = await fetch('./public/dataBase.json');
		dataFromJson = await rep.json();
		//console.log(dataFromJson);
	}
	async getGalleryMedia() {
		dataFromJson.media.forEach((media) => {
			//	console.log(media.photographerId);
			//	console.log(this.photographer.id);
			if (media.photographerId == this.photographer.id) {
				//console.log('match ' + media.title);
				media = new Media(
					media.id,
					media.photographerId,
					media.title,
					media.image,
					media.video,
					media.tags,
					media.likes,
					media.date,
					media.price
				);
				//	console.log(media); //correct
				this.media.push(media);
			}
		});
		//console.log(this);
		for (let a = 0; a < this.media.length; a++) {
			//console.log(this.media[a].title);
			this.media[a] = await this.media[a].defineType();
		}
		//	console.log(this.media);
	}

	async writeAllMediaArticles() {
		this.media.forEach((media) => {
			//media.getPath();

			media.createMediaArticle2();
		});
	}
}

(async function launchGallery() {
	let gallery = new Gallery();
	//gallery.photographer = dataFromJson.photographers[0];
	await gallery.extractData();
	gallery.photographer = dataFromJson.photographers[0];
	await gallery.getGalleryMedia();
	//	console.log('gallery');
	//console.log(gallery);
	await gallery.writeAllMediaArticles();
	//let firstParent = document.getElementsByClassName('gallery').item(0);
	//console.log(firstParent);
})();
