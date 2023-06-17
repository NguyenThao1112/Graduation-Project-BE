const { Article } = require('../../models/article/article');
const { ArticleUrl } = require('../../models/article/articleUrl');
const { ArticleFile } = require('../../models/article/articleFile');
const { ArticleNote } = require('../../models/article/articleNote');
const { Author } = require('../../models/article/author');
const connection = require('../../configs/database');
const moment = require('moment');
const queryConstants = require('../../constants/messageQueryConstants');

/**
 *  Query to create multiple ArticleUrl at the same time
 *
 * @param {Array<ArticleUrl>} articleUrls
 * @return {Promise}
 */
function createArticleUrls(articleUrls) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO article_url (`,
			`article_id, url,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = articleUrls.map((url) => [
			url.article.id,
			url.url,
			now,
			now,
			is_deleted,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created ones
			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

/**
 *  Query to create multiple ArticleFile at the same time
 *
 * @param {Array<ArticleFile>} articleFiles
 * @return {Promise}
 */
function createArticleFiles(articleFiles) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO article_file (`,
			`article_id, file_path, original_file_name,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = articleFiles.map((file) => [
			file.article.id,
			file.path,
			file.originalFileName,
			now,
			now,
			is_deleted,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created ones
			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

/**
 *  Query to create multiple ArticleNote at the same time
 *
 * @param {Array<ArticleNote>} articleNotes
 * @return {Promise}
 */
function createArticleNotes(articleNotes) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO article_note (`,
			`article_id, note,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = articleNotes.map((note) => [
			note.article.id,
			note.note,
			now,
			now,
			is_deleted,
		]);

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created ones
			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

/**
 *  Query to create multiple Author at the same time
 *
 * @param {Array<Author>} authors
 * @return {Promise}
 */
function createAuthors(authors) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO author (`,
			`lecturer_id, article_id,`,
			`first_name, last_name,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = authors.map((author) => {
			const lecturerId = author.lecturerId ?? null;
			const articleId = author.articleId ?? null;

			return [
				lecturerId,
				articleId,
				author.firstName,
				author.lastName,
				now,
				now,
				is_deleted,
			];
		});

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created ones
			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

/**
 *  Query to create Many-to-Many relation ship between article and tag
 *
 * @param {Array<[Article, Array<number>]>} categories
 * @return {Promise}
 */
function createArticleCategories(categories) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO article_tag (`,
			`article_id, tag_id,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		let values = categories.map((cat) =>
			cat[1].map((tagId) => [cat[0].id, tagId, now, now, is_deleted])
		);

		//Reduce the level of array bracket, in values, by 1 level
		values = [].concat.apply([], values);

		//Empty check
		if (values.length < 1) {
			resolve([]);
			return;
		}

		//Using bulk insertion for better performance
		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Get the id of the created ones
			const size = result.affectedRows;
			const firstId = result.insertId;
			const aboveMaxId = firstId + size;
			let ids = [];
			for (let i = firstId; i < aboveMaxId; i++) {
				ids.push(i);
			}

			resolve(ids);
		});
	});
}

/**
 *  Query to create an article
 *
 * @param {Array<Article>} article
 * @param {Object} options
 * @return {Promise}
 */
function createArticle(article, options = null) {
	return new Promise(function (resolve, reject) {

		let insertId = '';
		let values = [];
		if (null !== options) {
			if (options.hasOwnProperty('hasId') && options.hasId) {
				insertId = 'id,';
				values = [article.id];
			}
		}

		const query = [
			`INSERT INTO article (`,
			insertId,
			'name, journal, journalUrl, conference, `rank`, year, page_from, page_to, volume, issue, city, abstract,',
			`institution, department, type, month, day,`,
			`url_date_access,`,
			`ArXivID, DOI, ISBN, ISSN,`,
			`PMID, Scopus, PII, SGR,`,
			`project_id, citation_key, general_note, citationCount, `,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES (?)',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		values = [
			...values,
			article.name ?? null,
			article.journal ?? null,
			article.journalUrl ?? null,
			article.conference ?? null,
			article.rank ?? null,
			article.year ?? null,
			article.pageFrom ?? null,
			article.pageTo ?? null,
			article.volume ?? null,
			article.issue ?? null,
			article.city ?? null,
			article.abstract ?? null,
			article.institution ?? null,
			article.department ?? null,
			article.type ?? null,
			article.month ?? null,
			article.day ?? null,
			article.urlAccessDate ?? null,
			article.ArXivID ?? null,
			article.DOI ?? null,
			article.ISBN ?? null,
			article.ISSN ?? null,
			article.PMID ?? null,
			article.Scopus ?? null,
			article.PII ?? null,
			article.SGR ?? null,
			article.projectId ?? null,
			article.citationKey ?? null,
			article.generalNote ?? null,
			article.citationCount ?? null,
			now ?? null,
			now ?? null,
			is_deleted ?? null,
		];

		connection.query(query, [values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			let id = result.insertId;
			resolve(id);
		});
	});
}

module.exports = {
	createArticleUrls,
	createArticleFiles,
	createArticleNotes,
	createAuthors,
	createArticleCategories,
	createArticle,
};
