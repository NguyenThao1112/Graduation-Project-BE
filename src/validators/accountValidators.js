const { check, query } = require('express-validator');
const messageConstants = require('../constants/messageConstants');

function tokenValidators() {
	return [
		check('accessToken ', `token ${messageConstants.VAL_IS_REQUIRED_MESSAGE}`)
			.not()
			.isEmpty(),
	];
}

module.exports = {
	tokenValidators,
};
