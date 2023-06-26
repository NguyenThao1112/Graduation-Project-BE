//@ts-nocheck
const axios = require('axios');
const queryString = require('querystring');
const cheerio = require('cheerio');

const otherUrlConstants = require('../constants/otherUrlConstants');

function conferenceNameKeywordChooser(conferenceName) {
	const tokens = conferenceName.split(',').map((token) => token.trim());
	let chosenKeyword = conferenceName;
	if (tokens.length > 1) {
		const acronymHaystack = tokens[tokens.length - 1];
		const acronymTokens = acronymHaystack.split(' ');
		const acronym = acronymTokens[0];
		chosenKeyword = acronym;
	}

	return chosenKeyword;
}

async function getConferenceRankByName(conferenceName) {
	const baseUrl = `${otherUrlConstants.CORE_EDU_GET_CONFERENCE_RANK_BY_NAME}`;
	const chosenKeyword = conferenceNameKeywordChooser(conferenceName);
	const queryParams = {
		search: chosenKeyword,
		by: 'acronym',
		source: 'All',
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
			const rawRankUrl = $(element).attr("onclick");

			//get /conf-ranks/2188/ from "navigate('/conf-ranks/2188/')""
			const rankPath = rawRankUrl.match(/navigate\('(.*?)'\)/)[1];
			const rankUrl = `http://portal.core.edu.au${rankPath}`;

			// Extract the values from each column
			const title = $(columns[0]).text().trim();
			const acronym = $(columns[1]).text().trim();
			const source = $(columns[2]).text().trim();
			const rank = $(columns[3]).text().trim();

			// Create an object with the extracted values
			return { title, acronym, source, rank, rankUrl};
		})
		.get();

	if (!conferences[0]) {
		return null;
	}

	const hitConferences = conferences.filter(
		(conference) => chosenKeyword.trim() == conference.acronym.trim()
	);
	if (hitConferences.length > 0) {
		const hitConference = hitConferences[0];
		let rank = null;
		if (['A*', 'A', 'B', 'C'].includes(hitConference.rank)) {
			rank = hitConference.rank;
			rankUrl = hitConference.rankUrl;
		}

		return {
			rank,
			rankUrl,
		};
	}

	return null;
}

async function getConferenceRankByMultipleNames(conferenceNames) {
	try {
		const conferenceRanks = await Promise.all(
			conferenceNames.map((confName) => getConferenceRankByName(confName))
		);

		//Map the conference name with its rank
		const confLength = conferenceRanks.length;
		const conferenceRankMap = {};
		for (let i = 0; i < confLength; i++) {
			conferenceRankMap[conferenceNames[i]] = conferenceRanks[i];
		}

		return conferenceRankMap;
	} catch (error) {
		console.log(error);
		return null;
	}

	return null;
}

module.exports = {
	getConferenceRankByName,
	getConferenceRankByMultipleNames,
};
