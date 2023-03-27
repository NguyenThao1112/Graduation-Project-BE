const connection = require('../configs/database');
const queryConstants = require('../constants/queryConstants');
const moment = require('moment');

/****************************************************************
 ***********************LECTURER DAO*****************************
 ****************************************************************/

/**
 *  Query to get all the lecturers, with only usable column in the lecturer base table (without join any table)
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
 *  Query to get all the lecturers
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

/**
 *  Query to create multiple contacts type at the same time
 *
 * @param {Array<Object>} lecturers
 * @return {Promise}
 */
function createLecturers(lecturers) {
	const {
		account_id,
		name,
		gender,
		avatar,
		date_of_birth,
		academic_rank_id,
		academic_rank_gain_year,
		academic_title_id,
		academic_title_gain_year,
		expand_column,
	} = lecturers;
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO lecturer_information(account_id,name,gender,avatar,date_of_birth,academic_rank_id,academic_rank_gain_year,academic_title_id,academic_title_gain_year, created_at, updated_at, is_deleted,expand_column)`,
			'VALUES ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = lecturers.map((contactType) => [
			account_id,
			name,
			gender,
			avatar,
			date_of_birth,
			academic_rank_id,
			academic_rank_gain_year,
			academic_title_id,
			academic_title_gain_year,
			now,
			now,
			is_deleted,
			expand_column,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			console.log('result ', result);
			resolve(result);
		});
	});
}

module.exports = {
	getAllLecturersWithBasicInformation,
	getAllLecturersWithPagination,
	createLecturers,
};
