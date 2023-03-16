const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envConfig = dotenv.config();
dotenvExpand.expand(envConfig);


module.exports = Object.freeze({
    ROOT_API_URL: '/api/v1',
    
    //Universal param
    PAGINATION_PAGE_OFFSET_PARAM: 'pageOffset',
    PAGINATION_LIMIT_SIZE_PARAM: 'limitSize',

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
        MENTOR_GET_ALL_URL: `/fetch-all`,
        MENTOR_GET_ALL_PAGINATION_URL: `/fetch`,
        //Resources url for mentor API
        MENTOR_RESOURCE_MENTOR_AVATAR: `${process.env.RESOURCE_HOST}/mentor/images/avatar/`,

    //Configuration API
    CONFIG_PREFIX_API_URL: `/configs`,
        CONFIG_CONTACT_TYPE_API_URL: `/contact-type`,  //Contact types API
        CONFIG_CONTACT_TYPE_GET_WITH_PAGINATION: `/fetch`,
            //Using PAGINATION_PAGE_OFFSET_PARAM and PAGINATION_LIMIT_SIZE_PARAM instead
            // CONFIG_CONTACT_TYPE_PAGEOFFSET_PARAM: `pageOffset`,
            // CONFIG_CONTACT_TYPE_LIMITSIZE_PARAM: `limitSize`,
            
        CONFIG_CONTACT_TYPE_GET_ALL: `/fetch-all`,
})
