const updateLecturerDAO = require('../../daos/lecturerDAOS/updateLecturerDAO');
const createLecturerDAO = require('../../daos/lecturerDAOS/createLecturerDAO');
const deleteServiceDAO = require('../../daos/deleteServiceDAO');
const lecturerHelper = require('../../helpers/lecturerHelper');
const { getOneLecturer } = require('./searchLecturerServices');

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
 *
 * @param {Object} contactObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateContacts(contactObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!contactObject?.length) {
			return resolve(null);
		}

		const updateContactObject = contactObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);
		const deleteIds = contactObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			updateLecturerDAO
				.updateContacts(updateContactObject, lecturer)
				.then((updatePhdThesis) => {}),
			deleteServiceDAO
				.deleteRecordInTable('contact', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

/**
 *
 * @param {Object} projectObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateProjects(projectObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!projectObject?.length) {
			return resolve(null);
		}

		const updateProjectObject = projectObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createProjectObject = projectObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = projectObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createProjects(createProjectObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updateProjects(updateProjectObject, lecturer)
				.then((updatePhdThesis) => {}),
			deleteServiceDAO
				.deleteRecordInTable('project', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

/**
 *
 * @param {Object} currentDisciplineObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateCurrentDiscipline(currentDisciplineObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!currentDisciplineObject) {
			return resolve(null);
		}

		const nonexistentDiscipline = !currentDisciplineObject.disciplineId
			? [{ name: currentDisciplineObject.disciplineName }]
			: [];

		const nonexistentDepartment = !currentDisciplineObject.departmentId
			? [{ name: currentDisciplineObject.departmentName }]
			: [];

		const nonexistentUniversities = !currentDisciplineObject.universityId
			? [{ name: currentDisciplineObject.universityName }]
			: [];

		const promises = [];

		if (nonexistentDiscipline.length) {
			promises.push(createLecturerDAO.createDisciplines(nonexistentDiscipline));
		}

		if (nonexistentDepartment.length) {
			promises.push(createLecturerDAO.createDepartments(nonexistentDepartment));
		}

		if (nonexistentUniversities.length) {
			promises.push(
				createLecturerDAO.createUniversities(nonexistentUniversities)
			);
		}

		Promise.all(promises).then((newIdsWithNull) => {
			const newIds = newIdsWithNull.filter((ele) => {
				if (ele) {
					return ele;
				}
			});
			const newDisciplineIds = newIds.slice(0, nonexistentDiscipline.length);
			const newDepartmentIds = newIds.slice(
				nonexistentDiscipline.length,
				nonexistentDiscipline.length + nonexistentDepartment.length
			);
			const newUniversitiesIds = newIds.slice(
				nonexistentDiscipline.length + nonexistentDepartment.length,
				nonexistentDiscipline.length +
					nonexistentDepartment.length +
					nonexistentUniversities.length
			);

			const newCurrentDisciplineObject = {
				...currentDisciplineObject,
				disciplineId: newDisciplineIds.length
					? newDisciplineIds[0]
					: currentDisciplineObject.disciplineId,
				departmentId: newDepartmentIds.length
					? newDepartmentIds[0]
					: currentDisciplineObject.departmentId,
				universityId: newUniversitiesIds.length
					? newUniversitiesIds[0]
					: currentDisciplineObject.universityId,
			};

			updateLecturerDAO
				.updateCurrentDiscipline(newCurrentDisciplineObject, lecturer)
				.then((currentDisciplineId) => {
					return resolve(currentDisciplineId);
				})
				.catch((err) => console.log(err));
		});
	});
}

/**
 *
 * @param {Object} researchFieldObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateResearchFields(researchFieldObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!researchFieldObject?.length) {
			return resolve(null);
		}

		const updateResearchFieldObject = researchFieldObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createResearchFieldObject = researchFieldObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = researchFieldObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createResearchFields(createResearchFieldObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updateResearchFields(updateResearchFieldObject, lecturer)
				.then((ids) => {}),
			deleteServiceDAO
				.deleteRecordInTable('research_field', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

/**
 *
 * @param {Object} expertiseObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateExpertises(expertiseObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!expertiseObject?.length) {
			return resolve(null);
		}

		const updateExpertiseObject = expertiseObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createExpertiseObject = expertiseObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = expertiseObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createExpertises(createExpertiseObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updateExpertises(updateExpertiseObject, lecturer)
				.then((ids) => {}),
			deleteServiceDAO
				.deleteRecordInTable('expertise', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

/**
 *
 * @param {Object} degreeObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateDegrees(degreeObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!degreeObject?.length) {
			return resolve(null);
		}

		const updateDegreeObject = degreeObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createDegreeObject = degreeObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = degreeObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createDegrees(createDegreeObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updateDegrees(updateDegreeObject, lecturer)
				.then((ids) => {}),
			deleteServiceDAO
				.deleteRecordInTable('degree', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

/**
 *
 * @param {Object} workPositionObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateWorkPositions(workPositionObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!workPositionObject?.length) {
			return resolve(null);
		}

		const updateWorkPositionObject = workPositionObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createWorkPositionObject = workPositionObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = workPositionObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createWorkPositions(createWorkPositionObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updateWorkPositions(updateWorkPositionObject, lecturer)
				.then((ids) => {}),
			deleteServiceDAO
				.deleteRecordInTable('work_position', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

/**
 *
 * @param {Object} activityObject
 * @param {Object} lecturer
 * @return {Promise}
 *
 */
function updateActivities(activityObject, lecturer) {
	return new Promise((resolve, reject) => {
		if (!activityObject?.length) {
			return resolve(null);
		}

		const updateActivityObject = activityObject.filter(
			(obj) =>
				obj.hasOwnProperty('id') &&
				obj.hasOwnProperty('update') &&
				true === obj.update
		);

		const createActivityObject = activityObject.filter(
			(obj) => obj.hasOwnProperty('create') && true === obj.create
		);

		const deleteIds = activityObject
			.filter((obj) => obj.hasOwnProperty('delete') && true === obj.delete)
			.map((obj) => obj.id);

		return Promise.all([
			createLecturerDAO
				.createActivities(createActivityObject, lecturer)
				.then((ids) => {}),
			updateLecturerDAO
				.updateActivities(updateActivityObject, lecturer)
				.then((ids) => {}),
			deleteServiceDAO
				.deleteRecordInTable('activity', deleteIds)
				.then((deleteSize) => {}),
		]).then(() => {
			return resolve(true);
		});
	}).catch((error) => {
		console.log(error);
	});
}

function checkExistLecturer(lecturerObject) {
	return new Promise((resolve, reject) => {
		getOneLecturer(lecturerObject.id)
			.then((lecturer) => {
				if (!lecturer) {
					resolve(false);
				} else {
					resolve(true);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/**
 * update a lecturer
 * @param {Object} lecturerObject
 * @return {Promise}
 *
 */
function updateLecturer(lecturerObject) {
	return new Promise((resolve, reject) => {
		checkExistLecturer(lecturerObject)
			.then(() => {
				const builder = new lecturerHelper.LecturerBuilder();
				builder.reset();
				builder.setBulk(lecturerObject);
				const lecturer = builder.build();

				return updateLecturerDAO
					.updateLecturer(lecturer)
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
							updateContacts(lecturerObject.contacts, lecturer).catch(
								(error) => {
									console.log(error);
								}
							),
							updateProjects(lecturerObject.projects, lecturer).catch(
								(error) => {
									console.log(error);
								}
							),
							updateCurrentDiscipline(
								lecturerObject.currentDiscipline,
								lecturer
							).catch((error) => {
								console.log(error);
							}),
							updateResearchFields(
								lecturerObject.researchFields,
								lecturer
							).catch((err) => {
								console.log(err);
							}),
							updateExpertises(lecturerObject.expertises, lecturer).catch(
								(err) => {
									console.log(err);
								}
							),
							updateDegrees(lecturerObject.degrees, lecturer).catch((err) => {
								console.log(err);
							}),
							updateWorkPositions(lecturerObject.workPositions, lecturer).catch(
								(err) => {
									console.log(err);
								}
							),
							updateActivities(lecturerObject.activities, lecturer).catch(
								(err) => {
									console.log(err);
								}
							),
						]).then((data) => {
							return resolve(data);
						});
					})
					.catch((error) => {
						reject(error);
					});
			})
			.catch((err) => {
				reject(err);
			});
	});
}

async function updateProfile(id, file) {
	// try {
	// 	const pdfParser = new PDFParser();
	// 	pdfParser.on('pdfParser_dataError', (errData) =>
	// 		console.error(errData.parserError)
	// 	);
	// 	pdfParser.on('pdfParser_dataReady', (pdfData) => {
	// 		const text = pdfParser.getRawTextContent();
	// 		// Extract the desired values using regular expressions
	// 		const name = extractValue(text, /Họ và tên:\s*(.*)/i);
	// 		const dateOfBirth = extractValue(text, /Ngày sinh:\s*(.*)/i);
	// 		// Add more extraction patterns for other fields as needed
	// 		// Output the extracted values
	// 		console.log('Name:', name);
	// 		console.log('Date of Birth:', dateOfBirth);
	// 		// Output more fields as needed
	// 	});
	// 	const dataBuffer = file.data;
	// 	pdfParser.parseBuffer(dataBuffer);
	// 	// Output more fields as needed
	// } catch (error) {
	// 	console.log('Error:', error);
	// }
}

/**
 * 
 * @param {Number[]} accountIds 
 */
async function deactiveLecturerByAccountIds(accountIds) {

	const options = {
		accountIds,
	}

	return new Promise((resolve, reject) => {
		updateLecturerDAO.deactiveLecturer(options)
			.then((isSuccess) => {
				resolve(isSuccess);
			})
			.catch((err) => {
				reject(err);
			});
	});
}


module.exports = {
	updateLecturer,
	updateProfile,
	deactiveLecturerByAccountIds,
};
