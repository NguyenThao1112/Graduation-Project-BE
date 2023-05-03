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
					// responseJson.data = JSON.stringify(contactTypes);
                    responseJson.data = contactTypes;

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
                    // responseJson.data = JSON.stringify(contactTypes);
                    responseJson.data = contactTypes;

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
                    // responseJson.data = JSON.stringify(academicRanks);
                    responseJson.data = academicRanks;

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
                    // responseJson.data = JSON.stringify(academicRanks);
                    responseJson.data = academicRanks;
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
                    // responseJson.data = JSON.stringify(academicTitles);
                    responseJson.data = academicTitles;

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
                    // responseJson.data = JSON.stringify(academicTitles);
                    responseJson.data = academicTitles;

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

/****************************************************************
 *******************************TAG******************************
 ****************************************************************/

/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function getTagsWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_TAG_INVALID_CODE,
            message: messageConstants.CONFIG_TAG_INVALID_MESSAGE,
        }

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.query.pageOffset, 
                request.query.limitSize
            );

        //Try to get all the tags from the database
        configurationService.getTagWithPagination(pageOffset, limitSize)
            .then((tags) => {

                //If there is a not-null tags => change the response's data
                if (tags) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_TAG_SUCCESS_MESSAGE;
                    // responseJson.data = JSON.stringify(tags);
                    responseJson.data = tags;

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
function getAllTags(request, response) {
    return new Promise((resolve, reject) => {

        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_TAG_INVALID_CODE,
            message: messageConstants.CONFIG_TAG_INVALID_MESSAGE,
        }

        //Try to get all the tags from the database
        configurationService.getAllTag()
            .then((tags) => {

                //If there is a not-null tags => change the response's data
                if (tags) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_TAG_SUCCESS_MESSAGE;
                    // responseJson.data = JSON.stringify(tags);
                    responseJson.data = tags;

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
 * Create multiple tags at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createTags(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_TAG_INVALID_CODE,
            message: messageConstants.CONFIG_TAG_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;

        configurationService.createTags(data)
            .then((tagIds) => {

                //If there is a not empty id array => change the response's data
                if (tagIds.length > 0) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_TAG_CREATE_SUCCESS_MESSAGE;
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
 * Update a tag
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function updateTag(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_TAG_INVALID_CODE,
            message: messageConstants.CONFIG_TAG_INVALID_MESSAGE,
        }

        const updatedTag = request.body;

        configurationService.updateTag(updatedTag)
            .then((tag) => {

                //If there is a not-null tag => change the response's data
                if (tag) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_TAG_CREATE_SUCCESS_MESSAGE;
                }

            })
            .catch(error => {
                if (null === error) {
                    responseJson.code = messageConstants.CONFIG_TAG_UPDATED_NOT_EXISTS_CODE;
                    responseJson.message = messageConstants.CONFIG_TAG_UPDATED_NOT_EXISTS_MESSAGE;
                    error = messageConstants.CONFIG_TAG_UPDATED_NOT_EXISTS_MESSAGE;
                }
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
}


/**
 * Delete multiple tags at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function deleteTags(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_TAG_INVALID_CODE,
            message: messageConstants.CONFIG_TAG_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;
        const ids = data.map(data => data.id);

        configurationService.deleteTags(ids)
            .then((deleteCount) => {

                const originalSize = data.length;

                //If number of delete record is equal to the input size
                if (deleteCount === originalSize) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_TAG_DELETE_SUCCESS_MESSAGE;
                } else {
                    responseJson.code = messageConstants.CONFIG_TAG_DELETED_NOT_ALL_CODE;
                    responseJson.message =`${messageConstants.CONFIG_TAG_DELETED_NOT_ALL_MESSAGE}: ${deleteCount}/${originalSize}`;
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
 ***********************ACTIVITY TYPE****************************
 ****************************************************************/


/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function getActivityTypesWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_MESSAGE,
        }

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.query.pageOffset, 
                request.query.limitSize
            );

        //Try to get all the activity types from the database
        configurationService.getActivityTypeWithPagination(pageOffset, limitSize)
            .then((activityTypes) => {

                //If there is a not-null activity types => change the response's data
                if (activityTypes) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACTIVITY_TYPE_SUCCESS_MESSAGE;
                    // responseJson.data = JSON.stringify(activityTypes);
                    responseJson.data = activityTypes;

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
function getAllActivityTypes(request, response) {
    return new Promise((resolve, reject) => {

        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_MESSAGE,
        }

        //Try to get all the activity types from the database
        configurationService.getAllActivityType()
            .then((activityTypes) => {

                //If there is a not-null activity types => change the response's data
                if (activityTypes) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACTIVITY_TYPE_SUCCESS_MESSAGE;
                    // responseJson.data = JSON.stringify(activityTypes);
                    responseJson.data = activityTypes;

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
 * Create multiple activity types at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createActivityTypes(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;

        configurationService.createActivityTypes(data)
            .then((activityTypeIds) => {

                //If there is a not empty id array => change the response's data
                if (activityTypeIds.length > 0) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACTIVITY_TYPE_CREATE_SUCCESS_MESSAGE;
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
 * Update a activity type
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function updateActivityType(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_MESSAGE,
        }

        const updatedActivityType = request.body;

        configurationService.updateActivityType(updatedActivityType)
            .then((activityType) => {

                //If there is a not-null activity type => change the response's data
                if (activityType) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACTIVITY_TYPE_CREATE_SUCCESS_MESSAGE;
                }

            })
            .catch(error => {
                if (null === error) {
                    responseJson.code = messageConstants.CONFIG_ACTIVITY_TYPE_UPDATED_NOT_EXISTS_CODE;
                    responseJson.message = messageConstants.CONFIG_ACTIVITY_TYPE_UPDATED_NOT_EXISTS_MESSAGE;
                    error = messageConstants.CONFIG_ACTIVITY_TYPE_UPDATED_NOT_EXISTS_MESSAGE;
                }
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
}


/**
 * Delete multiple activity types at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function deleteActivityTypes(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_CODE,
            message: messageConstants.CONFIG_ACTIVITY_TYPE_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;
        const ids = data.map(data => data.id);

        configurationService.deleteActivityTypes(ids)
            .then((deleteCount) => {

                const originalSize = data.length;

                //If number of delete record is equal to the input size
                if (deleteCount === originalSize) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_ACTIVITY_TYPE_DELETE_SUCCESS_MESSAGE;
                } else {
                    responseJson.code = messageConstants.CONFIG_ACTIVITY_TYPE_DELETED_NOT_ALL_CODE;
                    responseJson.message =`${messageConstants.CONFIG_ACTIVITY_TYPE_DELETED_NOT_ALL_MESSAGE}: ${deleteCount}/${originalSize}`;
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
 *************************UNIVERSITY*****************************
 ****************************************************************/


/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function getUniversitiesWithPagination(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_UNIVERSITY_INVALID_CODE,
            message: messageConstants.CONFIG_UNIVERSITY_INVALID_MESSAGE,
        }

        const [pageOffset, limitSize] = 
            commonHelper.normalizePaginationParam(
                request.query.pageOffset, 
                request.query.limitSize
            );

        //Try to get all the activity types from the database
        configurationService.getUniversityWithPagination(pageOffset, limitSize)
            .then((universities) => {

                //If there is a not-null activity types => change the response's data
                if (universities) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_UNIVERSITY_SUCCESS_MESSAGE;
                    // responseJson.data = JSON.stringify(universities);
                    responseJson.data = universities;

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
function getAllUniversities(request, response) {
    return new Promise((resolve, reject) => {

        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_UNIVERSITY_INVALID_CODE,
            message: messageConstants.CONFIG_UNIVERSITY_INVALID_MESSAGE,
        }

        //Try to get all the activity types from the database
        configurationService.getAllUniversity()
            .then((universities) => {

                //If there is a not-null activity types => change the response's data
                if (universities) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_UNIVERSITY_SUCCESS_MESSAGE;
                    // responseJson.data = JSON.stringify(universities);
                    responseJson.data = universities;

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
 * Create multiple activity types at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function createUniversities(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_UNIVERSITY_INVALID_CODE,
            message: messageConstants.CONFIG_UNIVERSITY_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;

        configurationService.createUniversities(data)
            .then((universityIds) => {

                //If there is a not empty id array => change the response's data
                if (universityIds.length > 0) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_UNIVERSITY_CREATE_SUCCESS_MESSAGE;
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
 * Update a activity type
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function updateUniversity(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_UNIVERSITY_INVALID_CODE,
            message: messageConstants.CONFIG_UNIVERSITY_INVALID_MESSAGE,
        }

        const updatedUniversity = request.body;

        configurationService.updateUniversity(updatedUniversity)
            .then((university) => {

                //If there is a not-null activity type => change the response's data
                if (university) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_UNIVERSITY_CREATE_SUCCESS_MESSAGE;
                }

            })
            .catch(error => {
                if (null === error) {
                    responseJson.code = messageConstants.CONFIG_UNIVERSITY_UPDATED_NOT_EXISTS_CODE;
                    responseJson.message = messageConstants.CONFIG_UNIVERSITY_UPDATED_NOT_EXISTS_MESSAGE;
                    error = messageConstants.CONFIG_UNIVERSITY_UPDATED_NOT_EXISTS_MESSAGE;
                }
                console.log(error);
            })
            .finally(() => {
                response.json(responseJson);
            });

    });
    
}


/**
 * Delete multiple activity types at the same time
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @returns {Promise}  
 */
 function deleteUniversities(request, response) {
    return new Promise((resolve, reject) => {

        //Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}
        
        //Default response is error response
        let responseJson = {
            code: messageConstants.CONFIG_UNIVERSITY_INVALID_CODE,
            message: messageConstants.CONFIG_UNIVERSITY_INVALID_MESSAGE,
        }

        //Get the "data" property
        const {data} = request.body;
        const ids = data.map(data => data.id);

        configurationService.deleteUniversities(ids)
            .then((deleteCount) => {

                const originalSize = data.length;

                //If number of delete record is equal to the input size
                if (deleteCount === originalSize) {
                    responseJson.code = messageConstants.SUCCESSFUL_CODE;
                    responseJson.message = messageConstants.CONFIG_UNIVERSITY_DELETE_SUCCESS_MESSAGE;
                } else {
                    responseJson.code = messageConstants.CONFIG_UNIVERSITY_DELETED_NOT_ALL_CODE;
                    responseJson.message =`${messageConstants.CONFIG_UNIVERSITY_DELETED_NOT_ALL_MESSAGE}: ${deleteCount}/${originalSize}`;
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

    //Tags
    getTagsWithPagination,
    getAllTags,
    createTags,
    updateTag,
    deleteTags,

    //Activity types
    getActivityTypesWithPagination,
    getAllActivityTypes,
    createActivityTypes,
    updateActivityType,
    deleteActivityTypes,

    //Universities
    getUniversitiesWithPagination,
    getAllUniversities,
    createUniversities,
    updateUniversity,
    deleteUniversities,
}
