const connection = require("../configs/database");
const queryConstants = require("../constants/queryConstants");
const moment = require('moment');

/****************************************************************
 ***********************CONTACT TYPE*****************************
 ****************************************************************/

/**
 *  Query to get all the contact type: email, phone, linkedin,...
 *  with offset and limit size for pagination
 * 
 * @param {int} offset
 * @param {int} limitSize 
 * @return {Promise}
 */
 function getContactTypeWithPagination(offset, limitSize) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name, created_at, updated_at`, 
            'FROM contact_type',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
            'LIMIT ?, ?',
        ].join(' ');

        let contactTypes = null;
        connection.query(query, [offset, limitSize], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            contactTypes = results;
            resolve(contactTypes);
        });
    })
    
}

/**
 *  Query to get all the contact type: email, phone, linkedin,.. but with only its id and name
 * 
 * @return {Promise}
 */
function getAllContactType() {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM contact_type',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
        ].join(' ');

        let contactTypes = null;
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            contactTypes = results;
            resolve(contactTypes);
        });
    })
    
}


/**
 *  Query to get a contact type by its id
 * @param {number} id
 * @return {Promise}
 */
 function getContactTypeById(id) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM contact_type',
            `WHERE id = ?`,
            'LIMIT 1'
        ].join(' ');

        let contactType = null;
        connection.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            contactType = results;
            resolve(contactType);
        });
    })
    
}

/**
 *  Query to update a contact type
 * @param {Object{id: number, name: string}} contactType
 * @return {Promise}
 */
 function updateContactType(contactType) {
    const {id, name} = contactType;

    return new Promise(function (resolve, reject) {
        const query = 
        [
            'UPDATE contact_type',
			'SET name = ?, updated_at = ?',
			'WHERE id = ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[name, now, id],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve(contactType);
			}
		);
    })
    
}


/**
 *  Query to delete multiple contacts type at the same time with the given ids
 * 
 * @param {Array<number>} ids
 * @return {Promise}
 */
 function deleteContactTypes(ids) {
    return new Promise(function (resolve, reject) {

        //Using in to avoid n + 1 problem
        const query = 
        [
            'UPDATE contact_type',
			'SET is_deleted = ?, updated_at = ?',
			'WHERE id IN (?)',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

        connection.query(query, [true, now, ids], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Number of records are deleted
            const size = result.affectedRows;
            resolve(size);
        });
    })
    
}

/**
 *  Query to create multiple contacts type at the same time
 * 
 * @param {Array<Object{name: string}>} contactTypes
 * @return {Promise}
 */
function createContactTypes(contactTypes) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO contact_type (name, created_at, updated_at, is_deleted)`, 
            'VALUES ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = contactTypes.map(contactType => [contactType.name, now, now, is_deleted]);

        //Using bulk insertion for better performance
        connection.query(query, [values], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Get the id of the created contact types
            const size = result.affectedRows;
            const firstId = result.insertId;
            const aboveMaxId = firstId + size;
            let ids = [];
            for (let i = firstId; i < aboveMaxId; i++) {
                ids.push(i);
            }

            resolve(ids);
        });
    })
    
}

/****************************************************************
 ***********************ACADEMIC RANK*****************************
 ****************************************************************/


