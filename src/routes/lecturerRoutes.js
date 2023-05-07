const express = require('express');
const router = express.Router();
const validators = require('../validators/commonValidators');

// const authMiddlewares = require('../middlewares/authMiddlewares');

const urls = require('../constants/urlConstants');
const lecturerControllers = require('../controllers/lecturerControllers');
const { authGuard } = require('../middlewares/authMiddlewares');
const commonValidators = require('../validators/commonValidators');
// router.get(
// 	urls.LECTURER_GET_ALL_URL,
// 	commonValidators.getPaginationValidators(),
// 	lecturerControllers.getAllLecturersWithBasicInformation
// );

router.get(
	urls.LECTURER_GET_ALL_PAGINATION_URL,
	validators.getPaginationValidators(),
	lecturerControllers.getLecturersWithPagination
);

//create lecturers
router.post(urls.LECTURER_CREATE_URL, lecturerControllers.createLecturers);

// router.put(urls.LECTURER_UPDATE_URL, lecturerControllers.updateLecturer);

// router.delete(urls.LECTURER_DELETE_URL, lecturerControllers.deleteLecturers);

module.exports = router;
