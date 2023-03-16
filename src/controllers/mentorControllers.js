const mentorService = require('../services/mentorServices');
const messageConstants = require('../constants/messageConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');

/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
function getAllMentorsWithBasicInformation(request, response) {
    return new Promise((resolve, reject) => {
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.MENTOR_GET_ALL_INVALID_CODE,
            message: messageConstants.MENTOR_GET_ALL_INVALID_MESSAGE,
        }

        //Try to get all the mentors from the database
        mentorService.getAllMentorsWithBasicInformation()
            .then((mentors) => {

                //If there is a not-null mentors => change the response's data
                if (mentors) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.MENTOR_GET_ALL_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(mentors);
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
function getAllMentorsWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.MENTOR_GET_ALL_PAGINATION_INVALID_CODE,
            message: messageConstants.MENTOR_GET_ALL_PAGINATION_INVALID_MESSAGE,
        }

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.param.pageOffset, 
                request.param.limitSize
            );


        //Try to get all the mentors from the database
        mentorService.getAllMentorsWithPagination(pageOffset, limitSize)
            .then((mentors) => {

                //If there is a not-null mentors => change the response's data
                if (mentors) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.MENTOR_GET_ALL_PAGINATION_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(mentors);
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

module.exports = {
    getAllMentorsWithBasicInformation,
    getAllMentorsWithPagination,
}