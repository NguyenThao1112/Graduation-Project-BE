require('dotenv').config();

module.exports = Object.freeze({
	//App configs
	APP_PORT: process.env.APP_PORT || 3001,
	APP_HOST: process.env.APP_HOST,

	//DB configs
	DB_PORT: process.env.DB_PORT,
	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT,
	SSL: true,
	SOCKET_PATH: process.env.SOCKET_PATH,

	//JWT configs
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRE: process.env.JWT_EXPIRE,

	//Role value
	ROLE_GUEST: 0,
	ROLE_SCHOLAR: 1,
	ROLE_ADMIN: 2,

	//Forget password token expiration
	FORGET_PASSWORD_TOKEN_EXPIRE: 10, //forget password token will expired in 10 minutes before creating,
	LOGIN_TOKEN_EXPIRE: 1,

	//Upload file limiter
	FILE_SIZE: 20,
	FILE_SIZE_LIMIT: 20 * 1024 * 1024, //20 Mb
	ARTICLE_FILE_UPLOAD_ALLOWED_EXT: ['.pdf'],

	API_KEY_GOOGLE_SCHOLAR: process.env.API_KEY_GOOGLE_SCHOLAR,

	SCOPUS_CONFIG: {
		headers: {
			'X-ELS-APIKey': process.env.SCOPUS_API_KEY,
			'X-ELS-Insttoken': process.env.SCOPUS_INSTITUTION_TOKEN,
		},
	},
});
