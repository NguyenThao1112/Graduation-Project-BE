//@ts-nocheck
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

async function updateAuthorProfile(scopusProfile, scopusAuthorId, accountId) {
	try {
		const authorResponse =
			scopusProfile['data']['author-retrieval-response'][0];

		const currentUniversity =
			authorResponse['author-profile']['affiliation-current']['affiliation'][
				'ip-doc'
			];
		const currentUniversityObject = [
			{
				name:
					currentUniversity && currentUniversity['afdispname']
						? currentUniversity['afdispname']
						: null,
				address: scopusHelper.modifyAddress(currentUniversity['address']),
			},
		];
		const affiliationHistory =
			authorResponse['author-profile']['affiliation-history']['affiliation'];
		let historyUniversityList = [];
		for (let i = 0; i < affiliationHistory.length; i++) {
			historyUniversityList.push({
				name: affiliationHistory[i]['ip-doc']['afdispname'],
				address: scopusHelper.modifyAddress(
					affiliationHistory[i]['ip-doc']['address']
				),
			});
		}
		const currentUniversityIds = await createUniversities(
			currentUniversityObject
		);
		const historyUniversityIds = await createUniversities(
			historyUniversityList
		);
		currentUniversityObject[0].id = currentUniversityIds.pop();
		const name =
			authorResponse['author-profile']['preferred-name']['surname'] +
			' ' +
			authorResponse['author-profile']['preferred-name']['given-name'];
		const publicationRange =
			authorResponse['author-profile']['publication-range']['@start'] +
			'-' +
			authorResponse['author-profile']['publication-range']['@end'];
		const citationCount = authorResponse['coredata']['citation-count'];
		const citedByCount = authorResponse['coredata']['cited-by-count'];
		const expandColumn = JSON.stringify({
			publicationRange: publicationRange,
			citationCount: citationCount,
			citedByCount: citedByCount,
		});
		const lecturerInformationObject = {
			accountId: accountId,
			scopusId: scopusAuthorId,
			name: name,
			expandColumn: expandColumn,
			currentDiscipline: {
				universityId: currentUniversityObject[0].id,
			},
			workPositions: historyUniversityIds.map((ele) => {
				return {
					universityId: ele,
				};
			}),
		};

		const lecturerIds = await createLecturer(lecturerInformationObject);
		return lecturerIds;
	} catch (err) {
		console.log(err);
	}
}

/**
 *
 * @param {String} scopusAuthorId
 * @param {String} accountId
 * @returns {Number | undefined} lecturerId
 */
async function saveLecturerWithScopus(scopusAuthorId, accountId) {
	const scopusAuthorData = await getAuthorById(scopusAuthorId);
	const lecturerId = await updateAuthorProfile(
		scopusAuthorData,
		scopusAuthorId,
		accountId
	);

	return lecturerId;
}

module.exports = {
	saveLecturerWithScopus,
};
