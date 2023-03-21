const connection = require('../configs/database');
const queryConstants = require('../constants/queryConstants');

/**
 *  Query to get all the lectures, with only usable column in the lecture base table (without join any table)
 * @return {Promise}
 */
function getAllLecturersWithBasicInformation() {
	return new Promise(function (resolve, reject) {
		const query = [
			`SELECT id, name, gender, avatar, DATE_FORMAT(date_of_birth, "%d-%m-%Y"), ${queryConstants.GET_METADATA_QUERY}`,
			'FROM lecturer_information',
			queryConstants.FILTER_DELETED_RECORD_QUERY,
		].join(' ');

		let lecturers = null;
		connection.query(query, (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			lecturers = results;
			resolve(lecturers);
		});
	});
}

/**
 *  Query to get all the lectures
 *  with offset and limit size for pagination
 *
 * @param {number} offset
 * @param {number} limitSize
 * @return {Promise}
 */
function getAllLecturersWithPagination(offset, limitSize) {
	return new Promise(function (resolve, reject) {
		const query = [
			`SELECT id, name, gender, avatar, DATE_FORMAT(date_of_birth, "%d-%m-%Y"), ${queryConstants.GET_METADATA_QUERY}`,
			'FROM lecture_information',
			queryConstants.FILTER_DELETED_RECORD_QUERY,
			`ORDER BY id ASC`,
			'LIMIT ?, ?',
		].join(' ');

		let lecturers = null;
		connection.query(query, [offset, limitSize], (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			lecturers = results;
			resolve(lecturers);
		});
	});
}

module.exports = {
	getAllLecturersWithBasicInformation,
	getAllLecturersWithPagination,
};
