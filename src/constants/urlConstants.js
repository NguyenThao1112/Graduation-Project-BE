const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envConfig = dotenv.config();
dotenvExpand.expand(envConfig);


module.exports = Object.freeze({
    ROOT_API_URL: '/api/v1',
    
    //All auth api (${API_URL}`) would be `${ROOT_API_URL}${AUTH_PREFIX_API_URL}${API_URL}`    
    AUTH_PREFIX_API_URL: `/auth`,
    AUTH_LOGIN_API_URL: `/login`,
    AUTH_SIGNUP_API_URL: `/signup`,
    AUTH_FORGET_PASSWORD_API_URL: `/forget-password`,
        AUTH_FORGET_PASSWORD_TOKEN_PARAM: 'token',
    AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_API_URL: `/forget-change-password`,

    //ALL Account api
    ACCOUNT_PREFIX_API_URL: `/accounts`,

    //All mentor api (${API_URL}`) would be `${ROOT_API_URL}${MENTOR_PREFIX_API_URL}${API_URL}`    
    MENTOR_PREFIX_API_URL: `/mentors`,
    MENTOR_GET_ALL_URL: `/get-all`,

    //Resources url for mentor API
    MENTOR_RESOURCE_MENTOR_AVATAR: `${process.env.RESOURCE_HOST}/mentor/images/avatar/`,
    
})
