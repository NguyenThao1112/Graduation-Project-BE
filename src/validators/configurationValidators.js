const { query } = require('express-validator');
const messageConstants = require('../constants/messageConstants');
const urlConstants = require('../constants/urlConstants');

function getContactTypeValidators() {
	return [
		query(urlConstants.CONFIG_CONTACT_TYPE_LIMITSIZE_PARAM)
			.isInt({min: 1})
			.withMessage(
				`'${urlConstants.CONFIG_CONTACT_TYPE_LIMITSIZE_PARAM}' ${messageConstants.VAL_IS_NOT_POSTITIVE_INTEGER_GREATER_THAN_0}`
			),
		query(urlConstants.CONFIG_CONTACT_TYPE_PAGEOFFSET_PARAM)
			.isInt({min: 1})
			.withMessage(
				`'${urlConstants.CONFIG_CONTACT_TYPE_PAGEOFFSET_PARAM}' ${messageConstants.VAL_IS_NOT_POSTITIVE_INTEGER_GREATER_THAN_0}`
			),
	]
}

module.exports = {
	getContactTypeValidators,
};
