const queryConstants = require('../constants/queryConstants');

function convertRowsDataToArray(data) {
	return Object.values(JSON.parse(JSON.stringify(data)));
}

/**
 * Normalize the query parameter to int or default value when using pagination feature
 * 
 * @param {int|string} pageOffsetRaw
 * @param {int|string} limitSizeRaw
 * @return {[int, int]} results
 */
function normalizePaginationParam(pageOffsetRaw, limitSizeRaw) {
	let pageOffset = parseInt(pageOffsetRaw);
	let limitSize =  parseInt(limitSizeRaw);

	if (!pageOffset) {
		pageOffset = queryConstants.DEFAULT_PAGINATION_PAGEOFFSET;
	}

	if (!limitSize) {
		limitSize = queryConstants.DEFAULT_PAGINATION_LIMITSIZE;
	}

	return [pageOffset, limitSize];
}

module.exports = {
	convertRowsDataToArray,
	normalizePaginationParam,
};
