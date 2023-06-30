const updateLecturerDAO = require('../../src/daos/lecturerDAOS/updateLecturerDAO');

test('should create new  phd_thesis if phd thesis not exist', async () => {
	const phdThesises = [
		{
			projectName: 'project',
			phdName: 'phdName',
		},
	];

	const lecturer = { id: 9999 };
	const newPhdThesis = await updateLecturerDAO.updatePhdThesises(
		phdThesises,
		lecturer
	);
	expect(newPhdThesis.affectedRows).toBeGreaterThan(0);
});

test('should return null if pass empty phd thesis', async () => {
	const phdThesises = [];

	const lecturer = { id: 9999 };
	const newPhdThesis = await updateLecturerDAO.updatePhdThesises(
		phdThesises,
		lecturer
	);
	expect(newPhdThesis).toEqual(null);
});

test('should create new  book if book not exist', async () => {
	const books = [
		{
			name: 'name',
			projectId: 1,
		},
	];

	const book = await updateLecturerDAO.updateBooks(books);
	expect(book.affectedRows).toBeGreaterThan(0);
});
