const accountDAO = require('../daos/accountDAO');
const authHelper = require('../helpers/authHelper');

/**
 *
 *@returns {Promise}
 */
function getAllAccounts() {
	return new Promise((resolve, reject) => {
		accountDAO
			.getAllAccounts()
			.then((accounts) => {
				resolve(accounts);
			})
			.catch((err) => reject(err));
	});
}

/**
 *
 * @param {string} accountId
 * @return {Promise}
 */
function getOneAccount(accountId) {
	return new Promise(function (resolve, reject) {
		accountDAO
			.getAccountById(accountId)
			.catch((error) => {
				reject(error);
			})
			.then((accountDAOs) => {
				resolve(accountDAOs[0]);
			});
	});
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @return {Promise}
 */
function createOneAccount(email, password) {
	return new Promise(function (resolve, reject) {
		const hashPassword = authHelper.hashPassword(password);
		accountDAO
			.createAccount({
				email: email,
				password: hashPassword,
			})
			.catch((error) => {
				reject(error);
			})
			.then(() => {
				resolve(null);
			});
	});
}

function deleteOneAccount(id) {
	return new Promise((resolve, reject) => {
		accountDAO
			.deleteOneAccount(id)
			.then(() => {
				resolve(null);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

module.exports = {
	getAllAccounts,
	createOneAccount,
	deleteOneAccount,
	getOneAccount,
};
