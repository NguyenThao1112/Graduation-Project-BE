const lecturerServices = require('../services/lecturerServices');
const messageConstants = require('../constants/messageConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getAllLecturersWithBasicInformation(request, response) {
	return new Promise((resolve, reject) => {
		let responseJson = {
			code: messageConstants.LECTURE_GET_ALL_INVALID_CODE,
			message: messageConstants.LECTURE_GET_ALL_INVALID_MESSAGE,
		};

		lecturerServices
			.getAllLecturersWithBasicInformation()
			.then((lectures) => {
				if (lectures) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURE_GET_ALL_SUCCESS_MESSAGE;
					responseJson.data = JSON.stringify(lectures);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response?.json(responseJson);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getAllLecturersWithPagination(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.LECTURE_GET_ALL_PAGINATION_INVALID_CODE,
			message: messageConstants.LECTURE_GET_ALL_PAGINATION_INVALID_MESSAGE,
		};

		const [pageOffset, limitSize] = commonHelper.normalizePaginationParam(
			request.param.pageOffset,
			request.param.limitSize
		);

		//Try to get all the lectures from the database
		lecturerServices
			.getAllLecturersWithPagination(pageOffset, limitSize)
			.then((lectures) => {
				//If there is a not-null lectures => change the response's data
				if (lectures) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURE_GET_ALL_PAGINATION_SUCCESS_MESSAGE;
					responseJson.data = JSON.stringify(lectures);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

module.exports = {
	getAllLecturersWithBasicInformation,
	getAllLecturersWithPagination,
};
