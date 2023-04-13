const uuid = require('uuid');
const path = require("path");

const createArticleDAO = require('../../daos/articleDAOs/createArticleDAO');
const updateArticleDAO = require('../../daos/articleDAOs/updateArticleDAO');
const deleteArticleDAO = require('../../daos/articleDAOs/deleteArticleDAO');
const articleHelper = require('../../helpers/articleHelper');
const urlConstants = require('../../constants/urlConstants');
const {ArticleFile} = require('../../models/article/articleFile');
const {ArticleUrl} = require('../../models/article/articleUrl');
const {ArticleNote} = require('../../models/article/articleNote');
const {Author} = require('../../models/article/author');
const {createTags} = require('../configurationServices');

/**
 * create article files (save its data to filesystem + save metadata to database)
 * @param {Article} article
 * @param {Array<Object>} articleFileObjs
 * @param {fileUpload.FileArray | null} articleFiles
 * @return {Promise}
 *  
 */
function updateArticleFiles(article, articleFileObjs, articleFiles) {
    return new Promise((resolve, reject) => {

        //If the user doesn't send the article files while creating article
        if (!articleFiles) {
            resolve(null);
            return null;
        }
        
        //Handling to save each article file to the directory
        const stringId = '' + article.id;    //cast articleId to string
        const dirPath = path.join(__dirname, "..", "..", "..", urlConstants.ARTICLE_RESOURCE_ARTICLE_FILE, stringId, 'article_files');
        const errors = [];
        const fileNames = [];
        
        Object.keys(articleFiles).forEach(key => {

            const file = articleFiles[key];

            if (Array.isArray(file)) {
                file.forEach(f => {
                    const fileName = `${uuid.v4()}${path.extname(f.name)}`;  //using uuid to generate an unique file name
                    const filePath = path.join(dirPath, fileName);
                    fileNames.push([f.name, fileName]); //save the original name with the new name
                    f.mv(filePath, (error) => {
                        errors.push(error);
                        fileNames.pop();    //remove the already add name
                    })
                })
            } else {
                const fileName = `${uuid.v4()}${path.extname(file.name)}`;  //using uuid to generate an unique file name
                const filePath = path.join(dirPath, fileName);
                fileNames.push([file.name, fileName]); //save the original name with the new name
                file.mv(filePath, (error) => {
                    errors.push(error);
                    fileNames.pop();    //remove the already add name
                })
            }
            
        })

        //Terminate the process, if saving process to filesystem has error
        if (errors?.length) {
            reject(errors);
            return;
        }

        //Save the upload file metadata to database
        const articleFileDtos = fileNames.map(fileName => {
            const articleFile = new ArticleFile();
            articleFile.article = article;
            articleFile.originalFileName = fileName[0];
            articleFile.path = fileName[1];
            return articleFile;
        })

        //Get the ids of the delete files
        const deleteIds = articleFileObjs
            .filter(obj => obj.hasOwnProperty('id') && (obj.hasOwnProperty('delete') && (true === obj.delete)))
            .map(obj => obj.id);
        
        return Promise.all([
            createArticleDAO.createArticleFiles(articleFileDtos).then((ids) => console.log(`Create new Article File with id: ${ids}`)),
            deleteArticleDAO.deleteRecordInTable("article_file", deleteIds).then((deleteSize) => console.log(`Successfully delete ${deleteSize} records for Article File`)),
        ])
        .then(() => {
            resolve(true);
            return Promise.resolve(true);
        });
    }).catch(error => {
        console.log(error);
    });
}

