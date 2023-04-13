const { check,} = require('express-validator');
const { getTagsByNames } = require('../services/configurationServices');

/**
 * @param Array<String> tagNames
 * @returns Promise.Reject
 */
function checkTagsNameExists(tagNames) {
	return getTagsByNames(tagNames).then((tags) => {
		if (tags && tags.length > 0) {
			const tagNamesSetToString = tags.map(tag => `'${tag.name}'`).join(', ');
			return Promise.reject(
				`Tag with name (${tagNamesSetToString}) is/are exists`
			);
		}
	});
}

function createTagValidators() {
	return [

		check('data').custom((tags) => {
			//Check if the tags.*.name is used
			const tagNames = tags.map(tag => tag.name);

			return checkTagsNameExists(tagNames);
		}),

	];
}


function updateTagValidators() {
	return [
		check('name').custom((tagName) => {
			return checkTagsNameExists(tagName);
		}),

	];
}


module.exports = {
	createTagValidators,
	updateTagValidators,
};
