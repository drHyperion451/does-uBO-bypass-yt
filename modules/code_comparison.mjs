async function fetchData(codeList){
    //// Fetches the uBlock list file
    let response = await fetch(codeList);
    return await response.text();
}

async function getLastCodeUblock(url_ublock){
    let data = await fetchData(url_ublock)

    // Returns the latest uBlock code
    let codes = data.trim().split('\n');
    let lastCode = codes[codes.length - 1];
    return lastCode;
}

async function getLastYoutubeCode(yt_url){
    let data = await fetchData(yt_url);

    // Returns the latest YouTube code
    let urls = data.trim().split('\n');
    let lastUrl = urls[urls.length - 1];
    let urlParts = lastUrl.split('/');
    let lastCode = urlParts[5];
    return lastCode;
}
async function checkDeployForceEquality(force_deploy_url){
    let data = await fetchData(force_deploy_url)

    // Returns true if forceEquality from deploy branch is set to 1
    return data.search("forceEquality = 1") != -1;
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

function changeShortcutIconColor(colorOption) {
    switch (colorOption) {
        case 'no':
            var filename = "favicon-red.svg";
            break;
        case "yes":
            var filename = "favicon-green.svg";
    };
    let link = document.getElementById('favicon');
    link.href = "../assets/icons/" + filename;
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

    // The fade in animation is handled by using CSS.
    element.classList.add("fade-in-main-detector");
}


async function logCodes(forceEquality = false, url_ublock, yt_url, force_deploy_url) {
    // Displays each log codes to any element with 'ublock-code' id.
    // Idea: Make this change to all elements that share a same class? Maybe
    /// this could be interesting to make dynamic changes after

    let youtube = await getLastYoutubeCode(yt_url);
    console.log("Youtube latest code: ", youtube);
    document.getElementById("youtube-code").innerHTML = youtube

    var deployForceEquality = await checkDeployForceEquality(force_deploy_url);
    console.log("deployForceEquality: ", deployForceEquality);
    
    var ublock = await getLastCodeUblock(url_ublock);
    // Even with toggleOption is enabled it will display the fetched uBlock code
    console.log("Ublock fetched latest code: ", ublock); 
    if (forceEquality || deployForceEquality){
        var ublock = youtube
        console.warn("forceEquality is enabled for quick updates. Check the ublock code for changes")
    };
    document.getElementById("ublock-code").innerHTML = ublock
    
    return {ublock, youtube}
}

async function areCodesEqual({url_ublock, yt_url, force_deploy_url, forceEquality = false, forceOption = ''} = {}) {

    // Compares both codes
    logCodes(forceEquality, url_ublock, yt_url, force_deploy_url).then(codes => {
        switch (forceOption) {
            // Just for debug options
            case ('yes' || 'no'):
                console.warn("Debug is enabled!. Please report this message in the Github Repo.")
            case 'yes':
                codes.ublock = codes.youtube = 1
                break;
            case 'no':
                codes.ublock = 0; codes.youtube = 1
            default:
                break;
        }
        if (codes.ublock == codes.youtube) {
            // It means uBlock is updated with the last YouTube script.
            document.getElementById('main-answer').innerHTML = "YES";
            changeBgColor('yes');
            changeShortcutIconColor('yes');
            displayClassname('default', 'none');
            displayClassname('aa-blocked', 'block');
            displayTroubleshootLink(true);
        } else {
            // It means YouTube has a new update not registered by uBlock.
            document.getElementById('main-answer').innerHTML = "NO";
            changeBgColor('no');
            changeShortcutIconColor('no');
            displayClassname('default', 'none');
            displayClassname('not-aa-blocked', 'block');
            displayTroubleshootLink(false);
        }
    })
}
export { areCodesEqual };