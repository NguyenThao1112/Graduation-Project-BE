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

module.exports = router;
