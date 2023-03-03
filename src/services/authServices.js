const accountDAO = require('../daos/accountDAO');
const messageConstants = require('../constants/messageConstants');
const configConstants = require('../constants/configConstants');
const authHelper = require('../helpers/authHelper');
const randToken = require('rand-token');
const mailServices = require('./mailServices');
const {sign} = require('jsonwebtoken');

const TOKEN_LENGTH = 20;

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {Promise}
 *  
 */
function authenticate(email, password) {
    return new Promise((resolve, reject) => {
        let jwt = null;

        accountDAO.getAccountByEmail(email)
            .then(account => {
                
                //Check if the account is empty or not
                if (account && account.length > 0) {

                    const hashPassword = account[0].password;

                    //If yes, check if the password is correct
                    const isPasswordMatched = authHelper.isPasswordMatch(password, hashPassword);
                    if (isPasswordMatched) {
                        
                        jwt = sign({key: authHelper.getRandomNumber()}, configConstants.JWT_SECRET, {
                            expiresIn: configConstants.JWT_EXPIRE,
                        });
                    }

                } 

                resolve(jwt);
            })
            .catch(error => {
                reject(error);
            })

    })
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
 * @return {Promise}
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

/**
 * Check if a email in in used as username
 * The email always exsited in the database before calling to this function
 * 
 * @param {string} email 
 * @return {Promise}
 */
function createTokenForForgetPassword(email) {
    return new Promise((resolve, reject) => {
        accountDAO.getAccountByEmail(email)
            .then(account => {
                
                //Check if the account is empty or not
                if (!account || account.length <= 0) {
                    reject(email);
                    return;
                }   

                //Genearate the token (the new password) and save to database
                const token = randToken.generate(TOKEN_LENGTH);
                const dao = {
                    id: account[0].id,
                    token: token,
                }

                return accountDAO.updateAccountToken(dao);
            
            })
            .catch(error => {reject(error)})
            .then(token => {

                //Send the token to email
                mailServices.sendTokenToUserMail(email, token);
                resolve();
            })
    })
}

module.exports = {
    authenticate,
    isUsedEmail,
    accountRegistrate,
    createTokenForForgetPassword,
}