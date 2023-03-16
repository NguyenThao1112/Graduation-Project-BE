const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const validators = require('../validators/commonValidators');
const configController = require('../controllers/configurationControllers');

router.get(
    `${urls.CONFIG_CONTACT_TYPE_API_URL}${urls.CONFIG_CONTACT_TYPE_GET_WITH_PAGINATION}`, 
    validators.getPaginationValidators(),
    configController.getContactTypesWithPagination
);

router.get(
    `${urls.CONFIG_CONTACT_TYPE_API_URL}${urls.CONFIG_CONTACT_TYPE_GET_ALL}`, 
    configController.getAllContactTypes,
);

module.exports = router;