/**
 * Save article urls into database
 * @param {Article} article
 * @param {Array<Object>} articleUrlObjs
 * @return {Promise}
 *  
 */
 function updateArticleUrls(article, articleUrlObjs) {
    return new Promise((resolve, reject) => {

        if (!articleUrlObjs?.length) {
            resolve(null);
            return null;
        }
        
        const updatedArticleUrlObjs = articleUrlObjs
            .filter((obj) => obj.hasOwnProperty("id") && obj.hasOwnProperty("update") && (true === obj.update));

        const updateArticleUrlDtos = updatedArticleUrlObjs.map(obj => {
            const articleUrl = new ArticleUrl();
            articleUrl.id = obj.id;
            articleUrl.article = article;
            articleUrl.url = obj.url ?? null;
            return articleUrl;
        });

        const createArticleUrlObjs = articleUrlObjs
            .filter((obj) => !obj.hasOwnProperty("id") && obj.hasOwnProperty("create") && (true === obj.create));
        
        const createArticleUrlDtos = createArticleUrlObjs.map(obj => {
            const articleUrl = new ArticleUrl();
            articleUrl.article = article;
            articleUrl.url = obj.url ?? null;
            return articleUrl;
        });

        const deleteIds = articleUrlObjs
            .filter((obj) => obj.hasOwnProperty("delete") && (true === obj.delete))
            .map((obj) => obj.id);

        return Promise.all([
            createArticleDAO.createArticleUrls(createArticleUrlDtos).then((ids) => console.log(`Create new Article Url with id: ${ids}`)),
            updateArticleDAO.updateArticleUrls(updateArticleUrlDtos).then((updateUrls) => console.log(`Update Article Url with data: ${updateUrls}`)),
            deleteArticleDAO.deleteRecordInTable("article_url", deleteIds).then((deleteSize) => console.log(`Successfully delete ${deleteSize} records for Article Url`)),
        ])
        .then(() => {
            resolve(true);
            return Promise.resolve(true);
        });
    }).catch(error => {
        console.log(error);

    });
 }

/**
 * 
 * @param {Article} article
 * @param {Array<Object>} articleNoteObjs
 * @return {Promise}
 *  
 */
function updateArticleNotes(article, articleNoteObjs) {
    return new Promise((resolve, reject) => {

        if (!articleNoteObjs?.length) {
            resolve(null);
            return null;
        }
        
        const updatedArticleNoteObjs = articleNoteObjs
            .filter((obj) => obj.hasOwnProperty("id") && obj.hasOwnProperty("update") && (true === obj.update));

        const updateArticleNoteDtos = updatedArticleNoteObjs.map(obj => {
            const articleNote = new ArticleNote();
            articleNote.id = obj.id;
            articleNote.article = article;
            articleNote.note = obj.note ?? null;
            return articleNote;
        });

        const createArticleNoteObjs = articleNoteObjs
            .filter((obj) => !obj.hasOwnProperty("id") && obj.hasOwnProperty("create") && (true === obj.create));
        
        const createArticleNoteDtos = createArticleNoteObjs.map(obj => {
            const articleNote = new ArticleNote();
            articleNote.article = article;
            articleNote.note = obj.note ?? null;
            return articleNote;
        });

        const deleteIds = articleNoteObjs
            .filter((obj) => obj.hasOwnProperty("delete") && (true === obj.delete))
            .map((obj) => obj.id);

        return Promise.all([
            createArticleDAO.createArticleNotes(createArticleNoteDtos).then((ids) => console.log(`Create new Article Note with id: ${ids}`)),
            updateArticleDAO.updateArticleNotes(updateArticleNoteDtos).then((updateNote) => console.log(`Update Article Note with data: ${updateNote}`)),
            deleteArticleDAO.deleteRecordInTable("article_note", deleteIds).then((deleteSize) => console.log(`Successfully delete ${deleteSize} record for Article Note`)),
        ])
        .then(() => {
            resolve(true);
            return Promise.resolve(true);
        });
    }).catch(error => {
        console.log(error);

    })
}

/**
 * @param {Article} article
 * @param {Array<Object>} authors
 * @return {Promise}
 *  
 */
