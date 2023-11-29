/*
MAIN.JS
Main javascript function.
*/
import { areCodesEqual } from "./modules/are_codes_equal.mjs"
import { changeUpdatedDateHTML } from "./modules/change_updated_date_html.mjs" 
import { quickFilterButtonChange } from "./modules/quick_filter_button_change.mjs"

const UBLOCK_LIST = "https://raw.githubusercontent.com/stephenhawk8054/misc/main/yt-fix.txt"
const UBLOCK_API_URL = "https://api.github.com/repos/stephenhawk8054/misc/commits?path=yt-fix.txt&page=1&per_page=1";
const YT_LIST = "https://pastefy.app/G1Txv5su/raw"
const DEPLOY_FORCE = "https://raw.githubusercontent.com/drHyperion451/DUBY-config/main/forceEquality"
const TEST_FAKEGET = false; 

async function fetchData(codeList){
    //// Fetches the uBlock list file
    // TODO: Remove this and the one in are_codes_equal.mjs
    let response = await fetch(codeList);
    return await response.text();
}
async function getLastCodeUblock(url_ublock){
    let data;
    if (TEST_FAKEGET == true){
        data = 'TESTING'
    } else {
    data = await fetchData(url_ublock)};
    // Returns the latest uBlock code
    let codes = data.trim().split('\n');
    let lastCode = codes[codes.length - 1];
    return lastCode;
}

async function getLastYoutubeCode(yt_url){
    let data;
    if (TEST_FAKEGET == true){
        data = 'a/b/c/d/e/TESTING/f/ - 2023-11-27 05:27+00:00'
    } else{
    data = await fetchData(yt_url)};

    // Returns the latest YouTube code
    let urls = data.trim().split('\n'); 
    let lastUrl = urls[urls.length - 1];
    
    // Example: https://www.youtube.com/s/desktop/bd3558ba/ - 2023-11-27 05:27+00:00
    // Date is in ISO8601 format
    let infoParts = lastUrl.split(' - ');

    // Code id part
    let urlParts = infoParts[0].split('/');
    let lastCode = urlParts[5];

    // Date
    let dateYoutubeId = new Date(infoParts[1]);
    return [lastCode, dateYoutubeId];
}

async function getUpdateDate(url){
    // Gets last commit date from Github API.
    let data = await fetchData(url);

    let data_json = JSON.parse(data);
    let o_date = data_json[0].commit.author.date;
    return o_date
}

async function fetchDateAndUpdate({url_api} = {}){
    let dateiso = await getUpdateDate(url_api);
    //await changeUpdatedDateHTML(dateiso);
    await quickFilterButtonChange(dateiso);

}
function newTabAnchors(classname){
    // Automatically sets all anchors with an specific class to be open as
    // newtab
    let anchor_array = document.getElementsByClassName(classname);
    for (let i = 0; i < anchor_array.length; i++) {
        const element = anchor_array[i];
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer')
    };
}
// Main exec:
async function main(){
    newTabAnchors('new-tab');
    try {
        const [ublockResult, ytResult] = await Promise.all([
            getLastCodeUblock(UBLOCK_LIST),
            getLastYoutubeCode(YT_LIST)
        ]);

        const ID_UBLOCK = ublockResult;
        const [ID_YT, DATE_YT] = ytResult;

        areCodesEqual({
            id_ublock: ID_UBLOCK,
            id_yt: ID_YT,
            force_deploy_url: DEPLOY_FORCE,
            forceEquality: 0,
            forceOption: '',
        });

        fetchDateAndUpdate({
            url_api: UBLOCK_API_URL
        });

        changeUpdatedDateHTML(DATE_YT)
    } catch (error) {
        console.error('Error fetching IDs:', error);
    }
}

window.addEventListener("load", (event) => {
    main();
  });
  

