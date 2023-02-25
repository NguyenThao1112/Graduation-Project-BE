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

module.exports = {
    authenticate,
}