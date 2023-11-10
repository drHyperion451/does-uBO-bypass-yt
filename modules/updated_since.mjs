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

function changeUpdatedDateHTML(dateiso){
    // changes any element with class 'filter-update-since'
    let past_date_str = pastTenseTime(dateiso);

    let filter_update_since = document.getElementsByClassName('filter-update-since');
    for (let i = 0; i < filter_update_since.length; i++) {
        const element = filter_update_since[i];
        element.innerHTML = past_date_str
        // adds hover info.
        element.title = new Date(dateiso).toLocaleString();
    }
}

export { changeUpdatedDateHTML }