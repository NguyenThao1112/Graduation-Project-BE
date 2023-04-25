class Lecturer {
	// property
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

	constructor(
		id,
		accountId,
		name,
		gender,
		avatar,
		dateOfBirth,
		academicRankId,
		academicRankGainYear,
		academicTitleId,
		academicTitleGainYear,
		createdAt,
		updatedAt,
		isDeleted,
		expandColumn,
		phdThesis,
		book,
		contact,
		project,
		currentDiscipline,
		expertise,
		researchField,
		degree,
		workPosition,
		activity
	) {
		this.#id = id;
		this.#accountId = accountId;
		this.#name = name;
		this.#gender = gender;
		this.#avatar = avatar;
		this.#dateOfBirth = dateOfBirth;
		this.#academicRankId = academicRankId;
		this.#academicRankGainYear = academicRankGainYear;
		this.#academicTitleId = academicTitleId;
		this.#academicTitleGainYear = academicTitleGainYear;
		this.#createdAt = createdAt;
		this.#updatedAt = updatedAt;
		this.#isDeleted = isDeleted;
		this.#expandColumn = expandColumn;
		this.#phdThesis = phdThesis;
		this.#book = book;
		this.#contact = contact;
		this.#project = project;
		this.#currentDiscipline = currentDiscipline;
		this.#expertise = expertise;
		this.#researchField = researchField;
		this.#degree = degree;
		this.#workPosition = workPosition;
		this.#activity = activity;
	}

	//Getters
	get id() {
		return this.#id;
	}
	get accountId() {
		return this.#accountId;
	}
	get name() {
		return this.#name;
	}
	get gender() {
		return this.#gender;
	}
	get avatar() {
		return this.#avatar;
	}
	get dateOfBirth() {
		return this.#dateOfBirth;
	}
	get academicRankId() {
		return this.#academicRankId;
	}
	get academicRankGainYear() {
		return this.#academicRankGainYear;
	}
	get academicTitleId() {
		return this.#academicTitleId;
	}
	get academicTitleGainYear() {
		return this.#academicTitleGainYear;
	}
	get createdAt() {
		return this.#createdAt;
	}
	get updatedAt() {
		return this.#updatedAt;
	}
	get isDeleted() {
		return this.#isDeleted;
	}
	get expandColumn() {
		return this.#expandColumn;
	}
	get phdThesis() {
		return this.#phdThesis;
	}
	get book() {
		return this.#book;
	}
	get contact() {
		return this.#contact;
	}
	get project() {
		return this.#project;
	}
	get currentDiscipline() {
		return this.#currentDiscipline;
	}
	get expertise() {
		return this.#expertise;
	}
	get researchField() {
		return this.#researchField;
	}
	get degree() {
		return this.#degree;
	}
	get workPosition() {
		return this.#workPosition;
	}
	get activity() {
		return this.#activity;
	}

	//Setters
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
}

module.exports = {
	Lecturer,
};
