class Media {
	constructor(
		id,
		photographerId,
		title,
		image,
		video,
		tags,
		likes,
		date,
		price,
		type = 'unknown'
	) {
		this.id = id;
		this.photographerId = photographerId;
		this.title = title;
		this.image = image;
		this.video = video;
		this.tags = tags;
		this.likes = likes;
		this.date = date;
		this.price = price;
		this.type = type;
	}

	// createMediaArticle() {
	// 	//ici, function pour faire un article par media
	// }
	defineType() {
		console.log('check type');
		// console.log(this.image);
		// console.log(this.video);
		if (this.image !== undefined) {
			console.log(this.title + ' is an image');
			this.type = 'photo';
		}
		if (this.video !== undefined) {
			console.log(this.title + ' is a video');
			this.type = 'video';
		}
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

// function newPic(id, photographerId, title, tags, likes, date, price, image) {
// 	(this.id = id),
// 		(this.photographerId = photographerId),
// 		(this.title = title),
// 		(this.tags = tags),
// 		(this.likes = likes),
// 		(this.date = date),
// 		(this.price = price),
// 		(this.image = image);
// }

// function newVid(id, photographerId, title, tags, likes, date, price, video) {
// 	(this.id = id),
// 		(this.photographerId = photographerId),
// 		(thi.title = title),
// 		(this.tags = tags),
// 		(this.likes = likes),
// 		(this.date = date),
// 		(this.price = price),
// 		(this.video = video);
// }

// function mediaFactory() {
// 	this.create =
// 		(id, photographerId, title, tags, likes, date, price, image, video);
// 	switch ((image, video)) {
// 		case image == null: {
// 			return new newVid(
// 				(id, photographerId, title, tags, likes, date, price, video)
// 				//;
// 			);
// 		}
// 		case video == null: {
// 			return new newVid(
// 				(id, photographerId, title, tags, likes, date, price, image)
// 				//	break
// 			);
// 		}
// 	}
// }

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

// let media1 = new Media(
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'blah',
// 	'jhg',
// 	'50euros',
// 	//'image.jpg'
// 	'video.MP4'
// );

let video1 = new Video(
	'blah',
	'blah',
	'vid1',
	'blah',
	'blah',
	'jhg',
	'50euros',
	//'image.jpg'
	'video.MP4'
);

let image1 = new Photo(
	'blah',
	'blah',
	'photo1',
	'blah',
	'blah',
	'jhg',
	'50euros',
	'image.jpg'
	//'video.MP4'
);
// console.log(image1);
// image1.checkType();
// // console.log(video1);
// video1.checkType();

let medias = [];
let videos = [];
let images = [];

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
