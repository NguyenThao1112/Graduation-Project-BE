const connection = require("../configs/database");

/**
 * 
 * @param {string} username 
 * @return {null | Object} account
 */
function getAccountByEmail(email) {
    const query = 
        [
            'SELECT email, password',
            'FROM account',
            'WHERE email = ?',
            'LIMIT 1'
        ].join(' ');
    
    let account = null;
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
            return;
        }
        account = results;
    });
    
    return account;
}

module.exports = {
    getAccountByEmail,
}