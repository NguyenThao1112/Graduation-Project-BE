const accountDAO = require('../daos/accountDAO');
const messageConstants = require('../constants/messageConstants');
const configConstants = require('../constants/configConstants');
const authHelper = require('../helpers/authHelper');
const randToken = require('rand-token');
const mailServices = require('./mailServices');
const { sign } = require('jsonwebtoken');
const moment = require('moment');
const { convertRowsDataToArray } = require('../helpers/commonHelper');

const TOKEN_LENGTH = 20;

/**
 *
 * @param {string} email
 * @param {string} password
 * @return {Promise}
 *
 */
function authenticate(email, password) {
	return new Promise((resolve, reject) => {
		let jwt = null;

		accountDAO
			.getAccountByEmail(email)
			.then((account) => {
				console.log('vao authenticate');
				//Check if the account is empty or not
				if (account && account.length > 0) {
					const hashPassword = account[0].password;

					//If yes, check if the password is correct
					const isPasswordMatched = authHelper.isPasswordMatch(
						password,
						hashPassword
					);
					if (isPasswordMatched) {
						const jwtPayload = {
							key: authHelper.getRandomNumber(),
							role: account[0].role,
						};
						jwt = sign(jwtPayload, configConstants.JWT_SECRET, {
							expiresIn: configConstants.JWT_EXPIRE,
						});
					}
				}

				resolve(jwt);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @return {Promise}
 */
function accountRegistrate(email, password) {
	return new Promise(function (resolve, reject) {
		const hashPassword = authHelper.hashPassword(password);
		accountDAO
			.createAccount({
				email: email,
				password: hashPassword,
				is_deleted: false,
			})
			.catch((error) => {
				reject(error);
			})
			.then(() => {
				resolve(null);
			});
	});
}

/**
 * Check if a email in in used as username
 * @param {string} email
 * @return {Promise}
 */
function isUsedEmail(email) {
	return new Promise((resolve, reject) => {
		let isUsed = true;
		accountDAO
			.getAccountByEmail(email)
			.then((account) => {
				//Check if the account is empty or not
				if (account && account.length > 0) {
					isUsed = true;
				} else {
					isUsed = false;
				}

				resolve(isUsed);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Check if a email in in used as username
 * The email always exsited in the database before calling to this function
 *
 * @param {string} email
 * @return {Promise}
 */
function createTokenForForgetPassword(email) {
	return new Promise((resolve, reject) => {
		accountDAO
			.getAccountByEmail(email)
			.then((account) => {
				//Check if the account is empty or not
				if (!account || account.length <= 0) {
					reject(email);
					return;
				}

				//Genearate the token (the new password) and save to database
				const token = randToken.generate(TOKEN_LENGTH);
				const tokenExpiredIn = moment()
					.add(configConstants.FORGET_PASSWORD_TOKEN_EXPIRE, 'minutes')
					.utc(true)
					.format('YYYY/MM/DD hh:mm:ss');

				const dao = {
					id: account[0].id,
					token: token,
					expire: tokenExpiredIn,
				};

				return accountDAO.updateAccountToken(dao);
			})
			.catch((error) => {
				reject(error);
			})
			.then((token) => {
				//Send the token to email
				mailServices.sendTokenToUserMail(email, token);
				resolve();
			});
	});
}

/**
 *
 * @param {string} token
 * @returns {Promise}
 */
function verifyForgetPasswordToken(token) {
	return new Promise((resolve, reject) => {
		accountDAO
			.getAccountByToken(token)
			.catch((error) => {
				reject(error);
			})
			.then((account) => {
				let errorCode =
					messageConstants.AUTH_FORGET_PASSWORD_VERIFY_INVALID_CODE;

				//Check if the account is empty or not
				if (!account || account.length <= 0) {
					reject(errorCode);
					return;
				}

				//Check if the token is expired or not
				const expireRaw = account[0].token_expired_in;
				const expireMoment = moment(expireRaw).utc(true);
				const now = moment().utc(true);
				const isExpired = now.isAfter(expireMoment);
				if (isExpired) {
					errorCode = messageConstants.AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_CODE;
					reject(errorCode);
					return;
				}

				//The token is valid
				errorCode = messageConstants.SUCCESSFUL_CODE;
				resolve(errorCode);
			});
	});
}

/**
 *
 * @param {string} token
 * @returns {Promise}
 */
function changePasswordViaToken(token, password) {
	return new Promise((resolve, reject) => {
		accountDAO
			.getAccountByToken(token)
			.catch((error) => {
				reject(error);
			})
			.then((account) => {
				let errorCode =
					messageConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_CODE;

				//Check if the account is empty or not
				if (!account || account.length <= 0) {
					return Promise.reject(errorCode);
				}

				//Check if the token is expired or not
				const expireRaw = account[0].token_expired_in;
				const expireMoment = moment(expireRaw).utc(true);
				const now = moment().utc(true);
				const isExpired = now.isAfter(expireMoment);
				if (isExpired) {
					errorCode =
						messageConstants.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_EXPIRE_CODE;
					return Promise.reject(errorCode);
				}

				return accountDAO.getAccountByToken(token);
			})

			.then((account) => {
				const hashPassword = authHelper.hashPassword(password);
				const dao = {
					id: account[0].id,
					password: hashPassword,
				};

				return accountDAO.updateAccountPassword(dao);
			})
			.catch((errorCode) => {
				reject(errorCode);
			})
			.then(() => {
				//The token is valid
				errorCode = messageConstants.SUCCESSFUL_CODE;
				resolve(errorCode);
			});
	});
}

/**
 *
 */
function updateAccountTokenByEmail(email, token) {
	return new Promise((resolve, reject) => {
		accountDAO
			.getAccountByEmail(email)
			.then((account) => {
				let result = convertRowsDataToArray(account);
				const tokenExpiredIn = moment()
					.add(configConstants.LOGIN_TOKEN_EXPIRE, 'hours')
					.utc(true)
					.format('YYYY/MM/DD hh:mm:ss');
				const newAccount = {
					...result[0],
					token: token,
					expire: tokenExpiredIn,
				};
				accountDAO
					.updateAccountToken(newAccount)
					.then((account) => {
						console.log(
							'🚀 ~ file: authServices.js:266 ~ .then ~ account:',
							account
						);

						resolve(account);
					})
					.catch((err) => {
						reject(err);
					});
			})
			.catch((err) => {
				reject(err);
			});
	});
}

module.exports = {
	authenticate,
	isUsedEmail,
	accountRegistrate,
	createTokenForForgetPassword,
	verifyForgetPasswordToken,
	changePasswordViaToken,
	updateAccountTokenByEmail,
};
