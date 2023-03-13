const accountService = require('../services/accountServices');
const messageConstants = require('../constants/messageConstants');

function getAccounts(request, response) {
	console.log('vao next account');
	return new Promise((resolve, reject) => {
		let responseJson = {
			code: messageConstants.AUTH_LOGIN_FAILED_CODE,
			message: messageConstants.ACCOUNT_GET_ALL_FAILED_MESSAGE,
		};
		accountService
			.getAllAccounts()
			.then((accounts) => {
				console.log(
					'🚀 ~ file: accountControllers.js:9 ~ .then ~ accounts:',
					accounts
				);
				if (accounts) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ACCOUNT_GET_ALL_SUCCESS_MESSAGE;
					responseJson.data = accounts;
				}
				response.json(responseJson);
			})
			.catch((err) => reject(err));
	});
}

module.exports = { getAccounts };
