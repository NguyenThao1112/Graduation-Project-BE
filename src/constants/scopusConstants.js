module.exports = Object.freeze({
	VNU_HCM_AFFLIATION_ID: '60078566',

	SCOPUS_SEARCH_BASE_AUTHOR_API:
		'https://api.elsevier.com/content/search/author',
	SCOPUS_SEARCH_AUTHOR_BY_ID_API:
		'https://api.elsevier.com/content/author/author_id/',
	SCOPUS_SEARCH_BASE_ARTICLE_BY_AUTHOR_ID:
		'https://api.elsevier.com/content/search/scopus',
	SCOPUS_SEARCH_ABSTRACT_BY_ARTICLE_ID:
		'https://api.elsevier.com/content/abstract/scopus_id',
	SCOPUS_SEARCH_JOURNAL_RANKING_API:
		'https://api.elsevier.com/content/serial/title',

	SCOPUS_API_KEY: process.env.SCOPUS_API_KEY,
	SCOPUS_INSTITUTION_TOKEN: process.env.SCOPUS_INSTITUTION_TOKEN,

	SCOPUS_API_BATCH_SIZE: 10,
});
