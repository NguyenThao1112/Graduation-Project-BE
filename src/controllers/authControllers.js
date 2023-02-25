const authService = require('../services/authServices');
const authConstants = require('../constants/messageConstants');
const {validationResult} = require('express-validator');

/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
function login(request, response) {
    return new Promise((resolve, reject) => {
        const {email, password} = request.body;

        //Default response is login failed
        let responseJson = {
            code: authConstants.AUTH_LOGIN_FAILED_CODE,
            message: authConstants.AUTH_LOGIN_FAILED_MESSAGE, 
        }

        //Check if authenticate successfully
        authService.authenticate(email, password)
            .then((jwt) => {

                //If authenticated success => change the response's data
                if (jwt) {
                    responseJson.code = authConstants.SUCCESSFUL_CODE;
                    responseJson.message = authConstants.AUTH_LOGIN_SUCCESS_MESSAGE;
                    responseJson.token = jwt;
                }

            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
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
            const errorResponse = [];
            errors.array().forEach(error => {
                errorResponse.push({param: error.param, msg: error.msg});
            });
            response.status(400).json({errors: errorResponse});
            return;
        }

        const {email, password} = request.body;

        //Default response is sign up failed
        let responseJson = {
            code: authConstants.AUTH_SIGNUP_FAILED_CODE,
            message: authConstants.AUTH_SIGNUP_FAILED_MESSAGE, 
        }

        //Check if registrating successfully
        authService
            .accountRegistrate(email, password)
            .then(() => {

                //if then => successfully case
                responseJson.code = authConstants.SUCCESSFUL_CODE;
                responseJson.message = authConstants.AUTH_SIGNUP_SUCCESS_MESSAGE;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });
    })
}

module.exports = {
    login, signUp,
}