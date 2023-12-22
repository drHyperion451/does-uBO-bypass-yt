/* languaje.mjs
Controls which language is being displayed in use. It will use a "php-esque" query varibale in the url:
www.example.com/?lang=en

The main language is gonna be english, so if no variable is provided it should display english (And maybe
    change the URL?)

Language codes are going to be using the IANA code (es, en, ja...) 
https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

*/

function getLanguage(){
    // Get the language parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    console.log("Querried language is: ", langParam)

     // Check if the langParam is present and set appropriately
    if (langParam === 'es') {
        // Set language to Spanish
        setLanguage('es');
    } else {
        // Default language or handle other cases
        setLanguage('en');
    };

}

function setLanguage(lang) {
    // Implement logic to set the language as needed
    console.log('Setting language to:', lang);
}

export { getLanguage }