export class ContactModal {
	constructor(photographer) {
		this.contactForm = {
			id: ['first', 'last', 'email', 'message'],
			value: [undefined, undefined, undefined, undefined],
		};
		this.photographer = photographer;
		this.DOMelement = document.querySelector('.contact__modal');
		this.fillContact();
		this.openClose();
		this.storeValue();
		this.submit();
	}
	fillContact() {
		let name = document.querySelector('.modal__container__name');
		name.innerText = this.photographer.name;
	}
	openClose() {
		let btnLaunch = document.querySelector('.gallery__main__presentation__btn'); //gets the "contact" button
		let btnClose = document.getElementById('btnClose'); //gets the "close" button
		let modal = this.DOMelement;
		// launch modal event
		btnLaunch.addEventListener('click', function (e) {
			modal.style.display = 'block';
		});
		// close modal event (btn)
		//click
		btnClose.addEventListener('click', function (e) {
			modal.style.display = 'none';
		});
		//enter
		btnClose.addEventListener('keydown', (e) => {
			if (e.key == 'Enter') {
				btnClose.click();
			}
		});
		//escape
		document.addEventListener('keydown', (e) => {
			if (e.key == 'Escape') {
				modal.style.display = 'none';
			}
		});
	}
	//////listening
	storeValue() {
		let modal = this;
		for (let i = 0; i < this.contactForm.id.length; i++) {
			document
				.getElementById(this.contactForm.id[i])
				.addEventListener('input', function (e) {
					modal.contactForm.value[i] = this.value;
				});
		}
	}

	submit() {
		let modal = this;
		this.DOMelement.addEventListener('submit', function (e) {
			e.preventDefault();
			for (let i = 0; i < modal.contactForm.id.length; i++) {
				console.log(modal.contactForm.id[i] + ' ' + modal.contactForm.value[i]);
			}
			this.style.display = 'none';
		});
	}
}
////////////////end contact modal