/**
 *  Query to get all the academic rank
 *  with offset and limit size for pagination
 * 
 * @param {int} offset
 * @param {int} limitSize 
 * @return {Promise}
 */
 function getAcademicRankWithPagination(offset, limitSize) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name, created_at, updated_at`, 
            'FROM academic_rank',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
            'LIMIT ?, ?',
        ].join(' ');

        let academicRanks = null;
        connection.query(query, [offset, limitSize], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            academicRanks = results;
            resolve(academicRanks);
        });
    })
    
}

/**
 *  Query to get all the academic rank, but with only its id and name
 * 
 * @return {Promise}
 */
function getAllAcademicRank() {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM academic_rank',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
        ].join(' ');

        let academicRanks = null;
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            academicRanks = results;
            resolve(academicRanks);
        });
    })
    
}


/**
 *  Query to get a academic rank by its id
 * @param {number} id
 * @return {Promise}
 */
 function getAcademicRankById(id) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM academic_rank',
            `WHERE id = ?`,
            'LIMIT 1'
        ].join(' ');

        let academicRank = null;
        connection.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            academicRank = results;
            resolve(academicRank);
        });
    })
    
}

/**
 *  Query to update a academic rank
 * @param {Object{id: number, name: string}} academicRank
 * @return {Promise}
 */
 function updateAcademicRank(academicRank) {
    const {id, name} = academicRank;

    return new Promise(function (resolve, reject) {
        const query = 
        [
            'UPDATE academic_rank',
			'SET name = ?, updated_at = ?',
			'WHERE id = ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[name, now, id],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve(academicRank);
			}
		);
    })
    
}


/**
 *  Query to delete multiple academic ranks at the same time with the given ids
 * 
 * @param {Array<number>} ids
 * @return {Promise}
 */
 function deleteAcademicRanks(ids) {
    return new Promise(function (resolve, reject) {

        //Using in to avoid n + 1 problem
        const query = 
        [
            'UPDATE academic_rank',
			'SET is_deleted = ?, updated_at = ?',
			'WHERE id IN (?)',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

        connection.query(query, [true, now, ids], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Number of records are deleted
            const size = result.affectedRows;
            resolve(size);
        });
    })
    
}

/**
 *  Query to create multiple academic ranks at the same time
 * 
 * @param {Array<Object{name: string}>} academicRanks
 * @return {Promise}
 */
function createAcademicRanks(academicRanks) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO academic_rank (name, created_at, updated_at, is_deleted)`, 
            'VALUES ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = academicRanks.map(academicRank => [academicRank.name, now, now, is_deleted]);

        //Using bulk insertion for better performance
        connection.query(query, [values], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Get the id of the created academic ranks
            const size = result.affectedRows;
            const firstId = result.insertId;
            const aboveMaxId = firstId + size;
            let ids = [];
            for (let i = firstId; i < aboveMaxId; i++) {
                ids.push(i);
            }

            resolve(ids);
        });
    })
    
}
 

/****************************************************************
 ***********************ACADEMIC TITLE*****************************
 ****************************************************************/


/**
 *  Query to get all the academic title
 *  with offset and limit size for pagination
 * 
 * @param {int} offset
 * @param {int} limitSize 
 * @return {Promise}
 */
 function getAcademicTitleWithPagination(offset, limitSize) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name, created_at, updated_at`, 
            'FROM academic_title',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
            'LIMIT ?, ?',
        ].join(' ');

        let academicTitles = null;
        connection.query(query, [offset, limitSize], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            academicTitles = results;
            resolve(academicTitles);
        });
    })
    
}

/**
 *  Query to get all the academic title, but with only its id and name
 * 
 * @return {Promise}
 */
function getAllAcademicTitle() {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM academic_title',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
        ].join(' ');

        let academicTitles = null;
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            academicTitles = results;
            resolve(academicTitles);
        });
    })
    
}


/**
 *  Query to get a academic title by its id
 * @param {number} id
 * @return {Promise}
 */
 function getAcademicTitleById(id) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM academic_title',
            `WHERE id = ?`,
            'LIMIT 1'
        ].join(' ');

        let academicTitle = null;
        connection.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            academicTitle = results;
            resolve(academicTitle);
        });
    })
    
}

/**
 *  Query to update a academic title
 * @param {Object{id: number, name: string}} academicTitle
 * @return {Promise}
 */
 function updateAcademicTitle(academicTitle) {
    const {id, name} = academicTitle;

    return new Promise(function (resolve, reject) {
        const query = 
        [
            'UPDATE academic_title',
			'SET name = ?, updated_at = ?',
			'WHERE id = ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[name, now, id],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve(academicTitle);
			}
		);
    })
    
}


/**
 *  Query to delete multiple academic titles at the same time with the given ids
 * 
 * @param {Array<number>} ids
 * @return {Promise}
 */
 function deleteAcademicTitles(ids) {
    return new Promise(function (resolve, reject) {

        //Using in to avoid n + 1 problem
        const query = 
        [
            'UPDATE academic_title',
			'SET is_deleted = ?, updated_at = ?',
			'WHERE id IN (?)',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

        connection.query(query, [true, now, ids], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Number of records are deleted
            const size = result.affectedRows;
            resolve(size);
        });
    })
    
}

/**
 *  Query to create multiple academic titles at the same time
 * 
 * @param {Array<Object{name: string}>} academicTitles
 * @return {Promise}
 */
function createAcademicTitles(academicTitles) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO academic_title (name, created_at, updated_at, is_deleted)`, 
            'VALUES ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = academicTitles.map(academicTitle => [academicTitle.name, now, now, is_deleted]);

        //Using bulk insertion for better performance
        connection.query(query, [values], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Get the id of the created academic titles
            const size = result.affectedRows;
            const firstId = result.insertId;
            const aboveMaxId = firstId + size;
            let ids = [];
            for (let i = firstId; i < aboveMaxId; i++) {
                ids.push(i);
            }

            resolve(ids);
        });
    })
    
}


