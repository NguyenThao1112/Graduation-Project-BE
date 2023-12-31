const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const scopusController = require('../controllers/scopusControllers');

router.get(
	urls.SCOPUS_GET_AUTHORS_BY_NAME_URL,
	scopusController.getScopusAuthorByName
);

// router.get(
// 	urls.SCOPUS_GET_AUTHOR_BY_SCOPUS_ID_URL,
// 	scopusController.getAuthorByScopusId
// );

router.post(
	urls.SCOPUS_SAVE_AUTHOR_ALL_INFO_BY_SCOPUS_ID_AND_ACCOUNT_ID,
	scopusController.saveAuthorWithScopus
)	

router.get(
	urls.SCOPUS_GET_CONFERENCE_RANK_BY_NAME,
	scopusController.getConferenceRankByName
);

router.post(
	urls.SCOPUS_GET_ARTICLE_BY_DOI_URL,
	scopusController.findArticleByDOI
);

router.post(
	"/issn/",
	scopusController.getJournalRankISSNs
)

module.exports = router;
