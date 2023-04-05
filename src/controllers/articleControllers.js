const articleService = require('../services/articleServices/createArticleServices');
const messageConstants = require('../constants/messageConstants');
const queryConstants = require('../constants/queryConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');


/**
 * Create an article
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createArticle(request, response) {
    const uploadArticleFiles = request.files?? null;
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.ARTICLE_INVALID_CODE,
            message: messageConstants.ARTICLE_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;
        const articleObject = JSON.parse(data);

        articleService.createArticle(articleObject, uploadArticleFiles).then((articleId) => {

                //If there is a not empty id => change the response's data
                if (null !== articleId) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.ARTICLE_CREATE_SUCCESS_MESSAGE;
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
    createArticle,
}
