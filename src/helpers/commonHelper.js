const queryConstants = require('../constants/messageQueryConstants');
const { isEmpty } = require('lodash');
const { handleFileUpload } = require('../services/googleDriveService');

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
	let limitSize = parseInt(limitSizeRaw);

	if (!pageOffset) {
		pageOffset = queryConstants.DEFAULT_PAGINATION_PAGEOFFSET;
	}

	if (!limitSize) {
		limitSize = queryConstants.DEFAULT_PAGINATION_LIMITSIZE;
	}

	return [pageOffset, limitSize];
}

function chunkArray(array, chunkSize) {
	const batchArray = [];
	const arraySize = array.length;
	for (let i = 0; i < arraySize; i += chunkSize) {
		const chunk = array.slice(i, i + chunkSize);
		batchArray.push(chunk);
	}

	return batchArray;
}

async function uploadAndFormatFile(listFiles) {
	if (isEmpty(listFiles)) {
		return null;
	}

	const fileNames = [];

	try {
		for (const key of Object.keys(listFiles)) {
			const files = Array.isArray(listFiles[key])
				? listFiles[key]
				: [listFiles[key]];

			for (const file of files) {
				const url = await handleFileUpload(file);
				fileNames.push({ name: file.name, url });
			}
		}

		const fileDtos = fileNames.map((fileName) => {
			const file = {};
			file.originalFileName = fileName.name;
			file.path = fileName.url;
			return file;
		});

		return fileDtos;
	} catch (err) {
		console.log(err);
	}
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	convertRowsDataToArray,
	normalizePaginationParam,
	chunkArray,
	uploadAndFormatFile,
	getRandomInt,
};
