const {
	getCurrentTimeFormat,
	convertFormatDate,
} = require('../../helpers/timeHelper');
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
			`id, name,project_id,publisher_name,public_year,co_authors,pseudonym,created_at,updated_at,is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`name = VALUES(name),`,
			`project_id = VALUES(project_id),`,
			`publisher_name = VALUES(publisher_name),`,
			`public_year = VALUES(public_year),`,
			`co_authors = VALUES(co_authors),`,
			`pseudonym = VALUES(pseudonym),`,
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
		if (!contacts.length) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO contact (`,
			`id, lecturer_id,value,created_at,updated_at,is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`value = VALUES(value),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = contacts.map((ele) => [
			ele.id,
			lecturer.id,
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
		if (!projects.length) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO project (`,
			`id, lecturer_id,name,project_code,from_date,to_date,expenditure, project_role,acceptance_date,result,organization,note,reference, created_at,updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`name = VALUES(name),`,
			`project_code = VALUES(project_code),`,
			`from_date = VALUES(from_date),`,
			`to_date = VALUES(to_date),`,
			`expenditure = VALUES(expenditure),`,
			`project_role = VALUES(project_role),`,
			`acceptance_date = VALUES(acceptance_date),`,
			`result = VALUES(result),`,
			`organization = VALUES(organization),`,
			`note = VALUES(note),`,
			`reference = VALUES(reference),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = projects.map((ele) => {
			return [
				ele.id,
				lecturer.id,
				ele.name,
				ele.projectCode,
				ele.fromDate,
				ele.toDate,
				ele.expenditure,
				ele.projectRole,
				convertFormatDate(ele.acceptanceDate),
				ele.result,
				ele.organization,
				ele.note,
				ele.reference,
				now,
				now,
				is_deleted,
			];
		});

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
 *  Query to update currrent discipline
 *
 * @param {Object} currentDisciplines
 * @return {Promise}
 */
function updateCurrentDiscipline(currentDisciplines, lecturer) {
	return new Promise(function (resolve, reject) {
		if (!currentDisciplines.length) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO current_discipline (`,
			`id,lecturer_id,discipline_id,department_id,university_id,position, created_at,updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`discipline_id = VALUES(discipline_id),`,
			`department_id = VALUES(department_id),`,
			`university_id = VALUES(university_id),`,
			`position = VALUES(position),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = currentDisciplines.map((ele) => [
			ele.id,
			lecturer.id,
			ele.disciplineId,
			ele.departmentId,
			ele.universityId,
			ele.position,
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
 *  Query to update researchFields
 *
 * @param {Object} researchFields
 * @return {Promise}
 */
function updateResearchFields(researchFields, lecturer) {
	return new Promise(function (resolve, reject) {
		if (!researchFields.length) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO research_field (`,
			`id, lecturer_id,research_name,note, created_at,updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`research_name = VALUES(research_name),`,
			`note = VALUES(note),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = researchFields.map((ele) => [
			ele.id,
			lecturer.id,
			ele.researchName,
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
 *  Query to update expertises
 *
 * @param {Object} expertises
 * @return {Promise}
 */
function updateExpertises(expertises, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO expertise (`,
			`id, lecturer_id,title,specialization, created_at,updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`title = VALUES(title),`,
			`specialization = VALUES(specialization),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = expertises.map((ele) => [
			ele.id,
			lecturer.id,
			ele.title,
			ele.specialization,
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
 *  Query to update degrees
 *
 * @param {Object} degrees
 * @return {Promise}
 */
function updateDegrees(degrees, lecturer) {
	return new Promise(function (resolve, reject) {
		if (!degrees.length) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO degree (`,
			`id, lecturer_id,academic_title_id,university_id, specialization,graduation_thesis_name, graduation_date, created_at, updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`academic_title_id = VALUES(academic_title_id),`,
			`university_id = VALUES(university_id),`,
			`specialization = VALUES(specialization),`,
			`graduation_thesis_name = VALUES(graduation_thesis_name),`,
			`graduation_date = VALUES(graduation_date),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = degrees.map((ele) => [
			ele.id,
			lecturer.id,
			ele.academicTitleId,
			ele.universityId,
			ele.specialization,
			ele.graduationThesisName,
			ele.graduationDate,
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
 *  Query to update workPositions
 *
 * @param {Object} workPositions
 * @return {Promise}
 */
function updateWorkPositions(workPositions, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO work_position (`,
			`id, lecturer_id,university_id,company, position,is_now, from_date, to_date, created_at, updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`university_id = VALUES(university_id),`,
			`company = VALUES(company),`,
			`position = VALUES(position),`,
			`is_now = VALUES(is_now),`,
			`from_date = VALUES(from_date),`,
			`to_date = VALUES(to_date),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = workPositions.map((ele) => [
			ele.id,
			lecturer.id,
			ele.universityId,
			ele.company,
			ele.position,
			ele.isNow,
			ele.fromDate,
			ele.toDate,
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
 *  Query to update activities
 *
 * @param {Object} activities
 * @return {Promise}
 */
function updateActivities(activities, lecturer) {
	return new Promise(function (resolve, reject) {
		if (!activities.length) {
			return resolve(null);
		}
		const query = [
			`INSERT INTO activity (`,
			`id, lecturer_id,activity_type_id,name, note,is_now, from_date, to_date, created_at, updated_at, is_deleted)`,
			`VALUES ?`,
			`ON DUPLICATE KEY UPDATE`,
			`activity_type_id = VALUES(activity_type_id),`,
			`name = VALUES(name),`,
			`note = VALUES(note),`,
			`is_now = VALUES(is_now),`,
			`from_date = VALUES(from_date),`,
			`to_date = VALUES(to_date),`,
			`updated_at = VALUES(updated_at)`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = activities.map((ele) => [
			ele.id,
			lecturer.id,
			ele.activityTypeId,
			ele.name,
			ele.note,
			ele.isNow,
			ele.fromDate,
			ele.toDate,
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
		if (!lecturer) {
			return resolve(null);
		}
		const query = [
			`UPDATE lecturer_information`,
			`SET`,
			`name = ?, gender = ?, avatar = ?,date_of_birth = ?,bio = ?,academic_rank_id = ?, academic_rank_gain_year = ?,academic_title_id = ?, academic_title_gain_year = ?, expand_column = ?,`,
			`updated_at = ?`,
			`WHERE id = ?`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const values = [
			lecturer.name,
			lecturer.gender,
			lecturer.avatar,
			lecturer.dateOfBirth,
			lecturer.bio,
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
	updateProjects,
	updateContacts,
	updateCurrentDiscipline,
	updateResearchFields,
	updateExpertises,
	updateDegrees,
	updateWorkPositions,
	updateActivities,
};
