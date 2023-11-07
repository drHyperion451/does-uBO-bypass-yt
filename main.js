

const UBLOCK_LIST = 
"https://raw.githubusercontent.com/stephenhawk8054/misc/main/yt-fix.txt"
const UBLOCK_API_URL = "https://api.github.com/repos/stephenhawk8054/misc/commits?path=yt-fix.txt&page=1&per_page=1";
const YT_LIST = "https://pastefy.app/G1Txv5su/raw"



let ISDARKMODE = 
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

async function fetchData(codeList){
    //// Fetchs the ublock list file
    let response = await fetch(codeList);
    return await response.text();
}
async function getLastCodeUblock(){
    let data = await fetchData(UBLOCK_LIST)

    // Returns what is the latest ublock code
    let codes = data.trim().split('\n');
    let lastCode = codes[codes.length - 1];
    return lastCode;
}

async function getLastYoutubeCode(){
    let data = await fetchData(YT_LIST);

    // Returns what is the latest youtube code
    let urls = data.trim().split('\n');
    let lastUrl = urls[urls.length - 1];
    let urlParts = lastUrl.split('/');
    let lastCode = urlParts[5];
    return lastCode;
}

async function logCodes(forceEquality = false) {
    // Displays each log codes to any element with 'ublock-code' id.
    // Idea: Make this change to all elements that share a same class? Maybe
    /// this could be interesting to make dynamic changes after

    let youtube = await getLastYoutubeCode();
    console.log("Youtube latest code: ", youtube);
    document.getElementById("youtube-code").innerHTML = youtube
    
    
    var ublock = await getLastCodeUblock();
    // Even with toggleOption is enabled it will display the fetched ublock code
    console.log("Ublock fetched latest code: ", ublock); 
    if (forceEquality){
        var ublock = youtube
        console.warn("forceEquality is enabled for quick updates. Check the ublock code for changes")
    };
    document.getElementById("ublock-code").innerHTML = ublock
    
    return {ublock, youtube}
}

function changeShortcutIconColor(colorOption) {
    switch (colorOption) {
        case 'no':
            var filename = "favicon-red.svg";
            break;
        case "yes":
            var filename = "favicon-green.svg";
    };
    link = document.getElementById('favicon');
    link.href = "assets/icons/" + filename;
}

function changeBgColor(colorOption){
    // Depending on the comparison it will change the background color of the 
    // main banner to be more fancy looking
    switch (colorOption) {
        case 'yes':
            var bgColor = 'var(--banner-yes)';
            break;
        case "no":
            var bgColor = "var(--banner-no)";
        default:
            //console.log("Color applied.")
            break;
    };

    // Main conditional. Changes depending on dark or light mode. 
    let element = document.getElementById('main-detector');
    

    element.style.backgroundColor = bgColor;

    // The fade in animatiton is handled by using CSS.
    element.classList.add("fade-in-main-detector");
}

function displayClassname(classname, displayCSS){
    // Changes the about section depending on classname:
    let class_list = document.getElementsByClassName(classname);
    for (let i = 0; i < class_list.length; i++) {
        const element = class_list[i];
        element.style.display = displayCSS;
    };
}

function displayTroubleshootLink(display){
    //shows the troubleshooter link if true, hides it if false
    document.getElementById("troubleshoot-footer").style.display = (display ? "" : "none");
}

async function areCodesEqual(forceEquality = false, forceOption = '') {

    // Compares both codes
    logCodes(forceEquality).then(codes => {
        switch (forceOption) {
            // Just for debug options
            case 'yes' && 'no':
                console.warn("Debug is enabled!")
            case 'yes':
                codes.ublock, codes.youtube = 1
                break;
            case 'no':
                codes.ublock = 0; codes.youtube = 1
            default:
                break;
        }
        if (codes.ublock == codes.youtube) {
            // It means ublock is updated with the last YouTube script.
            document.getElementById('main-answer').innerHTML = "YES";
            changeBgColor('yes');
            changeShortcutIconColor('yes');
            displayClassname('default', 'none');
            displayClassname('aa-blocked', 'block');
            displayTroubleshootLink(true);
        } else {
            // It means youtube has a new update not registered by ublock.
            document.getElementById('main-answer').innerHTML = "NO";
            changeBgColor('no');
            changeShortcutIconColor('no');
            displayClassname('default', 'none');
            displayClassname('not-aa-blocked', 'block');
            displayTroubleshootLink(false);
        }
    })
}

async function getUpdateDate(url){
    // Gets last commit date from Github API.
    let data = await fetchData(url);

    let data_json = JSON.parse(data);
    let o_date = data_json[0].commit.author.date;
    return o_date
}

function pastTenseTime(dateiso){
    // Converts any ISO8601 to date in past tense (an hour ago...)
    let date = new Date(dateiso);
    let now = new Date();
    let secondsPast = (now.getTime() -  date.getTime()) / 1000;
    let output_string = ""

    // Is this the fastest method? 
    // I'm skeptic, but...https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than

    if (secondsPast < 60){ // one minute
        output_string = parseInt(secondsPast) + ' seconds ago.'
    } else
    if (secondsPast < 3600){ // one hour
        output_string = parseInt(Math.round(secondsPast/60)) + ' minutes ago.'
    } else
    if (secondsPast <86400){ // one day
        output_string = parseInt(Math.round(secondsPast/3600)) + ' hours ago.'
    } else
    if (secondsPast < 2419200){ // one month
        let days = Math.round(secondsPast/86400)
        if (days == 1) {
            output_string = 'A day ago.'
        } else {
        output_string = parseInt(days) + ' days ago'
        }
    } else { // more than a month. Display date as full.
        const day = date.getDate();
        const month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        const year = date.getFullYear() == now.getFullYear() ? "" :  " "+date.getFullYear();
        output_string = day + " " + month + year;
    }
    return output_string
}
async function changeUpdatedDateHTML(){
    // changes any element with class 'filter-update-since'
    let dateiso = await getUpdateDate(UBLOCK_API_URL);
    let past_date_str = pastTenseTime(dateiso);

    let filter_update_since = document.getElementsByClassName('filter-update-since');
    for (let i = 0; i < filter_update_since.length; i++) {
        const element = filter_update_since[i];
        element.innerHTML = past_date_str
        // adds hover info.
        element.title = new Date(dateiso).toLocaleString();
    }
}
function newTabAnchors(classname){
    // Automatically sets all anchors with an speciffic class to be open as
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
    areCodesEqual(
        forceEquality = 0, // false: Website will work as normal
                        // true: It will force ublock to have the same id as yt
        forceOption = '', // 'yes': It will force the page to always say yes
                          // 'no': It will force the page to always say no
                          // default: Disables debug option.
    );
    changeUpdatedDateHTML();

  });
  

