const axios = require('axios');
const scopusHelper = require('../../helpers/scopusHelper');
const scopusConstants = require('../../constants/scopusConstants');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');
const { createUniversities } = require('../configurationServices');
const {
	createLecturer,
} = require('../lecturerServices/createlecturerServices');

async function getAuthorById(scopusAuthorId) {
	const url = `${scopusConstants.SCOPUS_SEARCH_AUTHOR_BY_ID_API}${scopusAuthorId}`;
	try {
		const response = await axios.get(url, SCOPUS_CONFIG);
		return response;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

async function updateAuthorProfile(scopusProfile, accountId) {
	try {
		const authorResponse =
			scopusProfile['data']['author-retrieval-response'][0];
		const currentUniversity =
			authorResponse['author-profile']['affiliation-current']['affiliation'][
				'ip-doc'
			];
		const currentUniversityObject = [
			{
				name: currentUniversity['afdispname'],
				address: scopusHelper.combineAddress(currentUniversity['address']),
			},
		];
		const affiliationHistory =
			authorResponse['author-profile']['affiliation-history']['affiliation'];
		let historyUniversityList = [];
		for (let i = 0; i < affiliationHistory.length; i++) {
			historyUniversityList.push({
				name: affiliationHistory[i]['ip-doc']['afdispname'],
				address: affiliationHistory[i]['ip-doc']['address'],
			});
		}
		const universityIds = await createUniversities(currentUniversityObject);
		currentUniversityObject[0].id = universityIds.pop();
		const name =
			authorResponse['author-profile']['preferred-name']['surname'] +
			' ' +
			authorResponse['author-profile']['preferred-name']['given-name'];
		const publicationRange =
			authorResponse['author-profile']['publication-range']['@start'] +
			'-' +
			authorResponse['author-profile']['publication-range']['@end'];
		const citationCount =
			authorResponse['author-profile']['coredata']['citation-count'];
		const citedByCount =
			authorResponse['author-profile']['coredata']['cited-by-count'];
		const expandColumn = JSON.stringify({
			publicationRange: publicationRange,
			citationCount: citationCount,
			citedByCount: citedByCount,
		});
		const lecturerInformationObject = {
			accountId: accountId,
			name: name,
			expandColumn: expandColumn,
			currentDiscipline: {
				universityId: currentUniversityObject[0].id,
			},
			workPosition: historyUniversityList,
		};

		const lecturerIds = await createLecturer(lecturerInformationObject);
		return lecturerIds;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getAuthorById,
	updateAuthorProfile,
};
