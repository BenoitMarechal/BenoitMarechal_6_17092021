async function global() {
	removeAllArticles(); //removes articles, builds H1
	await extractData(); //gets data from json
	await fillarrayOfArtists(); //generates array of artists
	await buildTagNavBar(); //builds nav bar tags
	await buildAllArtistsArticles2(); //builds all artists articles
	await clickOnNavTag(); //manages color
	//await buildArtistArticleByName2(); ////builds selected artists articles
}
global();
