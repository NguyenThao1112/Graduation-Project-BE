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
});
