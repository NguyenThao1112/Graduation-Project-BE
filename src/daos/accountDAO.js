const connection = require('../configs/database');
const configConstants = require('../constants/configConstants');
const messageQueryConstants = require('../constants/messageQueryConstants');
const moment = require('moment');

/**
 * get account corresponding to email address
 * @param {string} email
 * @return {Promise}
 */
function getAccountByEmail(email) {
	return new Promise(function (resolve, reject) {
		const query = [
			'SELECT id, email, password, role, is_deleted, token',
			'FROM account',
			`${messageQueryConstants.FILTER_DELETED_RECORD_QUERY} AND email = ?`,
			'LIMIT 1',
		].join(' ');

		let account = null;
		connection.query(query, [email], (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(results);
		});
	});
}

/**
 *
 * @param {string} token
 * @return {Promise}
 */
function getAccountByToken(token) {
	return new Promise(function (resolve, reject) {
		const query = [
			'SELECT id, email, password, role, is_deleted, token, token_expired_in',
			'FROM account',
			'WHERE token = ?',
			'LIMIT 1',
		].join(' ');

		let account = null;
		connection.query(query, [token], (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			account = results;
			resolve(account);
		});
	});
}

/**
 *
 * @param {string} accountId
 * @return {Promise}
 */
function getAccountById(accountId) {
	return new Promise(function (resolve, reject) {
		const query = [
			'SELECT id, email, password, role, is_deleted, token, token_expired_in,created_at, updated_at',
			'FROM account',
			'WHERE id = ?',
			'LIMIT 1',
		].join(' ');

		let account = null;
		connection.query(query, [accountId], (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			account = results;
			resolve(account);
		});
	});
}

/**
 *
 * @param {Object} account
 * @return {Promise}
 */
function createAccount(account) {
	return new Promise(function (resolve, reject) {
		const { email, password, role } = account;
		const query = [
			'INSERT',
			'INTO account (email, password, created_at, updated_at, is_deleted, role, token)',
			'VALUES (?, ?, ?, ?, ?, ?, ?)',
		].join(' ');

		let roleAccount = 0;

		if (role != undefined) {
			roleAccount = role;
		} else {
			roleAccount = configConstants.ROLE_SCHOLAR;
		}

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[email, password, now, now, false, roleAccount, null],
			function (error, results, fields) {
				if (error) {
					reject(error);
				}

				resolve(results);
			}
		);
	});
}

/**
 *
 * @param {Object} account
 * @return {Promise}
 */
function updateAccountToken(account) {
	return new Promise(function (resolve, reject) {
		const { id, expire, token } = account;

		const query = [
			'UPDATE account',
			'SET token = ?, updated_at = ?,  token_expired_in = ?',
			'WHERE id = ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[token, now, expire, id],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve(account);
			}
		);
	});
}

/**
 *
 * @param {Object} account
 * @return {Promise}
 */
function updateAccountPassword(account) {
	return new Promise(function (resolve, reject) {
		const { id, password } = account;
		const query = [
			'UPDATE account',
			'SET password = ?, updated_at = ?',
			'WHERE id = ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[password, now, id],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve(results);
			}
		);
	});
}

/**
 * @param void
 * @return {Promise}
 */
function getAllAccounts() {
	return new Promise(function (resolve, reject) {
		const query = ['SELECT *', 'FROM account', 'WHERE is_deleted <> 1'].join(
			' '
		);
		connection.query(query, function (error, results, fields) {
			if (error) {
				reject(error);
				return;
			}
			resolve(results);
		});
	});
}

/**
 * @param {number} id
 * @return {Promise}
 */
function deleteOneAccount(id) {
	return new Promise(function (resolve, reject) {
		const query = ['UPDATE account', 'SET is_deleted = 1', 'WHERE id = ?'].join(
			' '
		);
		connection.query(query, [id], function (error, results, fields) {
			if (error) {
				reject(error);
				return;
			}
			resolve(results);
		});
	});
}

// /**
//  *
//  * @param {Object{id: int, email: string, password: string, is_deleted: boolean, role: int, token: string}} account
//  * @return {Promise}
//  */
//  function updateAccount(account) {
//     return new Promise(function (resolve, reject) {

//         const {id, email, password, role, is_deleted, token} = account;
//         const query =
//             [
//                 'UPDATE account',
//                 'SET email = ?, password = ?, updated_at = ? , is_deleted = ?, role = ?, token = ?)',
//                 'WHERE id = ?',
//             ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

//         connection.query(query, [email, password, now, is_deleted , role, token, id], function (error, results, fields) {

//             if (error) {
//                 reject(error);
//                 return;
//             }

//             resolve();
//         });
//     });
// }

module.exports = {
	getAccountByEmail,
	createAccount,
	updateAccountToken,
	getAccountByToken,
	updateAccountPassword,
	getAllAccounts,
	deleteOneAccount,
	getAccountById,
};
