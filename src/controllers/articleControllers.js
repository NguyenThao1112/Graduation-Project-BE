const createArticleService = require('../services/articleServices/createArticleServices');
const updateArticleService = require('../services/articleServices/updateArticleServices');
const deleteArticleService = require('../services/articleServices/deleteArticleServices');
const searchArticleService = require('../services/articleServices/searchArticleServices');
const messageConstants = require('../constants/messageConstants');
const validatorHelper = require('../helpers/validatorHelper');
const commonHelper = require('../helpers/commonHelper');

/**
 * Create an article
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function createArticle(request, response) {
	const uploadArticleFiles = request.files ?? null;
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		//Get the "data" property
		const { data } = request.body;
		const articleObject = JSON.parse(data);

		createArticleService
			.createArticle(articleObject, uploadArticleFiles)
			.then((articleId) => {
				//If there is a not empty id => change the response's data
				if (null !== articleId) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ARTICLE_CREATE_SUCCESS_MESSAGE;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 * Update an article
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function updateArticle(request, response) {
	const uploadArticleFiles = request.files ?? null;
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		//Get the "data" property
		const { data } = request.body;
		const articleObject = JSON.parse(data);

		//Bind the id for the articleObject
		articleObject.id = request.params.id;

		updateArticleService
			.updateArticle(articleObject, uploadArticleFiles)
			.then((successFlag) => {
				if (successFlag) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ARTICLE_UPDATE_SUCCESS_MESSAGE;
				}
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 * Delete multiple articles
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function deleteArticles(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		//Get the "data" property
		const { data } = request.body;
		const deleteIds = data.map((data) => data.id);

		deleteArticleService
			.deleteArticles(deleteIds)
			.then((successFlag) => {
				if (successFlag) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ARTICLE_DELETE_SUCCESS_MESSAGE;
				}
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getArticlesWithPagination(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		const [pageOffset, limitSize] = commonHelper.normalizePaginationParam(
			request.query.pageOffset,
			request.query.limitSize
		);

		let sort = request.query.sort ?? 'ASC';
		if (!['ASC', 'DESC'].includes(sort.toUpperCase())) {
			sort = 'ASC';
		}

		const options = {
			searchByKeyword: request.query.keyword ?? undefined,
			sort,
		};

		//Try to get all the article with pagination from the database
		searchArticleService
			.getArticlesWithPagination(pageOffset, limitSize, options)
			.then((articleDatas) => {
				//If there is a not-null data => change the response's data
				if (articleDatas) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message = messageConstants.ARTICLE_GET_SUCCESS_MESSAGE;
					responseJson.data = articleDatas;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getArticlesByLecturerIds(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		//Get the "data" property
		const { data } = request.body;
		const lecturerIds = data.lecturerIds;

		//Try to get all the articles with the given lecturer's id from the database
		searchArticleService
			.getArticlesWithLecturerIds(lecturerIds)
			.then((articleDatas) => {
				//If there is a not-null data => change the response's data
				if (articleDatas) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message = messageConstants.ARTICLE_GET_SUCCESS_MESSAGE;
					responseJson.data = articleDatas;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getArticlePagingSize(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		const limitSize = parseInt(request.query.limitSize);
		const keyword = request.query.keyword ?? null;

		//Try to get the number of page with paging size
		searchArticleService
			.getArticlePagingSize(limitSize, keyword)
			.then((pagingSize) => {
				//If there is a not-null data => change the response's data
				if (-1 !== pagingSize) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ARTICLE_GET_PAGING_SIZE_SUCCESS_MESSAGE;
					responseJson.data = pagingSize;
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {Promise}
 */
function getArticleById(request, response) {
	return new Promise((resolve, reject) => {
		//Check if the request is valid
		const hasError = validatorHelper.verifyValidations(request, response);
		if (hasError) {
			return;
		}

		//Default response is error response
		let responseJson = {
			code: messageConstants.ARTICLE_INVALID_CODE,
			message: messageConstants.ARTICLE_INVALID_MESSAGE,
		};

		//Get the "id" path variable
		const articleId = parseInt(request.params.id);
		const articleIds = [articleId];

		searchArticleService
			.getArticleByIds(articleIds)
			.then((articles) => {
				if (articles.length > 0) {
					responseJson.code = messageConstants.SUCCESSFUL_CODE;
					responseJson.message =
						messageConstants.ARTICLE_GET_DETAIL_SUCCESS_MESSAGE;
					responseJson.data = articles[0];
				} else if (0 === articles.length) {
					responseJson.code = messageConstants.ARTICLE_NOT_FOUND_CODE;
					responseJson.message = messageConstants.ARTICLE_NOT_FOUND_MESSAGE;
				}
			})
			.finally(() => {
				response.json(responseJson);
			});
	});
}

module.exports = {
	getArticlesWithPagination,
	getArticlesByLecturerIds,
	createArticle,
	updateArticle,
	deleteArticles,
	getArticlePagingSize,
	getArticleById,
};
