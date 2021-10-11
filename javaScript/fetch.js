//////////////////////FETCH/////////////////

async function extractData() {
	let rep = await fetch('./public/dataBase.json');
	dataFromJson = await rep.json();
	return dataFromJson;
}

//////////////////////END OF FETCH/////////////////
