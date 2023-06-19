const _ = require('lodash');
const {Article} = require('../models/article/article');
const {
	getLecturerByScopusIds
} = require('../services/lecturerServices/searchLecturerServices');
const {
	getTagsByNames
} = require('../services/configurationServices');

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
		const urls = entry["link"].map(url => url["@href"]);

		const articleObject = {
			name: entry["dc:title"] ?? null,
			volume: entry["prism:volume"] ?? null,
			
			ISSN: entry["prism:issn"] ?? null,
			ISBN: entry["prism:isbn"] ? entry["prism:isbn"][0]["$"] : null,
			DOI: entry["prism:doi"] ?? null,
			PII: entry["pii"]?? null,
			Scopus: scopusId,
			journal: null,
			conference: null,
			rank: null,
			urls,
			citationCount: entry['citedby-count'],
		}

		//Check if the article come from Conference or Journal
		if (entry.hasOwnProperty("prism:aggregationType")) {

			aggregationType = entry["prism:aggregationType"];
			if ("Journal" === aggregationType) {

				articleObject.journal = entry["prism:publicationName"];
			} else if ("Conference Proceeding" === aggregationType) {

				//TODO: doesn't support conference yet
				// articleObject.conference = entry["prism:publicationName"];
			}
		}

		//Add the built article into the result
		articleObjects.push(articleObject);
	})


	return articleObjects;
}

async function buildAuthorDataForArticle(scopusAuthorDataResponse) {
	const authorsHasScopusId = scopusAuthorDataResponse
								.filter(author => author["author-url"]);
	const authorScopusIds = authorsHasScopusId
							.map(author => author["author-url"].substring('https://api.elsevier.com/content/author/author_id/'.length));

	//Get Id from the the lecturer has the exists on the system
	let alreadyExistAuthorMap = new Map(); //init 
	try {
		alreadyExistAuthorMap = await getLecturerByScopusIds(authorScopusIds, ["id"]);
	} catch (error) {
		//do nothing
	}
	const alreadyExistAuthorScopusId = new Set([...alreadyExistAuthorMap.keys()]);	//using set for better performance
	const notExistAuthorScopusId = new Set(authorScopusIds.filter(scopusId => !alreadyExistAuthorScopusId.has(scopusId)));
	
	//Get the author to create later
	const createNewAuthors = scopusAuthorDataResponse
		.filter(author => {
			if (!author["author-url"]) {
				return true;
			}

			const scopusId = author["author-url"].substring('https://api.elsevier.com/content/author/author_id/'.length);
			return notExistAuthorScopusId.has(scopusId);
		})
		.map(author => ({
			firstName: author["preferred-name"]["ce:given-name"],
			lastName: author["preferred-name"]["ce:surname"],
		}));

	//Get the author who already exist on the database
	const noNeedToCreateAuthors = [...alreadyExistAuthorMap.values()].map(author => ({
		lecturerId: author.id,
		lecturerName: author.name,
	}));

	const authors = createNewAuthors.concat(noNeedToCreateAuthors);
	return authors;
}

async function buildTagDataForArticle(tagObject) {
	const tagNames = tagObject.filter(obj => obj["$"]).map(obj => obj["$"]);

	//Get the already tag which is exist
	let existTags = [];
	try {
		existTags = await getTagsByNames(tagNames);
	} catch (error) {
		//do nothing
	}
	
	//Using Set for better performance
	const existTagSet = new Set(existTags.map(tag => tag.name));

	//Get the name of the not exist tag
	const notExistTag = tagNames.filter(tag => !existTagSet.has(tag));

	//Build the return value
	const existTagIds = existTags.map(tag => ({
		"tag_id": tag.id,
		"tag_name": tag.name,
	}))
	const notExistTagNames = notExistTag.map(tag => ({
		"name": tag,
	}));

	const tags = existTagIds.concat(notExistTagNames);

	return tags;


}

async function addComplexInformationForArticle(articleObject, axiosData) {
	const bodyData = axiosData["abstracts-retrieval-response"];
	const coreData = bodyData.coredata;
	const itemData = bodyData.item;
	const bibrecord = itemData.bibrecord;
	const bibrecordHeadSource = bibrecord.head.source;
	const publicationDate = bibrecordHeadSource.publicationdate;

	let conferenceInfo = null;
	const additionalInfo = bibrecordHeadSource['additional-srcinfo'];
	if (additionalInfo) {
		conferenceInfo = additionalInfo.conferenceinfo;
	}
	
	articleObject.pageFrom = coreData["prism:startingPage"];
	articleObject.pageTo = coreData["prism:endingPage"];
	articleObject.abstract = coreData["dc:description"];

	//Get conference name
	if (conferenceInfo) {
		if (conferenceInfo.confevent) {
			if (conferenceInfo.confevent.confname) {
				articleObject.conference = conferenceInfo.confevent.confname;
			}
		}
	}

	
	try {
		articleObject.authors = await buildAuthorDataForArticle(bodyData.authors.author);
	} catch (error) {
		//do nothing
	}

	try {
		articleObject.tags = await buildTagDataForArticle(bodyData.authkeywords["author-keyword"]);
	} catch (error) {
		//do nothing
	}
	
	//Add date for article
	if (publicationDate) {
		articleObject.year = publicationDate.year ?? null;
		articleObject.month = publicationDate.month ?? null;
		articleObject.day = publicationDate.day ?? null;
	}

	//Add some ID for the article
	if (bibrecord.hasOwnProperty('item-info') && bibrecord['item-info']) {
		const itemInfo =  bibrecord['item-info'];
		if (itemInfo.hasOwnProperty('itemidlist') && itemInfo.itemidlist) {
			const itemIdList = itemInfo.itemidlist;
			const itemIds = itemIdList.itemid ?? null;

			//Get each id
			if (itemIds) {
				const SGR = itemIds.filter(idType => 'SGR' === idType['idType']);

				if (SGR.length) {
					articleObject.SGR = SGR['$'] ?? null;
				}
			}
		}

	}

	return articleObject;
}

function modifyAddress(address) {
	let finalAddress = '';
	if (!address) {
		return finalAddress;
	}
	for (const key of Object.keys(address)) {
		if (!key.includes('@')) finalAddress += address[key] + ' ';
	}

	return finalAddress;
}

/**
 * 
 * @param {String} issn 
 * @return {String}
 */
function normalizeIssn(issn) {
	let result = issn;
	if ("-" !== issn[4]) {
		const low = issn.slice(0, 4);
		const high = issn.slice(4); 
		result = [low, high].join('-');
	}
	return result;
}


/**
 * 
 * @param {int} percentile 
 * @param {String|null} 
 */
function getQuartileFromPercentile(percentile) {

	let quartile = null;
	if (percentile < 25) {
		quartile = "Q4";
	} else if (percentile < 50) {
		quartile = "Q3";
	} else if (percentile < 75) {
		quartile = "Q2";
	} else {
		quartile = "Q1";

	}

	return quartile;
}

module.exports = {
	parseDataFromGetAuthorFromNameResponse,
	modifyAddress,
	parseBaseArticleFromScopusResponse,
	addComplexInformationForArticle,
	normalizeIssn,
	getQuartileFromPercentile,
};
