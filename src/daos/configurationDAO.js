const connection = require('../configs/database');
const queryConstants = require('../constants/queryConstants');

/**
 *  Query to get all the contact type: email, phone, linkedin,...
 *  with offset and limit size for pagination
 *
 * @param {number} offset
 * @param {number} limitSize
 * @return {Promise}
 */
function getContactTypeWithPagination(offset, limitSize) {
	return new Promise(function (resolve, reject) {
		const query = [
			`SELECT id, name, created_at, updated_at`,
			'FROM contact_type',
			queryConstants.FILTER_DELETED_RECORD_QUERY,
			`ORDER BY id ASC`,
			'LIMIT ?, ?',
		].join(' ');

		let contactTypes = null;
		connection.query(query, [offset, limitSize], (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			contactTypes = results;
			resolve(contactTypes);
		});
	});
}

/**
 *  Query to get all the contact type: email, phone, linkedin,.. but with only its id and name
 *
 * @return {Promise}
 */
function getAllContactType() {
	return new Promise(function (resolve, reject) {
		const query = [
			`SELECT id, name`,
			'FROM contact_type',
			queryConstants.FILTER_DELETED_RECORD_QUERY,
			`ORDER BY id ASC`,
		].join(' ');

		let contactTypes = null;
		connection.query(query, (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			contactTypes = results;
			resolve(contactTypes);
		});
	});
}

module.exports = {
	getContactTypeWithPagination,
	getAllContactType,
};
