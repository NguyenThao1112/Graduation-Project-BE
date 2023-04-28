const { getCurrentTimeFormat } = require('../../helpers/timeHelper');
const connection = require('../../configs/database');
const moment = require('moment');

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

function createContacts(contacts, lecturer) {
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
		const values = contacts.map((ele) => [
			lecturer.id,
			ele.contactTypeId,
			ele.value,
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

function createProjects(project, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO project (`,
			`lecturer_id,`,
			`name,`,
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
		const values = project.map((ele) => {
			const acceptanceDate = ele.acceptanceDate
				? moment(ele.acceptanceDate, 'DD/MM/YYYY').format('YYYY/MM/DD')
				: null;
			return [
				lecturer.id,
				ele.name,
				ele.projectCode,
				ele.fromDate,
				ele.toDate,
				ele.expenditure,
				ele.projectRole,
				acceptanceDate,
				ele.result,
				ele.organization,
				ele.note,
				ele.reference,
				now,
				now,
				is_deleted,
			];
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

function createCurrentDisciplines(currentDisciplines, lecturer) {
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
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = currentDisciplines.map((ele) => [
			lecturer.id,
			ele.disciplineId,
			ele.departmentId,
			ele.universityId,
			ele.position,
			now,
			now,
			is_deleted,
		]);

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

function createExpertises(expertises, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO expertise(`,
			`lecturer_id,`,
			`title,`,
			`specialization,`,
			`created_at,`,
			`updated_at,`,
			`is_deleted`,
			`)`,
			`VALUES ?`,
		].join(' ');
		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = expertises.map((ele) => [
			lecturer.id,
			ele.title,
			ele.specialization,
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

function createResearchFields(researchFields, lecturer) {
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
		const values = researchFields.map((ele) => [
			lecturer.id,
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

function createDegrees(degrees, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO degree (`,
			`lecturer_id,`,
			`academic_title_id,`,
			`university_id,`,
			`specialization,`,
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
		const values = degrees.map((ele) => [
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

function createWorkPositions(workPositions, lecturer) {
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
		const values = workPositions.map((ele) => [
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

function createActivities(activities, lecturer) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO activity(`,
			`lecturer_id,`,
			`activity_type_id,`,
			`name,`,
			`note,`,
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
		const values = activities.map((ele) => [
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

function createBooks(books) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO book (name,project_id,publisher_name,public_year,co_authors,pseudonym,created_at, updated_at, is_deleted)`,
			'VALUES ?',
		].join(' ');

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = books.map((book) => [
			book.name,
			book.projectId,
			book.publisherName,
			book.publicYear,
			book.coAuthors,
			book.pseudonym,
			now,
			now,
			is_deleted,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created contact types
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
function createDisciplines(disciplines) {
	return new Promise(function (resolve, reject) {
		const query = `INSERT INTO discipline (name, created_at, updated_at, is_deleted) VALUES ?`;

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = disciplines.map((discipline) => [
			discipline.name,
			now,
			now,
			is_deleted,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created contact types
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

function createDepartments(departments) {
	return new Promise(function (resolve, reject) {
		const query = `INSERT INTO department (name, created_at, updated_at, is_deleted) VALUES ?`;

		const now = getCurrentTimeFormat();
		const is_deleted = false;
		const values = departments.map((department) => [
			department.name,
			now,
			now,
			is_deleted,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created contact types
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

module.exports = {
	createPhdThesises,
	createBookAuthors,
	createContacts,
	createProjects,
	createCurrentDisciplines,
	createExpertises,
	createResearchFields,
	createDegrees,
	createWorkPositions,
	createActivities,
	createLecturer,
	createBooks,
	createDisciplines,
	createDepartments,
};