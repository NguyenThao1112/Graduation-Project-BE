const {saveLecturerWithScopus} = require('./saveLecturerWithScopus');
const {saveArticleByAuthorScopusId} = require('./saveArticleByAuthorScopusId');

/**
 * 
 * @param {String} scopusAuthorId 
 * @param {String} accountId 
 * @returns {any[2]{Number, Array<Number>}} resultData
 */
async function saveAuthorWithScopusInfo(scopusAuthorId, accountId) {

    let resultData = [null, []];

    try {
        resultData = await Promise.all([
            saveLecturerWithScopus(scopusAuthorId, accountId),
            saveArticleByAuthorScopusId(scopusAuthorId),
        ]);
    } catch (errors) {
        //do nothing
    }

    //Format the data
    if (null === resultData[0] || undefined === resultData[0]) {
        resultData[0] = null;
    }


    return resultData;
}

module.exports = {
    saveAuthorWithScopusInfo
}