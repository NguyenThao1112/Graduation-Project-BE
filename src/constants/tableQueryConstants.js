const phdThesis = [
	'id',
	'lecturer_id as lecturerId',
	'project_name as projectName',
	'phd_name as phdName',
	'graduation_year as graduationYear',
	'education_level as graduationYear',
	'note',
];

const book = [
	'book.id as id',
	'lecturer_id as lecturerId',
	'book.name',
	'book.project_id as projectId',
	'book.publisher_name as publisherName',
	'book.public_year as publicYear',
	'book.co_authors as coAuthors',
	'book.pseudonym',
];

const contact = [
	'contact.id as id',
	'lecturer_id as lecturerId',
	'value',
	'contact_type.id as contactTypeId',
	'name as contactTypeName',
];

const project = [
	'id',
	'lecturer_id as lecturerId',
	'name',
	'project_code as projectCode',
	'from_date as fromDate',
	'to_date as toDate',
	'expenditure',
	'project_role as projectRole',
	'acceptance_date as acceptanceDate',
	'result',
	'note',
	'reference',
];

const currentDiscipline = [
	'current_discipline.id as id',
	'lecturer_id as lecturerId',
	'department.name as departmentName',
	'university.name as universityName',
	'position',
];

const academicRank = [
	'lecturer_information.id as lecturerId',
	'academic_rank.id',
	'academic_rank.name',
];

const academicTitle = [
	'lecturer_information.id as lecturerId',
	'academic_title.id',
	'academic_title.name',
];

const expertise = [
	'expertise.id as id',
	'lecturer_id as lecturerId',
	'title',
	'specialization',
];

const researchField = [
	'research_field.id as id',
	'lecturer_id as lecturerId',
	'research_name as researchName',
	'note',
];

const degree = [
	'degree.id as id',
	'lecturer_id as lecturerId',
	'academic_title.name as academicTitleName',
	'university.name as universityName',
	'specialization',
	'graduation_thesis_name as graduationThesisName',
	'graduation_date as graduationDate',
];

const workPosition = [
	'work_position.id as id',
	'lecturer_id as lecturerId',
	'university.name as universityName',
	'company',
	'position',
	'is_now as isNow',
	'from_date as fromDate',
	'to_date as toDate',
];

const activity = [
	'activity.id as id',
	'lecturer_id as lecturerId',
	'activity_type.name as activityTypeName',
	'activity.name as activityName',
	'note',
	'is_now as isNow',
	'from_date as fromDate',
	'to_date as toDate',
];

const lecturerFile = [
	'lecturer_file.id as id',
	'lecturer_id as lecturerId',
	'file_path as filePath',
	'original_file_name  as originalFileName',
];

module.exports = {
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
	lecturerFile,
};
