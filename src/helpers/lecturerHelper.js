const { phdThesis, expertise } = require('../constants/tableQueryConstants');
const { Lecturer } = require('../models/lecturer/lecturer');
const moment = require('moment');
const { DAYS_TO_YEAR_FORMAT } = require('../constants/timeConstants');
class LecturerBuilder {
	#id;
	#accountId;
	#scopusId;
	#name;
	#gender;
	#avatar;
	#dateOfBirth;
	#bio;
	#academicRankId;
	#academicRankGainYear;
	#academicTitleId;
	#academicTitleGainYear;
	#createdAt;
	#updatedAt;
	#isDeleted;
	#expandColumn;

	//foreign key
	#phdThesises;
	#books;
	#contacts;
	#projects;
	#currentDiscipline;
	#expertises;
	#researchFields;
	#degrees;
	#workPositions;
	#activities;

	// @ts-ignore
	set id(id) {
		this.#id = id;
	}
	// @ts-ignore
	set accountId(accountId) {
		this.#accountId = accountId;
	}
	set scopusId(scopusId) {
		this.#scopusId = scopusId;
	}
	// @ts-ignore
	set name(name) {
		this.#name = name;
	}
	// @ts-ignore
	set gender(gender) {
		this.#gender = gender;
	}
	// @ts-ignore
	set avatar(avatar) {
		this.#avatar = avatar;
	}
	// @ts-ignore
	set dateOfBirth(dateOfBirth) {
		this.#dateOfBirth = dateOfBirth;
	}
	// @ts-ignore
	set bio(bio) {
		this.#bio = bio;
	}
	// @ts-ignore
	set academicRankId(academicRankId) {
		this.#academicRankId = academicRankId;
	}
	// @ts-ignore
	set academicRankGainYear(academicRankGainYear) {
		this.#academicRankGainYear;
	}
	// @ts-ignore
	set academicTitleId(academicTitleId) {
		this.#academicTitleId = academicTitleId;
	}
	// @ts-ignore
	set academicTitleGainYear(academicTitleGainYear) {
		this.#academicTitleGainYear = academicTitleGainYear;
	}
	// @ts-ignore
	set createdAt(createdAt) {
		this.#createdAt = createdAt;
	}
	// @ts-ignore
	set updatedAt(updatedAt) {
		this.#updatedAt = updatedAt;
	}
	// @ts-ignore
	set isDeleted(isDeleted) {
		this.#isDeleted = isDeleted;
	}
	// @ts-ignore
	set expandColumn(expandColumn) {
		this.#expandColumn = expandColumn;
	}
	// @ts-ignore
	set phdThesises(phdThesises) {
		this.#phdThesises = phdThesises;
	}
	// @ts-ignore
	set books(books) {
		this.#books = books;
	}
	// @ts-ignore
	set contacts(contacts) {
		this.#contacts = contacts;
	}
	// @ts-ignore
	set projects(projects) {
		this.#projects = projects;
	}
	// @ts-ignore
	set currentDiscipline(currentDiscipline) {
		this.#currentDiscipline = currentDiscipline;
	}
	// @ts-ignore
	set expertises(expertises) {
		this.#expertises = expertises;
	}
	// @ts-ignore
	set researchFields(researchFields) {
		this.#researchFields = researchFields;
	}
	// @ts-ignore
	set degrees(degrees) {
		this.#degrees = degrees;
	}
	// @ts-ignore
	set workPositions(workPositions) {
		this.#workPositions = workPositions;
	}
	// @ts-ignore
	set activities(activities) {
		this.#activities = activities;
	}

	setBulk(lecturerObject) {
		this.#id = lecturerObject.id ?? null;
		this.#accountId = lecturerObject.accountId ?? null;
		this.#scopusId = lecturerObject.scopusId ?? null;
		this.#name = lecturerObject.name ?? null;
		this.#gender = lecturerObject.gender ?? null;
		this.#avatar = lecturerObject.avatar ?? null;
		this.#dateOfBirth = lecturerObject.dateOfBirth
			? moment(lecturerObject.dateOfBirth, 'DD/MM/YYYY').format('YYYY/MM/DD')
			: null;
		this.#bio = lecturerObject.bio ?? null;
		this.#academicRankId = lecturerObject.academicRankId ?? null;
		this.#academicRankGainYear = lecturerObject.academicRankGainYear ?? null;
		this.#academicTitleId = lecturerObject.academicTitleId ?? null;
		this.#academicTitleGainYear = lecturerObject.academicTitleGainYear ?? null;
		this.#createdAt = lecturerObject.createdAt ?? null;
		this.#updatedAt = lecturerObject.updatedAt ?? null;
		this.#isDeleted = lecturerObject.isDeleted ?? null;
		this.#expandColumn = lecturerObject.expandColumn ?? null;
		this.#phdThesises = lecturerObject.phdThesises ?? null;
		this.#books = lecturerObject.books ?? null;
		this.#contacts = lecturerObject.contacts ?? null;
		this.#projects = lecturerObject.projects ?? null;
		this.#currentDiscipline = lecturerObject.currentDiscipline ?? null;
		this.#expertises = lecturerObject.expertises ?? null;
		this.#researchFields = lecturerObject.researchFields ?? null;
		this.#degrees = lecturerObject.degrees ?? null;
		this.#workPositions = lecturerObject.workPositions ?? null;
		this.#activities = lecturerObject.activities ?? null;
	}

