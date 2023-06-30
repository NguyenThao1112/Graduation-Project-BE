const SearchLecturerDAO = require('../../src/daos/lecturerDAOS/searchLecturerDAO');

test('should Get Base Lecturer by id', async () => {
	const lecturerIds = [1];
	const lecturer = await SearchLecturerDAO.getBaseLecturers(lecturerIds);
	expect(lecturer.length).toEqual(2);
});

test('should Get all Lecturer if pass empty id', async () => {
	const lecturerIds = [];
	const lecturer = await SearchLecturerDAO.getBaseLecturers(lecturerIds);
	expect(lecturer.length).toBeGreaterThan(0);
});
