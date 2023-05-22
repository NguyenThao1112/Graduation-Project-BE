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
	const noNeedToCreateAuthors = [...alreadyExistAuthorMap.values()].map(authorId => ({
		lecturerId: authorId,
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
	
	articleObject.pageFrom = coreData["prism:startingPage"];
	articleObject.pageTo = coreData["prism:endingPage"];
	articleObject.abstract = coreData["dc:description"];
	articleObject.authors = await buildAuthorDataForArticle(bodyData.authors.author);
	articleObject.tags = await buildTagDataForArticle(bodyData.authkeywords["author-keyword"]);
	
	console.log(articleObject);

	return articleObject;
}


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
	addComplexInformationForArticle,
	combineAddress,
};
