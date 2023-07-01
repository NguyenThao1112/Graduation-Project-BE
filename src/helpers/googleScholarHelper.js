const {GOOGLE_SCHOLAR_URL} = require("../constants/otherUrlConstants"); 
const cheerio = require('cheerio');
const { XMLHttpRequest } = require('xmlhttprequest');

async function callGoogleScholar(url) {
    const page = new XMLHttpRequest();
    page.open( "GET", url, false );
    await page.send();

    const response = {
        text: page.responseText,
    };

    return response;
}

function parseBody(response, findCallback) {
    const page = response?.text;

    if (!page) {
        return null;
    }

    const $ = cheerio.load(page);
    const searchEntries = $("div[class='gs_r gs_or gs_scl']");
    const results = [];
    searchEntries.each((idx, entry) => {
        const result = findCallback($, entry);
        results.push(result);
    });
    
    return results;
}


async function searchFromGoogleScholar(keyword, findCallback) {
    const url = GOOGLE_SCHOLAR_URL.replace("@@@", keyword);
    const response = await callGoogleScholar(url);
    const data = parseBody(response, findCallback);

    return data;
}

module.exports = {
    searchFromGoogleScholar,
}