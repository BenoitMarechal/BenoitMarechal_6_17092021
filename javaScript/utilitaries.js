////////////////////UTILITARIES///////////////////////////////////////////////////

function changeBoolean(boolean) {
	if (boolean === true) {
		boolean = false;
	} else {
		boolean = true;
	}
	return boolean;
}

// function lowercase(string) {

// }

function removeHasgTagInString(string) {
	var reg = /[#,-]/g;
	return string.replace(reg, '');
}

function removeSpacesInString(string) {
	var reg = /[ ,-]/g;
	return string.replace(reg, '');
}

function replaceDashBySpaceInString(string) {
	var reg = /[-, ]/g;
	return string.replace(reg, ' ');
}

function generateTagButtons(tagsArray) {
	let resultString = '';
	let firstHalfOfString = '<li><button class="tag">#';
	let secondHalfOfString = '</button></li>';
	tagsArray.forEach((tag) => {
		resultString = resultString + firstHalfOfString + tag + secondHalfOfString;
	});
	return resultString;
}

//////////////////////////////CREATING ARTISTS ARTICLES///////////////////

let elementsOfArtistArticle = {
	typeOfElement: ['article', 'a', 'img', 'h2', 'div', 'p', 'p', 'p', 'p', 'ul'],
	classOfElement: [
		'photographer',
		'photographer__link',
		'photographer__link__img',
		'photographer__link__name',
		'photographer__link__location',
		'photographer__link__location__city',
		'photographer__link__location__country',
		'photographer__link__tagline',
		'photographer__link__price',
		'photographer__link__tags',
	],
	parentOfElement: [
		'main',
		'photographer',
		'photographer__link',
		'photographer__link',
		'photographer__link',
		'photographer__link__location',
		'photographer__link__location',
		'photographer__link',
		'photographer__link',
		'photographer__link',
	],
};
////////////////////////////// END OF CREATING ARTISTS ARTICLES///////////////////

//////////////////////////////CREATING MEDIA ARTICLES///////////////////
let elementsOfMediaArticle = {
	typeOfElement: ['article', 'img', 'div', 'div', 'div', 'div', 'div'],
	classOfElement: [
		'gallery__container',
		'gallery__container__thumbnail',
		'gallery__container__info',
		'gallery__container__info__title',
		'gallery__container__info__likes',
		'gallery__container__info__likes__number',
		'gallery__container__info__likes__heart',
	],
	parentOfElement: [
		'gallery__main__gallery',
		'gallery__container',
		'gallery__container',
		'gallery__container__info',
		'gallery__container__info',
		'gallery__container__info',
		'gallery__container__info',
	],
};

//////////////////////////////CREATING GALLERY PRESENTATION///////////////////

let elementsOfGalleryPresentation = {
	typeOfElement: [
		//'div',
		'div',
		'h1',
		'div',
		'p',
		'p',
		'div',
		'ul',
		'btn',
		'img',
	],
	classOfElement: [
		//'gallery__main__presentation',
		'gallery__main__presentation__info',
		'gallery__main__presentation__info__name',
		'gallery__main__presentation__info__location',
		'gallery__main__presentation__info__location__city',
		'gallery__main__presentation__info__location__country',
		'gallery__main__presentation__info__tagline',
		'gallery__main__presentation__info__tags',
		'gallery__main__presentation__btn',
		'gallery__main__presentation__img',
	],

	extraClassOfElement: [
		//'gallery__main__presentation',
		'gallery__main__presentation__info',
		'photographer__link__name',
		'photographer__link__location',
		'photographer__link__location__city',
		'photographer__link__location__country',
		'photographer__link__tagline',
		'photographer__link__tags',
		'gallery__main__presentation__btn',
		'photographer__link__img',
	],

	parentOfElement: [
		//'gallery__main__presentation',
		'gallery__main__presentation',
		'gallery__main__presentation__info',
		'gallery__main__presentation__info',
		'gallery__main__presentation__info__location',
		'gallery__main__presentation__info__location',
		'gallery__main__presentation__info',
		'gallery__main__presentation__info',
		'gallery__main__presentation',
		'gallery__main__presentation',
	],
};

/* <div class="gallery__main__presentation">
				<div class="gallery__main__presentation__info">
					<h1
						class="
							photographer__link__name
							gallery__main__presentation__info__name
						"
					>
						Mimi Keel
					</h1>
					<div
						class="
							photographer__link__location
							gallery__main__presentation__info__location
						"
					>
						<p
							class="
								photographer__link__location__city
								gallery__main__presentation__info__location__city
							"
						>
							London
						</p>
						<p
							class="
								photographer__link__location__country
								gallery__main__presentation__info__location__country
							"
						>
							, UK
						</p>
					</div>
					<div
						class="
							photographer__link__tagline
							gallery__main__presentation__info__tagline
						"
					>
						Voir le beau dans le quotidien
					</div>
					<ul
						class="
							photographer__link__tags
							gallery__main__presentation__info__tags
						"
					>
						<li><button class="tag">#Portait</button></li>
						<li><button class="tag">#Events</button></li>
						<li><button class="tag">#Travel</button></li>
						<li><button class="tag">#Animals</button></li>
					</ul>
				</div>
				<button class="gallery__main__presentation__btn">Contactez-moi</button>
				<!-- </div> -->

				<img
					class="photographer__link__img gallery__main__presentation__img"
					src="images\Photographers ID Photos\MimiKeel.jpg"
					alt=""
				/>
			</div> */

//////////////////////////////CREATING MEDIA ARTICLES///////////////////

////////////////////END OF UTILITARIES///////////////////////////////////////////////////
