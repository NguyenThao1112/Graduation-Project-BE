const urlConstants = require('../constants/urlConstants');
const createLecturerDAO = require('../daos/lecturerDAOS/createLecturerDAO');
const configurationDAO = require('../daos/configurationDAO');

const lecturerHelper = require('../helpers/lecturerHelper');
/**
 * Get all the lecturers, with only usable column in the lecturer's base table (without join any table)
 * @return {Promise}
 *
 */
// function getAllLecturersWithBasicInformation() {
// 	const resourcePath = urlConstants.LECTURER_RESOURCE_LECTURER_AVATAR;

// 	return new Promise((resolve, reject) => {
// 		creat
// 			.getAllLecturersWithBasicInformation()
// 			.then((lecturers) => {
// 				//Add the full url for lecturer's avatar image
// 				lecturers.forEach(function (lecturer, index) {
// 					//Change the avatarFileName to the full path of resources url
// 					const avatarFileName = lecturer[index].avatar;
// 					this[index].avatar = `${resourcePath}/${avatarFileName}`;
// 				}, lecturers);

// 				resolve(lecturers);
// 			})
// 			.catch((error) => {
// 				reject(error);
// 			});
// 	});
// }

// /**
//  * Get all lecturers with pagination
//  *
//  * @param {number} pageOffset which page, in 1-offset-indexing
//  * @param {number} limitSize maximum number of record in a page
//  *
//  * @return {Promise}
//  *
//  */
// function getAllLecturersWithPagination(pageOffset, limitSize) {
// 	const recordOffset = (pageOffset - 1) * limitSize;

// 	return new Promise((resolve, reject) => {
// 		lecturerDAO
// 			.getAllLecturersWithPagination(recordOffset, limitSize)
// 			.then((lecturer) => {
// 				resolve(lecturer);
// 			})
// 			.catch((error) => {
// 				reject(error);
// 			});
// 	});
// }

function createPhdThesis(phdThesises, lecturer) {
	return new Promise((resolve, reject) => {
		if (!phdThesises) {
			resolve(null);
			return null;
		}

		return createLecturerDAO
			.createPhdThesises(phdThesises, lecturer)
			.then((ids) => resolve(ids))
			.catch((err) => console.log(err));
	});
}

function createBooks(books, lecturer) {
	return new Promise((resolve, reject) => {
		if (!books) {
			resolve(null);
			return null;
		}

		const unexistedBooks = books
			.filter((ele) => !ele.hasOwnProperty('book_id'))
			.map((ele) => {
				const book = {
					name: ele.name ?? null,
					projectId: ele.projectId ?? null,
					publisherName: ele.publisherName ?? null,
					coAuthors: ele.coAuthors ?? null,
					pseudonym: ele.pseudonym ?? null,
					publicYear: ele.publicYear ?? null,
				};
				return book;
			});

		return createLecturerDAO
			.createBooks(unexistedBooks)
			.catch((err) => console.log(err))
			.then((bookIds) => {
				const existBookIds = books
					.filter((ele) => ele.hasOwnProperty('book_id'))
					.map((book) => book.book_id);

				const bookAuthors = bookIds
					? bookIds.concat(existBookIds)
					: existBookIds;

				return createLecturerDAO
					.createBookAuthors(bookAuthors, lecturer)
					.then((ids) => resolve(ids))
					.catch((err) => console.log(err));
			});
	});
}

function createContacts(contacts, lecturer) {
	return new Promise((resolve, reject) => {
		if (!contacts) {
			resolve(null);
			return null;
		}

		return createLecturerDAO
			.createContacts(contacts, lecturer)
			.then((ids) => resolve(ids))
			.catch((err) => console.log(err));
	});
}

// de tai, du an
function createProjects(projects, lecturer) {
	return new Promise((resolve, reject) => {
		if (!projects) {
			resolve(null);
			return null;
		}

		return createLecturerDAO
			.createProjects(projects, lecturer)
			.then((ids) => resolve(ids))
			.catch((err) => console.log(err));
	});
}

