const createLecturerDAO = require('../../daos/lecturerDAOS/createLecturerDAO');
const configurationDAO = require('../../daos/configurationDAO');
const lecturerHelper = require('../../helpers/lecturerHelper');

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

		const promises = [];

		if (nonexistentDiscipline.length) {
			promises.push(createLecturerDAO.createDisciplines(nonexistentDiscipline));
		}

		if (nonexistentDepartment.length) {
			promises.push(createLecturerDAO.createDepartments(nonexistentDepartment));
		}

		Promise.all(promises)
			.then((newIdsWithNull) => {
				// Retrieve the new IDs from the resolved values
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

				const newCurrentDiscipline = {
					...currentDiscipline,
					disciplineId: newDisciplineIds.length
						? newDisciplineIds[0]
						: currentDiscipline.disciplineId,
					departmentId: newDepartmentIds.length
						? newDepartmentIds[0]
						: currentDiscipline.departmentId,
					universityId: currentDiscipline.universityId,
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

		// Resolve the Promise with any value you want to return
		createLecturerDAO
			.createDegrees(degrees, lecturer)
			.then((currentDisciplineId) => {
				resolve(currentDisciplineId);
			})
			.catch((err) => console.log(err));
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

module.exports = {
	createLecturer,
};
