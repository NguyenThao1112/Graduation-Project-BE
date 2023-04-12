const moment = require('moment');
const { DAYS_AND_HOURS_FORMAT } = require('../constants/timeConstants');

function getCurrentTimeFormat() {
	return moment().utc().format(DAYS_AND_HOURS_FORMAT);
}

module.exports = {
	getCurrentTimeFormat,
};
