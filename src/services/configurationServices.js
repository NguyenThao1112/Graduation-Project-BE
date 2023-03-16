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


module.exports = {
    getContactTypeWithPagination,
    getAllContactType,
}