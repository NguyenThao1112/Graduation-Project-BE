const accountDAO = require('../daos/accountDAO');
const messageConstants = require('../constants/messageConstants');
const configConstants = require('../constants/configConstants');
const authHelper = require('../helpers/authHelper');
const {sign} = require('jsonwebtoken');

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {string} jwt
 *  
 */
function authenticate(email, password) {
    let jwt = null;
    const account = accountDAO.getAccountByEmail(email);
    
    //Account not existed => return empty token
    if (!account) {
        return jwt;
    }

    //Check if the password is correct
    const isPasswordMatched = authHelper.isPasswordMatch(password, account.password);
    if (isPasswordMatched) {
        account.password = undefined;   //not include the account password in jwt's payload
        jwt = sign(account, configConstants.JWT_SECRET, {
            expiresIn: configConstants.JWT_EXPIRE,
        });
    }

    return jwt;
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {Promise}
 */
function accountRegistrate(email, password) {
    return new Promise(function(resolve, reject) {

        const hashPassword = authHelper.hashPassword(password);
        accountDAO.createAccount({
            email: email,
            password: hashPassword,

        }).catch(error => {
            reject(error);
        }).then(() => {
            resolve();
        })
    });

}

/**
 * Check if a email in in used as username
 * @param {string} email 
 * @return {boolean} isUsed;
 */
function isUsedEmail(email) {
    return new Promise((resolve, reject) => {
        let isUsed = true;
        accountDAO.getAccountByEmail(email)
            .then(account => {
                
                //Check if the account is empty or not
                if (account && account.length > 0) {
                    isUsed = true;
                } else {
                    isUsed = false;
                }

                resolve(isUsed);
            })
            .catch(error => {
                reject(error);
            })

    });
}

module.exports = {
    authenticate,
    isUsedEmail,
    accountRegistrate,
}