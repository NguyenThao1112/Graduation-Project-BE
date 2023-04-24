const { Lecturer } = require('../models/lecturer/lecturer');

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
		this.#id = lecturerObject.id ?? null;
		this.#accountId = lecturerObject.accountId ?? null;
		this.#name = lecturerObject.name ?? null;
		this.#gender = lecturerObject.gender ?? null;
		this.#avatar = lecturerObject.avatar ?? null;
		this.#dateOfBirth = lecturerObject.dateOfBirth ?? null;
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
