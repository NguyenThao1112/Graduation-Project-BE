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
function updatePhdThesises(phdThesisObject, lecturer) {
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

/**
 *
 * @param {Object} bookObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateBooks(bookObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!bookObject?.length) {
			return resolve(null);
		}

		const updateBookObject = bookObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createBookObject = bookObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = bookObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO.createBooks(createBookObject).then((bookIds) => {
				createLecturerDAO
					.createBookAuthors(bookIds, lecturer)
					.then((ids) => resolve(ids))
					.catch((err) => console.log(err));
			}),
			updateLecturerDAO
				.updateBooks(updateBookObject)
				.then((updatePhdThesis) => {}),
			deleteServiceDAO
				.deleteRecordInTable('book', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			resolve(true);
			return Promise.resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

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
				updatePhdThesises(lecturerObject.phdThesises, lecturer).catch(
					(error) => {
						console.log(error);
					}
				),
				updateBooks(lecturerObject.books, lecturer).catch((error) => {
					console.log(error);
				}),
			]).then((data) => {
				return Promise.resolve(true);
			});
		});
}

module.exports = {
	updatePhdThesises,
	updateLecturer,
};
