const articleDAO = require('../daos/articleDAO');
const articleHelper = require('../helpers/articleHelper');
const urlConstants = require('../constants/urlConstants');
const uuidv4 = require('uuidv4');
const {ArticleFile} = require('../models/article/articleFile');
const {ArticleUrl} = require('../models/article/articleUrl');
const {ArticleNote} = require('../models/article/articleNote');
const {Author} = require('../models/article/author');
const {createTags} = require('../services/configurationServices');

/**
 * create article files (save its data to filesystem + save metadata to database)
 * @param {Article} article
 * @param {fileUpload.FileArray | null} articleFiles
 * @return {Promise}
 *  
 */
function createArticleFiles(article, articleFiles) {
    return new Promise((resolve, reject) => {

        //If the user doesn't send the article files while creating article
        if (!articleFiles) {
            resolve(null);
            return null;
        }
        
        //Handling to save each article file to the directory
        const dirPath = path.join(__dirname, urlConstants.ARTICLE_RESOURCE_ARTICLE_FILE, article.id, 'article_files');
        const errors = [];
        const fileNames = [];
        Object.keys(articleFiles).forEach(key => {
            const fileName = uuidv4();  //using uuid to generate an unique file name
            const filePath = path.join(dirPath, fileName);
            fileNames.push(fileName);
            articleFiles[key].mv(filePath, (error) => {
                errors.push(error);
                fileNames.pop();    //remove the already add name
            })
        })

        //Terminate the process, if saving process to filesystem has error
        if (errors.length) {
            reject(errors);
            return;
        }

        //Save the upload file metadata to database
        const articleFileDtos = fileNames.map(fileName => {
            const articleFile = new ArticleFile();
            articleFile.article = article;
            articleFile.path = fileName;
            return articleFile;
        })
        
        return articleDAO.createArticleFiles(articleFileDtos);
    }).catch(error => {
        reject(error);
    });
}

/**
 * Save article urls into database
 * @param {Article} article
 * @param {Array<Object>} articleUrlObjs
 * @return {Promise}
 *  
 */
 function createArticleUrls(article, articleUrlObjs) {
    return new Promise((resolve, reject) => {

        if (!articleUrlObjs.length) {
            resolve(null);
            return null;
        }

        const articleUrlDtos = articleUrlObjs.map(obj => {
            const articleUrl = new ArticleUrl();
            articleUrl.article = article;
            articleUrl.url = obj.id;
            return articleUrl;
        })

        return articleDAO.createArticleUrls(articleUrlDtos);
    }).catch(error => {
        reject(error);
    });
 }

/**
 * Save article notes into database
 * @param {Article} article
 * @param {Array<Object>} articleNoteObjs
 * @return {Promise}
 *  
 */
function createArticleNotes(article, articleNoteObjs) {
    return new Promise((resolve, reject) => {

        if (!articleNoteObjs.length) {
            resolve(null);
            return null;
        }
         
        const articleNoteDtos = articleNoteObjs.map(obj => {
            const articleNote = new ArticleNote();
            articleNote.article = article;
            articleNote.note = obj.note;
            return articleNote;
        })

        return articleDAO.createArticleNotes(articleNoteDtos);
    }).catch(error => {
        reject(error);
    });
}

/**
 * Save article notes into database
 * @param {Article} article
 * @param {Array<Object>} authors
 * @return {Promise}
 *  
 */
function createAuthors(article, authors) {
    return new Promise((resolve, reject) => {

        if (!authors.length) {
            resolve(null);
            return null;
        }
         
        const authorDtos = authors
            .map(dto => {
                const author = new Author();

                author.firstName = dto.firstName;
                author.lastName = dto.lastName;
                if (dto.hasOwnProperty('lecturerId')) {
                    author.lecturerId = dto.lecturerId;
                };
                author.articleId = article.id;

                return author;
            })

        return articleDAO.createAuthors(authorDtos);
    }).catch(error => {
        reject(error);
    });
}

/**
 * Save article notes into database
 * @param {Article} article
 * @param {Array<Object>} articleCategories
 * @return {Promise}
 *  
 */
function createArticleCategories(article, articleCategories) {

    return new Promise((resolve, reject) => {

        if (!articleCategories.length) {
            resolve(null);
            return null;
        }
        
        //Get all the category which doesn't have the '
        const unexistedTags = articleCategories
            .filter(category => !category.hasOwnProperty('tag_id'))
            .map((category) => {
                const tag = {
                    name: category.name,
                }

                return tag;
            });
        
        return createTags(unexistedTags);
        
    }).catch(error => {
        reject(error);
    }).then(tagIds => {

        const existedTagIds = articleCategories
            .filter(category => category.hasOwnProperty('tag_id'))
            .map(category => category.tag_id);

        const allTagIds = [...tagIds, ...existedTagIds];
        const articleCategory = [[article, allTagIds]];

        return articleDAO.createArticleCategories(articleCategory)
    });
}

/**
 * create an article
 * @param {Array<Object>} articleObject
 * @param {fileUpload.FileArray | null} articleFiles
 * @return {Promise}
 *  
 */
function createArticle(articleObject, articleFiles) {

    const builder = new articleHelper.ArticleBuilder();

    builder.reset();
    builder.setBulk(articleObject);
    const article = builder.build();

    return new Promise((resolve, reject) => {
        articleDAO.createArticle(article)
            .catch(error => {
                reject(error);
            })
            .then(articleId => {

                resolve(articleId);
                article.id = articleId;

                console.log(article);

                return Promise.all([
                    createArticleFiles(article, articleFiles),
                    createArticleNotes(article, articleObject.notes),
                    createArticleCategories(article, articleObject.categories),
                    createArticleUrls(article, articleObject.urls),
                    createAuthors(article, articleObject.authors),
                ]);
            })
            .catch(error => {
                reject(error);
            })

    })
}

module.exports = {
    
    createArticle,
    createArticleFiles,
}

