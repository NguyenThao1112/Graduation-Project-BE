const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');

const config = {
	headers: {
		'X-ELS-APIKey': scopusConstants.SCOPUS_API_KEY,
		'X-ELS-Insttoken': scopusConstants.SCOPUS_INSTITUTION_TOKEN,
	},
};

async function getBaseLecturerByName(firstName, lastName) {
	const url = `${scopusConstants.SCOPUS_SEARCH_BASE_AUTHOR_API}?query=AF-ID(${scopusConstants.VNU_HCM_AFFLIATION_ID})+AUTHFIRST("${firstName}")+AUTHLAST("${lastName}")`;
	try {
		const axiosResponse = await axios.get(url, config);
		const response = scopusHelper.parseDataFromGetAuthorFromNameResponse(
			axiosResponse.data
		);

		return response;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

module.exports = {
	getBaseLecturerByName,
};
