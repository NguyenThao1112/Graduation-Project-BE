const { getCurrentTimeFormat } = require('../../helpers/timeHelper');
const connection = require('../../configs/database');
const _ = require('lodash');
/**
 *  Query to create an article
 *
 * @param {Object} phdThesises
 * @return {Promise}
 */
function updatePhdThesises(phdThesises, lecturer) {
	return new Promise(function (resolve, reject) {
		if (_.size(phdThesises) == 0) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO phd_thesis (`,
			`id, lecturer_id,project_name,phd_name,graduation_year,`,
			`education_level,note,created_at,updated_at,is_deleted )`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`project_name = VALUES(project_name),`,
			`phd_name = VALUES(phd_name),`,
			`graduation_year = VALUES(graduation_year),`,
			`education_level = VALUES(education_level),`,
			`note = VALUES(note),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = phdThesises.map((ele) => [
			ele.id,
			lecturer.id,
			ele.projectName,
			ele.phdName,
			ele.graduationYear,
			ele.educationLevel,
			ele.note,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(result);
		});
	});
}

/**
 *  Query to create books
 *
 * @param {Object} books
 * @return {Promise}
 */
function updateBooks(books) {
	return new Promise(function (resolve, reject) {
		if (_.size(books) == 0) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO book (`,
			`id, name,project_id,publisher_name,public_year,
		co_authors,pseudonym,created_at,updated_at,is_deleted)
		`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`name = VALUES(name)`,
			`project_id = VALUES(project_id)`,
			`publisher_name = VALUES(publisher_name)`,
			`public_year = VALUES(public_year)`,
			`co_authors = VALUES(co_authors)`,
			`pseudonym = VALUES(pseudonym)`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;

		const values = books.map((ele) => [
			ele.id,
			ele.name,
			ele.projectId,
			ele.publisherName,
			ele.publicYear,
			ele.coAuthors,
			ele.pseudonym,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(result);
		});
	});
}

/**
 *  Query to update contacts
 *
 * @param {Object} contacts
 * @return {Promise}
 */
function updateContacts(contacts, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO contact (`,
			`id, lecturer_id,contact_type_id,value,created_at,updated_at,is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`contact_type_id = VALUES(contact_type_id)`,
			`value = VALUES(value)`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = contacts.map((ele) => [
			ele.id,
			lecturer.id,
			ele.contactTypeId,
			ele.value,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(result);
		});
	});
}

/**
 *  Query to update projects
 *
 * @param {Object} projects
 * @return {Promise}
 */
function updateProjects(projects, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO project (`,
			`id, lecturer_id,name,project_code,from_date,to_date,expenditure, project_role,acceptance_date,result,organization,note,reference)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`contact_type_id = VALUES(contact_type_id)`,
			`value = VALUES(value)`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = contacts.map((ele) => [
			ele.id,
			lecturer.id,
			ele.contactTypeId,
			ele.value,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(result);
		});
	});
}

/**
 *  Query to create an article
 *
 * @param {Object} lecturer
 * @return {Promise}
 */
function updateLecturer(lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`UPDATE lecturer_information`,
			`SET`,
			`name = ?, gender = ?, avatar = ?,date_of_birth = ?,academic_rank_id = ?, academic_rank_gain_year = ?,academic_title_id = ?, academic_title_gain_year = ?, expand_column = ?,`,
			`updated_at = ?`,
			`WHERE id = ?`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const values = [
			lecturer.name,
			lecturer.gender,
			lecturer.avatar,
			lecturer.dateOfBirth,
			lecturer.academicRankId,
			lecturer.academicRankGainYear,
			lecturer.academicTitleId,
			lecturer.academicTitleGainYear,
			lecturer.expandColumn,
			now,
			lecturer.id,
		];

		connection.query(query, [...values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(lecturer);
		});
	});
}

module.exports = {
	updatePhdThesises,
	updateBooks,
	updateLecturer,
};
