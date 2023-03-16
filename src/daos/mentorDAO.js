const connection = require("../configs/database");
const queryConstants = require("../constants/queryConstants");

/**
 *  Query to get all the mentors, with only usable column in the mentor base table (without join any table)
 * @return {Promise}
 */
 function getAllMentorsWithBasicInformation() {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name, gender, avatar, DATE_FORMAT(date_of_birth, "%d-%m-%Y"), ${queryConstants.GET_METADATA_QUERY}`, 
            'FROM mentor_information',
            'WHERE is_deleted = false',
        ].join(' ');

        let mentors = null;
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            mentors = results;
            resolve(mentors);
        });
    })
    
}

module.exports = {
    getAllMentorsWithBasicInformation,
}
