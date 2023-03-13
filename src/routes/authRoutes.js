const express = require('express');
const router = express.Router();
const validators = require('../validators/authValidators');
// const authMiddlewares = require('../middlewares/authMiddlewares');

const urls = require('../constants/urlConstants');
const authController = require('../controllers/authControllers');

router.post(urls.AUTH_LOGIN_API_URL, authController.login);
router.post(
	urls.AUTH_SIGNUP_API_URL,
	validators.registrationValidators(),
	authController.signUp
);
router.post(
	urls.AUTH_FORGET_PASSWORD_API_URL,
	validators.forgetPasswordValidators(),
	authController.buildForgetPassword
);
router.get(
	urls.AUTH_FORGET_PASSWORD_API_URL,
	validators.forgetPasswordTokenValidators(),
	authController.verifyForgetPasswordToken
);
router.post(
	urls.AUTH_FORGET_PASSWORD_CHANGE_PASSWORD_API_URL,
	validators.confirmPasswordValidators(),
	authController.changePasswordAfterForgeting
);

module.exports = router;
