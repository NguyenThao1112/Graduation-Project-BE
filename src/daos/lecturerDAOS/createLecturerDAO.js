const { getCurrentTimeFormat } = require('../../helpers/timeHelper');
const connection = require('../../configs/database');

/**
 *
 * @param {Array<Object>} phdThesises
 * @returns {Promise}
 */
function createPhdThesises(phdThesises, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO phd_thesis (`,
			`lecturer_id,`,
			`project_name,`,
			`phd_name,`,
			`graduation_year,`,
			`education_level,`,
			`note,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			'VALUES ?',
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = phdThesises.map((ele) => [
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

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createBookAuthors(bookAuthors, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO book_author(`,
			`lecturer_id,`,
			`book_id,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = bookAuthors.map((ele) => [
			lecturer.id,
			ele,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createContacts(contact) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO contact(`,
			`lecturer_id,`,
			`contact_type_id,`,
			`value,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted )`,
			`VALUES ?`,
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = contact.map((ele) => {
			ele.lecturer.id, ele.contactTypeId, ele.value, now, now, is_deleted;
		});

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createProjects(project) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO project (`,
			`lecturer_id,`,
			`project_code,`,
			`from_date,`,
			`to_date,`,
			`expenditure,`,
			`project_role,`,
			`acceptance_date,`,
			`result,`,
			`organization,`,
			`note,`,
			`reference,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = project.map((ele) => [
			ele.lecturer.id,
			ele.projectCode,
			ele.fromDate,
			ele.toDate,
			ele.expenditure,
			ele.project_role,
			ele.acceptance_date,
			ele.result,
			ele.organization,
			ele.note,
			ele.reference,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createCurrentDiscipline(currentDiscipline) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO current_discipline(`,
			`lecturer_id,`,
			`discipline_id,`,
			`department_id,`,
			`university_id,`,
			`position,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted,`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = [
			currentDiscipline.lecturer.id,
			currentDiscipline.discipline.id,
			currentDiscipline.department.id,
			currentDiscipline.toDate,
			currentDiscipline.expenditure,
			currentDiscipline.project_role,
			currentDiscipline.acceptance_date,
			currentDiscipline.result,
			currentDiscipline.organization,
			currentDiscipline.note,
			currentDiscipline.reference,
			now,
			now,
			is_deleted,
		];

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const id = result.insertId;

			resolve(id);
		});
	});
}

function createExpertises(expertise) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO expertise(`,
			`lecturer_id,`,
			`title,`,
			`specialization,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted,`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = expertise.map((ele) => [
			expertise.lecturer.id,
			expertise.title,
			expertise.specialization,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createResearchFields(researchField) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO research_field(`,
			`lecturer_id,`,
			`research_name,`,
			`note,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = researchField.map((ele) => [
			ele.lecturer.id,
			ele.researchName,
			ele.note,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createDegrees(degree) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO research_field(`,
			`lecturer_id,`,
			`discipline_id,`,
			`academic_title_id,`,
			`university_id,`,
			`graduation_thesis_name,`,
			`graduation_date,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = degree.map((ele) => [
			ele.lecturer.id,
			ele.discipline.id,
			ele.academicTitle.id,
			ele.university.id,
			ele.graduationThesisName,
			ele.graduationDate,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createWorkPositions(workPosition) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO work_position(`,
			`lecturer_id,`,
			`university_id,`,
			`company,`,
			`position,`,
			`is_now,`,
			`from_date,`,
			`to_date,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = workPosition.map((ele) => [
			ele.lecturer.id,
			ele.university.id,
			ele.company,
			ele.position,
			ele.isNow,
			ele.fromDate,
			ele.toDate,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createActivitys(activity) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO activity(`,
			`activity_type_id,`,
			`name,`,
			`content,`,
			`from_date,`,
			`to_date,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = activity.map((ele) => [
			ele.lecturer.id,
			ele.activityType.id,
			ele.name,
			ele.content,
			ele.fromDate,
			ele.toDate,
			now,
			now,
			is_deleted,
		]);

		connection.query(query, [values], (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

function createLecturer(lecturer) {
	return new Promise(function (resolve, reject) {
		const query =
			'INSERT INTO lecturer_information ( account_id, name, gender, avatar, date_of_birth, academic_rank_id, academic_rank_gain_year, academic_title_id, academic_title_gain_year, expand_column, created_at, updated_at, is_deleted) VALUES (?)';

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = [
			lecturer.accountId,
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
			now,
			is_deleted,
		];
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			let id = result.insertId;
			resolve(id);
		});
	});
}

module.exports = {
	createPhdThesises,
	createBookAuthors,
	createContacts,
	createProjects,
	createCurrentDiscipline,
	createExpertises,
	createResearchFields,
	createDegrees,
	createWorkPositions,
	createActivitys,
	createLecturer,
};