// noi dang cong tac
function createCurrentDiscipline(currentDiscipline, lecturer) {
	return new Promise((resolve, reject) => {
		if (!currentDiscipline) {
			resolve(null);
			return null;
		}

		const nonexistentDiscipline = !currentDiscipline.disciplineId
			? [{ name: currentDiscipline.disciplineName }]
			: [];

		const nonexistentDepartment = !currentDiscipline.departmentId
			? [{ name: currentDiscipline.departmentName }]
			: [];

		const nonexistentUniversity = !currentDiscipline.universityId
			? [{ name: currentDiscipline.universityName }]
			: [];

		const promises = [];

		promises.push(
			...nonexistentDiscipline.map((ele) => {
				return createLecturerDAO.createDisciplines(ele);
			})
		);

		promises.push(
			...nonexistentDepartment.map((ele) => {
				return createLecturerDAO.createDepartments(nonexistentDepartment);
			})
		);

		promises.push(
			...nonexistentUniversity.map((ele) => {
				return configurationDAO.createUniversities(nonexistentUniversity);
			})
		);

		Promise.all(promises)
			.then((newIds) => {
				// Retrieve the new IDs from the resolved values
				const newDisciplineIds = newIds.slice(0, nonexistentDiscipline.length);
				const newDepartmentIds = newIds.slice(
					nonexistentDiscipline.length,
					nonexistentDiscipline.length + nonexistentDepartment.length
				);
				const newUniversityIds = newIds.slice(
					nonexistentDiscipline.length + nonexistentDepartment.length,
					newIds.length
				);

				const newCurrentDiscipline = {
					...currentDiscipline,
					disciplineId: newDisciplineIds.length
						? newDisciplineIds[0]
						: currentDiscipline.disciplineId,
					departmentId: newDepartmentIds.length
						? newDepartmentIds[0]
						: currentDiscipline.departmentId,
					universityId: newUniversityIds.length
						? newUniversityIds[0]
						: currentDiscipline.universityId,
				};

				// Resolve the Promise with any value you want to return
				createLecturerDAO
					.createCurrentDisciplines([newCurrentDiscipline], lecturer)
					.then((currentDisciplineId) => {
						resolve(currentDisciplineId);
					})
					.catch((err) => console.log(err));
			})
			.catch((error) => {
				// Handle any errors
				console.log('error', error);
			});
	});
}

//hướng nghiên cứu
function createResearchFields(researchFields, lecturer) {
	return new Promise((resolve, reject) => {
		if (!researchFields) {
			resolve(null);
			return null;
		}

		return createLecturerDAO
			.createResearchFields(researchFields, lecturer)
			.then((ids) => resolve(ids))
			.catch((err) => console.log(err));
	});
}

//bằng cấp
function createExpertises(expertises, lecturer) {
	return new Promise((resolve, reject) => {
		if (!expertises) {
			resolve(null);
			return null;
		}

		return createLecturerDAO
			.createExpertises(expertises, lecturer)
			.then((ids) => resolve(ids))
			.catch((err) => console.log(err));
	});
}

// quá trình đào tạo
function createDegrees(degrees, lecturer) {
	return new Promise((resolve, reject) => {
		if (!degrees) {
			resolve(null);
			return null;
		}

		const nonexistentAcademicTitle = degrees
			.filter((ele) => !ele.hasOwnProperty('academicTitleId'))
			.map((degree) => {
				return { name: degree.academicTitleName };
			});

		const nonexistentUniversity = degrees
			.filter((ele) => !ele.hasOwnProperty('universityId'))
			.map((degree) => {
				return { name: degree.universityName };
			});

		const promises = [];

		if (nonexistentAcademicTitle) {
			promises.push(
				configurationDAO.createAcademicTitles(nonexistentAcademicTitle)
			);
		}

		if (nonexistentUniversity) {
			promises.push(configurationDAO.createUniversities(nonexistentUniversity));
		}

		Promise.all(promises)
			.then((newIds) => {
				// Retrieve the new IDs from the resolved values
				const newAcademicTitleId = Object.values(
					newIds.slice(0, nonexistentAcademicTitle.length)[0]
				);
				const newUniversityId = Object.values(
					newIds.slice(
						nonexistentAcademicTitle.length,
						nonexistentAcademicTitle.length + nonexistentUniversity.length
					)[0]
				);
				const newDegrees = degrees.map((ele, index) => {
					const newDegree = ele;
					newDegree.academicTitleId = ele.hasOwnProperty('academicTitleId')
						? ele.academicTitleId
						: newAcademicTitleId.shift();
					newDegree.universityId = ele.hasOwnProperty('universityId')
						? ele.universityId
						: newUniversityId.shift();
					return newDegree;
				});

				// Resolve the Promise with any value you want to return
				createLecturerDAO
					.createDegrees(newDegrees, lecturer)
					.then((currentDisciplineId) => {
						resolve(currentDisciplineId);
					})
					.catch((err) => console.log(err));
			})
			.catch((error) => {
				// Handle any errors
				console.log('error', error);
			});
	});
}

