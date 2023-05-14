// @ts-nocheck
const connection = require('../../configs/database');
const queryHelper= require('../../helpers/queryHelper');
const _ = require('lodash');

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
		} else if ('current_discipline cd' === tableName) {
			fromStatement = [
				fromStatement,
				'LEFT JOIN department ON department.id = cd.department_id',
				'LEFT JOIN discipline ON discipline.id = cd.discipline_id',
				'LEFT JOIN university ON university.id = cd.university_id',
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

		if (tableName !== 'academic_title' && tableName !== 'academic_rank') {
			query = [
				`SELECT`,
				columnNames.join(', '),
				fromStatement,
				`WHERE ${tableName}.is_deleted = false AND lecturer_id IN (?)`,
			].join(' ');
		} else if (tableName === 'academic_title') {
			query = [
				`SELECT`,
				columnNames.join(', '),
				`${fromStatement} JOIN lecturer_information ON lecturer_information.academic_title_id = academic_title.id`,
				`WHERE ${tableName}.is_deleted = false AND lecturer_information.id IN (?)`,
			].join(' ');
		} else if (tableName === 'academic_rank') {
			query = [
				`SELECT`,
				columnNames.join(', '),
				`${fromStatement} JOIN lecturer_information ON lecturer_information.academic_rank_id = academic_rank.id`,
				`WHERE ${tableName}.is_deleted = false AND lecturer_information.id IN (?)`,
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
function getBaseLecturers(option = null) {
	return new Promise((resolve, reject) => {
		let selectStatement = [
			'SELECT',
			'a.id as id,',
			'a.name as name,',
			'a.gender as gender,',
			'a.avatar as avatar,',
			'a.date_of_birth as dateOfBirth, ',
			'a.academic_rank_id as academicRankId, ',
			'a.academic_rank_gain_year as academicRankGainYear,',
			'a.academic_title_id as academicTitleId,',
			'a.academic_title_gain_year as academicTitleGainYear',
		].join(' ');
		let fromStatement = 'FROM lecturer_information as a';
		let whereStatement = 'WHERE a.is_deleted = false';
		let paginationStatement = '';
		let bindingValues = [];

		if (null !== option) {
			//Check if there is a keyword to search the article
			if (
				option.hasOwnProperty('searchByKeyword') &&
				undefined !== option.searchByKeyword
			) {
				whereStatement = `${whereStatement} AND a.name LIKE ?`;
				keyword = option.searchByKeyword;
				bindingValues.push(`%${keyword}%`);
			}

			//Check if there is search article with given lecturer ids
			if (
				option.hasOwnProperty('lecturerIds') &&
				undefined !== option.lecturerIds
			) {
				whereStatement = `${whereStatement} AND id IN ?`;
				const lecturerIds = option.lecturerIds;
				bindingValues.push(lecturerIds);
			}

			//Check if there is pagination option

			if (
				option.hasOwnProperty('recordOffset') &&
				_.isNumber(option.recordOffset) &&
				option.hasOwnProperty('limitSize') &&
				_.isNumber(option.limitSize)
			) {
				const { recordOffset, limitSize } = option;

				bindingValues.push(limitSize, recordOffset);

				numberOfRecordStatement = 'LIMIT ? OFFSET ?';
			}
		}

		const query = [
			selectStatement,
			fromStatement,
			whereStatement,
			`ORDER BY a.id ASC`,
			numberOfRecordStatement,
		].join(' ');

		connection.query(query, bindingValues, (error, results, fields) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(results);
		});
	});
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
			resolve(results);
		});
	});
}

/**
 * Query to count the number of available lecturer
 * @return {Promise<Number>}
 */
 const getLecturerCount = queryHelper.buildPagingCountDao("lecturer_information", "name");

module.exports = {
	getDataOfSubtableJoningWithLecturerInformationByLecturerId,
	getBaseLecturers,
	getOneLecturer,
	getLecturerCount,
};
