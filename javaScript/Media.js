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
		price
		//type = 'unknown'
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
		//this.type = type;
	}
	async defineType() {
		//console.log('check type');
		let newObject = {};
		// console.log(this.image);
		// console.log(this.video);
		if (this.image !== undefined) {
			//console.log(this.title + ' is an image');
			//this.type = 'photo';
			newObject = new Photo(
				this.id,
				this.photographerId,
				this.title,
				this.tags,
				this.likes,
				this.date,
				this.price,
				this.image
			);
			//console.log(newObject);
		}
		if (this.video !== undefined) {
			//console.log(this.title + ' is a video');
			//this.type = 'video';
			newObject = new Video(
				this.id,
				this.photographerId,
				this.title,
				this.tags,
				this.likes,
				this.date,
				this.price,
				this.video
			);
			//console.log(newObject);
		}
		return newObject;
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
// 	'654',
// 	'6547',
// 	'super titre',
// 	'kjh.jpg',
// 	undefined,
// 	['tag1', 'tag2'],
// 	'12',
// 	'20/05/1985',
// 	'55'
// );

// console.log(media1);

// class Media {
// 	constructor(
// 		id,
// 		photographerId,
// 		title,
// 		image,
// 		video,
// 		tags,
// 		likes,
// 		date,
// 		price,
// 		type = 'unknown'
// 	) {
// 		this.id = id;
// 		this.photographerId = photographerId;
// 		this.title = title;
// 		this.image = image;
// 		this.video = video;
// 		this.tags = tags;
// 		this.likes = likes;
// 		this.date = date;
// 		this.price = price;
// 		this.type = type;
// 	}

// 	// createMediaArticle() {
// 	// 	//ici, function pour faire un article par media
// 	// }
// 	defineType() {
// 		console.log('check type');
// 		// console.log(this.image);
// 		// console.log(this.video);
// 		if (this.image !== undefined) {
// 			console.log(this.title + ' is an image');
// 			this.type = 'photo';
// 		}
// 		if (this.video !== undefined) {
// 			console.log(this.title + ' is a video');
// 			this.type = 'video';
// 		}
// 	}
// }

// // function newPic(id, photographerId, title, tags, likes, date, price, image) {
// // 	(this.id = id),
// // 		(this.photographerId = photographerId),
// // 		(this.title = title),
// // 		(this.tags = tags),
// // 		(this.likes = likes),
// // 		(this.date = date),
// // 		(this.price = price),
// // 		(this.image = image);
// // }

// // function newVid(id, photographerId, title, tags, likes, date, price, video) {
// // 	(this.id = id),
// // 		(this.photographerId = photographerId),
// // 		(thi.title = title),
// // 		(this.tags = tags),
// // 		(this.likes = likes),
// // 		(this.date = date),
// // 		(this.price = price),
// // 		(this.video = video);
// // }

// // function mediaFactory() {
// // 	this.create =
// // 		(id, photographerId, title, tags, likes, date, price, image, video);
// // 	switch ((image, video)) {
// // 		case image == null: {
// // 			return new newVid(
// // 				(id, photographerId, title, tags, likes, date, price, video)
// // 				//;
// // 			);
// // 		}
// // 		case video == null: {
// // 			return new newVid(
// // 				(id, photographerId, title, tags, likes, date, price, image)
// // 				//	break
// // 			);
// // 		}
// // 	}
// // }

// let medias = [];
// let videos = [];
// let images = [];
