const express = require('express');
const router = express.Router();
const validators = require('../validators/authValidators');

const urls = require('../constants/urlConstants');
const authController = require('../controllers/authControllers');

router.post(urls.AUTH_LOGIN_API_URL, authController.login);
router.post(urls.AUTH_SIGNUP_API_URL, validators.registrationValidators(), authController.signUp);

module.exports = router;