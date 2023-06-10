const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const createArticleService = require('../../services/articleServices/createArticleServices');
const { getJournalRanking } = require('./getJournalRankingService');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');
const { chunkArray } = require('../../helpers/commonHelper');

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
		const baseArticles = scopusHelper.parseBaseArticleFromScopusResponse(axiosResponse.data);
		const baseArticleBatch = chunkArray(baseArticles, scopusConstants.SCOPUS_API_BATCH_SIZE);
		const articles = [];

		for (const baseArticleBuffer of baseArticleBatch) {
			const articleBuffer = await Promise.all(baseArticleBuffer.map(baseArticle => addComplexInformationForArticle(baseArticle)));
			articles.push(...articleBuffer);

			//Sleep 2 second before calling another batch from Scopus, to avoid "To many request"
			await new Promise(r => setTimeout(r, 10000));
		}

		
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
	let articles = await getArticleByAuthorScopusId(authorScopusId);
	articles = await addRankingForArticle(articles);
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


/**
 * @param {Object[]} articles 
 * @return {Object[]}
 */
 async function addRankingForArticle(articles) {
	
	let result = articles;

	//Map data ranking for journal
	let issnArray = articles.map(article => article.ISSN ?? null).filter(issn => issn);
	const journalRankMap = await getJournalRanking(issnArray);

	//Add ranking for article published from journal
	let articlesWithJournalRank = articles.map(article => {
		if (article.journal && article.ISSN && article.year) {
			const normalizedIssn = scopusHelper.normalizeIssn(article.ISSN);
			const year = article.year;

			let percentile = null;
			
			if (journalRankMap.hasOwnProperty(normalizedIssn)) {
				if (journalRankMap[normalizedIssn].hasOwnProperty(year)) {
					percentile = journalRankMap[normalizedIssn][year];
					article.rank = scopusHelper.getQuartileFromPercentile(percentile);
				}
			}
		}

		return article;
	})
	result = articlesWithJournalRank;

	//Map data ranking for conference
	//TODO:

	return result;
}


module.exports = {
	addComplexInformationForArticle,
	saveArticleByAuthorScopusId
};
