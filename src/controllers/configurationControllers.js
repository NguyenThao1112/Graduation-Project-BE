const configurationService = require('../services/configurationServices');
const messageConstants = require('../constants/messageConstants');
const queryConstants = require('../constants/queryConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');

/****************************************************************
 ***********************CONTACT TYPE*****************************
 ****************************************************************/

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
		};

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.query.pageOffset, 
                request.query.limitSize
            );


		//Try to get all the lecturers from the database
		configurationService
			.getContactTypeWithPagination(pageOffset, limitSize)
			.then((contactTypes) => {
				if (contactTypes) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.CONFIG_CONTACT_TYPE_SUCCESS_MESSAGE;
					responseJson.data = JSON.stringify(contactTypes);
				}
			})
			.catch((error) => {
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

        //Try to get all the contact types from the database
        configurationService.getAllContactType()
            .then((contactTypes) => {

                //If there is a not-null contact types => change the response's data
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
 * Create multiple contact types at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createContactTypes(request, response) {
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

        //Get the "data" property
        const {data} = request.body;

        configurationService.createContactTypes(data)
            .then((contactTypeIds) => {

                //If there is a not empty id array => change the response's data
                if (contactTypeIds.length > 0) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_CONTACT_TYPE_CREATE_SUCCESS_MESSAGE;
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
 * Update a contact type
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function updateContactType(request, response) {
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

        const updatedContactType = request.body;

        configurationService.updateContactType(updatedContactType)
            .then((contactType) => {

                //If there is a not-null contact type => change the response's data
                if (contactType) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_CONTACT_TYPE_CREATE_SUCCESS_MESSAGE;
                }

            })
            .catch(error => {
                if (null === error) {
                    responseJson.code = messageConstants.CONFIG_CONTACT_TYPE_UPDATED_NOT_EXISTS_CODE;
                    responseJson.message = messageConstants.CONFIG_CONTACT_TYPE_UPDATED_NOT_EXISTS_MESSAGE;
                    error = messageConstants.CONFIG_CONTACT_TYPE_UPDATED_NOT_EXISTS_MESSAGE;
                }
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
}


/**
 * Delete multiple contact types at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function deleteContactTypes(request, response) {
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

        //Get the "data" property
        const {data} = request.body;
        const ids = data.map(data => data.id);

        configurationService.deleteContactTypes(ids)
            .then((deleteCount) => {

                const originalSize = data.length;

                //If number of delete record is equal to the input size
                if (deleteCount === originalSize) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_CONTACT_TYPE_DELETE_SUCCESS_MESSAGE;
                } else {
                    responseJson.code = messageConstants.CONFIG_CONTACT_TYPE_DELETED_NOT_ALL_CODE;
                    responseJson.message =`${messageConstants.CONFIG_CONTACT_TYPE_DELETED_NOT_ALL_MESSAGE}: ${deleteCount}/${originalSize}`;
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

/****************************************************************
 ***********************ACADEMIC RANK*****************************
 ****************************************************************/


/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function getAcademicRanksWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_MESSAGE,
        }

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.query.pageOffset, 
                request.query.limitSize
            );

        //Try to get all the academic ranks from the database
        configurationService.getAcademicRankWithPagination(pageOffset, limitSize)
            .then((academicRanks) => {

                //If there is a not-null academic ranks => change the response's data
                if (academicRanks) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_RANK_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(academicRanks);
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
function getAllAcademicRanks(request, response) {
    return new Promise((resolve, reject) => {

        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_MESSAGE,
        }

        //Try to get all the academic ranks from the database
        configurationService.getAllAcademicRank()
            .then((academicRanks) => {

                //If there is a not-null academic ranks => change the response's data
                if (academicRanks) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_RANK_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(academicRanks);
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
 * Create multiple academic ranks at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createAcademicRanks(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;

        configurationService.createAcademicRanks(data)
            .then((academicRankIds) => {

                //If there is a not empty id array => change the response's data
                if (academicRankIds.length > 0) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_RANK_CREATE_SUCCESS_MESSAGE;
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
 * Update a academic rank
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function updateAcademicRank(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_MESSAGE,
        }

        const updatedAcademicRank = request.body;

        configurationService.updateAcademicRank(updatedAcademicRank)
            .then((academicRank) => {

                //If there is a not-null academic rank => change the response's data
                if (academicRank) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_RANK_CREATE_SUCCESS_MESSAGE;
                }

            })
            .catch(error => {
                if (null === error) {
                    responseJson.code = messageConstants.CONFIG_ACADEMIC_RANK_UPDATED_NOT_EXISTS_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_RANK_UPDATED_NOT_EXISTS_MESSAGE;
                    error = messageConstants.CONFIG_ACADEMIC_RANK_UPDATED_NOT_EXISTS_MESSAGE;
                }
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
}


/**
 * Delete multiple academic ranks at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function deleteAcademicRanks(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_RANK_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;
        const ids = data.map(data => data.id);

        configurationService.deleteAcademicRanks(ids)
            .then((deleteCount) => {

                const originalSize = data.length;

                //If number of delete record is equal to the input size
                if (deleteCount === originalSize) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_RANK_DELETE_SUCCESS_MESSAGE;
                } else {
                    responseJson.code = messageConstants.CONFIG_ACADEMIC_RANK_DELETED_NOT_ALL_CODE;
                    responseJson.message =`${messageConstants.CONFIG_ACADEMIC_RANK_DELETED_NOT_ALL_MESSAGE}: ${deleteCount}/${originalSize}`;
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


/****************************************************************
 ***********************ACADEMIC TITLE*****************************
 ****************************************************************/


/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function getAcademicTitlesWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_MESSAGE,
        }

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.query.pageOffset, 
                request.query.limitSize
            );

        //Try to get all the academic titles from the database
        configurationService.getAcademicTitleWithPagination(pageOffset, limitSize)
            .then((academicTitles) => {

                //If there is a not-null academic titles => change the response's data
                if (academicTitles) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_TITLE_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(academicTitles);
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
function getAllAcademicTitles(request, response) {
    return new Promise((resolve, reject) => {

        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_MESSAGE,
        }

        //Try to get all the academic titles from the database
        configurationService.getAllAcademicTitle()
            .then((academicTitles) => {

                //If there is a not-null academic titles => change the response's data
                if (academicTitles) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_TITLE_SUCCESS_MESSAGE;
                    responseJson.data = JSON.stringify(academicTitles);
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
 * Create multiple academic titles at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createAcademicTitles(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;

        configurationService.createAcademicTitles(data)
            .then((academicTitleIds) => {

                //If there is a not empty id array => change the response's data
                if (academicTitleIds.length > 0) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_TITLE_CREATE_SUCCESS_MESSAGE;
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
 * Update a academic title
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function updateAcademicTitle(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_MESSAGE,
        }

        const updatedAcademicTitle = request.body;

        configurationService.updateAcademicTitle(updatedAcademicTitle)
            .then((academicTitle) => {

                //If there is a not-null academic title => change the response's data
                if (academicTitle) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_TITLE_CREATE_SUCCESS_MESSAGE;
                }

            })
            .catch(error => {
                if (null === error) {
                    responseJson.code = messageConstants.CONFIG_ACADEMIC_TITLE_UPDATED_NOT_EXISTS_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_TITLE_UPDATED_NOT_EXISTS_MESSAGE;
                    error = messageConstants.CONFIG_ACADEMIC_TITLE_UPDATED_NOT_EXISTS_MESSAGE;
                }
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
}


/**
 * Delete multiple academic titles at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function deleteAcademicTitles(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_CODE,
            message: messageConstants.CONFIG_ACADEMIC_TITLE_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;
        const ids = data.map(data => data.id);

        configurationService.deleteAcademicTitles(ids)
            .then((deleteCount) => {

                const originalSize = data.length;

                //If number of delete record is equal to the input size
                if (deleteCount === originalSize) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACADEMIC_TITLE_DELETE_SUCCESS_MESSAGE;
                } else {
                    responseJson.code = messageConstants.CONFIG_ACADEMIC_TITLE_DELETED_NOT_ALL_CODE;
                    responseJson.message =`${messageConstants.CONFIG_ACADEMIC_TITLE_DELETED_NOT_ALL_MESSAGE}: ${deleteCount}/${originalSize}`;
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

    //Contact types
    getContactTypesWithPagination,
    getAllContactTypes,
    createContactTypes,
    updateContactType,
    deleteContactTypes,

    //Academic ranks
    getAcademicRanksWithPagination,
    getAllAcademicRanks,
    createAcademicRanks,
    updateAcademicRank,
    deleteAcademicRanks,

    //Academic titles
    getAcademicTitlesWithPagination,
    getAllAcademicTitles,
    createAcademicTitles,
    updateAcademicTitle,
    deleteAcademicTitles,
}

