const connection = require('../../configs/database');

/**
 *  Query to get data of the table, which is join the Article table, by Article's id
 * @param {string} tableName            //the table name in FROM statement
 * @param {Array<string>} columnNames   //the column to SELECT
 * @param {Array<number>} articleIds
 * @return {Promise}
 */
 function getDataOfSubtableJoningWithArticleByArticleId(tableName, columnNames, articleIds) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `SELECT`,
            columnNames.join(', '), 
            `FROM ${tableName}`,
            `WHERE article_id IN (?)`,
        ].join(' ');

        let data = null;
        connection.query(query, [articleIds], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            data = results;
            resolve(data);
        });
    })
}

module.exports = {
    getDataOfSubtableJoningWithArticleByArticleId
};
