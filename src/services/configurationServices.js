const configurationDAO = require('../daos/configurationDAO');


/**
 * Get contact type with pagination
 * 
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * 
 * @return {Promise}
 *  
 */
function getContactTypeWithPagination(pageOffset, limitSize) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;

    return new Promise((resolve, reject) => {
        configurationDAO.getContactTypeWithPagination(recordOffset, limitSize)
            .then(contactTypes => {
                resolve(contactTypes);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Get all the contact type, but with only its id and name
 * 
 * @return {Promise}
 *  
 */
function getAllContactType() {

    return new Promise((resolve, reject) => {
        configurationDAO.getAllContactType()
            .then(contactTypes => {
                resolve(contactTypes);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * create multiple contacts type at the same time
 * @param {Array<Object{name: string}>} contactTypes
 * @return {Promise}
 *  
 */
 function createContactTypes(contactTypes) {

    return new Promise((resolve, reject) => {
        configurationDAO.createContactTypes(contactTypes)
            .then(contactTypeIds => {
                resolve(contactTypeIds);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Update a contact type
 * @param {Object{id: number, name: string}} contactType
 * @return {Promise}
 *  
 */
 function updateContactType(contactType) {

    return new Promise((resolve, reject) => {
        configurationDAO.getContactTypeById(contactType.id)
            .then(foundContactType => {

                //The updated contact type is not existed
                //  => throw error
                if(foundContactType.length <= 0) {
                    reject(null);
                    return
                }

                return configurationDAO.updateContactType(contactType);
            })
            .catch(error => {
                reject(error);
            })
            .then(updatedContactType => {
                resolve(updatedContactType);
            })

    })
}


/**
 * delete multiple contacts type at the same time with contact types' ids
 * @param {Array<number>} contactTypeIds
 * @return {Promise}
 *  
 */
 function deleteContactTypes(contactTypeIds) {

    return new Promise((resolve, reject) => {
        configurationDAO.deleteContactTypes(contactTypeIds)
            .then(deleteCount => {
                resolve(deleteCount);
            })
            .catch(error => {
                reject(error);
            })

    })
}


module.exports = {
    getContactTypeWithPagination,
    getAllContactType,
    createContactTypes,
    updateContactType,
    deleteContactTypes,
}