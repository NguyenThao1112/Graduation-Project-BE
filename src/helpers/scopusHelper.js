const _ = require('lodash');
const {Article} = require('../models/article/article');

function parseDataFromGetAuthorFromNameResponse(scopusResponse) {
	const entries = scopusResponse['search-results']['entry'];
	const authorData = [];
	entries.forEach((entry) => {
		if (
			entry.hasOwnProperty('dc:identifier') &&
			entry.hasOwnProperty('preferred-name')
		) {
			const surname = entry['preferred-name']['surname'];
			const givenName = entry['preferred-name']['given-name'];
			const scopusId = entry['dc:identifier'].substring('AUTHOR_ID:'.length);

			const authorEntry = {
				surname,
				givenName,
				scopusId,
			};

			authorData.push(authorEntry);
		}
	});

	return authorData;
}

function parseBaseArticleFromScopusResponse(scopusResponse) {
	const entries = scopusResponse['search-results']['entry'];
	const articleObjects = [];
	entries.forEach((entry) => {

		//Building the article
		const scopusId = entry['dc:identifier'].substring('SCOPUS_ID:'.length);
		const pageRange = entry["pageRange"] ?? null;
		let pageFrom = null;
		let pageTo = null;
		if (null != pageRange) {
			const tokens = pageRange.split("-");
			pageFrom = tokens[0] ?? null;
			pageTo = tokens[1] ?? null;
		}
		const urls = entry["link"].map(url => url["@href"]);

		const articleObject = {
			name: entry["dc:title"] ?? null,
			volume: entry["prism:volume"] ?? null,
			pageFrom,
			pageTo,

			ISSN: entry["prism:issn"] ?? null,
			ISBN: entry["prism:isbn"] ? entry["prism:isbn"]["$"] : null,
			DOI: entry["prism:doi"] ?? null,
			PII: entry["pii"]?? null,
			Scopus: scopusId,

			urls,
		}

		//Check if the article come from Conference or Journal
		if (entry.hasOwnProperty("prism:aggregationType")) {

			aggregationType = entry["prism:aggregationType"];
			if ("Journal" === aggregationType) {

				articleObject.journal = entry["prism:publicationName"];
			} else if ("Conference Proceeding" === aggregationType) {

				//TODO: doesn't support conference yet
				//articleObject.conference = entry["prism:publicationName"];
			}
		}

		//Add the built article into the result
		articleObjects.push(articleObject);
	})


	return articleObjects;
}
	article = new Article();
function combineAddress(address) {
	let finalAddress = '';
	for (const key of Object.keys(address)) {
		if (!key.includes('@')) finalAddress += address[key] + ' ';
	}

	return finalAddress;
}

module.exports = {
	parseDataFromGetAuthorFromNameResponse,
	parseBaseArticleFromScopusResponse,
	combineAddress,
};
