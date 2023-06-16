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

            //Check if there is search with university criteria
            if (options?.hasOwnProperty('universityIds')) {
                const universityIds = options.universityIds;
                if (Array.isArray(universityIds) && universityIds.length > 0) {
                    whereStatement = [
						whereStatement,
						'AND NOT EXISTS (',
							'SElECT 1',
							'FROM university AS u1',
							'WHERE u1.id IN (?) AND NOT EXISTS (',
								'SELECT 1',
								'FROM work_position AS wp2',
								`WHERE ${tableName}.id = wp2.lecturer_id AND u1.id = wp2.university_id`,
							')',
						')',
					].join(' '),

					bindingValues.push(options.universityIds);
                }
            }

			//Check if there is search with expertise codes criteria
			if (options?.hasOwnProperty('expertiseCodes')) {
				const expertiseCodes = options.expertiseCodes;
				if (Array.isArray(expertiseCodes) && expertiseCodes.length > 0) {
					whereStatement = [
						whereStatement,
						'AND NOT EXISTS (' ,
                            'SElECT 1 ',
                            'FROM (SELECT DISTINCT code FROM expertise) as temp',
                            'WHERE temp.code IN (?) AND NOT EXISTS ( ',
                                'SELECT 1',
                                'FROM expertise AS e' ,
                                `WHERE e.code = temp.code and ${tableName}.id = e.lecturer_id`,
                            ')',
                        ')',
					].join(' '),

					bindingValues.push(options.expertiseCodes);
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