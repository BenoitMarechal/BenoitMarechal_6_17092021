///////////////////////BUILDING TAG BUTTONS IN NAV BAR/////////////////////////
//declare constants
navBar = document.getElementById('header__nav__ul');

let everyTagArray = [];
//let currentTagSelection = []; //creating array

function generateTagButtons(tagsArray) {
	let resultString = '';
	let firstHalfOfString = '<li><button class="tag">#';
	let secondHalfOfString = '</button></li>';
	tagsArray.forEach((tag) => {
		resultString = resultString + firstHalfOfString + tag + secondHalfOfString;
	});
	return resultString;
}

//BUILDING NAV BAR nav bar with all tags
async function buildTagNavBar() {
	console.log('build tag nav bar');
	dataFromJson.photographers.forEach((photographer) => {
		//collect tags from photographers
		for (var i = 0; i < photographer.tags.length; i++) {
			everyTagArray.push(photographer.tags[i]);
		}
	});
	everyTagArray = [...new Set(everyTagArray)]; //delete all duplicates in list of every tags
	navBar.innerHTML = generateTagButtons(everyTagArray); //fill navbar with tag buttons
	//console.log(everyTagArray);
	return everyTagArray;
}

/////////END OF BUILDING NAV BAR nav bar with all tags
