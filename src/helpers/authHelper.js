const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { verify } = require('jsonwebtoken');
const messageConstants = require('../constants/messageConstants');
const { JWT_SECRET } = require('../constants/configConstants');

/**
 *
 * @param {string} plainPassword
 * @return {string} hashPassword
 */
function hashPassword(plainPassword) {
	const salt = genSaltSync(10);
	const hashPassword = hashSync(plainPassword, salt);
	return hashPassword;
}

/**
 *
 * @return {int} random
 */
function getRandomNumber() {
	return Math.random();
}

/**
 *
 * @param {string} plainTextPassword
 * @param {string} hashPassword
 * @return {boolean} isMatch
 */
function isPasswordMatch(plainTextPassword, hashPassword) {
	const isMatch = compareSync(plainTextPassword, hashPassword);
	return isMatch;
}

//Check if the request has the correct token
/**
 *
 * @param {*} request
 * @return {int} errorCode
 */
function verifyJWT(request) {
	let token = request.get('Authorization');
	let errorCode = messageConstants.AUTH_JWT_UNAUTHORIZE_CODE;

	if (token) {
		token = token.slice(7); //Magic number of jwt design : Bearer
		verify(token, JWT_SECRET, (error, decoded) => {
			if (error) {
				errorCode = messageConstants.AUTH_JWT_INVALID_TOKEN_CODE;
			} else {
				errorCode = messageConstants.AUTH_JWT_SUCCESS_CODE;
			}
		});
	}

	return errorCode;
}

module.exports = {
	hashPassword,
	isPasswordMatch,
	verifyJWT,
	getRandomNumber,
};
