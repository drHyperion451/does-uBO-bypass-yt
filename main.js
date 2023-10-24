
const UBLOCK_LIST = 
"https://raw.githubusercontent.com/stephenhawk8054/misc/main/yt-fix.txt"
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
    let data = await fetchData(YT_LIST)

    // Returns what is the latest youtube code
    let urls = data.trim().split('\n');
    let lastUrl = urls[urls.length - 1];
    let urlParts = lastUrl.split('/');
    let lastCode = urlParts[5];
    return lastCode;
}

async function logCodes(forceOption = false) {
    // Displays each log codes to any element with 'ublock-code' id.
    // Idea: Make this change to all elements that share a same class? Maybe
    /// this could be interesting to make dynamic changes after

    let youtube = await getLastYoutubeCode();
    console.log("Youtube latest code: ", youtube);
    document.getElementById("youtube-code").innerHTML = youtube
    
    
    let ublock = await getLastCodeUblock();
    if (forceOption){
        let ublock = youtube
    };
    console.log("Ublock latest code: ", ublock);
    document.getElementById("ublock-code").innerHTML = ublock
    
    return {ublock, youtube}
}

function changeBgColor(colorOption){
    // Depending on the comparison it will change the background color of the 
    // main banner to be more fancy looking
    switch (colorOption) {
        case 'no':
            var lightColor = "#a30f0f";
            var darkColor = '#610b0b';
            break;
        case "yes":
            var lightColor = "#4ae054";
            var darkColor = '#09520e';
        default:
            //console.log("Color applied.")
            break;
    };

    // Main conditional. Changes depending on dark or light mode. 
    let element = document.getElementById('main-detector');
    
    if (ISDARKMODE) {
        element.style.backgroundColor = darkColor;
    } else {
        element.style.backgroundColor = lightColor;
    };
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

async function areCodesEqual(forceOption = false) {

    // Compares both codes
    logCodes(forceOption).then(codes => {
        if (codes.ublock == codes.youtube) {
            // It means ublock is updated with the last YouTube script.
            document.getElementById('main-answer').innerHTML = "YES";
            changeBgColor('yes');
            displayClassname('default', 'none')
            displayClassname('aa-blocked', 'block')
            
        } else {
            // It means youtube has a new update not registered by ublock.
            document.getElementById('main-answer').innerHTML = "NO";
            changeBgColor('no');
            displayClassname('default', 'none');
            displayClassname('not-aa-blocked', 'block')
        }
    })
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
    areCodesEqual(true); // It should be left empty. 
  });
  