function updateAuthors(article, authors) {
    return new Promise((resolve, reject) => {

        if (!authors?.length) {
            resolve(null);
            return null;
        }
         
        const updatedAuthorObjs = authors
            .filter((authorObj) => {
                return  authorObj.hasOwnProperty("id") && 
                        !authorObj.hasOwnProperty("lecturerId") &&
                        authorObj.hasOwnProperty("update") &&
                        (true === authorObj.update);
            });

        const updateAuthorDtos = updatedAuthorObjs
            .map(obj => {
                const author = new Author();
                author.id = obj.id ?? null;
                author.firstName = obj.firstName ?? null; 
                author.lastName = obj.lastName ?? null;
                author.articleId = article.id ?? null;
                author.lecturerId = null;
                return author;
            });

        const createAuthorObjs = authors
            .filter((authorObj) => !authorObj.hasOwnProperty("id") && authorObj.hasOwnProperty("create") && (true === authorObj.create));

        const createAuthorDtos = createAuthorObjs
            .map(obj => {
                const author = new Author();
                author.firstName = obj.firstName ?? null; 
                author.lastName = obj.lastName ?? null;
                author.articleId = article.id ?? null;
                author.lecturerId = obj.lecturerId ?? null;
                return author;
            });

        const deleteIds = authors
            .filter((obj) => obj.hasOwnProperty("delete") && (true === obj.delete))
            .map((obj) => obj.id);

        return Promise.all([
            createArticleDAO.createAuthors(createAuthorDtos).then((ids) => console.log(`Create new Author with id: ${ids}`)),
            updateArticleDAO.updateAuthors(updateAuthorDtos).then((authors) => console.log(`Update Authors with data: ${authors}`)),
            deleteArticleDAO.deleteRecordInTable("author", deleteIds).then((deleteSize) => console.log(`Successfully delete ${deleteSize} record for Author`)),
        ])
        .then(() => {
            resolve(true);
            return Promise.resolve(true);
        });;
    }).catch(error => {
        console.log(error);
    })
}

/**
 * @param {Article} article
 * @param {Array<Object>} articleCategories
 * @return {Promise}
 *  
 */
function updateArticleCategories(article, articleCategories) {

    return new Promise((resolve, reject) => {

        if (!articleCategories?.length) {
            resolve(null);
            return null;
        }
        
        //Get all the category which doesn't have the '
        const unexistedTags = articleCategories
            .filter(category => !category.hasOwnProperty('tag_id') && (category.hasOwnProperty('create') && (true === category.create)))
            .map((category) => {
                const tag = {
                    name: category.name,
                }
                return tag;
            });
        
        return createTags(unexistedTags)
            .catch(error => {
                console.log(error);
            })
            .then(tagIds => {

                const existedTagIds = articleCategories
                    .filter(category => category.hasOwnProperty('tag_id') && (category.hasOwnProperty('create') && (true === category.create)))
                    .map(category => category.tag_id);
                
                const allTagIds = [...tagIds, ...existedTagIds];
                const articleCategory = [[article, allTagIds]];
                
                const deleteIds = articleCategories
                    .filter(category => category.hasOwnProperty('id') && category.hasOwnProperty('delete') && (true === category.delete))
                    .map(category => category.id);

                return Promise.all([
                    createArticleDAO.createArticleCategories(articleCategory).then((ids) => console.log(`Create new Tag with id ${ids}`)),
                    deleteArticleDAO.deleteRecordInTable("article_tag", deleteIds).then((deleteSize) => console.log(`Successfully delete ${deleteSize} record for Article Category`)),
                ]);

            }).catch(error => {
                console.log(error);
        
            }).then(() => {
                resolve(true);
                return Promise.resolve(true);
            });
    })
}

/**
 * create an article
 * @param {Object} articleObject
 * @param {fileUpload.FileArray | null} articleFiles
 * @return {Promise}
 *  
 */
function updateArticle(articleObject, articleFiles) {

    const builder = new articleHelper.ArticleBuilder();
    builder.reset();
    builder.setBulk(articleObject);
    const article = builder.build();

    return updateArticleDAO.updateArticle(article)
        .catch(error => {
            console.log(error);
        })
        .then(article => {

            return Promise.all([
                updateArticleFiles(article, article.files, articleFiles).catch(error => {console.log(error);}),
                updateArticleNotes(article, articleObject.notes).catch(error => {console.log(error);}),
                updateArticleCategories(article, articleObject.tags).catch(error => {console.log(error);}),
                updateArticleUrls(article, articleObject.urls).catch(error => {console.log(error);}),
                updateAuthors(article, articleObject.authors).catch(error => {console.log(error);}),
            ])
            .then((data) => {
                return Promise.resolve(true);
            });

        })
}

module.exports = {
    updateArticle,
}

