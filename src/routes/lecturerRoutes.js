const express = require('express');
const router = express.Router();

// const authMiddlewares = require('../middlewares/authMiddlewares');
const validators = require('../validators/commonValidators');
const uploadFileMiddlewares = require('../middlewares/uploadFileMiddlewares');
const urls = require('../constants/urlConstants');
const lecturerControllers = require('../controllers/lecturerControllers');
const { authGuard } = require('../middlewares/authMiddlewares');
const commonValidators = require('../validators/commonValidators');
const configConstants = require('../constants/configConstants');
const fileUpload = require('express-fileupload');

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
router.get(
	urls.LECTURER_GET_ONE_LECTURER_FROM_ACCOUNT_ID,
	lecturerControllers.getOneLecturerFromAccountId
);

//create lecturers
router.post(urls.LECTURER_CREATE_URL, lecturerControllers.createLecturers);

//upload file
router.post(
	urls.LECTURER_UPLOAD_FILE,
	fileUpload({ createParentPath: true }),
	uploadFileMiddlewares.checkFileExtension(
		configConstants.ARTICLE_FILE_UPLOAD_ALLOWED_EXT
	),
	lecturerControllers.uploadFile
);

router.post(
	urls.LECTURER_UPDATE_PROFILE_URL,
	fileUpload({ createParentPath: true }),
	uploadFileMiddlewares.checkFileExtension(
		configConstants.ARTICLE_FILE_UPLOAD_ALLOWED_EXT
	),
	lecturerControllers.updateProfile
);

router.put(urls.LECTURER_UPDATE_URL, lecturerControllers.updateLecturer);

router.delete(urls.LECTURER_DELETE_URL, lecturerControllers.deleteLecturers);

router.delete(
	urls.LECTURER_DELETE_FILE_URL,
	lecturerControllers.deleteLecturerFile
);

//Get the page count, while on pagination process
router.get(
	`${urls.LECTURER_PAGE_SIZE}`,
	commonValidators.getPageSizeValidator(),
	lecturerControllers.getLecturerPagingSize
);

module.exports = router;
