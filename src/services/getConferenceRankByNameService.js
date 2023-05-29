//@ts-nocheck
const axios = require('axios');
const queryString = require('querystring');
const cheerio = require('cheerio');

const otherUrlConstants = require('../constants/otherUrlConstants');

async function getConferenceRankByName(conferenceName) {
	const baseUrl = `${otherUrlConstants.CORE_EDU_GET_CONFERENCE_RANK_BY_NAME}`;
	const queryParams = {
		search: conferenceName,
		by: 'all',
		source: 'CORE2021',
		sort: 'atitle',
		page: 1,
	};

	const url = `${baseUrl}?${queryString.stringify(queryParams)}`;
	const response = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${otherUrlConstants.CORE_EDU_API_KEY}`,
		},
	});
	// The given string
	const html = response.data;

	// Load the HTML string into Cheerio
	const $ = cheerio.load(html);

	// Select the table rows (excluding the header row)
	const rows = $('table tbody tr').slice(1);

	// Convert each row into an object
	const conferences = rows
		.map((index, element) => {
			const columns = $(element).find('td');

			// Extract the values from each column
			const title = $(columns[0]).text().trim();
			const acronym = $(columns[1]).text().trim();
			const source = $(columns[2]).text().trim();
			const rank = $(columns[3]).text().trim();

			// Create an object with the extracted values
			return { title, acronym, source, rank };
		})
		.get();

	return conferences[0].rank;
}

module.exports = {
	getConferenceRankByName,
};
