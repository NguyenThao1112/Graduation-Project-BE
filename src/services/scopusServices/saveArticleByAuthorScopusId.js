const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const createArticleService = require('../../services/articleServices/createArticleServices');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');

async function addComplexInformationForArticle(articleObject) {

	const url = `${scopusConstants.SCOPUS_SEARCH_ABSTRACT_BY_ARTICLE_ID}/${articleObject.Scopus}`;
	try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);
		articleObject = await scopusHelper.addComplexInformationForArticle(articleObject, axiosResponse.data);
		// console.log(articleObject);

		return articleObject;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
	
}

/**
 * 
 * @param {string} scopusId 
 * @returns {Promise<any>} 
 */
async function getArticleByAuthorScopusId(scopusId) {
	const url = `${scopusConstants.SCOPUS_SEARCH_BASE_ARTICLE_BY_AUTHOR_ID}?query=AU-ID(${scopusId})`;
	try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);
		let articles = scopusHelper.parseBaseArticleFromScopusResponse(axiosResponse.data);
		articles =  await Promise.all(articles.map(article => addComplexInformationForArticle(article)));

		return articles;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

/**
 * 
 * @param {string} authorScopusId 
 * @returns {Promise<Number>} articleIds;
 * 
 */
async function saveArticleByAuthorScopusId(authorScopusId) {
	const articles = await getArticleByAuthorScopusId(authorScopusId);
	const createArticlePromises = articles.map((article) =>
		createArticleService.createArticle(article, null)
	);
	let articleIds = [];

	try {
		articleIds = await Promise.all(createArticlePromises);
	} catch (errors) {
		console.log(errors);
		articleIds = [];
	}

	return articleIds;
}

module.exports = {
	saveArticleByAuthorScopusId
};
