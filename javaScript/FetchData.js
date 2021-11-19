export let dataFromJson = [];
async function extractData() {
	let rep = await fetch('./public/dataBase.json');
	dataFromJson = await rep.json();
}
await extractData();
