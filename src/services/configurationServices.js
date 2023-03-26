const configurationDAO = require('../daos/configurationDAO');


/****************************************************************
 ***********************CONTACT TYPE*****************************
 ****************************************************************/

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


/****************************************************************
 ***********************ACADEMIC RANK*****************************
 ****************************************************************/


/**
 * Get academic rank with pagination
 * 
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * 
 * @return {Promise}
 *  
 */
 function getAcademicRankWithPagination(pageOffset, limitSize) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;

    return new Promise((resolve, reject) => {
        configurationDAO.getAcademicRankWithPagination(recordOffset, limitSize)
            .then(academicRanks => {
                resolve(academicRanks);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Get all the academic rank, but with only its id and name
 * 
 * @return {Promise}
 *  
 */
function getAllAcademicRank() {

    return new Promise((resolve, reject) => {
        configurationDAO.getAllAcademicRank()
            .then(academicRanks => {
                resolve(academicRanks);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * create multiple academic ranks at the same time
 * @param {Array<Object{name: string}>} academicRanks
 * @return {Promise}
 *  
 */
 function createAcademicRanks(academicRanks) {

    return new Promise((resolve, reject) => {
        configurationDAO.createAcademicRanks(academicRanks)
            .then(academicRankIds => {
                resolve(academicRankIds);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Update a academic rank
 * @param {Object{id: number, name: string}} academicRank
 * @return {Promise}
 *  
 */
 function updateAcademicRank(academicRank) {

    return new Promise((resolve, reject) => {
        configurationDAO.getAcademicRankById(academicRank.id)
            .then(foundAcademicRank => {

                //The updated academic rank is not existed
                //  => throw error
                if(foundAcademicRank.length <= 0) {
                    reject(null);
                    return
                }

                return configurationDAO.updateAcademicRank(academicRank);
            })
            .catch(error => {
                reject(error);
            })
            .then(updatedAcademicRank => {
                resolve(updatedAcademicRank);
            })

    })
}


/**
 * delete multiple academic ranks at the same time with academic ranks' ids
 * @param {Array<number>} academicRankIds
 * @return {Promise}
 *  
 */
 function deleteAcademicRanks(academicRankIds) {

    return new Promise((resolve, reject) => {
        configurationDAO.deleteAcademicRanks(academicRankIds)
            .then(deleteCount => {
                resolve(deleteCount);
            })
            .catch(error => {
                reject(error);
            })

    })
}


/****************************************************************
 ***********************ACADEMIC TITLE*****************************
 ****************************************************************/


/**
 * Get academic title with pagination
 * 
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * 
 * @return {Promise}
 *  
 */
 function getAcademicTitleWithPagination(pageOffset, limitSize) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;

    return new Promise((resolve, reject) => {
        configurationDAO.getAcademicTitleWithPagination(recordOffset, limitSize)
            .then(academicTitles => {
                resolve(academicTitles);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Get all the academic title, but with only its id and name
 * 
 * @return {Promise}
 *  
 */
function getAllAcademicTitle() {

    return new Promise((resolve, reject) => {
        configurationDAO.getAllAcademicTitle()
            .then(academicTitles => {
                resolve(academicTitles);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * create multiple academic titles at the same time
 * @param {Array<Object{name: string}>} academicTitles
 * @return {Promise}
 *  
 */
 function createAcademicTitles(academicTitles) {

    return new Promise((resolve, reject) => {
        configurationDAO.createAcademicTitles(academicTitles)
            .then(academicTitleIds => {
                resolve(academicTitleIds);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Update a academic title
 * @param {Object{id: number, name: string}} academicTitle
 * @return {Promise}
 *  
 */
 function updateAcademicTitle(academicTitle) {

    return new Promise((resolve, reject) => {
        configurationDAO.getAcademicTitleById(academicTitle.id)
            .then(foundAcademicTitle => {

                //The updated academic title is not existed
                //  => throw error
                if(foundAcademicTitle.length <= 0) {
                    reject(null);
                    return
                }

                return configurationDAO.updateAcademicTitle(academicTitle);
            })
            .catch(error => {
                reject(error);
            })
            .then(updatedAcademicTitle => {
                resolve(updatedAcademicTitle);
            })

    })
}


/**
 * delete multiple academic titles at the same time with academic titles' ids
 * @param {Array<number>} academicTitleIds
 * @return {Promise}
 *  
 */
 function deleteAcademicTitles(academicTitleIds) {

    return new Promise((resolve, reject) => {
        configurationDAO.deleteAcademicTitles(academicTitleIds)
            .then(deleteCount => {
                resolve(deleteCount);
            })
            .catch(error => {
                reject(error);
            })

    })
}


/****************************************************************
 *****************************TAG********************************
 ****************************************************************/

/**
 * Get tag with pagination
 * 
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * 
 * @return {Promise}
 *  
 */
function getTagWithPagination(pageOffset, limitSize) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;

    return new Promise((resolve, reject) => {
        configurationDAO.getTagWithPagination(recordOffset, limitSize)
            .then(tags => {
                resolve(tags);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Get all the tag, but with only its id and name
 * 
 * @return {Promise}
 *  
 */
function getAllTag() {

    return new Promise((resolve, reject) => {
        configurationDAO.getAllTag()
            .then(tags => {
                resolve(tags);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * create multiple tags at the same time
 * @param {Array<Object{name: string}>} tags
 * @return {Promise}
 *  
 */
 function createTags(tags) {

    return new Promise((resolve, reject) => {
        configurationDAO.createTags(tags)
            .then(tagIds => {
                resolve(tagIds);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Update a tag
 * @param {Object{id: number, name: string}} tag
 * @return {Promise}
 *  
 */
 function updateTag(tag) {

    return new Promise((resolve, reject) => {
        configurationDAO.getTagById(tag.id)
            .then(foundTag => {

                //The updated tag is not existed
                //  => throw error
                if(foundTag.length <= 0) {
                    reject(null);
                    return
                }

                return configurationDAO.updateTag(tag);
            })
            .catch(error => {
                reject(error);
            })
            .then(updatedTag => {
                resolve(updatedTag);
            })

    })
}


/**
 * delete multiple tags at the same time with tags' ids
 * @param {Array<number>} tagIds
 * @return {Promise}
 *  
 */
 function deleteTags(tagIds) {

    return new Promise((resolve, reject) => {
        configurationDAO.deleteTags(tagIds)
            .then(deleteCount => {
                resolve(deleteCount);
            })
            .catch(error => {
                reject(error);
            })

    })
}

module.exports = {
    
    //Contact types
    getContactTypeWithPagination,
    getAllContactType,
    createContactTypes,
    updateContactType,
    deleteContactTypes,

    //Academic ranks
    getAcademicRankWithPagination,
    getAllAcademicRank,
    createAcademicRanks,
    updateAcademicRank,
    deleteAcademicRanks,

    //Academic titles
    getAcademicTitleWithPagination,
    getAllAcademicTitle,
    createAcademicTitles,
    updateAcademicTitle,
    deleteAcademicTitles,

    //Tags
    getTagWithPagination,
    getAllTag,
    createTags,
    updateTag,
    deleteTags,
}