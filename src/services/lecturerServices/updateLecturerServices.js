const updateLecturerDAO = require('../../daos/lecturerDAOS/updateLecturerDAO');
const createLecturerDAO = require('../../daos/lecturerDAOS/createLecturerDAO');
const deleteServiceDAO = require('../../daos/deleteServiceDAO');
const lecturerHelper = require('../../helpers/lecturerHelper');

/**
 *
 * @param {Object} phdThesisObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updatePhdThesis(phdThesisObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!phdThesisObject?.length) {
			resolve(null);
			return;
		}

		const updatePhdThesisObject = phdThesisObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createPhdThesisObject = phdThesisObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = phdThesisObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createPhdThesises(createPhdThesisObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updatePhdThesises(updatePhdThesisObject, lecturer)
				.then((updatePhdThesis) => {}),
			deleteServiceDAO
				.deleteRecordInTable('phd_thesis', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			resolve(true);
			return Promise.resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

// /**
//  *
//  * @param {Object} book
//  * @param {Object} lecturer
//  * @return {Promise}
//  *
//  */
// function updateBook(book, lecturer) {
// 	return new Promise((resolve, reject) => {
// 		if (!book?.length) {
// 			resolve(null);
// 			return;
// 		}

// 		const updateBookObject = book.filter(
// 			(obj) =>
// 				obj.hasOwnProperty('id') &&
// 				obj.hasOwnProperty('update') &&
// 				true === obj.update
// 		);

// 		const createBookObject = book.filter(
// 			(obj) => obj.hasOwnProperty('create') && true === obj.create
// 		);

// 		const deleteIds = book
// 			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
// 			.map((obj) => obj.id);

// 		return Promise.all([
// 			createLecturerDAO
// 				.createPhdThesises(createPhdThesisObject, lecturer)
// 				.then((ids) => {}),
// 			updateLecturerDAO
// 				.updatePhdThesises(updatePhdThesisObject, lecturer)
// 				.then((updatePhdThesis) => {}),
// 			deleteServiceDAO
// 				.deleteRecordInTable('phd_thesis', deleteIds)
// 				.then((deleteSize) => {}),
// 		]).then(() => {
// 			resolve(true);
// 			return Promise.resolve(true);
// 		});
// 	}).catch((error) => {
// 		console.log(error);
// 	});
// }

/**
 * update a lecturer
 * @param {Object} lecturerObject
 * @return {Promise}
 *
 */
function updateLecturer(lecturerObject) {
	const builder = new lecturerHelper.LecturerBuilder();
	builder.reset();
	builder.setBulk(lecturerObject);
	const lecturer = builder.build();

	return updateLecturerDAO
		.updateLecturer(lecturer)
		.catch((error) => {
			console.log(error);
		})
		.then((lecturer) => {
			return Promise.all([
				updatePhdThesis(lecturerObject.phdThesises, lecturer).catch((error) => {
					console.log(error);
				}),
			]).then((data) => {
				return Promise.resolve(true);
			});
		});
}

module.exports = {
	updatePhdThesis,
	updateLecturer,
};
