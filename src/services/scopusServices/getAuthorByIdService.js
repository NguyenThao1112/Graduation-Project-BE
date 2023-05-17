const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');

async function getAuthorById(scopusAuthorId) {
	const url = `${scopusConstants.SCOPUS_SEARCH_AUTHOR_BY_ID_API}${scopusAuthorId}`;
	try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);

		return axiosResponse;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

module.exports = {
	getAuthorById,
};
