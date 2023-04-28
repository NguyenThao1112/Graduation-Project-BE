const urlConstants = require('../constants/urlConstants');
const createLecturerDAO = require('../daos/lecturerDAOS/createLecturerDAO');
const lecturerHelper = require('../helpers/lecturerHelper');
const configurationServices = require('../services/configurationServices');
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

function createPhdThesis(lecturer, phdThesises) {
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

function createBooks(lecturer, books) {
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

		return configurationServices
			.createBooks(unexistedBooks)
			.catch((err) => console.log(err))
			.then((bookIds) => {
				const existBookIds = books
					.filter((ele) => ele.hasOwnProperty('book_id'))
					.map((book) => book.book_id);

				const bookAuthors = [...bookIds, ...existBookIds];

				return createLecturerDAO
					.createBookAuthors(bookAuthors,lecturer)
					.then((ids) => resolve(ids))
					.catch((err) => console.log(err));
			});
	});
}

// function createContact(lecturer,){
// 	return new Promise((resolve, reject) => {
// 		if(!lecturerPhdThesisObj) {
// 			resolve(null)
// 			return null;
// 		}

// 		const lecturerPhdThesisDTO = lecturerPhdThesisObj.map((ele)=>{
// 			return {
// 				...lecturerPhdThesisObj,
// 				lecturer
// 			}
// 		})

// 		return createLecturerDAO.createPhdThesis(lecturerPhdThesisDTO).then((ids)=>resolve(ids))
// 					.catch(err=>console.log(err));
// 	})
// }

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
				createPhdThesis(lecturer, lecturerObject.phdThesises).catch((err) =>
					console.log(err)
				),
				createBooks(lecturer, lecturerObject.books).catch((err) =>
					console.log(err)
				),
			])
				.catch((err) => {
					console.log(err);
					return Promise.reject(err);
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
