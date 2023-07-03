const {getRandomInt} = require("../helpers/commonHelper");
const {searchFromGoogleScholar} = require("../helpers/googleScholarHelper");
const {addGoogleScholarCitationCountForMultipleArticle} = require("./articleServices/updateArticleServices");
const cheerio = require('cheerio');

function retrieveCitationCountFromGoogleScholarResponse(response) {

	const html = response?.text;

    if (!html) {
        return null;
    }

    const $ = cheerio.load(html);
    const searchEntries = $("div.gs_fl").children("a");
	// console.log(html);
	let textHasCitationCount = null;
	let citationCount = null;
    searchEntries.each((idx, tag) => {
        if  (!!tag?.attribs?.href) {
			const href = tag.attribs.href;
			if (href.includes("scholar?cites")) {
				textHasCitationCount = $(tag).text();
			}
		}
    });
    
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
	const citationCountRaw = await searchFromGoogleScholar(doi, retrieveCitationCountFromGoogleScholarResponse);
	
	// console.log(doi, citationCountRaw);
	citationCount = parseInt(citationCountRaw) || null;
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
		const sleepInterval = getRandomInt(10000, 60000);	//We will delay 10s ~ 60s for each google scholar call
		await new Promise(r => setTimeout(r, sleepInterval));
	}

	return doiMap;
}

class GoogleScholarWorker {
	#isRunning;
	#doiQueue;

	constructor() {
		this.#isRunning = false;
		this.#doiQueue = [];
	}

	async run() {

		//Terminate if the worker is already run
		if (this.#isRunning) {
			return;
		}

		this.#isRunning = true;
		while(true) {
			if (0 === this.#doiQueue.length) {
				this.#isRunning = false;
				return;
			}

			const doiArray = this.#doiQueue.shift();
			const doiMap = await getCitationCountFromMultipleDOI(doiArray);
			console.log("Google Scholar doiMap info: ", doiMap);

			//update the citation count data in db
			addGoogleScholarCitationCountForMultipleArticle(doiMap);
		}
	}

	addDOIArray(doiArray) {
		this.#doiQueue.push(doiArray);
	}
}

const googleScholarWorker = new GoogleScholarWorker();

module.exports = { 
	getCitationCountFromDOI,
	getCitationCountFromMultipleDOI,
	googleScholarWorker,
};
