const axios = require('axios').default; // node
const config = require('../constants/configConstants');
const apiKey = config.API_KEY_GOOGLE_SCHOLAR;
const getAllScopus = async () => {};
const saveOneAuthorOfScholar = async (request, response) => {
	const authorId = request.body.authorId;
	const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&api_key=${apiKey}`;
	try {
		const axiosResponse = await axios.get(url);
		// handle the response data here
		console.log(axiosResponse.data);

		// return success response
		return response.status(200).json({ data: axiosResponse.data });
	} catch (error) {
		// handle any errors here
		console.error(error);

		// return error response
		return response.status(500).json({ message: 'Error fetching author data' });
	}
};
const saveAllCitationOfScholar = async (request, response) => {
	const citationId = request.body.citationId;
	const apiKey = config.API_KEY_GOOGLE_SCHOLAR;
	const url = `https://serpapi.com/search.json?engine=google_scholar_author&view_op=view_citation&citation_id=${citationId}&api_key=${apiKey}`;
	try {
		const axiosResponse = await axios.get(url);
		// handle the response data here
		console.log(axiosResponse.data);

		// return success response
		return response.status(200).json({ data: axiosResponse.data });
	} catch (error) {
		// handle any errors here
		console.error(error);

		// return error response
		return response
			.status(500)
			.json({ message: 'Error fetching citation data' });
	}
};
module.exports = {
	saveOneAuthorOfScholar,
	getAllScopus,
	saveAllCitationOfScholar,
};
