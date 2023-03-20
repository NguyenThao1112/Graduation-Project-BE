const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const { authGuard } = require('../middlewares/authMiddlewares');
const validators = require('../validators/accountValidators');
const accountController = require('../controllers/accountControllers');

router.get('/', authGuard, accountController.getAccounts);

router.post('/', authGuard, accountController.createAccount);

router.delete('/:id', authGuard, accountController.deleteAccount);

module.exports = router;
