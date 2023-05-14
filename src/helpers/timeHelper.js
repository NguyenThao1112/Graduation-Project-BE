const moment = require('moment');
const {
	DAYS_AND_HOURS_FORMAT,
	DAYS_TO_YEAR_FORMAT,
	YEAR_TO_DAYS_FORMAT,
} = require('../constants/timeConstants');

function getCurrentTimeFormat() {
	return moment().utc().format(DAYS_AND_HOURS_FORMAT);
}

function convertFormatDate(date) {
	return date
		? moment(date, DAYS_TO_YEAR_FORMAT).format(YEAR_TO_DAYS_FORMAT)
		: null;
}

module.exports = {
	getCurrentTimeFormat,
	convertFormatDate,
};
