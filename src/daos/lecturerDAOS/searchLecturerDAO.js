// @ts-nocheck
const connection = require('../../configs/database');
const queryHelper = require('../../helpers/queryHelper');
const _ = require('lodash');
const moment = require('moment');
const {
	convertBinaryToBase64,
	convertBlobToBase64,
} = require('../../helpers/util');
//article_url
/**
 *  Query to get data of the table, which is join the Article table, by Article's id
 * @param {string} tableName            //the table name in FROM statement
 * @param {Array<string>} columnNames   //the column to SELECT
 * @param {Array<number>} lecturerIds
 * @return {Promise}
 */
function getDataOfSubtableJoningWithLecturerInformationByLecturerId(
	tableName,
	columnNames,
	lecturerIds
) {
	return new Promise(function (resolve, reject) {
		let fromStatement = `FROM ${tableName}`;
		if ('book_author' === tableName) {
			fromStatement = [
				fromStatement,
				'JOIN book ON book_author.book_id = book.id',
			].join(' ');
		} else if ('contact' === tableName) {
			fromStatement = [
				fromStatement,
				'LEFT JOIN contact_type ON contact.contact_type_id = contact_type.id',
			].join(' ');
		} else if ('current_discipline' === tableName) {
			fromStatement = [
				fromStatement,
				'LEFT JOIN department ON department.id = current_discipline.department_id',
				'LEFT JOIN discipline ON discipline.id = current_discipline.discipline_id',
				'LEFT JOIN university ON university.id = current_discipline.university_id',
			].join(' ');
		} else if ('degree' === tableName) {
			fromStatement = [
				fromStatement,
				'LEFT JOIN academic_title ON academic_title.id = degree.academic_title_id',
				'LEFT JOIN university ON university.id = degree.university_id',
			].join(' ');
		} else if ('work_position' === tableName) {
			fromStatement = [
				fromStatement,
				'LEFT JOIN university ON university.id = work_position.university_id',
			].join(' ');
		} else if ('activity' === tableName) {
			fromStatement = [
				fromStatement,
				'LEFT JOIN activity_type ON activity.activity_type_id = activity_type.id',
			].join(' ');
		}

		let query = null;

		if (tableName === 'academic_title') {
			query = [
				`SELECT DISTINCT`,
				columnNames.join(', '),
				`${fromStatement} JOIN lecturer_information ON lecturer_information.academic_title_id = academic_title.id`,
				`WHERE ${tableName}.is_deleted = false AND lecturer_information.id IN (?)`,
			].join(' ');
		} else if (tableName === 'academic_rank') {
			query = [
				`SELECT DISTINCT`,
				columnNames.join(', '),
				`${fromStatement} JOIN lecturer_information ON lecturer_information.academic_rank_id = academic_rank.id`,
				`WHERE ${tableName}.is_deleted = false AND lecturer_information.id IN (?)`,
			].join(' ');
		} else if (tableName === 'book_author') {
			query = [
				`SELECT DISTINCT`,
				columnNames.join(', '),
				fromStatement,
				`WHERE ${tableName}.is_deleted = false AND book.is_deleted = false AND lecturer_id IN (?)`,
			].join(' ');
		} else {
			query = [
				`SELECT DISTINCT`,
				columnNames.join(', '),
				fromStatement,
				`WHERE ${tableName}.is_deleted = false AND lecturer_id IN (?)`,
			].join(' ');
		}

		let data = null;
		connection.query(query, [lecturerIds], (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			data = results;
			resolve(data);
		});
	});
}

/**
 *  Query search Base Article
 * @param {Object {
 *
 *  searchByKeyword?: string
 *
 *  pagination?: {
 *      offset: number,
 *      limit: number,
 *  },
 *
 *  lecturerIds?: number[]
 * }} option query option
 *
 *
 *
 * @return {Promise}
 */
