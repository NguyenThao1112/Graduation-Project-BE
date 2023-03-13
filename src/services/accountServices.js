const accountDAO = require('../daos/accountDAO');

/**
 *
 *@param {string} token
 *@param {Promise}
 */
function getAllAccounts(token) {
	return new Promise((resolve, reject) => {
		accountDAO
			.getAccountByToken(token)
			.catch((err) => reject(err))
			.then((account) => {
				if (account) {
					accountDAO
						.getAllAccounts()
						.catch((error) => {
							reject(error);
						})
						.then((accounts) => {
							resolve(accounts);
						});
				}
			});
	});
}
