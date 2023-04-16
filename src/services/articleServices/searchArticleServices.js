const searchArticleDAO = require("../../daos/articleDAOs/searchArticleDAO");
const articleHelper = require("../../helpers/articleHelper");

/**
 * Get Article with pagination
 * 
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * @param {object} options addition option for querying
 * @return {Promise}
 *  
 */
 function getArticlesWithPagination(pageOffset, limitSize, options) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;

    return new Promise((resolve, reject) => {
        searchArticleDAO.getBaseArticlesWithPagination(recordOffset, limitSize, options)
            .catch(error => {reject(error);})
            .then(articles => {
                const articleIds = articles.map(article => article.id);
                // const articleDetails = searchArticleDAO.getDetailArticlesWithIds(articleIds);
                // const articleDtos = articleHelper.parsePaginationQueryResultToResponseData(articles, articleDetails);

                Promise.all([
                    searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId("article_url",   ["id", "article_id", "url"], articleIds),
                    searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId("article_note",  ["id", "article_id", "note"], articleIds),
                    searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId("article_file",  ["id", "article_id", "file_path", "original_file_name"], articleIds),
                    searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId("author",        
                        ["author.id as id", 
                        "author.article_id as article_id", 
                        "author.first_name as first_name", 
                        "author.last_name as last_name", 
                        "author.lecturer_id as lecturer_id", 
                        "lecturer_information.name as name"], articleIds),

                    searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId("article_tag",   
                        ["article_tag.id as id", 
                        "article_tag.article_id as article_id", 
                        "tag.id as tag_id", 
                        "tag.name as name"], articleIds),
                ]).then(articleDetails => {

                    const articleDtos = articleHelper.parseArticlePaginationQueryResultToResponseData(articles, articleDetails);
                    resolve(articleDtos);
                });   
            })
            .catch(error => {reject(error);})

    });
}

/**
 * Search Article with keywords * 
 * @param {string} keyword //The aritcle name's keyword
 * @param {int} pageOffset which page, in 1-offset-indexing
 * @param {int} limitSize maximum number of record in a page
 * @return {Promise}
 *  
 */
 function searchArticleWithKeyword(keyword, pageOffset, limitSize) {

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const recordOffset = (pageOffset - 1) * limitSize;
    const option = {
        searchByKeyword: keyword,
    }

    // return new Promise((resolve, reject) => {
    //     searchArticleDAO.getBaseArticlesWithPagination(recordOffset, limitSize, option)
    //         .then(resultData => {
    //             resolve(resultData);
    //         })
    //         .catch(error => {
    //             reject(error);
    //         })

    // })
}

module.exports = {
    getArticlesWithPagination,
    searchArticleWithKeyword,
}