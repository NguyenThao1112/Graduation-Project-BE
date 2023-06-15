const { saveLecturerWithScopus } = require('./saveLecturerWithScopus');
const {
	saveArticleByAuthorScopusId,
} = require('./saveArticleByAuthorScopusId');

/**
 *
 * @param {String} scopusAuthorId
 * @param {String} accountId
 * @returns {Promise<any[2]>{Number, Array<Number>}} resultData
 */
async function saveAuthorWithScopusInfo(scopusAuthorId, accountId) {
	let resultData = [null, []];

	try {
		resultData[0] = await saveLecturerWithScopus(scopusAuthorId, accountId);
		resultData[1] = await saveArticleByAuthorScopusId(scopusAuthorId);
	} catch (errors) {
		console.log(
			'🚀 ~ file: saveAuthorWithScopus.js:21 ~ saveAuthorWithScopusInfo ~ errors:',
			errors
		);
		// do nothing
	}

	// Format the data
	if (null === resultData[0] || undefined === resultData[0]) {
		resultData[0] = null;
	}

	return resultData;
}

module.exports = {
	saveAuthorWithScopusInfo,
};
