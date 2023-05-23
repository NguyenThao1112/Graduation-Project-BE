const messageConstants = require('../constants/messageConstants');
const {
	getAuthorById,
	updateAuthorProfile,
} = require('../services/scopusServices/getAuthorByIdService');

const {
	getBaseLecturerByName,
} = require('../services/scopusServices/getBaseLecturerService');

const {
	getArticleByAuthorScopusId,
} = require("../services/scopusServices/getBaseArticleByScopusId");

const createArticleService = require("../services/articleServices/createArticleServices");

/**
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
async function getScopusAuthorByName(request, response) {
	//Get the query params
	const firstName = request.query.firstName;
	const lastName = request.query.lastName;

	//Default response is error response
	let responseJson = {
		code: messageConstants.SCOPUS_FIND_AUTHOR_BY_NAME_NOT_FOUND_CODE,
		message: messageConstants.SCOPUS_FIND_AUTHOR_BY_NAME_NOT_FOUND_MESSAGE,
	};

	scopusResponse = await getBaseLecturerByName(firstName, lastName);
	if (scopusResponse) {
		responseJson = {
			code: messageConstants.SCOPUS_FIND_AUTHOR_BY_NAME_FOUND_CODE,
			message: messageConstants.SCOPUS_FIND_AUTHOR_BY_NAME_FOUND_MESSAGE,
			data: scopusResponse,
		};

		return response.status(200).json(responseJson);
	}

	return response.status(500).json(responseJson);
}

/**
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
async function saveArticleByAuthorScopusId(request, response) {
	//Get the query params
	const scopusAuthorId = request.params.scopus_author_id;
	const accountId = request.params.account_id;

	//Default response is error response
	let statusCode = 500;
	let responseJson = {
		code: messageConstants.SCOPUS_FIND_AUTHOR_BY_ID_NOT_FOUND_CODE,
		message: messageConstants.SCOPUS_FIND_AUTHOR_BY_ID_NOT_FOUND_MESSAGE,
	};

	const articles = await getArticleByAuthorScopusId(scopusAuthorId);
	const createArticlePromises = articles.map(article => createArticleService.createArticle(article, null));
	try {
		const articleIds = await Promise.all(createArticlePromises);
		responseJson.code = messageConstants.SUCCESSFUL_CODE;
		responseJson.message = `Add ${articleIds.length} article(s) via scopus successfully`;
		statusCode = 200;

	} catch (errors) {
		statusCode = 500;
	} 
	
	return response.status(statusCode).json(responseJson);
}

module.exports = {
	getScopusAuthorByName,
	saveArticleByAuthorScopusId,
};
