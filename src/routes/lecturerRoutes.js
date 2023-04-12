const express = require('express');
const router = express.Router();
const validators = require('../validators/commonValidators');

// const authMiddlewares = require('../middlewares/authMiddlewares');

const urls = require('../constants/urlConstants');
const lecturerControllers = require('../controllers/lecturerControllers');
const { authGuard } = require('../middlewares/authMiddlewares');

router.get(
	urls.LECTURER_GET_ALL_URL,
	authGuard,
	lecturerControllers.getAllLecturersWithBasicInformation
);

router.get(
	urls.LECTURER_GET_ALL_PAGINATION_URL,
	authGuard,
	validators.getPaginationValidators(),
	lecturerControllers.getAllLecturersWithPagination
);

//create lecturers
router.post(
	urls.LECTURER_CREATE_URL,
	authGuard,
	lecturerControllers.createLecturers
);

router.put(
	urls.LECTURER_UPDATE_URL,
	authGuard,
	lecturerControllers.updateLecturer
);

router.delete(
	urls.LECTURER_DELETE_URL,
	authGuard,
	lecturerControllers.deleteLecturers
);

module.exports = router;
