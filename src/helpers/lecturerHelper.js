const { phdThesis, expertise } = require('../constants/tableQueryConstants');
const { Lecturer } = require('../models/lecturer/lecturer');
const moment = require('moment');
class LecturerBuilder {
	#id;
	#accountId;
	#name;
	#gender;
	#avatar;
	#dateOfBirth;
	#academicRankId;
	#academicRankGainYear;
	#academicTitleId;
	#academicTitleGainYear;
	#createdAt;
	#updatedAt;
	#isDeleted;
	#expandColumn;

	//foreign key
	#phdThesis;
	#book;
	#contact;
	#project;
	#currentDiscipline;
	#expertise;
	#researchField;
	#degree;
	#workPosition;
	#activity;

	set id(id) {
		this.#id = id;
	}
	set accountId(accountId) {
		this.#accountId = accountId;
	}
	set name(name) {
		this.#name = name;
	}
	set gender(gender) {
		this.#gender = gender;
	}
	set avatar(avatar) {
		this.#avatar = avatar;
	}
	set dateOfBirth(dateOfBirth) {
		this.#dateOfBirth = dateOfBirth;
	}
	set academicRankId(academicRankId) {
		this.#academicRankId = academicRankId;
	}
	set academicRankGainYear(academicRankGainYear) {
		this.#academicRankGainYear;
	}
	set academicTitleId(academicTitleId) {
		this.#academicTitleId = academicTitleId;
	}
	set academicTitleGainYear(academicTitleGainYear) {
		this.#academicTitleGainYear = academicTitleGainYear;
	}
	set createdAt(createdAt) {
		this.#createdAt = createdAt;
	}
	set updatedAt(updatedAt) {
		this.#updatedAt = updatedAt;
	}
	set isDeleted(isDeleted) {
		this.#isDeleted = isDeleted;
	}
	set expandColumn(expandColumn) {
		this.#expandColumn = expandColumn;
	}
	set phdThesis(phdThesis) {
		this.#phdThesis = phdThesis;
	}
	set book(book) {
		this.#book = book;
	}
	set contact(contact) {
		this.#contact = contact;
	}
	set project(project) {
		this.#project = project;
	}
	set currentDiscipline(currentDiscipline) {
		this.#currentDiscipline = currentDiscipline;
	}
	set expertise(expertise) {
		this.#expertise = expertise;
	}
	set researchField(researchField) {
		this.#researchField = researchField;
	}
	set degree(degree) {
		this.#degree = degree;
	}
	set workPosition(workPosition) {
		this.#workPosition = workPosition;
	}
	set activity(activity) {
		this.#activity = activity;
	}

	setBulk(lecturerObject) {
		this.#accountId = lecturerObject.accountId ?? null;
		this.#name = lecturerObject.name ?? null;
		this.#gender = lecturerObject.gender ?? null;
		this.#avatar = lecturerObject.avatar ?? null;
		this.#dateOfBirth = lecturerObject.dateOfBirth
			? moment(lecturerObject.dateOfBirth, 'DD/MM/YYYY').format('YYYY/MM/DD')
			: null;
		this.#academicRankId = lecturerObject.academicRankId ?? null;
		this.#academicRankGainYear = lecturerObject.academicRankGainYear ?? null;
		this.#academicTitleId = lecturerObject.academicTitleId ?? null;
		this.#academicTitleGainYear = lecturerObject.academicTitleGainYear ?? null;
		this.#createdAt = lecturerObject.createdAt ?? null;
		this.#updatedAt = lecturerObject.updatedAt ?? null;
		this.#isDeleted = lecturerObject.isDeleted ?? null;
		this.#expandColumn = lecturerObject.expandColumn ?? null;
		this.#phdThesis = lecturerObject.phdThesis ?? null;
		this.#book = lecturerObject.book ?? null;
		this.#contact = lecturerObject.contact ?? null;
		this.#project = lecturerObject.project ?? null;
		this.#currentDiscipline = lecturerObject.currentDiscipline ?? null;
		this.#expertise = lecturerObject.expertise ?? null;
		this.#researchField = lecturerObject.researchField ?? null;
		this.#degree = lecturerObject.degree ?? null;
		this.#workPosition = lecturerObject.workPosition ?? null;
		this.#activity = lecturerObject.activity ?? null;
	}

	reset() {
		this.#id = null;
		this.#accountId = null;
		this.#name = null;
		this.#gender = null;
		this.#avatar = null;
		this.#dateOfBirth = null;
		this.#academicRankId = null;
		this.#academicRankGainYear = null;
		this.#academicTitleId = null;
		this.#academicTitleGainYear = null;
		this.#createdAt = null;
		this.#updatedAt = null;
		this.#isDeleted = null;
		this.#expandColumn = null;
		this.#phdThesis = null;
		this.#book = null;
		this.#contact = null;
		this.#project = null;
		this.#currentDiscipline = null;
		this.#expertise = null;
		this.#researchField = null;
		this.#degree = null;
		this.#workPosition = null;
		this.#activity = null;
	}

	build() {
		return new Lecturer(
			this.#id,
			this.#accountId,
			this.#name,
			this.#gender,
			this.#avatar,
			this.#dateOfBirth,
			this.#academicRankId,
			this.#academicRankGainYear,
			this.#academicTitleId,
			this.#academicTitleGainYear,
			this.#createdAt,
			this.#updatedAt,
			this.#isDeleted,
			this.#expandColumn,
			this.#phdThesis,
			this.#book,
			this.#contact,
			this.#project,
			this.#currentDiscipline,
			this.#expertise,
			this.#researchField,
			this.#degree,
			this.#workPosition,
			this.#activity
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
	//parse lecturer phdThesis to map
	const phdThesises = new Map();
	extraLecturerData[0].forEach((phdThesis) => {
		const lecturerId = phdThesis.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, phdThesises, phdThesis);
	});

	//book-author + book
	const books = new Map();
	extraLecturerData[1].forEach((book) => {
		const lecturerId = book.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, books, book);
	});

	//contact + contact type
	const contacts = new Map();
	extraLecturerData[2].forEach((contact) => {
		const lecturerId = contact.lecturerId;
		mapLecturerIdToExtraLecturerData(lecturerId, contacts, contact);
	});

	//project
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

	//expertise
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
