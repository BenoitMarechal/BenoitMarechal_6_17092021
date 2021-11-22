// /////LIKES
export class Like {
	constructor(gallery, media) {
		this.gallery = gallery;
		this.media = media;
		this.mediaLikes();
	}
	mediaLikes() {
		let page = this.gallery;
		this.media.forEach((media) => {
			let liked = false;
			let heart = media.returnHeart();
			let likeCount = media.returnLikeCount();
			heart.addEventListener('click', function (e) {
				if (liked == false) {
					liked = true;
					media.like = media.likes++;
					heart.innerHTML = '<i class="fas fa-heart"></i>';
				} else {
					liked = false;
					media.like = media.likes--;
					heart.innerHTML = '<i class="far fa-heart"></i>';
				}
				likeCount.innerHTML = media.likes;
				page.fillBottomLikes();
			});
		});
	}
}
// /////end of LIKES
