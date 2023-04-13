const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const reportController = require('../controllers/reportControllers');

router.get(urls.REPORT_SCOPUS_GET_ALL, reportController.getAllScopus);
router.post(
	urls.SAVE_ONE_AUTHOR_GOOGLE_SCHOLAR,
	reportController.saveOneAuthorOfScholar
);
router.post(
	urls.SAVE_ALL_CITATION_GOOGLE_SCHOLAR,
	reportController.saveAllCitationOfScholar
);
module.exports = router;
