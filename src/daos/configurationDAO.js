const connection = require("../configs/database");
const queryConstants = require("../constants/queryConstants");
const moment = require('moment');


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

module.exports = {
    getContactTypeWithPagination,
    getAllContactType,
    createContactTypes,
    getContactTypeById,
    updateContactType,
    deleteContactTypes,
}
