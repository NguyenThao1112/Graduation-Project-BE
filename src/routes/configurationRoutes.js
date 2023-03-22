const express = require('express');
const router = express.Router();

const urls = require('../constants/urlConstants');
const validators = require('../validators/commonValidators');
const configController = require('../controllers/configurationControllers');

/****************************************************************
 ***********************CONTACT TYPE*****************************
 ****************************************************************/

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


/****************************************************************
 ***********************ACADEMIC RANK*****************************
 ****************************************************************/

 router.get(
    `${urls.CONFIG_ACADEMIC_RANK_API_URL}${urls.CONFIG_ACADEMIC_RANK_GET_WITH_PAGINATION}`, 
    validators.getPaginationValidators(),
    configController.getAcademicRanksWithPagination
);

router.get(
    `${urls.CONFIG_ACADEMIC_RANK_API_URL}${urls.CONFIG_ACADEMIC_RANK_GET_ALL}`, 
    configController.getAllAcademicRanks,
);

router.post(
    `${urls.CONFIG_ACADEMIC_RANK_API_URL}${urls.CONFIG_ACADEMIC_RANK_CREATE}`, 
    configController.createAcademicRanks,
);

router.put(
    `${urls.CONFIG_ACADEMIC_RANK_API_URL}${urls.CONFIG_ACADEMIC_RANK_UPDATE}`,
    configController.updateAcademicRank,
)

router.delete(
    `${urls.CONFIG_ACADEMIC_RANK_API_URL}${urls.CONFIG_ACADEMIC_RANK_DELETE}`,
    configController.deleteAcademicRanks,
)

/****************************************************************
 ***********************ACADEMIC TITLE*****************************
 ****************************************************************/

 router.get(
    `${urls.CONFIG_ACADEMIC_TITLE_API_URL}${urls.CONFIG_ACADEMIC_TITLE_GET_WITH_PAGINATION}`, 
    validators.getPaginationValidators(),
    configController.getAcademicTitlesWithPagination
);

router.get(
    `${urls.CONFIG_ACADEMIC_TITLE_API_URL}${urls.CONFIG_ACADEMIC_TITLE_GET_ALL}`, 
    configController.getAllAcademicTitles,
);

router.post(
    `${urls.CONFIG_ACADEMIC_TITLE_API_URL}${urls.CONFIG_ACADEMIC_TITLE_CREATE}`, 
    configController.createAcademicTitles,
);

router.put(
    `${urls.CONFIG_ACADEMIC_TITLE_API_URL}${urls.CONFIG_ACADEMIC_TITLE_UPDATE}`,
    configController.updateAcademicTitle,
)

router.delete(
    `${urls.CONFIG_ACADEMIC_TITLE_API_URL}${urls.CONFIG_ACADEMIC_TITLE_DELETE}`,
    configController.deleteAcademicTitles,
)

module.exports = router;