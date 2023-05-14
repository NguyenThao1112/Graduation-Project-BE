const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const scopusController = require('../controllers/scopusControllers');

router.get(urls.SCOPUS_GET_AUTHORS_BY_NAME_URL, scopusController.getScopusAuthorByName);

module.exports = router;
