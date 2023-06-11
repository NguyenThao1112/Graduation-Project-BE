const connection = require('../../configs/database');
const queryHelper = require('../../helpers/queryHelper');

/**
 *  Query to get data of the table, which is join the Article table, by Article's id
 * @param {string} tableName            //the table name in FROM statement
 * @param {Array<string>} columnNames   //the column to SELECT
 * @param {Array<number>} articleIds
 * @return {Promise}
 */
 function getDataOfSubtableJoningWithArticleByArticleId(tableName, columnNames, articleIds) {
    return new Promise(function (resolve, reject) {
        let selectStatement = `SELECT ${columnNames.join(', ')}`;
        let fromStatement = `FROM ${tableName}`;
        if ("author" === tableName) {
            fromStatement = [
                fromStatement,
                "LEFT JOIN lecturer_information ON lecturer_information.id = author.lecturer_id",
            ].join(' ');
            selectStatement = `${selectStatement}, lecturer_information.name`;
        } else if ("article_tag" === tableName) {
            fromStatement = [
                fromStatement,
                "JOIN tag ON tag.id = article_tag.tag_id"
            ].join(' ');
        }

        const query = 
        [
            selectStatement,
            fromStatement,
            `WHERE ${tableName}.is_deleted = false AND article_id IN (?)`,
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

/**
 *  Query search Base Article
 * @param {Object {
 * 
 *  searchByKeyword?: string
 * 
 *  pagination?: {
 *      offset: number,
 *      limit: number,
 *  },
 * 
 *  lecturerIds?: number[]
 * }} option query option
 * 
 * 
 *            
 * @return {Promise}
*/
function getBaseArticles(option = null) {
    return new Promise((resolve, reject) => {
        let selectStatement = [
            'SELECT',
                'a.id as id,',
                'a.name as name,',
                'a.journal as journal,',
                'a.conference as conference,',
                'a.rank as rank,',
                'a.year as year,',
                'a.page_from as pageFrom,',
                'a.page_to as pageTo,',
                'a.volume as volume,',
                'a.issue as issue,',
                'a.city as city,',
                'a.abstract as abstract,',
                'a.url_date_access as urlAccessDate,',
                'a.ArXivID as ArXivID,',
                'a.DOI as DOI,',
                'a.ISBN as ISBN,',
                'a.ISSN as ISSN,',
                'a.PMID as PMID,',
                'a.Scopus as Scopus,',
                'a.PII as PII,',
                'a.SGR as SGR,',
                'a.project_id as projectId,',
                'a.citation_key as citationKey,',
                'a.general_note as generalNote'
            ].join(' ');
        let fromStatement = 'FROM article as a';
        let whereStatement = 'WHERE a.is_deleted = false';
        let paginationStatement = '';
        let bindingValues = [];
        
        if (null !== option) {
            //Check if there is a keyword to search the article
            if (option.hasOwnProperty('searchByKeyword') && (undefined !== option.searchByKeyword)) {
                whereStatement = `${whereStatement} AND a.name LIKE ?`;
                keyword = option.searchByKeyword;
                bindingValues.push(`%${keyword}%`);
            }

            //Check if there is search article with given lecturer ids
            if (option.hasOwnProperty('lecturerIds') && (undefined !== option.lecturerIds)) {
                selectStatement = `${selectStatement}, author.lecturer_id as lecturer_id`;
                fromStatement = `${fromStatement} INNER JOIN author ON a.id = author.article_id`;
                whereStatement = `${whereStatement} AND (author.lecturer_id IN (?))`;
                const lecturerIds = option.lecturerIds;
                bindingValues.push(lecturerIds);
                
            }

            //Check if there is search article with given article ids
            if (option.hasOwnProperty('articleIds') && (undefined !== option.articleIds)) {
                whereStatement = `${whereStatement} AND (id IN (?))`;
                const articleIds = option.articleIds;
                bindingValues.push(articleIds);
            }

            //Check if there is pagination option
            if (option.hasOwnProperty('pagination') && (undefined !== option.pagination)) {

                if ((option.hasOwnProperty('offset') && (undefined !== option.offset)) && 
                    (option.hasOwnProperty('limit') && (undefined !== option.limit))) {

                        const {offset, limitSize} = option.pagination;
                        [offset, limitSize].forEach(bindingValue => {
                            bindingValues.push(bindingValue);
                        });

                        paginationStatement = 'LIMIT ?, ?';
                    } 

            }
        }
        
        const query = [
            selectStatement,
            fromStatement,
            whereStatement,
            `ORDER BY a.id ASC`,
            paginationStatement,
        ].join(' ');
    
        let articles = null;
        connection.query(query, bindingValues, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            articles = results;
            resolve(articles);
        });
    });
}

// /**
//  *  Query search detail information of Article with Article's id
//  * @param {Array<number>} articleIds     
//  * @return {Promise}
// */
// function getDetailArticlesWithIds(articleIds) {
//     return new Promise(function (resolve, reject) {
        
//         const query = 
//         [
//             'SELECT',
//                 'a.id as article_id',

//                 'url.id as url_id',
//                 'url.url as url',
                
//                 'file.id as file_id',
//                 'file.file_path as filePath',
//                 'file.original_file_name as originalFileName',

//                 'note.id as note_id',
//                 'note.note as note',
                
//                 'category.id as category_id',
//                 'tag.id as tag_id',
//                 'tag.name as tag_name',

//                 'author.id as author_id',
//                 'author.first_name as authorFirstName',
//                 'author.last_name as authorLastName',
//                 'author.lecturer_id as lecturerAsAuthorId',
//                 'lecturer.name as lecturerAsAuthorName',

//             'FROM article as a',
//                 'JOIN article_url as url ON a.id = url.article_id',
//                 'JOIN article_note as note ON a.id = note.article_id',
//                 'JOIN article_file as file ON a.id = file.article_id',
//                 'JOIN author ON a.id = author.article_id',
//                 'JOIN article_tag as category ON a.id = category.article_id',
//                 'JOIN tag ON category.tag_id = tag.id',
//                 'LEFT JOIN lecturer_information as lecturer ON lecturer.id = author.lecturer_id',
//             'WHERE', 
//                 'a.is_deleted = false AND',
//                 'url.is_deleted = false AND',
//                 'note.is_deleted = false AND',
//                 'file.is_deleted = false AND',
//                 'author.is_deleted = false AND',
//                 'category.is_deleted = false AND',
//                 'tag.is_deleted = false AND',
//                 '(lecturer.is_deleted = false OR lecturer.is_deleted IS NULL) AND',
//                 'article_id IN (?)',
//         ].join(' ');

//         let data = null;
        
// 		connection.query(query, [articleIds], (error, results, fields) => {
// 			if (error) {
// 				reject(error);
// 				return;
// 			}
// 			data = results;
// 			resolve(data);
// 		});
//     })
// }

/**
 * Query to count the number of available article
 * @return {Promise<Number>}
 */
const getArticleCount = queryHelper.buildPagingCountDao("article", "name");

module.exports = {
    getDataOfSubtableJoningWithArticleByArticleId,
    getBaseArticles,
    getArticleCount,
};
