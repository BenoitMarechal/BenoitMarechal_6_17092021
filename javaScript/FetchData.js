import { MediaFactory } from './Media.js';

let rawData = [];
async function extractData() {
	let rep = await fetch('./public/dataBase.json');
	rawData = await rep.json();
}
await extractData();
export let dataFromJson = {
	photographers: rawData.photographers,
	media: rawData.media.map((med) => new MediaFactory(med)),
};
