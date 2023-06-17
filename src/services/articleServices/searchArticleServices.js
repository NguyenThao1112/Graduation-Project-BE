const searchArticleDAO = require("../../daos/articleDAOs/searchArticleDAO");
const articleHelper = require("../../helpers/articleHelper");
const excelHelper = require("../../helpers/excelHelper");


/**
 * 
 * @param {Object} options 
 * @returns {Promise}
 */
function getArticlesWithOptions(options) {
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

                        const articleDtos = articleHelper.parseArticlePaginationQueryResultToResponseData(articles, articleDetails, options);
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

    return getArticlesWithOptions(options)
        .then(articles => {
            return new Promise((resolve, reject) => {
                if (options.hasOwnProperty('isExport') && options.isExport) {
                
                    //Send file
                    const workbook = buildArticleExportExcel(articles);
                    resolve(workbook);
    
                } else {
                    resolve(articles);
                }
            })
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
        getArticlesWithOptions(options)
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
    });
    
}

/**
 * Get paging size, after pagination process
 * 
 * @param {int} limitSize maximum number of record in a page
 * @param {string} keyword the keyword to search
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

/**
 * Get detail information of an article, by given id
 * @param {Array<Number>} articleIds
 * 
 * @return {Promise<Array<Object>>} articles
 */
function getArticleByIds(articleIds) {

    const options = {
        articleIds
    }

    return getArticlesWithOptions(options);
}

function buildArticleExportExcel(articles) {
    const excelRows = articles.map(article => {

        const authors = [];
        article.authors.forEach(author => {
            let name = null;
            if (!!author.lecturer_id) {
                name = author.lecturer_name;
            } else {
               name = `${author.lastName} ${author.firstName} `
            }

            if (name) {
                authors.push(name);
            }
        })
        const authorToString = authors.join(", ");

        return {
            id: article.id,
            name: article.name,
            journal: article.journal,
            journalUrl: article.journalUrl,
            conference: article.conference,
            rank: article.rank,
            pageFrom: article.page_from,
            pageTo: article.page_to,
            volume: article.volume,
            issue: article.issue,
            citationCount: article.citationCount,
            abstract: article.abstract,
            month: article.month,
            day: article.day,
            year: article.year,
            ArXivID: article.ArXivID,
            DOI: article.DOI,
            ISBN: article.ISBN,
            ISSN: article.ISSN,
            PMID: article.PMID,
            Scopus: article.Scopus,
            PII: article.PII,
            SGR: article.SGR,
            authors: authorToString,
        }
    });

    const headers = excelHelper.ARTICLE_COLUMN_HEADERS;
    const options = {
        article: true,
    }
    const workbook = excelHelper.buildWorkbook(headers, excelRows, options);
    const excelFileName = `ArticleReport_${Date.now()}.xlsx`;
   
    return {
        workbook,
        excelFileName,
    }
}
 
module.exports = {
    getArticlesWithPagination,
    getArticlesWithLecturerIds,
    getArticlePagingSize,
    getArticleByIds,
}