/****************************************************************
 *******************************TAG******************************
 ****************************************************************/

/**
 *  Query to get all the tag
 *  with offset and limit size for pagination
 * 
 * @param {int} offset
 * @param {int} limitSize 
 * @return {Promise}
 */
 function getTagWithPagination(offset, limitSize) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name, created_at, updated_at`, 
            'FROM tag',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
            'LIMIT ?, ?',
        ].join(' ');

        let tags = null;
        connection.query(query, [offset, limitSize], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            tags = results;
            resolve(tags);
        });
    })
    
}

/**
 *  Query to get all exists tags
 * 
 * @return {Promise}
 */
function getAllTag() {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM tag',
            queryConstants.FILTER_DELETED_RECORD_QUERY,
            `ORDER BY id ASC`,
        ].join(' ');

        let tags = null;
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            tags = results;
            resolve(tags);
        });
    })
    
}


/**
 *  Query to get a tag by its id
 * @param {number} id
 * @return {Promise}
 */
 function getTagById(id) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM tag',
            `WHERE id = ?`,
            'LIMIT 1'
        ].join(' ');

        let tag = null;
        connection.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            tag = results;
            resolve(tag);
        });
    })
    
}

/**
 *  Query to update a tag
 * @param {Object{id: number, name: string}} tag
 * @return {Promise}
 */
 function updateTag(tag) {
    const {id, name} = tag;

    return new Promise(function (resolve, reject) {
        const query = 
        [
            'UPDATE tag',
			'SET name = ?, updated_at = ?',
			'WHERE id = ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

		connection.query(
			query,
			[name, now, id],
			function (error, results, fields) {
				if (error) {
					reject(error);
					return;
				}

				resolve(tag);
			}
		);
    })
    
}


/**
 *  Query to delete multiple tags at the same time with the given ids
 * 
 * @param {Array<number>} ids
 * @return {Promise}
 */
 function deleteTags(ids) {
    return new Promise(function (resolve, reject) {

        //Using in to avoid n + 1 problem
        const query = 
        [
            'UPDATE tag',
			'SET is_deleted = ?, updated_at = ?',
			'WHERE id IN (?)',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

        connection.query(query, [true, now, ids], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Number of records are deleted
            const size = result.affectedRows;
            resolve(size);
        });
    })
    
}

/**
 *  Query to create multiple tags at the same time
 * 
 * @param {Array<Object{name: string}>} tags
 * @return {Promise}
 */
function createTags(tags) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO tag (name, created_at, updated_at, is_deleted)`, 
            'VALUES ?',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = tags.map(tag => [tag.name, now, now, is_deleted]);

        //Using bulk insertion for better performance
        connection.query(query, [values], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Get the id of the created contact types
            const size = result.affectedRows;
            const firstId = result.insertId;
            const aboveMaxId = firstId + size;
            let ids = [];
            for (let i = firstId; i < aboveMaxId; i++) {
                ids.push(i);
            }

            resolve(ids);
        });
    })
    
}

/**
 * Get all the tags with those given names
 * @param {Array<String>} tagNames 
 * @return {Promise} 
 */
function getTagsByNames(tagNames) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT id, name`, 
            'FROM tag',
            `WHERE name IN (?)`,
            'LIMIT 1'
        ].join(' ');

        let tags = null;
        connection.query(query, [tagNames], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            tags = results;
            resolve(tags);
        });
    })
}


module.exports = {

    //Contact types
    getContactTypeWithPagination,
    getAllContactType,
    createContactTypes,
    getContactTypeById,
    updateContactType,
    deleteContactTypes,

    //Academic ranks
    getAcademicRankWithPagination,
    getAllAcademicRank,
    createAcademicRanks,
    getAcademicRankById,
    updateAcademicRank,
    deleteAcademicRanks,

    //Academic titles
    getAcademicTitleWithPagination,
    getAllAcademicTitle,
    createAcademicTitles,
    getAcademicTitleById,
    updateAcademicTitle,
    deleteAcademicTitles,

    //Tags
    getTagWithPagination,
    getAllTag,
    createTags,
    getTagById,
    updateTag,
    deleteTags,
    getTagsByNames,
}
