const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const scopusHelper = require('../../helpers/scopusHelper');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');

/**
 * 
 * @param {string} scopusId 
 * @returns Promise<any> 
 */
async function getBaseArticleByAuthorScopusId(scopusId) {
	const url = `${scopusConstants.SCOPUS_SEARCH_BASE_ARTICLE_BY_AUTHOR_ID}?query=AU-ID(${scopusId})`;
	try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);
		const articles = scopusHelper.parseBaseArticleFromScopusResponse(axiosResponse.data);
		

		return response;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

module.exports = {
	getBaseArticleByAuthorScopusId
};
