const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');
const {
	addComplexInformationForArticle,
	addRankingForArticle,
} = require('./saveArticleByAuthorScopusId');

/**
 * 
 * @param {string} doi
 * @returns Promise<any> 
 */
 async function getArticleByDOI(doi) {
	const url = `${scopusConstants.SCOPUS_SEARCH_BASE_ARTICLE_BY_AUTHOR_ID}?query=DOI(${doi})`;
	try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);
		let articles = scopusHelper.parseBaseArticleFromScopusResponse(axiosResponse.data);
		articles =  await Promise.all(articles.map(article => addComplexInformationForArticle(article)));
		articles = await addRankingForArticle(articles);

		return articles;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

module.exports = {
	getArticleByDOI,
};
