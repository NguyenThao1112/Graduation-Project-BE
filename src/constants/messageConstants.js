module.exports = Object.freeze({
	//Error codes
	UNEXPECTED_ERROR_MSG: 'Unexpected error',
	UNEXPECTED_ERROR_CODE: -1,
	SUCCESSFUL_CODE: 0,
	FAILED_CODE: 1,

	//Login's
	AUTH_LOGIN_FAILED_CODE: 1,
	AUTH_LOGIN_SUCCESS_MESSAGE: 'Authenticate successfully',
	AUTH_LOGIN_FAILED_MESSAGE: 'Authenticate failed',

	//Registration's
	AUTH_SIGNUP_FAILED_CODE: 1,
	AUTH_SIGNUP_SUCCESS_MESSAGE: 'Registrate successfully',
	AUTH_SIGNUP_FAILED_MESSAGE: 'Something went wrong on registration',

	//Forget password's
	AUTH_FORGET_PASSWORD_FAILED_CODE: 1,
	AUTH_FORGET_PASSWORD_SUCCESS_MESSAGE:
		'Please login to the email for reseting password',
	AUTH_FORGET_PASSWORD_FAILED_MESSAGE:
		'There is something wrong on forgot password feature',

	//Forget password token verify's
	AUTH_FORGET_PASSWORD_VERIFY_INVALID_CODE: 1,
	AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_CODE: 2,
	AUTH_FORGET_PASSWORD_VERIFY_SUCCESS_MESSAGE: 'The token is valid',
	AUTH_FORGET_PASSWORD_VERIFY_INVALID_MESSAGE: 'Invalid token',
	AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_MESSAGE: 'Expired token',

	//Change password after forgeting password
	AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_CODE: 1,
	AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_EXPIRE_CODE: 2,
	AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_INVALID_MESSAGE: 'Invalid token',
	AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_EXPIRE_MESSAGE: 'Expired token',

	AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_SUCCESS_MESSAGE:
		'The password has been changed',

	//JWT's
	AUTH_JWT_SUCCESS_CODE: 0,
	AUTH_JWT_INVALID_TOKEN_CODE: 1,
	AUTH_JWT_UNAUTHORIZE_CODE: 2,
	AUTH_JWT_INVALID_TOKEN_MESSAGE: 'Access denied! Invalid token',
	AUTH_JWT_UNAUTHORIZE_MESSAGE: 'Access denied! Unauthorized',

	//Validator's
	VAL_IS_REQUIRED_MESSAGE: 'is required',
	VAL_IS_BEING_USED_MESSAGE: 'is being used',
	VAL_IS_NOT_EMAIL_MESSAGE: 'must have email format',
	VAL_IS_NOT_MATCHED_MESSAGE: 'do not match',
	VAL_IS_NOT_EXISTED: 'is not existed',
	VAL_IS_NOT_POSTITIVE_INTEGER_GREATER_THAN_0:
		'is not an positive integer greater than 0',

	//Accounts
	ACCOUNT_GET_ALL_SUCCESS_MESSAGE: 'Get accounts successfully!',
	ACCOUNT_GET_ALL_FAILED_MESSAGE: 'Get accounts failed!',
	ACCOUNT_CREATE_SUCCESS_MESSAGE: 'Create account successfully!',
	ACCOUNT_CREATE_FAILED_MESSAGE: 'Create account failed!',
	ACCOUNT_DELETE_SUCCESS_MESSAGE: 'Delete account successfully!',
	ACCOUNT_DELETE_FAILED_MESSAGE: 'Delete account failed!',

	//Get all lecturers API
	LECTURER_GET_ALL_INVALID_CODE: 1,
	LECTURER_GET_ONE_LECTURER_FAILED_MESSAGE: 'Get one lecturer failed!',
	LECTURER_GET_ONE_LECTURER_SUCCESS_MESSAGE: 'Get one lecturer successfully!',
	LECTURER_GET_ALL_INVALID_MESSAGE: 'Get lecturers failed',
	LECTURER_GET_ALL_SUCCESS_MESSAGE:
		'Fetch the lecturer from database successfully',
	LECTURER_CREATE_SUCCESS_MESSAGE: 'Create lecturer successfully!',
	LECTURER_CREATE_FAILED_MESSAGE: 'Failed to create lecturer!',
	LECTURER_UPDATE_FAILED_MESSAGE: 'Failed yo update lecturer!',
	LECTURER_UPDATE_SUCCESS_MESSAGE: 'Update lecturer successfully!',
	LECTURER_DELETE_SUCCESS_MESSAGE: 'Delete lecturer successfully!',
	LECTURER_DELETE_FAILED_MESSAGE: 'Delete lecturer failed',
	LECTURER_GET_PAGING_SIZE_SUCCESS_MESSAGE: "Get paging size successfully",
	LECTURER_GET_PAGING_COUNT_FAILED_MESSAGE: "Get paging count failed",

	//Get all LECTURERs with pagination API
	LECTURER_GET_ALL_PAGINATION_INVALID_CODE: 1,
	LECTURER_GET_ALL_PAGINATION_INVALID_MESSAGE:
		'Something went wrong from the backend',
	LECTURER_GET_ALL_PAGINATION_SUCCESS_MESSAGE: 'Get lecturers successfully',

	//Configuration APIs
	//Contact type API
	CONFIG_CONTACT_TYPE_INVALID_CODE: 1,
	CONFIG_CONTACT_TYPE_UPDATED_NOT_EXISTS_CODE: 2,
	CONFIG_CONTACT_TYPE_DELETED_NOT_ALL_CODE: 2,
	CONFIG_CONTACT_TYPE_INVALID_MESSAGE: 'Something went wrong from the backend',

	CONFIG_CONTACT_TYPE_SUCCESS_MESSAGE: 'Get contact type successfully',
	CONFIG_CONTACT_TYPE_DELETE_SUCCESS_MESSAGE:
		'Delete the contact types successfully',
	CONFIG_CONTACT_TYPE_CREATE_SUCCESS_MESSAGE: 'Save contact types successfully',
	CONFIG_CONTACT_TYPE_UPDATED_NOT_EXISTS_MESSAGE:
		'The updated contact type is not exists',
	CONFIG_CONTACT_TYPE_DELETED_NOT_ALL_MESSAGE:
		'The number of deleted record is not equal to the input',

	//Academic rank API
	CONFIG_ACADEMIC_RANK_INVALID_CODE: 1,
	CONFIG_ACADEMIC_RANK_UPDATED_NOT_EXISTS_CODE: 2,
	CONFIG_ACADEMIC_RANK_DELETED_NOT_ALL_CODE: 2,
	CONFIG_ACADEMIC_RANK_INVALID_MESSAGE: 'Something went wrong from the backend',

	CONFIG_ACADEMIC_RANK_SUCCESS_MESSAGE: 'Get academic rank successfully',
	CONFIG_ACADEMIC_RANK_DELETE_SUCCESS_MESSAGE:
		'Delete the academic ranks successfully',
	CONFIG_ACADEMIC_RANK_CREATE_SUCCESS_MESSAGE:
		'Save academic ranks successfully',
	CONFIG_ACADEMIC_RANK_UPDATED_NOT_EXISTS_MESSAGE:
		'The updated academic rank is not exists',
	CONFIG_ACADEMIC_RANK_DELETED_NOT_ALL_MESSAGE:
		'The number of deleted record is not equal to the input',

	//Academic title API
	CONFIG_ACADEMIC_TITLE_INVALID_CODE: 1,
	CONFIG_ACADEMIC_TITLE_UPDATED_NOT_EXISTS_CODE: 2,
	CONFIG_ACADEMIC_TITLE_DELETED_NOT_ALL_CODE: 2,
	CONFIG_ACADEMIC_TITLE_INVALID_MESSAGE:
		'Something went wrong from the backend',

	CONFIG_ACADEMIC_TITLE_SUCCESS_MESSAGE: 'Get academic title successfully',
	CONFIG_ACADEMIC_TITLE_DELETE_SUCCESS_MESSAGE:
		'Delete the academic titles successfully',
	CONFIG_ACADEMIC_TITLE_CREATE_SUCCESS_MESSAGE:
		'Save academic titles successfully',
	CONFIG_ACADEMIC_TITLE_UPDATED_NOT_EXISTS_MESSAGE:
		'The updated academic title is not exists',
	CONFIG_ACADEMIC_TITLE_DELETED_NOT_ALL_MESSAGE:
		'The number of deleted record is not equal to the input',

	//Tag API
	CONFIG_TAG_INVALID_CODE: 1,
	CONFIG_TAG_UPDATED_NOT_EXISTS_CODE: 2,
	CONFIG_TAG_DELETED_NOT_ALL_CODE: 2,
	CONFIG_TAG_INVALID_MESSAGE: 'Something went wrong from the backend',

	CONFIG_TAG_SUCCESS_MESSAGE: 'Get tag successfully',
	CONFIG_TAG_DELETE_SUCCESS_MESSAGE: 'Delete the tags successfully',
	CONFIG_TAG_CREATE_SUCCESS_MESSAGE: 'Save tags successfully',
	CONFIG_TAG_UPDATED_NOT_EXISTS_MESSAGE: 'The updated tag is not exists',
	CONFIG_TAG_DELETED_NOT_ALL_MESSAGE:
		'The number of deleted record is not equal to the input',

	//Activity type API
	CONFIG_ACTIVITY_TYPE_INVALID_CODE: 1,
	CONFIG_ACTIVITY_TYPE_UPDATED_NOT_EXISTS_CODE: 2,
	CONFIG_ACTIVITY_TYPE_DELETED_NOT_ALL_CODE: 2,
	CONFIG_ACTIVITY_TYPE_INVALID_MESSAGE: 'Something went wrong from the backend',

	CONFIG_ACTIVITY_TYPE_SUCCESS_MESSAGE: 'Get activity type successfully',
	CONFIG_ACTIVITY_TYPE_DELETE_SUCCESS_MESSAGE:
		'Delete the activity types successfully',
	CONFIG_ACTIVITY_TYPE_CREATE_SUCCESS_MESSAGE:
		'Save activity types successfully',
	CONFIG_ACTIVITY_TYPE_UPDATED_NOT_EXISTS_MESSAGE:
		'The updated activity type is not exists',
	CONFIG_ACTIVITY_TYPE_DELETED_NOT_ALL_MESSAGE:
		'The number of deleted record is not equal to the input',

	//University API
	CONFIG_UNIVERSITY_INVALID_CODE: 1,
	CONFIG_UNIVERSITY_UPDATED_NOT_EXISTS_CODE: 2,
	CONFIG_UNIVERSITY_DELETED_NOT_ALL_CODE: 2,
	CONFIG_UNIVERSITY_INVALID_MESSAGE: 'Something went wrong from the backend',

	CONFIG_UNIVERSITY_SUCCESS_MESSAGE: 'Get university successfully',
	CONFIG_UNIVERSITY_DELETE_SUCCESS_MESSAGE:
		'Delete the universities successfully',
	CONFIG_UNIVERSITY_CREATE_SUCCESS_MESSAGE: 'Save universities successfully',
	CONFIG_UNIVERSITY_UPDATED_NOT_EXISTS_MESSAGE:
		'The updated university is not exists',
	CONFIG_UNIVERSITY_DELETED_NOT_ALL_MESSAGE:
		'The number of deleted record is not equal to the input',

	//Article APIs
	ARTICLE_INVALID_CODE: 1,
	ARTICLE_SAVED_OVERLIMIT_FILE_SIZE_CODE: 2,
	ARTICLE_SAVED_INVALID_EXTENSIONS_FILE: 3,
	ARTICLE_UPDATED_NOT_EXISTS_CODE: 4,
	ARTICLE_INVALID_MESSAGE: 'Something went wrong from the backend',
	ARTICLE_CREATE_SUCCESS_MESSAGE: 'Save article successfully',
	ARTICLE_UPDATE_SUCCESS_MESSAGE: 'Update article successfully',
	ARTICLE_DELETE_SUCCESS_MESSAGE: 'Delete article(s) successfully',
	ARTICLE_GET_SUCCESS_MESSAGE: 'Get article successfully',
	ARTICLE_GET_PAGING_SIZE_SUCCESS_MESSAGE: "Get paging size successfully",
});
