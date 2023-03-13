const connection = require('../configs/database');
const configConstants = require('../constants/configConstants');
const moment = require('moment');

/**
 *
 * @param {string} email
 * @return {Promise}
 */
function getAccountByEmail(email) {
	return new Promise(function (resolve, reject) {
		const query = [
			'SELECT id, email, password, role, is_deleted, token',
			'FROM account',
			'WHERE email = ?',
			'LIMIT 1',
		].join(' ');

		let account = null;
		connection.query(query, [email], (error, results, fields) => {
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
 * @param {string} email
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
 * @param {Object {email: string, password: string}} account
 * @return {Promise}
 */
function createAccount(account) {
	return new Promise(function (resolve, reject) {
		const { email, password } = account;
		const query = [
			'INSERT',
			'INTO account (email, password, created_at, updated_at, is_deleted, role, token)',
			'VALUES (?, ?, ?, ?, ?, ?, ?)',
		].join(' ');

		const role = configConstants.ROLE_SCHOLAR;
		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[email, password, now, now, false, role, null],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve();
			}
		);
	});
}

/**
 *
 * @param {Object{id: int, token: string}} account
 * @return {Promise}
 */
function updateAccountToken(account) {
	return new Promise(function (resolve, reject) {
		console.log('account ', account);
		const { id, expire, token } = account;
		console.log('🚀 ~ file: accountDAO.js:97 ~ account:', account);

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
 * @param {Object{id: int, token: string}} account
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

				resolve();
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
		const query = ['SELECT *', 'FROM account'].join(' ');
		connection.query(query, function (error, results, fields) {
			if (error) {
				reject(error);
				return;
			}
			console.log('results ', JSON.stringify(results));
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
};
