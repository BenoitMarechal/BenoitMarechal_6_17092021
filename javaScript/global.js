let dataFromJson = [];

async function global() {
	removeAllArticles();
	await extractData(); //gets data from json
	await buildTagNavBar();
	await buildAllArtistsArticles(); //builds tag Nav bar
	await clickOnNavTag(); //manages color
}
global();
