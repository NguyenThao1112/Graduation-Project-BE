const authService = require('../services/authServices');
const authConstants = require('../constants/messageConstants');
const validatorHelper = require('../helpers/validatorHelper');

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function login(request, response) {
	return new Promise((resolve, reject) => {
		const { email, password } = request.body;

		//Default response is login failed
		let responseJson = {
			code: authConstants.AUTH_LOGIN_FAILED_CODE,
			message: authConstants.AUTH_LOGIN_FAILED_MESSAGE,
		};

		//Check if authenticate successfully
		authService
			.authenticate(email, password)
			.then((token) => {
				authService
					.updateAccountTokenByEmail(email, token)
					.then((account) => {
						console.log(
							'🚀 ~ file: authControllers.js:28 ~ .then ~ account:',
							account
						);

						if (account) {
							responseJson.code = authConstants.SUCCESSFUL_CODE;
							responseJson.message = authConstants.AUTH_LOGIN_SUCCESS_MESSAGE;
							responseJson.token = account.token;
							responseJson.expire = account.expire;
						}
						response.json(responseJson);
					})
					.catch((err) => {
						reject(err);
					});
				//If authenticated success => change the response's data
			})
			.catch((error) => {
				console.log(error);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function signUp(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		const { email, password } = request.body;

		//Default response is sign up failed
		let responseJson = {
			code: authConstants.AUTH_SIGNUP_FAILED_CODE,
			message: authConstants.AUTH_SIGNUP_FAILED_MESSAGE,
		};

		//Check if registrating successfully
		authService
			.accountRegistrate(email, password)
			.then(() => {
				//if then => successfully case
				responseJson.code = authConstants.SUCCESSFUL_CODE;
				responseJson.message = authConstants.AUTH_SIGNUP_SUCCESS_MESSAGE;
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
function buildForgetPassword(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		const { email } = request.body;

		//Default response is failed to send email
		let responseJson = {
			code: authConstants.AUTH_FORGET_PASSWORD_FAILED_CODE,
			message: authConstants.AUTH_FORGET_PASSWORD_FAILED_MESSAGE,
		};

		//Check if the email is sent successfully
		authService
			.createTokenForForgetPassword(email)
			.then(() => {
				//if then => successfully case
				responseJson.code = authConstants.SUCCESSFUL_CODE;
				responseJson.message =
					authConstants.AUTH_FORGET_PASSWORD_SUCCESS_MESSAGE;
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
function verifyForgetPasswordToken(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		const token = request.query.token;

		//Default response is sign up failed
		let responseJson = {
			code: authConstants.AUTH_FORGET_PASSWORD_VERIFY_INVALID_CODE,
			message: authConstants.AUTH_FORGET_PASSWORD_VERIFY_INVALID_MESSAGE,
		};

		//Check if the email is sent successfully
		authService
			.verifyForgetPasswordToken(token)
			.then((errorCode) => {
				//if then => successfully case
				responseJson.code = authConstants.SUCCESSFUL_CODE;
				responseJson.message =
					authConstants.AUTH_FORGET_PASSWORD_VERIFY_SUCCESS_MESSAGE;
			})
			.catch((errorCode) => {
				responseJson.code = errorCode;
				if (
					errorCode === authConstants.AUTH_FORGET_PASSWORD_VERIFY_INVALID_CODE
				) {
					responseJson.message =
						authConstants.AUTH_FORGET_PASSWORD_VERIFY_INVALID_MESSAGE;
				} else if (
					errorCode === authConstants.AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_CODE
				) {
					responseJson.message =
						authConstants.AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_MESSAGE;
				}
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
function changePasswordAfterForgeting(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		const { token, password } = request.body;

		//Default response is sign up failed
		let responseJson = {
			code: authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_CODE,
			message:
				authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_MESSAGE,
		};

		//Check if registrating successfully
		authService
			.changePasswordViaToken(token, password)
			.then((errorCode) => {
				//if then => successfully case
				responseJson.code = errorCode;
				responseJson.message =
					authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_SUCCESS_MESSAGE;
			})
			.catch((errorCode) => {
				responseJson.code = errorCode;
				if (
					errorCode ===
					authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_CODE
				) {
					responseJson.message =
						authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_MESSAGE;
				} else if (
					errorCode ===
					authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_EXPIRE_CODE
				) {
					responseJson.message =
						authConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_EXPIRE_MESSAGE;
				} else if (errorCode === authConstants.UNEXPECTED_ERROR_CODE) {
					responseJson.message = authConstants.UNEXPECTED_ERROR_MSG;
				}
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

module.exports = {
	login,
	signUp,
	buildForgetPassword,
	verifyForgetPasswordToken,
	changePasswordAfterForgeting,
};
