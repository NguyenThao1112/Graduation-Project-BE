const {validationResult} = require('express-validator');

/**
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {boolean} hasError
 */
function verifyValidations(request, response) {
    let hasError = false;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const errorResponse = [];
        errors.array().forEach(error => {
            errorResponse.push({param: error.param, msg: error.msg});
        });
        response.status(400).json({errors: errorResponse});
        hasError = true;
    }

    return hasError;
}

module.exports = {
    verifyValidations,
}