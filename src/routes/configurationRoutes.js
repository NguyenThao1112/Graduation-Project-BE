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

router.post(
    `${urls.CONFIG_CONTACT_TYPE_API_URL}${urls.CONFIG_CONTACT_TYPE_CREATE}`, 
    configController.createContactTypes,
);

router.put(
    `${urls.CONFIG_CONTACT_TYPE_API_URL}${urls.CONFIG_CONTACT_TYPE_UPDATE}`,
    configController.updateContactType,
)

router.delete(
    `${urls.CONFIG_CONTACT_TYPE_API_URL}${urls.CONFIG_CONTACT_TYPE_DELETE}`,
    configController.deleteContactTypes,
)

module.exports = router;