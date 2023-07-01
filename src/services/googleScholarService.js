const {GScholar} = require("senginta");
const {getRandomInt} = require("../helpers/commonHelper");

/**
 * Using Google Scholar to find citation count of an article
 * @param {String} doi 
 * @returns 
 */
async function getCitationCountFromDOI(doi) {
	const doiSearch = new GScholar(doi);
	const searchResults = await doiSearch.get_all();
	console.log(searchResults);
	return searchResults;
}

/**
 *  Using Google Scholar to find multiple citation count
 * @param {String[]} doiArray 
 */
async function getCitationCountFromMultipleDOI(doiArray) {
	const doiMap = new Map();
	doiArray.forEach(doi => {
		
		const searchResults = await getCitationCountFromDOI(doi);
		doiMap.set(doi, searchResults);

		//Delay to avoid google scholar protection
		const sleepInterval = 1000 + getRandomInt(250, 750);	//We will delay 1250 ~ 1750 ms for each google scholar call
		await new Promise(r => setTimeout(r, sleepInterval));
	})

	return doiMap;
}

module.exports = { 
	getCitationCountFromDOI,
	getCitationCountFromMultipleDOI,
};
