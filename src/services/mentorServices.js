const mentorDAO = require('../daos/mentorDAO');
const urlConstants = require('../constants/urlConstants');

/**
 * Get all the mentors, with only usable column in the mentor's base table (without join any table)
 * @return {Promise}
 *  
 */
function getAllMentorsWithBasicInformation() {

    const resourcePath = urlConstants.MENTOR_RESOURCE_MENTOR_AVATAR;

    return new Promise((resolve, reject) => {
        mentorDAO.getAllMentorsWithBasicInformation()
            .then(mentors => {
                
                //Add the full url for mentor's avatar image 
                mentors.forEach(function (mentor, index) {

                    //Change the avatarFileName to the full path of resources url
                    avatarFileName = mentors[index].avatar 
                    this[index].avatar = `${resourcePath}/${avatarFileName}`;
                    
                }, mentors)

                resolve(mentors);
            })
            .catch(error => {
                reject(error);
            })

    })
}


/**
 * Get all mentors with pagination
 * 
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * 
 * @return {Promise}
 *  
 */
 function getAllMentorsWithPagination(pageOffset, limitSize) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;

    return new Promise((resolve, reject) => {
        mentorService.getAllMentorsWithPagination(recordOffset, limitSize)
            .then(mentors => {
                resolve(mentors);
            })
            .catch(error => {
                reject(error);
            })

    })
}


module.exports = {
    getAllMentorsWithBasicInformation,
    getAllMentorsWithPagination,
}