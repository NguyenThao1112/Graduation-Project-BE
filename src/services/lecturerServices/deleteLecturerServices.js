const searchLecturerDAO = require('../../daos/lecturerDAOS/searchLecturerDAO.js');
const deleteServiceDAO = require('../../daos/deleteServiceDAO');
const { isEmpty } = require('lodash');
/**
 * Delete the table's data, which join with the lecturer table
 * @param {string} tableName
 * @param {Array<Number>} lecturerIds
 * @return {Promise}
 */
function deleteDataInTableWhichJoinLecturerTable(tableName, lecturerIds) {
	return new Promise((resolve, reject) => {
		if (!lecturerIds?.length) {
			resolve(null);
			return;
		}

		const selectColumns = [`${tableName}.id`];
		return searchLecturerDAO
			.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
				tableName,
				selectColumns,
				lecturerIds
			)
			.then((queryResult) => {
				if (!queryResult.length) {
					resolve(null);
					return;
				}
				const deleteIds = queryResult.map((resultData) => resultData.id);
				return deleteServiceDAO
					.deleteRecordInTable(tableName, deleteIds)
					.catch((err) => {
						console.error(err);
						console.error(err);
					})
					.then((deleteSize) => {
						console.log(`Delete ${deleteSize} record in ${tableName} table`);
						resolve(true);
					});
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}

/**
 * delete multiple lecturers
 * @param {Array<number>} lecturerIds
 * @return {Promise}
 *
 */
function deleteLecturers(lecturerIds) {
	const lecturerTableName = 'lecturer_information';
	const tableJoiningWithLecturerTableNames = [
		'phd_thesis',
		'book_author',
		'contact',
		'project',
		'current_discipline',
		'expertise',
		'research_field',
		'degree',
		'work_position',
		'activity',
	];

	return Promise.all([
		...tableJoiningWithLecturerTableNames.map((tableName) =>
			deleteDataInTableWhichJoinLecturerTable(tableName, lecturerIds).catch(
				(error) => {
					console.log(error);
				}
			)
		),
		deleteServiceDAO.deleteRecordInTable(lecturerTableName, lecturerIds),
	]).then((data) => {
		return true;
	});
}

/**
 * delete multiple lecturers
 *
 * @return {Promise}
 *
 */
function deleteLecturerFile(fileId, lecturerId) {
	return new Promise((resolve, reject) => {
		if (!fileId || !lecturerId) {
			reject(null);
			return;
		}
		deleteServiceDAO
			.deleteFile(fileId, lecturerId)
			.catch((err) => {
				console.log(err);
			})
			.then((data) => {
				resolve(true);
			});
	});
}

module.exports = {
	deleteLecturers,
	deleteLecturerFile,
};
