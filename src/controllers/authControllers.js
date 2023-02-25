const authService = require('../services/authServices');
const authConstants = require('../constants/messageConstants');
const {validationResult} = require('express-validator');

function login(request, response) {

    const {email, password} = request.body;

    //Default response is login failed
    responseJson = {
        code: authConstants.AUTH_LOGIN_FAILED_CODE,
        message: authConstants.AUTH_LOGIN_FAILED_MESSAGE, 
    }

    //Check if authenticate successfully
    const jwt = authService.authenticate(email, password);

    //If authenticated success => change the response's data
    if (jwt) {
        responseJson.code = authConstants.SUCCESSFUL_CODE;
        responseJson.message = authConstants.AUTH_LOGIN_SUCCESS_MESSAGE;
        responseJson.token = jwt;
    }

    response.json(responseJson);
}

/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
function signUp(request, response) {

    return new Promise((resolve, reject) => {

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(400).json({errors: errors.array()});
            return;
        }

        const {email, password} = request.body;

        //Default response is sign up failed
        responseJson = {
            code: authConstants.AUTH_SIGNUP_FAILED_CODE,
            message: authConstants.AUTH_SIGNUP_FAILED_MESSAGE, 
        }

        //Check if registrating successfully
        authService
            .accountRegistrate(email, password)
            .then(() => {
                responseJson.code = authConstants.SUCCESSFUL_CODE;
                responseJson.message = authConstants.AUTH_SIGNUP_SUCCESS_MESSAGE;
            })
            .catch((error) => {
                // console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });
    })
}

module.exports = {
    login, signUp,
}