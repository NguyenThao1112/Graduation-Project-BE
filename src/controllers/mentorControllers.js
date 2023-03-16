const mentorService = require('../services/mentorServices');
const messageConstants = require('../constants/messageConstants');

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

module.exports = {
    getAllMentorsWithBasicInformation,
}