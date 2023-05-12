const express = require('express');
const router = express.Router();
const validators = require('../validators/commonValidators');

// const authMiddlewares = require('../middlewares/authMiddlewares');

const urls = require('../constants/urlConstants');
const lecturerControllers = require('../controllers/lecturerControllers');
const { authGuard } = require('../middlewares/authMiddlewares');
const commonValidators = require('../validators/commonValidators');

//get all lecturers with pagination
router.get(
	urls.LECTURER_GET_ALL_PAGINATION_URL,
	validators.getPaginationValidators(),
	lecturerControllers.getLecturersWithPagination
);

//get one lecturer base on its id

//create lecturers
router.post(urls.LECTURER_CREATE_URL, lecturerControllers.createLecturers);

router.put(urls.LECTURER_UPDATE_URL, lecturerControllers.updateLecturer);

// router.delete(urls.LECTURER_DELETE_URL, lecturerControllers.deleteLecturers);

module.exports = router;
