const _ = require('lodash');

function parseDataFromGetAuthorFromNameResponse(scopusResponse) {
	const entries = scopusResponse['search-results']['entry'];
	const authorData = [];
	entries.forEach((entry) => {
		if (
			entry.hasOwnProperty('dc:identifier') &&
			entry.hasOwnProperty('preferred-name')
		) {
			const surname = entry['preferred-name']['surname'];
			const givenName = entry['preferred-name']['given-name'];
			const scopusId = entry['dc:identifier'].substring('AUTHOR_ID:'.length);

			const authorEntry = {
				surname,
				givenName,
				scopusId,
			};

			authorData.push(authorEntry);
		}
	});

	return authorData;
}

function modifyAddress(address) {
	let finalAddress = '';
	if (!address) {
		return finalAddress;
	}
	for (const key of Object.keys(address)) {
		if (!key.includes('@')) finalAddress += address[key] + ' ';
	}

	return finalAddress;
}

module.exports = {
	parseDataFromGetAuthorFromNameResponse,
	modifyAddress,
};
