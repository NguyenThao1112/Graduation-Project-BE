const express = require('express');
const router = express.Router();
const validators = require('../validators/authValidators');
// const authMiddlewares = require('../middlewares/authMiddlewares');

const urls = require('../constants/urlConstants');
const mentorController = require('../controllers/mentorControllers');

router.get(urls.MENTOR_GET_ALL_URL, mentorController.getAllMentorsWithBasicInformation);

module.exports = router;