async function getBaseLecturers(option = null) {
	try {
		const selectStatement = `SELECT
        a.id as id,
        a.name as name,
        a.gender as gender,
				a.scopus_id as scopusId,
        a.avatar as avatar,
        a.bio as bio,
        a.date_of_birth as dateOfBirth,
        a.academic_rank_id as academicRankId,
        a.academic_rank_gain_year as academicRankGainYear,
        a.academic_title_id as academicTitleId,
        a.academic_title_gain_year as academicTitleGainYear,
        a.scopus_id as scopusId
      FROM lecturer_information as a
      WHERE a.is_deleted = false`;

		const bindingValues = [];
		let query = selectStatement;

		if (option !== null) {
			if (
				option.hasOwnProperty('searchByKeyword') &&
				option.searchByKeyword !== undefined
			) {
				query += ' AND a.name LIKE ?';
				bindingValues.push(`%${option.searchByKeyword}%`);
			}

			if (
				option.hasOwnProperty('lecturerIds') &&
				option.lecturerIds !== undefined
			) {
				query += ' AND id IN (?)';
				bindingValues.push(option.lecturerIds);
			}

			if (
				option.hasOwnProperty('recordOffset') &&
				_.isNumber(option.recordOffset) &&
				option.hasOwnProperty('limitSize') &&
				_.isNumber(option.limitSize)
			) {
				const { recordOffset, limitSize } = option;
				query += ' LIMIT ? OFFSET ?';
				bindingValues.push(limitSize, recordOffset);
			}

			if (
				option.hasOwnProperty('scopusIds') &&
				Array.isArray(option.scopusIds) &&
				option.scopusIds.length > 0
			) {
				query += ' AND a.scopus_id IN (?)';
				bindingValues.push(option.scopusIds);
			}
		}

		const results = await new Promise((resolve, reject) => {
			connection.query(query, bindingValues, (error, results, fields) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});

		const processedResults = await Promise.all(
			results.map(async (result) => {
				result.avatar = await convertBlobToBase64(result.avatar);
				return result;
			})
		);

		if (processedResults.length === 0) {
			throw new Error('Empty lecturer');
		}

		return processedResults;
	} catch (error) {
		throw error;
	}
}

/**
 *  Query search Base Article
 * @param {number} id
 * @return {Promise}
 */
function getOneLecturer(id) {
	return new Promise((resolve, reject) => {
		let query = [
			'SELECT',
			'a.id as id,',
			'a.scopus_id as scopusId,',
			'a.name as name,',
			'a.gender as gender,',
			'a.avatar as avatar,',
			'a.date_of_birth as dateOfBirth, ',
			'a.bio as bio,',
			'a.academic_rank_id as academicRankId, ',
			'a.academic_rank_gain_year as academicRankGainYear,',
			'a.academic_title_id as academicTitleId,',
			'a.academic_title_gain_year as academicTitleGainYear',
			'FROM lecturer_information as a',
			'WHERE a.is_deleted = false and a.id = ?',
		].join(' ');

		connection.query(query, id, (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			results.forEach((result) => {
				result.avatar = convertBinaryToBase64(result.avatar);
			});
			// if lecturer doesn't exist throw error
			if (!results.length) {
				reject(results);
			}
			resolve(results);
		});
	});
}

/**
 * Query to count the number of available lecturer
 * @return {Promise<Number>}
 *
 */
const getLecturerCount = queryHelper.buildPagingCountDao(
	'lecturer_information',
	'name'
);

/**
 *  Query get all lecturers
 *
 * @return {Promise}
 */
function getAllLecturers() {
	return new Promise((resolve, reject) => {
		let query = [
			'SELECT',
			'a.id as id,',
			'a.account_id as accountId,',
			'a.scopus_id as scopusId,',
			'a.name as name,',
			'a.gender as gender,',
			'a.avatar as avatar,',
			'a.date_of_birth as dateOfBirth, ',
			'a.bio as bio,',
			'a.academic_rank_id as academicRankId, ',
			'a.academic_rank_gain_year as academicRankGainYear,',
			'a.academic_title_id as academicTitleId,',
			'a.academic_title_gain_year as academicTitleGainYear',
			'FROM lecturer_information as a',
			'WHERE a.is_deleted = false',
		].join(' ');

		connection.query(query, (error, results) => {
			if (error) {
				reject(error);
				return;
			}

			results.forEach((result) => {
				result.avatar = convertBinaryToBase64(result.avatar);
			});
			resolve(results);
		});
	});
}

function getAccountScopusId(account) {
	return new Promise((resolve, reject) => {
		let query = [
			'SELECT',
			'a.id as id,',
			'a.name as name,',
			'a.scopus_id as scopusId,',
			'a.gender as gender,',
			'a.avatar as avatar,',
			'a.date_of_birth as dateOfBirth, ',
			'a.bio as bio,',
			'a.academic_rank_id as academicRankId, ',
			'a.academic_rank_gain_year as academicRankGainYear,',
			'a.academic_title_id as academicTitleId,',
			'a.academic_title_gain_year as academicTitleGainYear',
			'FROM lecturer_information as a',
			'WHERE a.is_deleted = false AND a.account_id = ?',
			'LIMIT 1',
		].join(' ');

		connection.query(query, account.id, (error, results) => {
			if (error) {
				reject(error);
				return;
			}
			results.forEach((result) => {
				result.avatar = convertBinaryToBase64(result.avatar);
			});
			resolve({ ...account, lecturerInfo: results[0] });
		});
	});
}

module.exports = {
	getDataOfSubtableJoningWithLecturerInformationByLecturerId,
	getBaseLecturers,
	getOneLecturer,
	getLecturerCount,
	getAllLecturers,
	getAccountScopusId,
};
