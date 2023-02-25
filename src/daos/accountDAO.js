const connection = require("../configs/database");
const configConstants = require("../constants/configConstants");
const moment = require('moment');

/**
 * 
 * @param {string} email
 * @return {Promise}
 */
function getAccountByEmail(email) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            'SELECT id, email, password',
            'FROM account',
            'WHERE email = ?',
            'LIMIT 1'
        ].join(' ');

        let account = null;
        connection.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            account = results;
            resolve(account);
        });
    })
    
}

/**
 * 
 * @param {Object} account
 * @return {Promise}
 */
function createAccount(account) {
    return new Promise(function (resolve, reject) {

        const {email, password} = account;
        const query = 
            [
                'INSERT',
                'INTO account (email, password, created_at, updated_at, is_deleted, role)',
                'VALUES (?, ?, ?, ?, ?, ?)',
            ].join(' ');

        const role = configConstants.ROLE_SCHOLAR;
        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');

        connection.query(query, [email, password, now, now, false, role], function (error, results, fields) {
            
            if (error) {
                reject(error);
                return;
            } 

            resolve();
        });
    });
}

module.exports = {
    getAccountByEmail,
    createAccount,
}