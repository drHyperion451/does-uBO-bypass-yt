
let UBLOCK_LIST = "https://raw.githubusercontent.com/stephenhawk8054/misc/main/yt-fix.txt"
let YT_LIST = "https://pastefy.app/G1Txv5su/raw"

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
            document.getElementById('about-explanation').innerHTML = "It means that uBlock Origin has blocked the Anti-Adblocker script and you can safely watch youtube without ads.";
            document.getElementById('about-action').innerHTML = "You need to delete all cached uBlock Origin filters and update them. <b>There is a good guide made by the uBlock Origin team themselves on <a href='https://www.reddit.com/r/uBlockOrigin/' target='_blank' rel='noopener noreferrer'>Reddit.</a></b>";
            
        } else {
            document.getElementById('main-answer').innerHTML = "NO";
            changeBgColor('no');
            document.getElementById('about-explanation').innerHTML = "It means that uBlock Origin has not blocked the Anti-Adblocker script yet and it is not safe to watch youtube without detection.";
            document.getElementById('about-action').innerHTML = "Please wait for uBlock Origin to update their filters and check back again later.";
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

    var element = document.getElementById('main-detector');
    var isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        element.style.backgroundColor = darkColor;
    } else {
        element.style.backgroundColor = lightColor;
    }
    
    element.classList.add("fade-in-main-detector");
}

// Main exec:

window.addEventListener("load", (event) => {
    areCodesEqual();
  });
  

