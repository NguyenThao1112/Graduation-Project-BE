const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

const urls = require('../constants/urlConstants');
const articleController = require('../controllers/articleControllers');
const uploadFileMiddlewares = require('../middlewares/uploadFileMiddlewares');
const configConstants = require('../constants/configConstants');

router.post(
    `${urls.ARTICLE_CREATE}`, 
    fileUpload(),
    uploadFileMiddlewares.checkFileExtension(configConstants.ARTICLE_FILE_UPLOAD_ALLOWED_EXT),
    uploadFileMiddlewares.checkFileSizeLimit,
    articleController.createArticle
);

module.exports = router;