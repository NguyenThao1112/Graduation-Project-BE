const authService = require('../services/authServices');
const authConstants = require('../constants/messageConstants');

function login(request, response) {

    const {username, password} = request;

    //Default response is login failed
    responseJson = {
        code: authConstants.AUTH_LOGIN_FAILED_CODE,
        message: authConstants.AUTH_LOGIN_FAILED_MESSAGE, 
    }

    //Check if authenticate successfully
    const jwt = authService.authenticate(username, password);

    //If authenticated success => change the response's data
    if (jwt) {
        responseJson.code = authConstants.SUCCESSFUL_CODE;
        responseJson.message = authConstants.AUTH_LOGIN_SUCCESS_MESSAGE;
        responseJson.token = jwt;
    }

    response.json(responseJson);
}

module.exports = {
    login,
}