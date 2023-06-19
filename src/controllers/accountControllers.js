const accountService = require('../services/accountServices');
const messageConstants = require('../constants/messageConstants');

function getAccounts(request, response) {
	return new Promise((resolve, reject) => {
		let responseJson = {
			code: messageConstants.AUTH_LOGIN_FAILED_CODE,
			message: messageConstants.ACCOUNT_GET_ALL_FAILED_MESSAGE,
		};
		accountService
			.getAllAccounts()
			.then((accounts) => {
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

function getOneAccount(request, response) {
	return new Promise((resolve, reject) => {
		let responseJson = {
			code: messageConstants.AUTH_LOGIN_FAILED_CODE,
			message: messageConstants.ACCOUNT_GET_ONE_FAILED_MESSAGE,
		};
		const accountId = request.params.id;
		accountService
			.getOneAccount(accountId)
			.then((account) => {
				if (account) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ACCOUNT_GET_ONE_SUCCESS_MESSAGE;
					responseJson.data = account;
				}
				response.json(responseJson);
			})
			.catch((err) => reject(err));
	});
}

function createAccount(request, response) {
	return new Promise((resolve, reject) => {
		const { email, password } = request.body;
		let responseJson = {
			code: messageConstants.FAILED_CODE,
			message: messageConstants.ACCOUNT_CREATE_FAILED_MESSAGE,
		};
		accountService
			.createOneAccount(email, password)
			.then(() => {
				responseJson.code = messageConstants.SUCCESSFUL_CODE;
				responseJson.message = messageConstants.ACCOUNT_CREATE_SUCCESS_MESSAGE;
			})
			.catch((error) => {
				responseJson.message = error.message;
				response.json(responseJson);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

function deleteAccount(request, response) {
	return new Promise((resolve, reject) => {
		const id = request.params.id;
		let responseJson = {
			code: messageConstants.FAILED_CODE,
			message: messageConstants.ACCOUNT_DELETE_FAILED_MESSAGE,
		};
		accountService
			.deleteOneAccount(id)
			.then(() => {
				responseJson.code = messageConstants.SUCCESSFUL_CODE;
				responseJson.message = messageConstants.ACCOUNT_DELETE_SUCCESS_MESSAGE;
				response.json(responseJson);
			})
			.catch((err) => reject(err));
	});
}

module.exports = { getAccounts, createAccount, deleteAccount, getOneAccount };
