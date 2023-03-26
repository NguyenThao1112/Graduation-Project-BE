import {Article} from '../models/article/article';
import {ArticleUrl} from '../models/article/articleUrl';
import {ArticleFile} from '../models/article/articleFile';
import {ArticleNote} from '../models/article/articleNote';
import {Author} from '../models/article/author';
const connection = require('../configs/database');
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
        const values = authors.map(author => [
			author.lecturer.id, author.article.id, 
			author.first_name, author.last_name,
			now, now, is_deleted,
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
 *  Query to create multiple articles at the same time
 * 
 * @param {Array<Article>} articles
 * @return {Promise}
 */
 function createArticles(articles) {
    return new Promise(function (resolve, reject) {
        const query = 
        [
            `INSERT INTO article (`
					`name, year, page_from, page_to, volume, issue, city, abstract,`,
					`institution, department, type, month, day,`
					`url_date_access,`
					`ArXivID, DOI, ISBN, ISSN,`
					`PMID, Scopus, PII, SGR,`
					`project_id, citation_key, general_note,`
					`created_at, updated_at, is_deleted`,
				`)`, 
            'VALUES (',
					'?,?,?,?,?,?,?,?,',
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
        const values = articles.map(a => [
			a.name, a.year, a.page_from, a.page_to, a.volume, a.issue, a.city, a.abstract,
			a.institution, a.department, a.type, a.month, a.day,
			a.url_date_access,
			a.ArXivID, a.DOI, a.ISBN, a.ISSN,
			a.PMID, a.Scopus, a.PII, a.SGR,
			a.project_id, a.citation_key, a.general_note,
			now, now, is_deleted
		]);

        //Using bulk insertion for better performance
        connection.query(query, [values], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Get the id of the created contact types
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

module.exports = {
	createArticleUrls,
	createArticleFiles,
	createArticleNotes,
	createAuthors,
	createArticles,
};
