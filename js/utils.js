const camelCaseToSpaced = (inputString) => {

    let newString = inputString
                            // Insert a space before all upper case letters
                            .replace(/([A-Z])/g, ' $1')
                            // Capitalize the first character
                            .replace(/^./, function(string) {
                                return string.toUpperCase();
                            })
                            .replace(' And ', ' and ');
    return newString;
}

const displayError = (message) => {

    $('div#wrapper').html('').hide();
    $('div#error').show().html(message);
    throw new Error(message);

}

// Update scrollspy offest every time the window is resized
const setScrollspyOffset = newOffset => {
    $('body').data()['bs.scrollspy']['_config'].offset = newOffset;
}