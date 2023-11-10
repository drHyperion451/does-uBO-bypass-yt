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


async function fetchData(codeList){
    //// Fetches the uBlock list file
    // TODO: Remove this and the one in are_codes_equal.mjs
    let response = await fetch(codeList);
    return await response.text();
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
    await changeUpdatedDateHTML(dateiso);
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

window.addEventListener("load", (event) => {
    newTabAnchors('new-tab');
    areCodesEqual({
        url_ublock: UBLOCK_LIST,
        yt_url: YT_LIST,
        force_deploy_url: DEPLOY_FORCE,
        forceEquality: 0, // false: Website will work as normal
                        // true: It will force uBlock to have the same id as YT
        forceOption:'', // 'yes': It will force the page to always say yes
                          // 'no': It will force the page to always say no
                          // default: Disables debug option.
    });
    fetchDateAndUpdate({
        url_api: UBLOCK_API_URL
    });

  });
  

