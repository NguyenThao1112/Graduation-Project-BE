const {GOOGLE_SCHOLAR_URL} = require("../constants/otherUrlConstants"); 
const cheerio = require('cheerio');
const { XMLHttpRequest } = require('xmlhttprequest');
const randomUserAgent = require('random-useragent');

async function callGoogleScholar(url) {
    const page = new XMLHttpRequest();
    page.open( "GET", url, false );
    // page.setRequestHeader("referer", "https://www.google.com/");
    // page.setRequestHeader("user-agent", randomUserAgent.getRandom());
    await page.send();

    const response = {
        text: page.responseText,
    };

    return response;
}

async function searchFromGoogleScholar(keyword, findCallback) {
    const url = GOOGLE_SCHOLAR_URL.replace("@@@", keyword);
    const response = await callGoogleScholar(url);
    // console.log(keyword, response);
    // const data = parseBody(response, findCallback);
    const data = findCallback(response);

    return data;
}

module.exports = {
    searchFromGoogleScholar,
}