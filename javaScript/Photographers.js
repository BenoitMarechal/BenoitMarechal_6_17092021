class Photographer {
	constructor(name, id, city, country, tagline, price, tags, visible = true) {
		this.name = name;
		this.id = id;
		this.city = city;
		this.country = country;
		this.tagline = tagline;
		this.price = price;
		this.tags = tags;
		this.visible = visible;
	}

	createArticle() {
		let clearedName = removeSpacesInString(this.name);
		for (let i = 0; i < elementsOfArticle.typeOfElement.length; i++) {
			let element = document.createElement(elementsOfArticle.typeOfElement[i]);
			element.classList.add(elementsOfArticle.classOfElement[i]);
			let tour = i; //assigns photg name as article ID
			if (tour === 0) {
				// element.id = this.clearedName;
				element.id = 'id' + this.id;
			}
			let byClass = document.getElementsByClassName(
				elementsOfArticle.parentOfElement[i]
			);
			let parent = byClass.item(byClass.length - 1); //declares last element of collection as parent
			parent.appendChild(element);
		} //EMPTY ARTICLE CREATED
		let articleToFill = '';
		articleToFill = document.getElementById('id' + this.id);
		articleToFill.querySelector('.photographer__link').href =
			clearedName + '.html';
		articleToFill.querySelector('.photographer__link__img').src =
			'images/Photographers ID Photos/' + clearedName + '.jpg';
		articleToFill.querySelector('.photographer__link__img').alt = this.name;
		articleToFill.querySelector('.photographer__link__name').innerText =
			this.name;
		articleToFill.querySelector(
			'.photographer__link__location__city'
		).innerText = this.city + ', ';
		articleToFill.querySelector(
			'.photographer__link__location__country'
		).innerText = this.country;
		articleToFill.querySelector('.photographer__link__tagline').innerText =
			this.tagline;
		articleToFill.querySelector('.photographer__link__price').innerText =
			this.price + ' €/jour';
		articleToFill.querySelector('.photographer__link__tags').innerHTML =
			generateTagButtons(this.tags); //ARTICLE COMPLETED
		return articleToFill;
	}
	hideArticle() {
		//hides article
		let cible = document.getElementById('id' + this.id);
		cible.style.display = 'none';
	}

	showArticle() {
		//showns article
		let cible = document.getElementById('id' + this.id);
		cible.style.display = 'block';
	}
}
