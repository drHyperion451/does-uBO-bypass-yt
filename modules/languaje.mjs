/* languaje.mjs
Controls which language is being displayed in use. It will use a "php-esque" query varibale in the url:
www.example.com/?lang=en

The main language is gonna be english, so if no variable is provided it should display english (And maybe
    change the URL?)

Language codes are going to be using the IANA code (es, en, ja...) 
https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
It will detect the language and the region. If the region is not avaliable/not in the list it will pick another
*/
// Avaliable languages. Manual change (so outdated languages can be removed)
const avaliable_lang_reg = ['en-EN'];

function getLanguage(){
    // Get the language parameter from the URL
    const url_params = new URLSearchParams(window.location.search);
    const lang_param = url_params.get('lang') ?? 'en-EN'; // Default is English.
    
    console.log("Querried language is: ", lang_param);
    console.log("AVALIABLE: ", avaliable_lang_reg);

    if (lang_param != 'en_EN'){
        setLanguage(lang_param)
    }
}

function setLanguage(lang) {
    // Implement logic to set the language as needed
    console.log('Language:', lang);
    let language_file = './lang/' + lang + '.json'
    loadJsonFile(language_file)
        .then(trans_data => {
            // Thinking about what the fuck I'm gonna write here.
            console.log(trans_data);

            const translatable_elements = document.querySelectorAll('.translatable')
            translatable_elements.forEach(element => {
                let translation_key = element.dataset.translate;
                if (trans_data[translation_key] != undefined){
                    // If the key does not exist ignore it.
                    element.innerHTML = trans_data[translation_key];
                };
                
            })
        })
        .catch(error => {
            console.error('Error loading JSON: ', error)
        })
}

async function loadJsonFile(filePath){
    // Basically gets a public json file in the server.
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to load JSON file: ${response.statusText}`);
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(error.message);
    }
}

// [Not Used] Function that would be run manually before deploying the website, 
// just in case the list of languages is huge.

function avaliableLanguages(avaliable_lang_reg) {
    // This will take avaliableLangReg and generate a list of avaliableLangs
    return avaliable_lang_reg.map(tag => tag.split('-')[0]);
}

export { getLanguage }