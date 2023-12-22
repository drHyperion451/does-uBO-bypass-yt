function pastTenseTime(dateiso){
    // Converts any ISO8601 to date in past tense (an hour ago...)
    let date = new Date(dateiso);
    let now = new Date();
    let secondsPast = (now.getTime() -  date.getTime()) / 1000;
    let output_string = ""

    // Is this the fastest method? 
    // I'm skeptic, but...https://stackoverflow.com/questions/6665997/switch-statement-for-greater-than-less-than

    if (secondsPast < 60){ // less than one minute
        let seconds = parseInt(secondsPast);
        if (seconds == 1){
            output_string = 'A second ago.'
        } else {
            output_string = seconds + ' seconds ago.'
        };
    } else
    if (secondsPast < 3600){ // less than one hour
        let minutes = parseInt(Math.round(secondsPast/60));
        if (minutes == 1){
            output_string = 'A minute ago'
        } else {
            output_string = minutes + ' minutes ago.'
        };
    } else
    if (secondsPast <86400){ // less than one day
        let hours = parseInt(Math.round(secondsPast/3600));
        if (hours == 1){
            output_string = 'An hour ago.'
        } else {
            output_string = hours + ' hours ago.'
        };
    } else
    if (secondsPast < 2419200){ // less than one month
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
/*
CHANGE_UPDATED_DATE_HTML.MJS

Changes the updated date inside the html

*/
function changeUpdatedDateHTML(dateiso){
    // changes any element with class 'updated-since-time'
    let past_date_str = pastTenseTime(dateiso);

    let filter_update_since = document.getElementsByClassName('updated-since-time');
    for (let i = 0; i < filter_update_since.length; i++) {
        const element = filter_update_since[i];
        element.innerHTML = past_date_str
        // adds hover info.
        element.title = new Date(dateiso).toLocaleString();
    }
}

export { changeUpdatedDateHTML }