const exceljs = require('exceljs');
const path = require('path');

const ARTICLE_BRIEF_COLUMN_HEADERS = [
	{ header: 'Id', key: 'id', width: 10 },
	{ header: 'Name', key: 'name', width: 10 },
	{ header: 'Journal', key: 'journal', width: 10 },
	{ header: 'Conference', key: 'conference', width: 10 },
	{ header: 'Rank', key: 'rank', width: 10 },
	{ header: 'Year', key: 'year', width: 10 },
	{ header: 'Scopus', key: 'Scopus', width: 10 },
	{ header: 'Authors', key: 'authors', width: 10 },
	{ header: 'VNU Authors', key: 'VNUAuthors', width: 10 },
];
const ARTICLE_COLUMN_HEADERS = [
	{ header: 'Id', key: 'id', width: 10 },
	{ header: 'Name', key: 'name', width: 10 },
	{ header: 'Journal', key: 'journal', width: 10 },
	{ header: 'Journal Url', key: 'journalUrl', width: 10 },
	{ header: 'Conference', key: 'conference', width: 10 },
	{ header: 'Rank', key: 'rank', width: 10 },
	{ header: 'Page From', key: 'pageFrom', width: 10 },
	{ header: 'Page To', key: 'pageTo', width: 10 },
	{ header: 'Volume', key: 'volume', width: 10 },
	{ header: 'Issue', key: 'issue', width: 10 },
	{ header: 'Citation count', key: 'citationCount', width: 10 },
	{ header: 'Abstract', key: 'abstract', width: 10 },

	{ header: 'Month', key: 'month', width: 10 },
	{ header: 'Day', key: 'day', width: 10 },
	{ header: 'Year', key: 'year', width: 10 },

	{ header: 'ArXivID', key: 'ArXivID', width: 10 },
	{ header: 'DOI', key: 'DOI', width: 10 },
	{ header: 'ISBN', key: 'ISBN', width: 10 },
	{ header: 'ISSN', key: 'ISSN', width: 10 },
	{ header: 'PMID', key: 'PMID', width: 10 },
	{ header: 'Scopus', key: 'Scopus', width: 10 },
	{ header: 'PII', key: 'PII', width: 10 },
	{ header: 'SGR', key: 'SGR', width: 10 },

	{ header: 'Authors', key: 'authors', width: 10 },
	{ header: 'VNU Authors', key: 'VNUAuthors', width: 10 },
];

function buildWorkbook(headers, data, options = null) {
	try {
		const workbook = new exceljs.Workbook();
		const worksheet = workbook.addWorksheet();
		worksheet.columns = headers;

		if (options.hasOwnProperty('article') && options.article) {
			if (!options.isBrief) {
				worksheet.getColumn('abstract').alignment = {
					...worksheet.getColumn('abstract').alignment,
					wrapText: true,
				};
			}
			worksheet.getColumn('authors').alignment = {
				...worksheet.getColumn('authors').alignment,
				wrapText: true,
			};
		}

		data.forEach((row) => {
			worksheet.addRow(row);
		});

		return workbook;
	} catch (error) {
		console.error(error);
		return null;
	}
}

module.exports = {
	ARTICLE_COLUMN_HEADERS,
	ARTICLE_BRIEF_COLUMN_HEADERS,
	buildWorkbook,
};
