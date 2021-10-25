class Media {
	constructor(
		id,
		photographerId,
		title,
		//image,
		tags,
		likes,
		date,
		price
	) {
		this.id = id;
		this.photographerId = photographerId;
		this.title = title;
		this.tags = tags;
		this.date = date;
		this.likes = likes;
		this.price = price;
	}

	display() {
		//ici, function pour faire un article par media
	}
}

class Photo extends Media {
	constructor(id, photographerId, title, tags, likes, date, price, image) {
		super(id, photographerId, title, tags, likes, date, price, image);
		this.image = image;
	}
}
class Video extends Media {
	constructor(id, photographerId, title, tags, likes, date, price, video) {
		super(id, photographerId, title, tags, likes, date, price, video);
		this.video = video;
	}
}

// let media1 = new Media(
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'jhg',
// 	'50euros'
// );
// console.log(media1);

// let image1 = new Photo(
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'jhg',
// 	'50euros',
// 	'image.jpg'
// );
// console.log(image1);

// let video1 = new Video(
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'jhg',
// 	'50euros',
// 	'video.mp4'
// );
// console.log(video1);
