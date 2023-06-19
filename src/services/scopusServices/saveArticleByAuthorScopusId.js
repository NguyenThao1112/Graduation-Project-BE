const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const createArticleService = require('../../services/articleServices/createArticleServices');
const { getJournalRanking } = require('./getJournalRankingService');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');
const { chunkArray } = require('../../helpers/commonHelper');
const {
	getConferenceRankByMultipleNames,
} = require('../getConferenceRankByNameService');

async function addComplexInformationForArticle(articleObject) {
	const url = `${scopusConstants.SCOPUS_SEARCH_ABSTRACT_BY_ARTICLE_ID}/${articleObject.Scopus}`;
	try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);
		articleObject = await scopusHelper.addComplexInformationForArticle(
			articleObject,
			axiosResponse.data
		);

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
		const baseArticles = scopusHelper.parseBaseArticleFromScopusResponse(
			axiosResponse.data
		);
		const articles = [];
		const concurrencyLimit = scopusConstants.SCOPUS_API_BATCH_SIZE;

		for (let i = 0; i < baseArticles.length; i += concurrencyLimit) {
			const articlePromises = baseArticles
				.slice(i, i + concurrencyLimit)
				.map((baseArticle) => addComplexInformationForArticle(baseArticle));

			try {
				const batchResponse = await Promise.allSettled(articlePromises);
				const batchArticles = batchResponse.filter(response => "fulfilled" === response.status && !!response.value).map(response => response.value);
				articles.push(...batchArticles);
			} catch (error) {
				//do nothing
			}

			// Sleep for a short duration before making the next batch of API calls
			// await new Promise((resolve) => setTimeout(resolve, 2000));
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
	let issnArray = articles
		.map((article) => article.ISSN ?? null)
		.filter((issn) => issn);
	let conferenceArray = articles
		.filter((article) => article.conference)
		.map((article) => article.conference);

	//Call API to get rank for journal and conference
	const [journalRankMap, conferenceRankMap] = await Promise.all([
		getJournalRanking(issnArray),
		getConferenceRankByMultipleNames(conferenceArray),
	]);
	//Add ranking for article published from journal
	let articlesWithJournalRank = result.map((article) => {
		if (article.journal && article.ISSN) {

			const normalizedIssn = scopusHelper.normalizeIssn(article.ISSN);
			article.journalUrl = journalRankMap[normalizedIssn]?.journalUrl ?? null;
			if (article.year) {
				const year = article.year;

				let percentile = null;

				if (journalRankMap.hasOwnProperty(normalizedIssn)) {
					if (journalRankMap[normalizedIssn].hasOwnProperty(year)) {
						percentile = journalRankMap[normalizedIssn][year];
						article.rank = scopusHelper.getQuartileFromPercentile(percentile);
					}
				}
			}

		}

		return article;
	});
	result = articlesWithJournalRank;

	//Add data ranking for article published from conference
	let articleWithConferenceRank = result.map((article) => {
		const conference = article.conference;
		if (conference) {
			article.rank = conferenceRankMap[conference];
		}

		return article;
	});
	result = articleWithConferenceRank;

	return result;
}

module.exports = {
	addComplexInformationForArticle,
	saveArticleByAuthorScopusId,
	addRankingForArticle,
};
