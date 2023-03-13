const accountDAO = require('../daos/accountDAO');

/**
 *
 *@param void
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

module.exports = {
	getAllAccounts,
};
