const configurationService = require('../services/configurationServices');
const messageConstants = require('../constants/messageConstants');
const queryConstants = require('../constants/queryConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getContactTypesWithPagination(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.CONFIG_CONTACT_TYPE_INVALID_CODE,
			message: messageConstants.CONFIG_CONTACT_TYPE_INVALID_MESSAGE,
		};

		const [pageOffset, limitSize] = commonHelper.normalizePaginationParam(
			request.param.pageOffset,
			request.param.limitSize
		);

		//Try to get all the lectures from the database
		configurationService
			.getContactTypeWithPagination(pageOffset, limitSize)
			.then((contactTypes) => {
				if (contactTypes) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.CONFIG_CONTACT_TYPE_SUCCESS_MESSAGE;
					responseJson.data = JSON.stringify(contactTypes);
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
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getAllContactTypes(request, response) {
	return new Promise((resolve, reject) => {
		//Default response is error response
		let responseJson = {
			code: messageConstants.CONFIG_CONTACT_TYPE_INVALID_CODE,
			message: messageConstants.CONFIG_CONTACT_TYPE_INVALID_MESSAGE,
		};

		configurationService
			.getAllContactType()
			.then((contactTypes) => {
				if (contactTypes) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.CONFIG_CONTACT_TYPE_SUCCESS_MESSAGE;
					responseJson.data = JSON.stringify(contactTypes);
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
	getContactTypesWithPagination,
	getAllContactTypes,
};
