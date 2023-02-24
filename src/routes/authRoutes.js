const express = require('express');
const router = express.Router(); 

const urls = require('../constants/urlConstants');
const authController = require('../controllers/authControllers');

router.get(urls.AUTH_LOGIN_API_URL, authController.login);

module.exports = router;