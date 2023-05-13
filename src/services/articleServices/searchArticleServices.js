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
    options = {
        ...options,
        pagination: {
            offset: recordOffset,
            limit: limitSize,
        }
    }

    return new Promise((resolve, reject) => {
        searchArticleDAO.getBaseArticles(options)
            .catch(error => {reject(error);})
            .then(articles => {
                const articleIds = articles.map(article => article.id);
                // const articleDetails = searchArticleDAO.getDetailArticlesWithIds(articleIds);
                // const articleDtos = articleHelper.parsePaginationQueryResultToResponseData(articles, articleDetails);
                if (articleIds.length > 0) {
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
                    })
                } else {
                    resolve([]);
                };   
            })
            .catch(error => {reject(error);})

    });
}

/**
 * Search Article which are authoring by lecturers, with the given ids 
 * @param {Array<int>} lecturerIds //The lecturers who are the author of the articles
 * @return {Promise}
 *  
 */
 function getArticlesWithLecturerIds(lecturerIds) {

    const options = {
        lecturerIds,
    }

    return new Promise((resolve, reject) => {
        searchArticleDAO.getBaseArticles(options)
            .then(resultData => {

                const lecturerArticleMap = {};
                lecturerIds.forEach(lecturerId => {
                    lecturerArticleMap[lecturerId] = [];
                })
                
                resultData.forEach(article => {
                    const lecturerId = article.lecturer_id;
                    if (lecturerId) {
                        lecturerArticleMap[lecturerId].push(article);
                    }
                })

                resolve(lecturerArticleMap);
            })
            .catch(error => {
                reject(error);
            })

    })
}

/**
 * Get paging size, after pagination process
 * 
 * @param {int} limitSize maximum number of record in a page
 * @return {Promise<int>}
 *  
 */
function getArticlePagingSize(limitSize, keyword = null) {
    
    let options = null;
    if (null !== keyword) {
        options = {
            searchByKeyword: keyword
        }
    }

    return new Promise((resolve, reject) => {
        searchArticleDAO.getArticleCount(options)
            .then(count => {
                count = parseInt(count);
                const divideValue = Math.floor(count / limitSize);
                const numberOfPage = (0 === (count % limitSize)) ? divideValue : divideValue + 1;
                const data = {
                    number_of_page: numberOfPage,
                }
                resolve(data);
            })
            .catch(error => {reject(error);})

    });
}
 
module.exports = {
    getArticlesWithPagination,
    getArticlesWithLecturerIds,
    getArticlePagingSize,
}