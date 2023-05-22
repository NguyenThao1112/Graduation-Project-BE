const {Article} = require('../../models/article/article');
const {ArticleUrl} = require('../../models/article/articleUrl');
const {ArticleFile} = require('../../models/article/articleFile');
const {ArticleNote} = require('../../models/article/articleNote');
const {Author} = require('../../models/article/author');
const connection = require('../../configs/database');
const moment = require('moment');
const queryConstants = require('../../constants/queryConstants');

/**
 *  Query to delete multiple record in a certain table at the same time
 * 
 * @param {string} tableName
 * @param {Array<number>} deletedIds
 * @return {Promise}
 */
function deleteRecordInTable(tableName, deletedIds) {
    return new Promise(function (resolve, reject) {
        
        let whereStatement = "WHERE id IN (?)";
        if (0 === deletedIds.length) {
            whereStatement = "WHERE true = false";
        }

        const query = 
        [
            `UPDATE ${tableName}`,
            'SET is_deleted = ?, updated_at = ?',
            whereStatement,
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const isDeleted = true;
      
        //Using bulk update for better performance
        connection.query(query, [isDeleted, now, deletedIds], (error, result) => {
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

// /**
//  *  Query to delete multiple ArticleUrl at the same time
//  * 
//  * @param {Array<number>} articleUrlIds
//  * @return {Promise}
//  */
//  function deleteArticleUrls(articleUrlIds) {
//     return new Promise(function (resolve, reject) {
//         const query = 
//         [
//             'UPDATE article_url',
//             'SET is_deleted = ?, updated_at = ?',
//             'WHERE id IN (?)',
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const isDeleted = true;
      
//         //Using bulk update for better performance
//         connection.query(query, [isDeleted, now, articleUrlIds], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             //Number of records are deleted
//             const size = result.affectedRows;
//             resolve(size);
//         });
//     })
    
// }


// /**
//  *  Query to delete multiple ArticleFile at the same time
//  * 
//  * @param {Array<number>} articleFileIds
//  * @return {Promise}
//  */
// function updateArticleFiles(articleFileIds) {
//     return new Promise(function (resolve, reject) {
//         const query = 
//         [
//             'UPDATE article_file',
//             'SET is_deleted = ?, updated_at = ?',
//             'WHERE id IN (?)',
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const isDeleted = false;

//         //Using bulk insertion for better performance
//         connection.query(query, [isDeletd, now, articleFileIds], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             //Number of records are deleted
//             const size = result.affectedRows;
//             resolve(size);
//         });
//     })
    
// }


// /**
//  *  Query to delete multiple ArticleNote at the same time
//  * 
//  * @param {Array<number>} articleNoteIds
//  * @return {Promise}
//  */
//  function updateArticleNotes(articleNoteIds) {
//     return new Promise(function (resolve, reject) {
//         const query = 
//         [
//             'UPDATE article_note',
//             'SET is_deleted = ?, updated_at = ?',
//             'WHERE id IN (?)',
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const isDeleted = false;

//         //Using bulk insertion for better performance
//         connection.query(query, [isDeleted, now, articleNoteIds], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             //Number of records are deleted
//             const size = result.affectedRows;
//             resolve(size);
//         });
//     })
    
// }


// /**
//  *  Query to delete multiple Author at the same time
//  * 
//  * @param {Array<number>} authorIds
//  * @return {Promise}
//  */
//  function deleteAuthors(authorIds) {
//     return new Promise(function (resolve, reject) {
//         const query = 
//         [
//             `UPDATE author `, 
//             'SET is_deleted = ?, updated_at = ?',
//             'WHERE id IN (?)',
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const isDeleted = true;

//         //Using bulk insertion for better performance
//         connection.query(query, [isDeleted, now, authorIds], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             //Number of records are deleted
//             const size = result.affectedRows;
//             resolve(size);
//         });
//     })
    
// }


// /**
//  *  Query to soft delete Many-to-Many relation ship between article and tag
//  * 
//  * @param {Array<Number>} categoryIds
//  * @return {Promise}
//  */
//  function deleteArticleCategories(categoryIds) {
//     return new Promise(function (resolve, reject) {
//         const query = 
//         [
//             `UPDATE article_tag (`,
// 					`id, article_id, tag_id,`,
// 					`created_at, updated_at, is_deleted`,
// 				`)`, 
//             `SET updated_at = ?, deleted_at = ?`
//             `WHERE id IN ?`,
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const is_deleted = true;

//         //Using bulk insertion for better performance
//         connection.query(query, [now, is_deleted, categoryIds], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             //Number of records are deleted
//             const size = result.affectedRows;
//             resolve(size);
//         });
//     })
    
// }

// /**
//  *  Query to soft delete an article
//  * 
//  * @param {number} articleId
//  * @return {Promise}
//  */
//  function deleteArticle(articleId) {
//     return new Promise(function (resolve, reject) {
//         const query = 
//         [
//             `UPDATE article`,
//             `SET updated_at = ?, deleted_at = ?`
//             `WHERE id = ?`,
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const is_deleted = true;
//         const values = [
// 			now, is_deleted,
//             articleId,
// 		];

//         connection.query(query, [values], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
            
//             //Number of records are deleted
//             const size = result.affectedRows;
//             resolve(size);
//         });
//     })
    
// }

module.exports = {
	// updateArticleUrls,
	// // updateArticleFiles,
	// updateArticleNotes,
	// updateAuthors,
    // deleteArticleCategories,
	// deleteArticle,

    deleteRecordInTable
};
