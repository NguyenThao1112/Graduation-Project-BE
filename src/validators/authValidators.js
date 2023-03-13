const { check, query } = require('express-validator');
const { isUsedEmail } = require('../services/authServices');
const messageConstants = require('../constants/messageConstants');
const urlConstants = require('../constants/urlConstants');

function emailValidators() {
	return [
		check('email', `Email ${messageConstants.VAL_IS_REQUIRED_MESSAGE}`)
			.not()
			.isEmpty(),
		check(
			'email',
			`Email ${messageConstants.VAL_IS_NOT_EMAIL_MESSAGE}`
		).isEmail(),
	];
}

function confirmPasswordValidators() {
	return [
		check('password', `Password ${messageConstants.VAL_IS_REQUIRED_MESSAGE}`)
			.not()
			.isEmpty()
			.custom((password, { req }) => {
				console.log('password ', password, req.body);
				if (password !== req.body.password2) {
					throw new Error(
						`Password ${messageConstants.VAL_IS_NOT_MATCHED_MESSAGE}`
					);
				}

				return true;
			}),
	];
}

function registrationValidators() {
	return [
		...emailValidators(),

		check('email').custom((email) => {
			//Check if the email is used
			return isUsedEmail(email).then((isUsed) => {
				if (isUsed) {
					return Promise.reject(
						`Email ${messageConstants.VAL_IS_BEING_USED_MESSAGE}`
					);
				}
			});
		}),

		...confirmPasswordValidators(),
	];
}

function forgetPasswordValidators() {
	return [
		...emailValidators(),
		check('email').custom((email) => {
			//Check if the email is not used
			return isUsedEmail(email).then((isUsed) => {
				if (!isUsed) {
					return Promise.reject(`Email ${messageConstants.VAL_IS_NOT_EXISTED}`);
				}
			});
		}),
	];
}

function forgetPasswordTokenValidators() {
	return [
		query(urlConstants.AUTH_FORGET_PASSWORD_TOKEN_PARAM)
			.exists()
			.withMessage(
				messageConstants.AUTH_FORGET_PASSWORD_VERIFY_INVALID_MESSAGE
			),
	];
}

module.exports = {
	registrationValidators,
	forgetPasswordValidators,
	forgetPasswordTokenValidators,
	confirmPasswordValidators,
};
