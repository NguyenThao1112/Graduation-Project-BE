const DATE_FORMAT_QUERY = '%d-%m-%Y';
const TIME_FORMAT_QUERY = '%H:%i:%s';
const DATETIME_FORMAT_QUERY = `${DATE_FORMAT_QUERY} ${TIME_FORMAT_QUERY}`;

module.exports = Object.freeze({
	//Date and time format
	DATE_FORMAT_QUERY,
	DATETIME_FORMAT_QUERY,
	TIME_FORMAT_QUERY,

	//Append for the select query, to get the object's metadata
	GET_METADATA_QUERY: `DATE_FORMAT(created_at, "${DATETIME_FORMAT_QUERY}"), DATE_FORMAT(updated_at, "${DATETIME_FORMAT_QUERY}")`,
	FILTER_DELETED_RECORD_QUERY: `WHERE is_deleted = false`,

	//Default pagination params
	DEFAULT_PAGINATION_PAGEOFFSET: 1,
	DEFAULT_PAGINATION_LIMITSIZE: 10,
});
