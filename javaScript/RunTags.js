import { utils } from './utilitaries.js';
///listening to tags
export class NavTags {
	constructor(page, material) {
		this.page = page; //allows to reach currentTag and Gallery Methods(HideAllArticles and ShowAllArticles)
		this.material = material; //can be applied to either photographers (homepage) or medias(gallery)
		this.updateSelectionOnClick();
	}
	updateSelectionOnClick() {
		//manages click on NAvtag
		let nav = this;
		let allNavBtn = document.querySelectorAll('.tag');
		console.log(allNavBtn);
		let page = this.page; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		let emptySelection = true;
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				e.preventDefault(); //allows sorting from photographer's portaits in homepage
				let btnInput = utils.removeHasgTagInString(btn.innerText);
				// particular case: if click happens on the same tag that was already selected at the previous click
				if (
					(page.currentTag === btnInput) &
					(emptySelection === false) //and a button is selected ie not coming from an "empty bar" (which happens if 3 clicks on the same button, then regular behaviour is needed)
				) {
					btn.classList = 'tag--Off'; //set btn off
					page.currentTag = '';
					emptySelection = true; //state that no button is selected
				}
				// end of particular case
				else {
					//Filtering
					page.currentTag = btnInput; //sets the value of currentTag
					emptySelection = false; //state that selection is not empty
				}
				nav.hideShowArticles(page.currentTag); //calls update method
				//management of ON/OFF state of btns
				allNavBtn.forEach((btn) => {
					btn.classList = 'tag--Off'; //set all of them OFF

					if (
						utils.removeHasgTagInString(btn.innerText) === page.currentTag //find the one that is selected
					) {
						btn.classList = 'tag--On'; //set it ON
					}
				});
			});
		});
	}
	hideShowArticles(tag) {
		this.page.hideAllArticles();
		if (tag == '') {
			this.page.showAllArticles();
		} else {
			for (let a = 0; a < this.material.length; a++) {
				//loop through material
				for (let b = 0; b < this.material[a].tags.length; b++) {
					//loop through each media's tags (only one tag per media for now)
					if (this.material[a].tags[b] === this.page.currentTag) {
						//if tag matches selection
						this.material[a].displayArticle(); //push media in visibleMedia
						break; //stop looping through their tags and move on to next media
					}
				}
			}
		}
	}
}
