//////////////////////FETCH/////////////////
let dataFromJson = [];
async function extractData() {
	console.log('extraction');
	let rep = await fetch('./public/dataBase.json');
	dataFromJson = await rep.json();
	return dataFromJson;
}

// console.log(dataFromJson);
//////////////////////END OF FETCH/////////////////
