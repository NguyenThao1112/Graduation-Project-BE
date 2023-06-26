const { Article } = require('../../models/article/article');
const { ArticleUrl } = require('../../models/article/articleUrl');
const { ArticleFile } = require('../../models/article/articleFile');
const { ArticleNote } = require('../../models/article/articleNote');
const { Author } = require('../../models/article/author');
const connection = require('../../configs/database');
const moment = require('moment');
const queryConstants = require('../../constants/messageQueryConstants');

/**
 *  Query to update multiple ArticleUrl at the same time
 *
 * @param {Array<ArticleUrl>} articleUrls
 * @return {Promise}
 */
function updateArticleUrls(articleUrls) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO article_url (`,
			`id, article_id, url,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
			'ON DUPLICATE KEY UPDATE',
			'url = VALUES(url),',
			'updated_at = VALUES(updated_at)',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = articleUrls.map((url) => [
			url.id,
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

			resolve(articleUrls);
		});
	});
}

// /**
//  *  Query to update multiple ArticleFile at the same time
//  *
//  * @param {Array<ArticleFile>} articleFiles
//  * @return {Promise}
//  */
//  function updateArticleFiles(articleFiles) {
//     return new Promise(function (resolve, reject) {
//         const query =
//         [
//             `INSERT INTO article_file (`,
// 					`id, article_id, file_path,`,
// 					`created_at, updated_at, is_deleted`,
// 				`)`,
//             'VALUES ?',
//             'ON DUPLICATE KEY UPDATE',
//                 'article_id = VALUES(article_id),',
//                 'file_path = VALUES(file_path),',
//                 'updated_at = VALUES(updated_at)',
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const is_deleted = false;
//         const values = articleFiles.map(file => [
// 			file.article.id, file.path,
// 			now, now, is_deleted
// 		]);

//         //Using bulk insertion for better performance
//         connection.query(query, [values], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             resolve(articleFiles);
//         });
//     })

// }

/**
 *  Query to update multiple ArticleNote at the same time
 *
 * @param {Array<ArticleNote>} articleNotes
 * @return {Promise}
 */
function updateArticleNotes(articleNotes) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO article_note (`,
			`id, article_id, note,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
			'ON DUPLICATE KEY UPDATE',
			'note = VALUES(note),',
			'updated_at = VALUES(updated_at)',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = articleNotes.map((note) => [
			note.id,
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

			resolve(articleNotes);
		});
	});
}

/**
 *  Query to update multiple Author at the same time
 *
 * @param {Array<Author>} authors
 * @return {Promise}
 */
function updateAuthors(authors) {
	return new Promise(function (resolve, reject) {
		const query = [
			`INSERT INTO author (`,
			`id, lecturer_id, article_id, scopus_id,`,
			`first_name, last_name,`,
			`created_at, updated_at, is_deleted`,
			`)`,
			'VALUES ?',
			'ON DUPLICATE KEY UPDATE',
			'first_name = CASE WHEN lecturer_id = NULL THEN VALUES(first_name) ELSE first_name END,',
			'last_name = CASE WHEN lecturer_id = NULL THEN VALUES(last_name) ELSE last_name END,',
			'updated_at = VALUES(updated_at)',
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const is_deleted = false;
		const values = authors.map((author) => {
			const lecturerId = author.lecturerId ?? null;
			const articleId = author.articleId ?? null;
			const scopusId = author.scopusId ?? null;
			return [
				author.id,
				lecturerId,
				articleId,
				scopusId,
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

			resolve(authors);
		});
	});
}

// /**
//  *  Query to update Many-to-Many relation ship between article and tag
//  *
//  * @param {Array<[Article, Array<number>]>} categories
//  * @return {Promise}
//  */
//  function updateArticleCategories(categories) {
//     return new Promise(function (resolve, reject) {
//         const query =
//         [
//             `INSERT INTO article_tag (`,
// 					`id, article_id, tag_id,`,
// 					`created_at, updated_at, is_deleted`,
// 				`)`,
//             'VALUES ?',
//             'ON DUPLICATE KEY UPDATE',
//                 'tag_id = VALUES(tag_id),',
//                 'article_id = VALUES(article_id),',
//                 'updated_at = VALUES(updated_at)',
//         ].join(' ');

//         const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
//         const is_deleted = false;
//         let values = categories
//             .map(cat => cat[1].map(tagId => [
//                 cat[0].id, tagId,
//                 now, now, is_deleted,
//             ]));

//         //Reduce the level of array bracket, in values, by 1 level
//         values = [].concat.apply([], values);

//         //Using bulk insertion for better performance
//         connection.query(query, [values], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             //Get the id of the created ones
//             const size = result.affectedRows;
//             const firstId = result.insertId;
//             const aboveMaxId = firstId + size;
//             let ids = [];
//             for (let i = firstId; i < aboveMaxId; i++) {
//                 ids.push(i);
//             }

//             resolve(ids);
//         });
//     })

// }

/**
 *  Query to create an article
 *
 * @param {Array<Article>} article
 * @return {Promise}
 */
function updateArticle(article) {
	return new Promise(function (resolve, reject) {
		const query = [
			`UPDATE article`,
			`SET`,
			`name = ?, journal = ?, conference = ?, rank = ?, year = ?, page_from = ?, page_to = ?, volume = ?, issue = ?, city = ?, abstract = ?,`,
			`institution = ?, department = ?, type = ?, month = ?, day = ?,`,
			`url_date_access = ?,`,
			`ArXivID = ?, DOI = ?, ISBN = ?, ISSN = ?,`,
			`PMID = ?, Scopus = ?, PII = ?, SGR = ?,`,
			`project_id = ?, citation_key = ?, general_note = ?,`,
			`updated_at = ?`,
			`WHERE id = ?`,
		].join(' ');

		const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
		const values = [
			article.name,
			article.journal,
			article.conference,
			article.rank,
			article.year,
			article.pageFrom,
			article.pageTo,
			article.volume,
			article.issue,
			article.city,
			article.abstract,
			article.institution,
			article.department,
			article.type,
			article.month,
			article.day,
			article.urlAccessDate,
			article.ArXivID,
			article.DOI,
			article.ISBN,
			article.ISSN,
			article.PMID,
			article.Scopus,
			article.PII,
			article.SGR,
			article.projectId,
			article.citationKey,
			article.generalNote,
			now,
			article.id,
		];

		connection.query(query, [...values], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(article);
		});
	});
}

/**
 * @param {Number} lecturerId 
 * @param {String} scopusId 
 */
function updateAuthorWithOption(options) {
	return new Promise((resolve, reject) => {

		if (!options) {
			resolve(false);
		}

		const updateStatement = "UPDATE author";
		let setStatement = "SET";
		let whereStatement = "WHERE 1=1";
		const values = [];

		if (!!options?.addLecturerWithGivenScopusId) {
			const {lecturerId, scopusId} = options.addLecturerWithGivenScopusId;
			const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
			setStatement = `${setStatement} lecturer_id = ?, updated_at = ?`;
			whereStatement = `${whereStatement} AND scopus_id = ?`;
			values.push(lecturerId, now, scopusId);
		}

		const query = [
			updateStatement,
			setStatement,
			whereStatement,
		].join(" ");

		connection.query(query, values, (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(true);
		});
	})
}

module.exports = {
	updateArticleUrls,
	// updateArticleFiles,
	updateArticleNotes,
	updateAuthors,
	// updateArticleCategories,
	updateArticle,
	updateAuthorWithOption,
};
