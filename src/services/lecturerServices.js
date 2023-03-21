const lecturerDAO = require('../daos/lecturerDAO');
const urlConstants = require('../constants/urlConstants');

/**
 * Get all the lectures, with only usable column in the lecture's base table (without join any table)
 * @return {Promise}
 *
 */
function getAllLecturersWithBasicInformation() {
	const resourcePath = urlConstants.LECTURE_RESOURCE_LECTURE_AVATAR;

	return new Promise((resolve, reject) => {
		lecturerDAO
			.getAllLecturersWithBasicInformation()
			.then((lecturers) => {
				//Add the full url for lecture's avatar image
				lecturers.forEach(function (lecture, index) {
					//Change the avatarFileName to the full path of resources url
					const avatarFileName = lecture[index].avatar;
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
 * Get all lectures with pagination
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
			.then((lecture) => {
				resolve(lecture);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

module.exports = {
	getAllLecturersWithBasicInformation,
	getAllLecturersWithPagination,
};
