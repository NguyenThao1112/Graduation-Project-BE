const express = require('express');
const router = express.Router();
const validators = require('../validators/commonValidators');

// const authMiddlewares = require('../middlewares/authMiddlewares');

const urls = require('../constants/urlConstants');
const mentorController = require('../controllers/mentorControllers');

router.get(
    urls.MENTOR_GET_ALL_URL, 
    mentorController.getAllMentorsWithBasicInformation
);

router.get(
    urls.MENTOR_GET_ALL_PAGINATION_URL, 
    validators.getPaginationValidators(), 
    mentorController.getAllMentorsWithPagination
);

module.exports = router;