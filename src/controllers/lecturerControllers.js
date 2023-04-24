const lecturerServices = require('../services/lecturerServices');
const messageConstants = require('../constants/messageConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');
const {
	LECTURER_DELETE_FAILED_MESSAGE,
	LECTURER_DELETE_SUCCESS_MESSAGE,
} = require('../constants/messageConstants');

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getAllLecturersWithBasicInformation(request, response) {
	return new Promise((resolve, reject) => {
		let responseJson = {
			code: messageConstants.LECTURER_GET_ALL_INVALID_CODE,
			message: messageConstants.LECTURER_GET_ALL_INVALID_MESSAGE,
		};

		lecturerServices
			.getAllLecturersWithBasicInformation()
			.then((lectures) => {
				if (lectures) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURER_GET_ALL_SUCCESS_MESSAGE;
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
			code: messageConstants.LECTURER_GET_ALL_PAGINATION_INVALID_CODE,
			message: messageConstants.LECTURER_GET_ALL_PAGINATION_INVALID_MESSAGE,
		};

		const [pageOffset, limitSize] = commonHelper.normalizePaginationParam(
			request.query.pageOffset,
			request.query.limitSize
		);

		//Try to get all the lectures from the database
		lecturerServices
			.getAllLecturersWithPagination(pageOffset, limitSize)
			.then((lectures) => {
				//If there is a not-null lectures => change the response's data
				if (lectures) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURER_GET_ALL_PAGINATION_SUCCESS_MESSAGE;
					responseJson.data = JSON.stringify(lectures);
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
		const { data } = request.body;
		console.log(
			'🚀 ~ file: lecturerControllers.js:105 ~ returnnewPromise ~ data:',
			data
		);

		lecturerServices
			.createLecturer(data)
			.then((lecturerId) => {
				console.log('vao day', lecturerId);
				//If there is a not empty id array => change the response's data
				if (lecturerId.length > 0) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.LECTURER_CREATE_SUCCESS_MESSAGE;
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
		const id = request.params.id;

		const { data } = request.body;
		console.log(
			'🚀 ~ file: lecturerControllers.js:156 ~ returnnewPromise ~ data:',
			id,
			data
		);

		lecturerServices
			.updateLecturer(id, data)
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
	getAllLecturersWithBasicInformation,
	getAllLecturersWithPagination,
	createLecturers,
	updateLecturer,
	deleteLecturers,
};
