const axios = require('axios');
const scopusConstants = require('../../constants/scopusConstants');
const {normalizeIssn} = require('../../helpers/scopusHelper');
const { SCOPUS_CONFIG } = require('../../constants/configConstants');

/**
 * 
 * @param {string[]} issnArray
 *  
 * @returns {Promise<Object {
 *  
 * }>} 
 */
async function getJournalRanking(issnArray) {
    if (0 === issnArray.length) {
        return null;
    }

    const issnToString = issnArray.join(",");
    const url = `${scopusConstants.SCOPUS_SEARCH_JOURNAL_RANKING_API}?view=CITESCORE&issn=${issnToString}`;

    try {
		const axiosResponse = await axios.get(url, SCOPUS_CONFIG);
        const issnEntry = axiosResponse.data['serial-metadata-response'].entry;

        //Get the map, with above example
        /**
         * {
         *  "0920-5691": {
         *      "2023": 96,
         *      "2022": 95,
         *  }
         * }
         */
        const issnMap = {};
        issnEntry.forEach(entry => {
            const issn = normalizeIssn(entry['prism:issn']); 
            issnMap[issn] = {};
            entry.citeScoreYearInfoList.citeScoreYearInfo.forEach(yearInfo => {
                const year = yearInfo['@year'];
                issnMap[issn][year] = 0;
                yearInfo.citeScoreInformationList.forEach(citeScoreInformationListEntry => {
                    const citeScoreInfo = citeScoreInformationListEntry.citeScoreInfo;
                    citeScoreInfo.forEach(citeScoreInfoEntry => {
                        citeScoreInfoEntry.citeScoreSubjectRank.forEach(subjectEntry => {
                            const currentPercentile = issnMap[issn][year];
                            const thisPercentile = parseInt(subjectEntry.percentile);
                            issnMap[issn][year] = (currentPercentile < thisPercentile) ? thisPercentile: currentPercentile;
                        });
                    });
                });
            });

            const entryLinks = entry.link?.filter(url => {
                return 'scopus-source' === url['@ref'];
            });
            issnMap[issn].journalUrl = !!entryLinks && entryLinks[0] ? entryLinks[0]['@href']: null;
        })

		return issnMap;
	} catch (error) {
		// handle any errors here
		console.error(error);

		return null;
	}
}

module.exports = {
    getJournalRanking
}
