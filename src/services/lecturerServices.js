const lecturerDAO = require('../daos/lecturerDAO');
const urlConstants = require('../constants/urlConstants');

/**
 * Get all the lecturers, with only usable column in the lecturer's base table (without join any table)
 * @return {Promise}
 *
 */
function getAllLecturersWithBasicInformation() {
	const resourcePath = urlConstants.LECTURE_RESOURCE_LECTURE_AVATAR;

	return new Promise((resolve, reject) => {
		lecturerDAO
			.getAllLecturersWithBasicInformation()
			.then((lecturers) => {
				//Add the full url for lecturer's avatar image
				lecturers.forEach(function (lecturer, index) {
					//Change the avatarFileName to the full path of resources url
					const avatarFileName = lecturer[index].avatar;
					this[index].avatar = `${resourcePath}/${avatarFileName}`;
				}, lecturers);

				resolve(lecturers);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Get all lecturers with pagination
 *
 * @param {number} pageOffset which page, in 1-offset-indexing
 * @param {number} limitSize maximum number of record in a page
 *
 * @return {Promise}
 *
 */
function getAllLecturersWithPagination(pageOffset, limitSize) {
	const recordOffset = (pageOffset - 1) * limitSize;

	return new Promise((resolve, reject) => {
		lecturerDAO
			.getAllLecturersWithPagination(recordOffset, limitSize)
			.then((lecturer) => {
				resolve(lecturer);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

function createLecturers(lecturers) {
	return new Promise((resolve, reject) => {
		lecturerDAO
			.createLecturers(lecturers)
			.then((id) => {
				console.log('id ', id);
				resolve(id);
			})
			.catch((error) => {
				console.log('error ', error);
				reject(error);
			});
	});
}

module.exports = {
	getAllLecturersWithBasicInformation,
	getAllLecturersWithPagination,
	createLecturers,
};
