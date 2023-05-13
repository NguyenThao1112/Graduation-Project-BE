const connection = require('../configs/database');

/**
 * 
 * @param {string} tableName 
 * @return {Closure}
 */
function buildPagingCountDao(tableName, searchByKeywordColumnName = null) {
    return async (options = null) => {
        return new Promise((resolve, reject) => {
            let whereStatement = `WHERE is_deleted = false`;
            const bindingValues = [];

            //Check if there is a keyword to search
            if (null !== searchByKeywordColumnName && null !== options) {
                if (options.hasOwnProperty('searchByKeyword') && (undefined !== options.searchByKeyword)) {
                    whereStatement = `${whereStatement} AND ${searchByKeywordColumnName} LIKE ?`;
                    keyword = options.searchByKeyword;
                    bindingValues.push(`%${keyword}%`);
                }
            }

            const query = [
                "SELECT COUNT(*)",
                `FROM ${tableName}`,
                whereStatement
            ].join(" ");

            let count = null;
            connection.query(query, bindingValues, (error, results, fields) => {

                if (error) {
                    reject(error);
                    return;
                }
                count = results[0]['COUNT(*)'];
                resolve(count);
            });
        });
    }
}

module.exports = {
    buildPagingCountDao,
}