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

//get all lecturers
router.get(urls.LECTURER_GET_ALL_URL, lecturerControllers.getAllLecturers);

//get one lecturer base on its id
router.get(urls.LECTURER_GET_ONE_LECTURER, lecturerControllers.getOneLecturer);

//get lecturer Id from accountId
router.get(urls.LECTURER_GET_ONE_LECTURER_FROM_ACCOUNT_ID,lecturerControllers.getOneLecturerFromAccountId);

//create lecturers
router.post(urls.LECTURER_CREATE_URL, lecturerControllers.createLecturers);

router.put(urls.LECTURER_UPDATE_URL, lecturerControllers.updateLecturer);

router.delete(urls.LECTURER_DELETE_URL, lecturerControllers.deleteLecturers);

//Get the page count, while on pagination process
router.get(
    `${urls.LECTURER_PAGE_SIZE}`, 
    commonValidators.getPageSizeValidator(),
    lecturerControllers.getLecturerPagingSize
);


module.exports = router;
