let contactForm = {
	id: ['first', 'last', 'email', 'message'],
	value: ['none', 'none', 'none', 'none'],
};

for (let i = 0; i < contactForm.id.length; i++) {
	document
		.getElementById(contactForm.id[i])
		.addEventListener('input', function (e) {
			contactForm.value[i] = this.value;
		});
}

let modal = document.querySelector('.modal');
modal.addEventListener('submit', function (e) {
	e.preventDefault();
	for (let i = 0; i < contactForm.id.length; i++) {
		console.log(contactForm.id[i] + ' ' + contactForm.value[i]);
	}
	modal.style.display = 'none';
});

////////////////end contact modal