//
function createWorkPositions(workPositions, lecturer) {
	return new Promise((resolve, reject) => {
		if (!workPositions) {
			resolve(null);
			return null;
		}

		const nonexistentUniversities = workPositions
			.filter((ele) => {
				return (
					!ele.hasOwnProperty('universityId') && !ele.hasOwnProperty('company')
				);
			})
			.map((ele) => {
				return {
					name: ele.universityName ?? null,
				};
			});

		return configurationDAO
			.createUniversities(nonexistentUniversities)
			.catch((err) => console.log(err))
			.then((newUniversitiesId) => {
				const newUniversitiesIdArray = Object.values(newUniversitiesId);
				const newWorkPositions = workPositions.map((workPos) => {
					const newWorkPos = workPos;
					if (
						!workPos.hasOwnProperty('universityId') &&
						!workPos.hasOwnProperty('company')
					) {
						newWorkPos.universityId = newUniversitiesIdArray.shift();
					}
					return newWorkPos;
				});

				return createLecturerDAO
					.createWorkPositions(newWorkPositions, lecturer)
					.then((ids) => resolve(ids))
					.catch((err) => console.log(err));
			});
	});
}

function createActivities(activities, lecturer) {
	return new Promise((resolve, reject) => {
		if (!activities) {
			resolve(null);
			return null;
		}

		const nonExistentActivityTypes = activities
			.filter((ele) => {
				return !ele.hasOwnProperty('activityTypeId');
			})
			.map((ele) => {
				return {
					name: ele.activityTypeName ?? null,
				};
			});

		return configurationDAO
			.createActivityTypes(nonExistentActivityTypes)
			.catch((err) => console.log(err))
			.then((newActivityTypesId) => {
				const newActivityTypesIdArray = Object.values(newActivityTypesId);
				const newActivities = activities.map((activity) => {
					const newActivity = activity;
					if (!activity.hasOwnProperty('activityTypeId')) {
						newActivity.activityTypeId = newActivityTypesIdArray.shift();
					}
					return newActivity;
				});

				return createLecturerDAO
					.createActivities(newActivities, lecturer)
					.then((ids) => resolve(ids))
					.catch((err) => console.log(err));
			});
	});
}

function createLecturer(lecturerObject) {
	const lecturerBuilder = new lecturerHelper.LecturerBuilder();
	lecturerBuilder.reset();
	lecturerBuilder.setBulk(lecturerObject);
	const lecturer = lecturerBuilder.build();
	return createLecturerDAO
		.createLecturer(lecturer)
		.then((lecturerId) => {
			lecturer.id = lecturerId;

			return Promise.all([
				createPhdThesis(lecturerObject.phdThesises, lecturer).catch((err) =>
					console.log(err)
				),
				createBooks(lecturerObject.books, lecturer).catch((err) =>
					console.log(err)
				),
				createContacts(lecturerObject.contacts, lecturer).catch((err) =>
					console.log(err)
				),
				createProjects(lecturerObject.projects, lecturer).catch((err) =>
					console.log(err)
				),
				createCurrentDiscipline(
					lecturerObject.currentDiscipline,
					lecturer
				).catch((err) => console.log(err)),
				createResearchFields(lecturerObject.researchFields, lecturer).catch(
					(err) => console.log(err)
				),
				createExpertises(lecturerObject.expertises, lecturer).catch((err) =>
					console.log(err)
				),
				createDegrees(lecturerObject.degrees, lecturer).catch((err) =>
					console.log(err)
				),
				createWorkPositions(lecturerObject.workPositions, lecturer).catch(
					(err) => console.log(err)
				),
				createActivities(lecturerObject.activities, lecturer).catch((err) =>
					console.log(err)
				),
			])
				.catch((err) => {
					console.log(err);
				})
				.then(() => {
					return Promise.resolve(lecturerId);
				});
		})
		.catch((error) => {
			console.log('error ', error);
		});
}

// function updateLecturer(id, lecturer) {
// 	return new Promise((resolve, reject) => {
// 		lecturerDAO
// 			.updateLecturer(id, lecturer)
// 			.then((lecturer) => {
// 				resolve(lecturer);
// 			})
// 			.catch((error) => {
// 				reject(error);
// 			});
// 	});
// }

// function deleteLecturers(ids) {
// 	console.log(
// 		'🚀 ~ file: lecturerServices.js:84 ~ deleteLecturers ~ ids:',
// 		ids
// 	);
// 	return new Promise((resolve, reject) => {
// 		lecturerDAO
// 			.deleteLecturers(ids)
// 			.then((deleteCount) => {
// 				resolve(deleteCount);
// 			})
// 			.catch((error) => {
// 				reject(error);
// 			});
// 	});
// }

module.exports = {
	// getAllLecturersWithBasicInformation,
	// getAllLecturersWithPagination,
	createLecturer,
	// updateLecturer,
	// deleteLecturers,
};
