const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

const urls = require('../constants/urlConstants');
const articleController = require('../controllers/articleControllers');
const uploadFileMiddlewares = require('../middlewares/uploadFileMiddlewares');
const configConstants = require('../constants/configConstants');
const commonValidators = require('../validators/commonValidators');


router.get(
    `${urls.ARTICLE_GET_WITH_PAGINATION}`, 
    commonValidators.getPaginationValidators(),
    articleController.getArticlesWithPagination
);

router.post(
    `${urls.ARTICLE_CREATE}`, 
    fileUpload({createParentPath: true}),
    uploadFileMiddlewares.checkFileExtension(configConstants.ARTICLE_FILE_UPLOAD_ALLOWED_EXT),
    uploadFileMiddlewares.checkFileSizeLimit,
    articleController.createArticle
);

router.put(
    `${urls.ARTICLE_UPDATE}`, 
    fileUpload({createParentPath: true}),
    uploadFileMiddlewares.checkFileExtension(configConstants.ARTICLE_FILE_UPLOAD_ALLOWED_EXT),
    uploadFileMiddlewares.checkFileSizeLimit,
    articleController.updateArticle
);

router.delete(
    `${urls.ARTICLE_DELETE}`, 
    articleController.deleteArticles
);

module.exports = router;