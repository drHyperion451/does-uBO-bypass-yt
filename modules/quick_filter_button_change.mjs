/*
QUICK_FILTER_BUTTON_CHANGE.MJS

Contains a function who changes the "Update Quick Filters" button according to the last updated time.
*/
async function quickFilterButtonChange(dateiso){
    // Changes URL button depending on age of solution:
    //// < 6h -> Add manual.
    //// > 6h -> Full auto.
    let url_auto = 'https://ublockorigin.github.io/uAssets/update-lists.html?listkeys=ublock-quick-fixes';
    let url_manual = url_auto + '&manual=1';
    let div_btn_element = document.querySelector('#update-quick-filters')
    let btn_element = document.querySelector('#update-quick-filters button');
    // Compares current time with updated time
    let date = new Date(dateiso);
    let now = new Date();
    let secondsPast = (now.getTime() -  date.getTime()) / 1000;


    // Main logic. Looks illegal to see concat if-else but this is the js way instead of switch.:
    if (secondsPast < 60*10 || secondsPast > 3600*14){ // 10 min or 14h
        div_btn_element.setAttribute('style', 'display:none;');
    }
    if (secondsPast < 3600*6){ // 6h
        btn_element.setAttribute('onclick', `window.location='${url_manual}';`);
    } else {
        btn_element.setAttribute('onclick', `window.location='${url_auto}';`);
    };

}

export { quickFilterButtonChange }