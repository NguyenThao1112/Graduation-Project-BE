const {
	phdThesis,
	book,
	contact,
	project,
	currentDiscipline,
	academicRank,
	academicTitle,
	expertise,
	researchField,
	degree,
	workPosition,
	activity,
} = require('../../constants/tableQueryConstants');
const searchLecturerDAO = require('../../daos/lecturerDAOS/searchLecturerDAO');
const lecturerHelper = require('../../helpers/lecturerHelper');

/**
 * Get Article with pagination
 *
 * @param {number} pageOffset which page, in 1-offset-indexing
 * @param {number} limitSize maximum number of record in a page
 * @param {object} defaultOptions addition option for querying
 * @return {Promise}
 *
 */
function getLecturersWithPagination(pageOffset, limitSize, defaultOptions) {
	//Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
	const recordOffset = (pageOffset - 1) * limitSize;

	const options = {
		...defaultOptions,
		recordOffset: recordOffset,
		limitSize: limitSize,
	};

	return new Promise((resolve, reject) => {
		searchLecturerDAO
			.getBaseLecturers(options)
			.catch((error) => {
				reject(error);
			})
			.then((lecturers) => {
				const lecturerIds = lecturers.map((lecturer) => lecturer.id);
				Promise.all([
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'phd_thesis',
						phdThesis,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'book_author',
						book,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'contact',
						contact,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'project',
						project,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'current_discipline',
						currentDiscipline,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'academic_rank',
						academicRank,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'academic_title',
						academicTitle,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'expertise',
						expertise,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'research_field',
						researchField,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'degree',
						degree,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'work_position',
						workPosition,
						lecturerIds
					),
					searchLecturerDAO.getDataOfSubtableJoningWithLecturerInformationByLecturerId(
						'activity',
						activity,
						lecturerIds
					),
				]).then((extraLecturerData) => {
					const lecturerDTOs = lecturerHelper.combineBaseAndExtraLecturerData(
						lecturers,
						extraLecturerData
					);
					resolve(lecturerDTOs);
				});
			})
			.catch((error) => {
				reject(error);
			});
	});
}

/**
 * Get One Lecturer with id
 *
 * @param {number} id
 * @return {Promise}
 *
 */
function getOneLecturer(id) {
	return new Promise((resolve, reject) => {
		searchLecturerDAO
			.getOneLecturer(id)
			.then((lecturerInfo) => {
				resolve(lecturerInfo);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

/**
 * Get paging size, after pagination process
 *
 * @param {number} limitSize maximum number of record in a page
 * @param {string} keyword the keyword to search
 * @return {Promise<>}
 *
 */
function getLecturerPagingSize(limitSize, keyword = '') {
	let options = null;
	if (null !== keyword) {
		options = {
			searchByKeyword: keyword,
		};
	}

	return new Promise((resolve, reject) => {
		searchLecturerDAO
			.getLecturerCount(options)
			.then((count) => {
				count = parseInt(count);
				const divideValue = Math.floor(count / limitSize);
				const numberOfPage =
					0 === count % limitSize ? divideValue : divideValue + 1;
				const data = {
					number_of_page: numberOfPage,
				};
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
/**
 * Get One Lecturer with id
 *
 * @return {Promise}
 *
 */
function getAllLecturers() {
	return new Promise((resolve, reject) => {
		searchLecturerDAO
			.getAllLecturers()
			.then((lecturerInfo) => {
				resolve(lecturerInfo);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

module.exports = {
	getLecturersWithPagination,
	getOneLecturer,
	getLecturerPagingSize,
	getAllLecturers,
};
