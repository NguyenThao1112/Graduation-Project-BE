// @ts-nocheck
const createLecturerServices = require('../services/lecturerServices/createlecturerServices');
const searchLecturerServices = require('../services/lecturerServices/searchLecturerServices');
const updateLecturerService = require('../services/lecturerServices/updateLecturerServices');

const messageConstants = require('../constants/messageConstants');
const validatorHelper = require('../helpers/validatorHelper');

/**
 * get one lecturer
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getOneLecturer(request, response) {
	return new Promise((resolve, reject) => {
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		let responseJson = {
			code: messageConstants.FAILED_CODE,
			message: messageConstants.LECTURER_GET_ONE_LECTURER_FAILED_MESSAGE,
		};

		const id = request.params.id;
		if (!id) {
			response.json(responseJson);
		}

		searchLecturerServices
			.getOneLecturer(id)
			.then((lecturerInformation) => {
				if (lecturerInformation) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURER_GET_ONE_LECTURER_SUCCESS_MESSAGE;
					responseJson.data = lecturerInformation;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 * Create multiple lecturers at the same time
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function createLecturers(request, response) {
	// @ts-ignore
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.FAILED_CODE,
			message: messageConstants.LECTURER_CREATE_FAILED_MESSAGE,
		};

		//Get the "data" property
		// @ts-ignore
		const { data } = request.body;

		createLecturerServices
			.createLecturer(data)
			.then((lecturerId) => {
				//If there is a not empty id array => change the response's data
				if (lecturerId) {
					// @ts-ignore
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					// @ts-ignore
					responseJson.message =
						messageConstants.LECTURER_CREATE_SUCCESS_MESSAGE;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				// @ts-ignore
				response.json(responseJson);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getLecturersWithPagination(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.FAILED_CODE,
			message: messageConstants.LECTURER_GET_ALL_INVALID_MESSAGE,
		};

		const pageOffset = parseInt(request.query.pageOffset);

		const limitSize = parseInt(request.query.limitSize);

		const options = {
			// @ts-ignore
			searchByKeyword: request.query.keyword ?? undefined,
		};

		searchLecturerServices
			// @ts-ignore
			.getLecturersWithPagination(pageOffset, limitSize, options)
			.then((lecturers) => {
				//If there is a not-null data => change the response's data
				if (lecturers) {
					// @ts-ignore
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					// @ts-ignore
					responseJson.message =
						messageConstants.LECTURER_GET_ALL_PAGINATION_SUCCESS_MESSAGE;
					responseJson.data = lecturers;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				// @ts-ignore
				response.json(responseJson);
			});
	});
}

/**
 * Update a lecturer
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function updateLecturer(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.LECTURER_UPDATE_FAILED_MESSAGE,
			message: messageConstants.FAILED_CODE,
		};

		const { data } = request.body;
		data.id = request.params.id;

		updateLecturerService
			.updateLecturer(data)
			.then((lecturer) => {
				//If there is a not-null contact type => change the response's data
				if (lecturer) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURER_UPDATE_SUCCESS_MESSAGE;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 * Delete multiple contact types at the same time
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function deleteLecturers(request, response) {
	return new Promise((resolve, reject) => {
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		let responseJson = {
			code: messageConstants.FAILED_CODE,
			message: messageConstants.LECTURER_DELETE_FAILED_MESSAGE,
		};

		const { data } = request.body;
		const ids = data.map((data) => data.id);

		lecturerServices
			.deleteLecturers(ids)
			.then((deleteCount) => {
				const originalSize = data.length;

				if (deleteCount === originalSize) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message = LECTURER_DELETE_SUCCESS_MESSAGE;
				}
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
	getOneLecturer,
	createLecturers,
	getLecturersWithPagination,
	updateLecturer,
	// deleteLecturers,
};
