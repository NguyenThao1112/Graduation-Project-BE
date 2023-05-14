const { query } = require('express-validator');
const messageConstants = require('../constants/messageConstants');
const urlConstants = require('../constants/urlConstants');

function getPaginationValidators() {
	return [
		query(urlConstants.PAGINATION_PAGE_OFFSET_PARAM)
			.isInt({min: 1})
			.withMessage(
				`'${urlConstants.PAGINATION_PAGE_OFFSET_PARAM}' ${messageConstants.VAL_IS_NOT_POSTITIVE_INTEGER_GREATER_THAN_0}`
			),
			
		...getPageSizeValidator()
	]
}

function getPageSizeValidator() {
	return [
		query(urlConstants.PAGINATION_LIMIT_SIZE_PARAM)
			.isInt({min: 1})
			.withMessage(
				`'${urlConstants.PAGINATION_LIMIT_SIZE_PARAM}' ${messageConstants.VAL_IS_NOT_POSTITIVE_INTEGER_GREATER_THAN_0}`
			),
	]
}

module.exports = {
	getPaginationValidators,
	getPageSizeValidator,
};
