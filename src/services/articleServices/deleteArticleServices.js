const deleteArticleDAO = require('../../daos/articleDAOs/deleteArticleDAO');
const searchArticleDAO = require('../../daos/articleDAOs/searchArticleDAO');

/**
 * Delete the table's data, which join with the Article table (contain: article_note, article_file, article_tag, article_url, author)
 * @param {string} tableName
 * @param {Array<Number>} articleIds
 * @return {Promise}
 */
 function deleteDataInTableWhichJoinArticleTable(tableName, articleIds) {
    return new Promise((resolve, reject) => {

        if (!articleIds?.length) {
            resolve(null);
            return null;
        }
        
        const selectColumns = [`${tableName}.id AS id`];
        return searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId(tableName, selectColumns, articleIds)
        .then(queryResult => {
            const deleteIds = queryResult.map(resultData => resultData.id);
            return deleteArticleDAO.deleteRecordInTable(tableName, deleteIds)
            .catch(error => console.log(error))
            .then(deleteSize =>{
                console.log(`Delete ${deleteSize} record in ${tableName} table`);
                resolve(deleteSize);
            })
        });

    }).catch(error => {
        console.log(error);
    });
 }


/**
 * @param {Arrav<Number>} articleIds
 * @return {Promise}
 *  
 */
function deleteArticles(articleIds) {

    const articleTableName = "article";
    const tableJoiningWithArticleTableNames = [
        "article_file",
        "article_note",
        "article_tag",
        "article_url",
        "author",
    ];

    return Promise.all(
        [
            ...tableJoiningWithArticleTableNames.map(
                tableName => 
                    deleteDataInTableWhichJoinArticleTable(tableName, articleIds)
                    .catch(error => {console.log(error);})
            ),
            deleteArticleDAO.deleteRecordInTable(articleTableName, articleIds)
        ]
    )
    .then((data) => {
        return Promise.resolve(true);
    });
}

module.exports = {
    deleteArticles,
}

