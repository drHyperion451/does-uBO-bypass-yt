
let UBLOCK_LIST = "https://raw.githubusercontent.com/stephenhawk8054/misc/main/yt-fix.txt"
let YT_LIST = "https://pastefy.app/G1Txv5su/raw"

let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


async function getLastCodeUblock(codeList){
    let response = await fetch(codeList);
    let data = await response.text();
    let codes = data.trim().split('\n');
    let lastCode = codes[codes.length - 1];
    return lastCode;
}

async function getLastYoutubeCode(codeList){
    let response = await fetch(codeList);
    let data = await response.text();
    let urls = data.trim().split('\n');
    let lastUrl = urls[urls.length - 1];
    let urlParts = lastUrl.split('/');
    let lastCode = urlParts[5];
    return lastCode;
}

async function logCodes() {
    let ublock = await getLastCodeUblock(UBLOCK_LIST);
    console.log("Ublock latest code: ", ublock);
    document.getElementById("ublock-code").innerHTML = ublock
    
    let youtube = await getLastYoutubeCode(YT_LIST);
    console.log("Youtube latest code: ", youtube);
    document.getElementById("youtube-code").innerHTML = youtube
    return {ublock, youtube}
}

async function areCodesEqual() {
    logCodes().then(codes => {
        if (codes.ublock == codes.youtube) {
            document.getElementById('main-answer').innerHTML = "YES";
            changeBgColor('yes');
            displayClassname('default', 'none')
            displayClassname('aa-blocked', 'block')
            
        } else {
            document.getElementById('main-answer').innerHTML = "NO";
            changeBgColor('no');
            displayClassname('default', 'none');
            displayClassname('not-aa-blocked', 'block')
        }
    })
}

// Fancy animation section
function changeBgColor(colorOption){
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
    }

    let element = document.getElementById('main-detector');
    
    if (isDarkMode) {
        element.style.backgroundColor = darkColor;
    } else {
        element.style.backgroundColor = lightColor;
    }
    
    element.classList.add("fade-in-main-detector");
}

function displayClassname(classname, displayCSS){
    // Changes the about section depending on classname:
    let class_list = document.getElementsByClassName(classname);
    for (let i = 0; i < class_list.length; i++) {
        const element = class_list[i];
        element.style.display = displayCSS;
    }

}
// Main exec:

window.addEventListener("load", (event) => {
    areCodesEqual();
  });
  

