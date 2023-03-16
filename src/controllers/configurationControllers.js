const configurationService = require('../services/configurationServices');
const messageConstants = require('../constants/messageConstants');
const queryConstants = require('../constants/queryConstants');
const validatorHelper = require('../helpers/validatorHelper');

/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
function getContactTypesWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_CONTACT_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_CONTACT_TYPE_INVALID_MESSAGE,
        }

        let pageOffset = parseInt(request.query.pageOffset);
        let limitSize =  parseInt(request.query.limitSize);

        if (!pageOffset) {
            pageOffset = queryConstants.DEFAULT_PAGINATION_PAGEOFFSET;
        }

        if (!limitSize) {
            limitSize = queryConstants.DEFAULT_PAGINATION_LIMITSIZE;
        }

        //Try to get all the mentors from the database
        configurationService.getContactTypeWithPagination(pageOffset, limitSize)
            .then((contactTypes) => {

                //If there is a not-null mentors => change the response's data
                if (contactTypes) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_CONTACT_TYPE_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(contactTypes);
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
 function getAllContactTypes(request, response) {
    return new Promise((resolve, reject) => {

        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_CONTACT_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_CONTACT_TYPE_INVALID_MESSAGE,
        }

        //Try to get all the mentors from the database
        configurationService.getAllContactType()
            .then((contactTypes) => {

                //If there is a not-null mentors => change the response's data
                if (contactTypes) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_CONTACT_TYPE_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(contactTypes);
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
    getContactTypesWithPagination,
    getAllContactTypes,
}