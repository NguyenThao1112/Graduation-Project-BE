const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const validators = require('../validators/accountValidators');

router.get(urls.GET_ALL_ACCOUNT_URL, validators.tokenValidators());
