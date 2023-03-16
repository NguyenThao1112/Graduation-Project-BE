const messageConstants = require('../constants/messageConstants');
const { verifyJWT } = require('../helpers/authHelper');

//Middleware to check a request has a valid json web token
/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {Express.Request} next
 * @returns
 */
function authGuard(request, response, next) {
	const errorCode = verifyJWT(request);

	//Valid token case
	if (messageConstants.AUTH_JWT_SUCCESS_CODE === errorCode) {
		//Authorize successfully! Execute the next request
		next();

		//Terminate the middleware here
		return;
	}

	//Default response is unauthorized token!
	//  (this is following least privilege security principle)
	let responseJSON = {
		success: messageConstants.FAILED_CODE,
		message: messageConstants.AUTH_JWT_UNAUTHORIZE_MESSAGE,
	};

	if (messageConstants.AUTH_JWT_INVALID_TOKEN_CODE === errorCode) {
		//Has token, but invalid token case
		responseJSON.message = messageConstants.AUTH_JWT_INVALID_TOKEN_MESSAGE;
	} else if (messageConstants.AUTH_JWT_UNAUTHORIZE_CODE === errorCode) {
		//Doesn't have token case
		//do nothing, because this case is the default value of the responseJSON
	}

	//Send the failed json message
	response.json(responseJSON);
}

module.exports = {
	authGuard,
};
