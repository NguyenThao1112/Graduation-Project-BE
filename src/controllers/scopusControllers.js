//@ts-nocheck
const messageConstants = require('../constants/messageConstants');

const {
	getBaseLecturerByName,
} = require('../services/scopusServices/getBaseLecturerService');

const {
	getArticleByDOI,
} = require('../services/scopusServices/getArticleWithScopusService');

const {
	saveAuthorWithScopusInfo,
} = require('../services/scopusServices/saveAuthorWithScopus');

const {
	getJournalRanking,
} = require('../services/scopusServices/getJournalRankingService');

const getConferenceRankByNameService = require('../services/getConferenceRankByNameService');

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
async function saveAuthorWithScopus(request, response) {
	const { data } = request.body;

	//Get the query params
	const scopusAuthorId = data.scopusAuthorId;
	const accountId = data.accountId;

	//Default response is error response
	let statusCode = 500;
	let responseJson = {
		code: messageConstants.SCOPUS_SAVE_AUTHOR_NOT_FOUND_CODE,
		message: messageConstants.SCOPUS_SAVE_AUTHOR_NOT_FOUND_MESSAGE,
	};

	try {
		const resultData = await saveAuthorWithScopusInfo(
			scopusAuthorId,
			accountId
		);

		statusCode = 200;
		responseJson.code = messageConstants.SUCCESSFUL_CODE;
		responseJson.message = messageConstants.SCOPUS_SAVE_AUTHOR_SUCCESS_MESSAGE;
		responseJson.data = {
			lecturerId: resultData[0],
			articleIds: resultData[1],
		};
	} catch (errors) {
		console.log(errors);
	}

	return response.status(statusCode).json(responseJson);
}

/**
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
async function getConferenceRankByName(request, response) {
	//Default response is error response
	let statusCode = 500;
	let responseJson = {
		code: messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_NOT_FOUND_CODE,
		message:
			messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_NOT_FOUND_MESSAGE,
	};
	try {
		const conferenceName = request.query.conferenceName;

		if (conferenceName) {
			const conferenceData =
				await getConferenceRankByNameService.getConferenceRankByName(
					conferenceName
				);
			statusCode = 200;
			responseJson = {
				code: messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_FOUND_CODE,
				message:
					messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_FOUND_MESSAGE,
				data: conferenceData,
			};
		}
	} catch (err) {
		statusCode = 500;
		responseJson.message = err;
	}

	return response.status(statusCode).json(responseJson);
}


/**
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
async function findArticleByDOI(request, response) {
	
	//Get the DOI from body
	const {data} = request.body;
	const doi = data.doi;

	//Default response is error response
	let statusCode = 500;
	let responseJson = {
		code: messageConstants.SCOPUS_FIND_ARTICLE_BY_DOI_NOT_FOUND_CODE,
		message: messageConstants.SCOPUS_FIND_ARTICLE_BY_DOI_NOT_FOUND_MESSAGE,
	};

	const article = await getArticleByDOI(doi);
	try {
		responseJson.code = messageConstants.SUCCESSFUL_CODE;
		responseJson.message = `Found article with DOI = ${doi} successfully!`;
		responseJson.data = article;
		statusCode = 200;
	} catch (errors) {
		statusCode = 500;
	}

	return response.status(statusCode).json(responseJson);
}


/**
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
 async function getJournalRankISSNs(request, response) {
	//Default response is error response
	let statusCode = 500;
	let responseJson = {
		code: messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_NOT_FOUND_CODE,
		message:
			messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_NOT_FOUND_MESSAGE,
	};
	try {
		const issnArray = ["03029743", "09205691", "1232131243235"];
		if (issnArray.length > 0) {
			const issns = await getJournalRanking(issnArray);
			statusCode = 200;
			responseJson = {
				code: messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_FOUND_CODE,
				message:
					messageConstants.SCOPUS_FIND_CONFERENCE_RANK_BY_ID_FOUND_MESSAGE,
				data: issns,
			};
		}
	} catch (err) {
		statusCode = 500;
		responseJson.message = err;
	}

	return response.status(statusCode).json(responseJson);
}


module.exports = {
	getScopusAuthorByName,
	findArticleByDOI,
	saveAuthorWithScopus,
	getConferenceRankByName,
	getJournalRankISSNs,
};
