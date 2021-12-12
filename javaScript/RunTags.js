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
		let page = this.page; //otherwise, "this" will refer to the buttons once inside the "foreach" loop
		allNavBtn.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				e.preventDefault(); //allows sorting from photographer's portaits in homepage, blocking the openning of Gallery
				let btnInput = utils.removeHasgTagInString(btn.innerText);
				// particular case: if click happens on the same tag that was already selected at the previous click
				if (page.currentTag === btnInput) {
					btn.classList = 'tag--Off'; //set btn off
					page.currentTag = ''; //delete currentTag
				} // end of particular case
				else {
					//Filtering
					page.currentTag = btnInput; //sets the value of currentTag
				}

				nav.hideShowArticles(page.currentTag); //calls update method after currentTag is set
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
					//loop through each material's tags (only one tag per media for now, several tags per photographer)
					if (this.material[a].tags[b] === this.page.currentTag) {
						//if tag matches selection
						this.material[a].displayArticle();
						break; //stop looping through tags and move on to next media/photographer
					}
				}
			}
		}
	}
}
