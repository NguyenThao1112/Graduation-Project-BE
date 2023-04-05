const {Article} = '../models/article/article';
const {ArticleUrl} = '../models/article/articleUrl';
const {ArticleFile} = '../models/article/articleFile';
const {ArticleNote} = '../models/article/articleNote';
const {Author} = '../models/article/author';
const connection = require('../configs/database');
const moment = require('moment');
const queryConstants = require('../constants/queryConstants');


/**
 *  Query to create multiple ArticleUrl at the same time
 * 
 * @param {Array<ArticleUrl>} articleUrls
 * @return {Promise}
 */
 function createArticleUrls(articleUrls) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO article_url (`
					`article_id, url,`,
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,',
					'?,?,?', 
				')',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = articleUrls.map(url => [
			url.article.id, url.url,
			now, now, is_deleted
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
    })
    
}


/**
 *  Query to create multiple ArticleFile at the same time
 * 
 * @param {Array<ArticleFile>} articleFiles
 * @return {Promise}
 */
 function createArticleFiles(articleFiles) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO article_file (`
					`article_id, file_path,`,
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,',
					'?,?,?', 
				')',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = articleFiles.map(file => [
			file.article.id, file.path,
			now, now, is_deleted
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
    })
    
}


/**
 *  Query to create multiple ArticleNote at the same time
 * 
 * @param {Array<ArticleNote>} articleNotes
 * @return {Promise}
 */
 function createArticleNotes(articleNotes) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO article_note (`
					`article_id, note,`,
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,',
					'?,?,?', 
				')',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = articleNotes.map(note => [
			note.article.id, note.note,
			now, now, is_deleted
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
    })
    
}


/**
 *  Query to create multiple Author at the same time
 * 
 * @param {Array<Author>} authors
 * @return {Promise}
 */
 function createAuthors(authors) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO author (`
					`lecturer_id, article_id,`,
					`first_name, last_name`,
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,',
					'?,?,',
					'?,?,?', 
				')',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = authors.map(author => {
            const lecturerId = author.lecturerId ?? null;
            const articleId = author.articleId ?? null;

            return [
                lecturerId, articleId,
                author.first_name, author.last_name,
                now, now, is_deleted,
		    ]
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
    })
    
}


/**
 *  Query to create Many-to-Many relation ship between article and tag
 * 
 * @param {Array<[Article, Array<number>]>} categories
 * @return {Promise}
 */
 function createArticleCategories(categories) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO article_tag (`
					`article_id, tag_id,`,
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,',
					'?,?,?', 
				')',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = categories.map(cat => cat[1].map(tagId => [
			cat[0].id, tagId,
			now, now, is_deleted,
		]));

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
    })
    
}


/**
 *  Query to create an article
 * 
 * @param {Array<Article>} article
 * @return {Promise}
 */
 function createArticle(article) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO article (`,
					`name, journal, year, page_from, page_to, volume, issue, city, abstract,`,
					`institution, department, type, month, day,`,
					`url_date_access,`,
					`ArXivID, DOI, ISBN, ISSN,`,
					`PMID, Scopus, PII, SGR,`,
					`project_id, citation_key, general_note,`,
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,?,?,?,?,?,?,?,',
					'?,?,?,?,?,',
					'?,',
					'?,?,?,?,',
					'?,?,?,?,',
					'?,?,?,',
					'?,?,?', 
				')',
        ].join(' ');

        const now = moment().utc().format('YYYY/MM/DD hh:mm:ss');
        const is_deleted = false;
        const values = [
			article.name, article.journal, article.year, article.pageFrom, article.pageTo, article.volume, article.issue, article.city, article.abstract,
			article.institution, article.department, article.type, article.month, article.day,
			article.urlAccessDate,
			article.ArXivID, article.DOI, article.ISBN, article.ISSN,
			article.PMID, article.Scopus, article.PII, article.SGR,
			article.projectId, article.citationKey, article.generalNote,
			now, now, is_deleted
		];

        // console.log(article);
        // console.log(query);
        // console.log(values);

        connection.query(query, [...values], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
 
            let id = result.insertId;
            resolve(id);
        });
    })
    
}

module.exports = {
	createArticleUrls,
	createArticleFiles,
	createArticleNotes,
	createAuthors,
    createArticleCategories,
	createArticle,
};
