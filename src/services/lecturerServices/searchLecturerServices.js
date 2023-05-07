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

module.exports = {
	getLecturersWithPagination,
};
