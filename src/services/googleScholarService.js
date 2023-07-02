const {getRandomInt} = require("../helpers/commonHelper");
const {searchFromGoogleScholar} = require("../helpers/googleScholarHelper");

function retrieveCitationCountFromGoogleScholarResponse($, searchEntry) {
	const divHasCitationCount = $(searchEntry).find("div[class='gs_fl']");
	const tags = divHasCitationCount.children();
	let textHasCitationCount = null;
	tags.each((idx, tag) => {
		if (tag?.attribs?.href) {
			const href = tag.attribs.href;
			if (href.includes("scholar?cites")) {
				textHasCitationCount = $(tag).text();
			}
		}
	})

	// if (!!)
	let citationCount = null;
	if (!!textHasCitationCount) {
		const matches = textHasCitationCount.match(/\d+/g);
		if (matches.length > 0) {
			citationCount = matches[0];
		}
	}

	return citationCount;
}

/**
 * Using Google Scholar to find citation count of an article
 * @param {String} doi 
 * @returns 
 */
async function getCitationCountFromDOI(doi) {
	const searchResult = await searchFromGoogleScholar(doi, retrieveCitationCountFromGoogleScholarResponse);
	citationCount = parseInt(searchResult) || null;
	return citationCount;
}

/**
 *  Using Google Scholar to find multiple citation count
 * @param {String[]} doiArray 
 */
async function getCitationCountFromMultipleDOI(doiArray) {
	const doiMap = new Map();
	for (const doi of doiArray) {
		const searchResults = await getCitationCountFromDOI(doi);
		doiMap.set(doi, searchResults);

		//Delay to avoid google scholar protection
		const sleepInterval = 1000 + getRandomInt(250, 750);	//We will delay 1250 ~ 1750 ms for each google scholar call
		await new Promise(r => setTimeout(r, sleepInterval));
	}

	return doiMap;
}

module.exports = { 
	getCitationCountFromDOI,
	getCitationCountFromMultipleDOI,
};
