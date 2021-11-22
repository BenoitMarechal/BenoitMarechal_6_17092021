export class ContactModal {
	constructor(contactForm, photographer, DOMelement) {
		this.contactForm = {
			id: ['first', 'last', 'email', 'message'],
			value: [undefined, undefined, undefined, undefined],
		};
		this.photographer = undefined;
		this.DOMelement = document.querySelector('.contact__modal');
	}

	fillContact() {
		let name = document.querySelector('.modal__container__name');
		name.innerText = this.photographer.name;
	}
	openClose() {
		//let contactModal = this.DOMelement;

		let btnLaunch = document.querySelector('.gallery__main__presentation__btn'); //gets the "contact" button
		let btnClose = document.getElementById('btnClose'); //gets the "close" button
		let modal = this.DOMelement;

		console.log(btnClose);
		console.log(btnLaunch);
		// launch modal event
		btnLaunch.addEventListener('click', function (e) {
			modal.style.display = 'block';
		});
		// //close modal event
		btnClose.addEventListener('click', function (e) {
			modal.style.display = 'none';
		});
	}
	//////listening
	storeValue() {
		console.log(this.contactForm.id[2]);
		let modal = this;

		for (let i = 0; i < this.contactForm.id.length; i++) {
			document
				.getElementById(this.contactForm.id[i])
				.addEventListener('input', function (e) {
					modal.contactForm.value[i] = this.value;
					console.log(modal.contactForm);
				});
		}
	}

	submit() {
		let modal = this;
		this.DOMelement.addEventListener('submit', function (e) {
			e.preventDefault();
			console.log('submit');
			console.log(modal);
			for (let i = 0; i < modal.contactForm.id.length; i++) {
				console.log(modal.contactForm.id[i] + ' ' + modal.contactForm.value[i]);
			}
			this.style.display = 'none';
		});
	}
}

////////////////end contact modal