	reset() {
		this.#id = null;
		this.#accountId = null;
		this.#scopusId = null;
		this.#name = null;
		this.#gender = null;
		this.#avatar = null;
		this.#dateOfBirth = null;
		this.#bio = null;
		this.#academicRankId = null;
		this.#academicRankGainYear = null;
		this.#academicTitleId = null;
		this.#academicTitleGainYear = null;
		this.#createdAt = null;
		this.#updatedAt = null;
		this.#isDeleted = null;
		this.#expandColumn = null;
		this.#phdThesises = null;
		this.#books = null;
		this.#contacts = null;
		this.#projects = null;
		this.#currentDiscipline = null;
		this.#expertises = null;
		this.#researchFields = null;
		this.#degrees = null;
		this.#workPositions = null;
		this.#activities = null;
	}

	build() {
		return new Lecturer(
			this.#id,
			this.#accountId,
			this.#scopusId,
			this.#name,
			this.#gender,
			this.#avatar,
			this.#dateOfBirth,
			this.#bio,
			this.#academicRankId,
			this.#academicRankGainYear,
			this.#academicTitleId,
			this.#academicTitleGainYear,
			this.#createdAt,
			this.#updatedAt,
			this.#isDeleted,
			this.#expandColumn,
			this.#phdThesises,
			this.#books,
			this.#contacts,
			this.#projects,
			this.#currentDiscipline,
			this.#expertises,
			this.#researchFields,
			this.#degrees,
			this.#workPositions,
			this.#activities
		);
	}
}

function mapLecturerIdToExtraLecturerData(lecturerId, map, mapValue) {
	if (!map.has(lecturerId)) {
		map.set(lecturerId, []);
	}
	map.get(lecturerId).push(mapValue);
}

function combineBaseAndExtraLecturerData(lecturerData, extraLecturerData) {
	//parse lecturer phdThesises to map
	const phdThesises = new Map();
	extraLecturerData[0].forEach((phdThesis) => {
		const lecturerId = phdThesis.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, phdThesises, phdThesis);
	});

	//books-author + books
	const books = new Map();
	extraLecturerData[1].forEach((book) => {
		const lecturerId = book.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, books, book);
	});

	//contacts + contact type
	const contacts = new Map();
	extraLecturerData[2].forEach((contact) => {
		const lecturerId = contact.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, contacts, contact);
	});

	//projects
	const projects = new Map();
	extraLecturerData[3].forEach((project) => {
		const lecturerId = project.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, projects, project);
	});

	//current_discipline
	const currentDisciplines = new Map();
	extraLecturerData[4].forEach((currentDiscipline) => {
		const lecturerId = currentDiscipline.lecturerId;
		mapLecturerIdToExtraLecturerData(
			lecturerId,
			currentDisciplines,
			currentDiscipline
		);
	});

	//academic_rank
	const academicRanks = new Map();
	extraLecturerData[5].forEach((academicRank) => {
		const lecturerId = academicRank.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, academicRanks, academicRank);
	});

	//academic_title
	const academicTitles = new Map();
	extraLecturerData[6].forEach((academicTitle) => {
		const lecturerId = academicTitle.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, academicTitles, academicTitle);
	});

	//expertises
	const expertises = new Map();
	extraLecturerData[7].forEach((expertise) => {
		mapLecturerIdToExtraLecturerData(
			expertise.lecturerId,
			expertises,
			expertise
		);
	});

	//researchFields
	const researchFields = new Map();
	extraLecturerData[8].forEach((researchField) => {
		mapLecturerIdToExtraLecturerData(
			researchField.lecturerId,
			researchFields,
			researchField
		);
	});

	//degrees
	const degrees = new Map();
	extraLecturerData[9].forEach((degree) => {
		mapLecturerIdToExtraLecturerData(degree.lecturerId, degrees, degree);
	});

	//workPositions
	const workPositions = new Map();
	extraLecturerData[10].forEach((workPosition) => {
		mapLecturerIdToExtraLecturerData(
			workPosition.lecturerId,
			workPositions,
			workPosition
		);
	});

	//activities
	const activities = new Map();
	extraLecturerData[11].forEach((activity) => {
		mapLecturerIdToExtraLecturerData(activity.lecturerId, activities, activity);
	});

	const completeLecturerData = lecturerData.map((ele) => {
		return {
			...ele,
			dateOfBirth: moment(ele.dateOfBirth).format(DAYS_TO_YEAR_FORMAT),
			phdThesises: phdThesises.get(ele.id),
			books: books.get(ele.id),
			contacts: contacts.get(ele.id),
			projects: projects.get(ele.id),
			currentDisciplines: currentDisciplines.get(ele.id),
			academicRanks: academicRanks.get(ele.id),
			academicTitles: academicTitles.get(ele.id),
			expertises: expertises.get(ele.id),
			researchFields: researchFields.get(ele.id),
			degrees: degrees.get(ele.id),
			workPositions: workPositions.get(ele.id),
			activities: activities.get(ele.id),
		};
	});

	return completeLecturerData;
}

module.exports = {
	LecturerBuilder,
	combineBaseAndExtraLecturerData,
};
