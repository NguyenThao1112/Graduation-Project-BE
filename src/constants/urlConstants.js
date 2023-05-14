const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envConfig = dotenv.config();
dotenvExpand.expand(envConfig);

module.exports = Object.freeze({
	ROOT_API_URL: '/api/v1',

	//Universal param
	PAGINATION_PAGE_OFFSET_PARAM: 'pageOffset',
	PAGINATION_LIMIT_SIZE_PARAM: 'limitSize',
	
	//Universal path variable
	ID_PATH_VARIABLE: "id",

	//All auth api (${API_URL}`) would be `${ROOT_API_URL}${AUTH_PREFIX_API_URL}${API_URL}`
	AUTH_PREFIX_API_URL: `/auth`,
	AUTH_LOGIN_API_URL: `/login`,
	AUTH_SIGNUP_API_URL: `/signup`,
	AUTH_FORGET_PASSWORD_API_URL: `/forget-password`,
	AUTH_FORGET_PASSWORD_TOKEN_PARAM: 'token',
	AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_API_URL: `/forget-change-password`,

	//ALL Account api
	ACCOUNT_PREFIX_API_URL: `/accounts`,

	//All lecturer api (${API_URL}`) would be `${ROOT_API_URL}${LECTURER_PREFIX_API_URL}${API_URL}`
	LECTURER_PREFIX_API_URL: `/lecturers`,
	LECTURER_GET_ONE_LECTURER: `/detail/:id`,
	LECTURER_GET_ALL_URL: `/fetch-all`,
	LECTURER_GET_ALL_PAGINATION_URL: `/fetch`,
	LECTURER_CREATE_URL: '/create',
	LECTURER_UPDATE_URL: '/:id/update',
	LECTURER_DELETE_URL: '/delete',
	LECTURER_PAGE_SIZE: '/page-size',

	//Resources url for lectureRr API
	LECTURER_RESOURCE_LECTURER_AVATAR: `${process.env.RESOURCE_HOST}/lecturer/images/avatar/`,

	//Configuration API
	CONFIG_PREFIX_API_URL: `/configs`,

	//Contact types API
	CONFIG_CONTACT_TYPE_API_URL: `/contact-type`,
	CONFIG_CONTACT_TYPE_GET_WITH_PAGINATION: `/fetch`,
	CONFIG_CONTACT_TYPE_GET_ALL: `/fetch-all`,
	CONFIG_CONTACT_TYPE_CREATE: `/create`,
	CONFIG_CONTACT_TYPE_UPDATE: `/:id/update`,
	CONFIG_CONTACT_TYPE_DELETE: `/delete`,

	//Academic ranks API
	CONFIG_ACADEMIC_RANK_API_URL: `/academic-rank`,
	CONFIG_ACADEMIC_RANK_GET_WITH_PAGINATION: `/fetch`,
	CONFIG_ACADEMIC_RANK_GET_ALL: `/fetch-all`,
	CONFIG_ACADEMIC_RANK_CREATE: `/create`,
	CONFIG_ACADEMIC_RANK_UPDATE: `/:id/update`,
	CONFIG_ACADEMIC_RANK_DELETE: `/delete`,

	//Academic titles API
	CONFIG_ACADEMIC_TITLE_API_URL: `/academic-title`,
	CONFIG_ACADEMIC_TITLE_GET_WITH_PAGINATION: `/fetch`,
	CONFIG_ACADEMIC_TITLE_GET_ALL: `/fetch-all`,
	CONFIG_ACADEMIC_TITLE_CREATE: `/create`,
	CONFIG_ACADEMIC_TITLE_UPDATE: `/:id/update`,
	CONFIG_ACADEMIC_TITLE_DELETE: `/delete`,

	//Tags API
	CONFIG_TAG_API_URL: `/tag`,
	CONFIG_TAG_GET_WITH_PAGINATION: `/fetch`,
	CONFIG_TAG_GET_ALL: `/fetch-all`,
	CONFIG_TAG_CREATE: `/create`,
	CONFIG_TAG_UPDATE: `/:id/update`,
	CONFIG_TAG_DELETE: `/delete`,

	//Article API
	//Resources url for article API
	ARTICLE_RESOURCE_ARTICLE_FILE: `${process.env.RESOURCE_PATH}/article/`,
	ARTICLE_PREFIX_API_URL: `/articles`,
	ARTICLE_GET_ONE_ARTICLE: `/detail/:id`,
	ARTICLE_GET_WITH_PAGINATION: `/fetch`,
	ARTICLE_GET_ALL_WITH_LECTURER_ID: `/fetch-all/`,
	ARTICLE_CREATE: `/create`,
	ARTICLE_UPDATE: `/:id/update`,
	ARTICLE_DELETE: `/delete`,
	ARTICLE_PAGE_SIZE: `/page-size`,

	// Report API
	REPORT_PREFIX_API_URL: `/report`,
	REPORT_SCOPUS_GET_ALL: `/scopus`,
	SAVE_ONE_AUTHOR_GOOGLE_SCHOLAR: `/google-scholar/author`,
	SAVE_ALL_CITATION_GOOGLE_SCHOLAR: `/google-scholar/citation`,
	//Report types AP

	//Activity type API
	CONFIG_ACTIVITY_TYPE_API_URL: `/activity-type`,
	CONFIG_ACTIVITY_TYPE_GET_WITH_PAGINATION: `/fetch`,
	CONFIG_ACTIVITY_TYPE_GET_ALL: `/fetch-all`,
	CONFIG_ACTIVITY_TYPE_CREATE: `/create`,
	CONFIG_ACTIVITY_TYPE_UPDATE: `/:id/update`,
	CONFIG_ACTIVITY_TYPE_DELETE: `/delete`,

	//University API
	CONFIG_UNIVERSITY_API_URL: `/university`,
	CONFIG_UNIVERSITY_GET_WITH_PAGINATION: `/fetch`,
	CONFIG_UNIVERSITY_GET_ALL: `/fetch-all`,
	CONFIG_UNIVERSITY_CREATE: `/create`,
	CONFIG_UNIVERSITY_UPDATE: `/:id/update`,
	CONFIG_UNIVERSITY_DELETE: `/delete`,

	//Scopus API
	SCOPUS_PREFIX_API_URL: "/scopus",
	SCOPUS_GET_AUTHORS_BY_NAME_URL: '/author',
	SCOPUS_GET_DETAIL_AUTHOR_URL: '/author/:scopus_id/',
})
