// if (j == 0) {
// 	console.log('fisrt');
// 	first = c;
// 	console.log(fisrt);
// }

var x, i, j, l, ll, selElmnt, a, b, c;
let firstTour = true;
console.log('first ' + firstTour);
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName('custom-select');
l = x.length;
let first = '';
for (i = 0; i < l; i++) {
	selElmnt = x[i].getElementsByTagName('select')[0];
	ll = selElmnt.length;
	//console.log(selElmnt); //orginal regular select element
	/*for each element, create a new DIV that will act as the selected item:*/
	a = document.createElement('DIV');
	a.setAttribute('class', 'select-selected');
	a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	x[i].appendChild(a);
	//console.log(a);
	/*for each element, create a new DIV that will contain the option list:*/
	b = document.createElement('DIV');
	b.setAttribute('class', 'select-items select-hide');
	//	console.log(a);
	//b = list of clikableoptions

	for (j = 0; j < ll; j++) {
		/*for each option in the original select element,
    create a new DIV that will act as an option item:*/
		c = document.createElement('DIV');
		c.innerHTML = selElmnt.options[j].innerHTML;

		c.addEventListener('click', function (e) {
			console.log('c');
			console.log('first ' + firstTour);
			/*when an item is clicked, update the original select box,
        and the selected item:*/
			firstTour = false;
			console.log('first ' + firstTour);
			var y, i, k, s, h, sl, yl;
			s = this.parentNode.parentNode.getElementsByTagName('select')[0];
			sl = s.length;
			h = this.parentNode.previousSibling;
			for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName('same-as-selected');
					yl = y.length;
					for (k = 0; k < yl; k++) {
						y[k].removeAttribute('class');
					}
					this.setAttribute('class', 'same-as-selected');
					break;
				}
			}
			h.click();
		});
		b.appendChild(c);
	}
	x[i].appendChild(b);

	let first = document.querySelector('.select-items').firstChild;
	if (firstTour === true) {
		first.classList.add('same-as-selected');

		a.addEventListener('click', function (e) {
			/*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
			//   let first = document.querySelector('.select-items').firstChild;
			console.log('click sur A');
			console.log(first);
			console.log(firstTour);
			// if (firstTour === true) {
			// 	first.style.display = 'none';
			// } else {
			// 	first.style.display = 'block';
			// }

			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle('select-hide');
			this.classList.toggle('select-arrow-active');
		});
	}
	function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
  except the current select box:*/
		var x,
			y,
			i,
			xl,
			yl,
			arrNo = [];
		x = document.getElementsByClassName('select-items');
		y = document.getElementsByClassName('select-selected');
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i);
			} else {
				y[i].classList.remove('select-arrow-active');
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add('select-hide');
			}
		}
	}
	/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
	document.addEventListener('click', function (e) {
		console.log('click outside');
		closeAllSelect;
	});
}
