const uuid = require('uuid');
const path = require('path');

const articleDAO = require('../../daos/articleDAOs/createArticleDAO');
const articleHelper = require('../../helpers/articleHelper');
const urlConstants = require('../../constants/urlConstants');
const { ArticleFile } = require('../../models/article/articleFile');
const { ArticleUrl } = require('../../models/article/articleUrl');
const { ArticleNote } = require('../../models/article/articleNote');
const { Author } = require('../../models/article/author');
const { createTags } = require('../configurationServices');

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
		const stringId = '' + article.id; //cast articleId to string
		const dirPath = path.join(
			__dirname,
			'..',
			'..',
			'..',
			urlConstants.ARTICLE_RESOURCE_ARTICLE_FILE,
			stringId,
			'article_files'
		);
		const errors = [];
		const fileNames = [];

		Object.keys(articleFiles).forEach((key) => {
			const file = articleFiles[key];

			if (Array.isArray(file)) {
				file.forEach((f) => {
					const fileName = `${uuid.v4()}${path.extname(f.name)}`; //using uuid to generate an unique file name
					const filePath = path.join(dirPath, fileName);
					fileNames.push([f.name, fileName]); //save the original name with the new name
					f.mv(filePath, (error) => {
						errors.push(error);
						fileNames.pop(); //remove the already add name
					});
				});
			} else {
				const fileName = `${uuid.v4()}${path.extname(file.name)}`; //using uuid to generate an unique file name
				const filePath = path.join(dirPath, fileName);
				fileNames.push([file.name, fileName]); //save the original name with the new name
				file.mv(filePath, (error) => {
					errors.push(error);
					fileNames.pop(); //remove the already add name
				});
			}
		});

		//Terminate the process, if saving process to filesystem has error
		if (errors?.length) {
			reject(errors);
			return;
		}

		//Save the upload file metadata to database
		const articleFileDtos = fileNames.map((fileName) => {
			const articleFile = new ArticleFile();
			articleFile.article = article;
			articleFile.originalFileName = fileName[0];
			articleFile.path = fileName[1];
			return articleFile;
		});

		return articleDAO
			.createArticleFiles(articleFileDtos)
			.then((ids) => resolve(ids));
	}).catch((error) => {
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
function createArticleUrls(article, articleUrlObjs) {
	return new Promise((resolve, reject) => {
		if (!articleUrlObjs?.length) {
			resolve(null);
			return null;
		}

		const articleUrlDtos = articleUrlObjs.map((obj) => {
			const articleUrl = new ArticleUrl();
			articleUrl.article = article;
			articleUrl.url = obj.url;
			return articleUrl;
		});

		return articleDAO
			.createArticleUrls(articleUrlDtos)
			.then((ids) => resolve(ids));
	}).catch((error) => {
		console.log(error);
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
		if (!articleNoteObjs?.length) {
			resolve(null);
			return null;
		}

		const articleNoteDtos = articleNoteObjs.map((obj) => {
			const articleNote = new ArticleNote();
			articleNote.article = article;
			articleNote.note = obj.note ?? null;
			return articleNote;
		});

		return articleDAO
			.createArticleNotes(articleNoteDtos)
			.then((ids) => resolve(ids));
	}).catch((error) => {
		console.log(error);
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
		if (!authors?.length) {
			resolve(null);
			return null;
		}

		const authorDtos = authors.map((dto) => {
			const author = new Author();
			author.firstName = dto.firstName ?? null;
			author.lastName = dto.lastName ?? null;
			author.lecturerId = dto.lecturerId ?? null;
			author.articleId = article.id;

			return author;
		});

		return articleDAO.createAuthors(authorDtos).then((ids) => resolve(ids));
	}).catch((error) => {
		console.log(error);
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
		if (!articleCategories?.length) {
			resolve(null);
			return null;
		}

		//Get all the category which doesn't have the '
		const unexistedTags = articleCategories
			.filter((category) => !category.hasOwnProperty('tag_id'))
			.map((category) => {
				const tag = {
					name: category.name,
				};

				return tag;
			});

		return createTags(unexistedTags)
			.catch((error) => {
				console.log(error);
			})
			.then((tagIds) => {
				const existedTagIds = articleCategories
					.filter((category) => category.hasOwnProperty('tag_id'))
					.map((category) => category.tag_id);

				const allTagIds = [...tagIds, ...existedTagIds];
				const articleCategory = [[article, allTagIds]];

				return articleDAO
					.createArticleCategories(articleCategory)
					.then((ids) => resolve(ids));
			});
	});
}

/**
 * create an article
 * @param {Object} articleObject
 * @param {fileUpload.FileArray | null} articleFiles
 * @param {Object} options
 * @return {Promise}
 *
 */
function createArticle(articleObject, articleFiles, options = null) {
	const builder = new articleHelper.ArticleBuilder();
	builder.reset();
	builder.setBulk(articleObject);
	const article = builder.build();

	return articleDAO
		.createArticle(article, options)
		.catch((error) => {
			console.log(error);
		})
		.then((articleId) => {
			article.id = articleId;

			return Promise.all([
				createArticleFiles(article, articleFiles).catch((error) => {
					console.log(error);
				}),
				createArticleNotes(article, articleObject.notes).catch((error) => {
					console.log(error);
				}),
				createArticleCategories(article, articleObject.tags).catch((error) => {
					console.log(error);
				}),
				createArticleUrls(article, articleObject.urls).catch((error) => {
					console.log(error);
				}),
				createAuthors(article, articleObject.authors).catch((error) => {
					console.log(error);
				}),
			]).then((data) => {
				return Promise.resolve(articleId);
			});
		});
}

module.exports = {
	createArticle,
	createArticleFiles,
};
