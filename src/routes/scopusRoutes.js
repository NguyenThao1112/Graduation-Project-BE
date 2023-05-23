const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const scopusController = require('../controllers/scopusControllers');

router.get(
	urls.SCOPUS_GET_AUTHORS_BY_NAME_URL,
	scopusController.getScopusAuthorByName
);

router.get(
	"/author/:scopus_author_id/test0",
	scopusController.saveArticleByAuthorScopusId
);

router.get(
	urls.SCOPUS_GET_AUTHOR_BY_SCOPUS_ID_URL,
	scopusController.getAuthorByScopusId
);

module.exports = router;
