$(function() {


    // Get data from JSON file and parse it
    $.getJSON(CONFIG_FILE_PATH, function(data) {

        console.log(`Loaded file ${CONFIG_FILE_PATH} successfully!`);

        if (Object.keys(data).length < 0) {
            let errorMsg = `Unable to find any sections in input file <code>${CONFIG_FILE_PATH}</code>.`;
            displayError(errorMsg);
        }

        // Add elements to the side menu, according to the elements found in the data
        createAbout(data.about)
        populateMenu(data.sections);
        createSections(data.sections);

    })
    .then(function() {

        // Hide loading icon now that get request is finished
        $('div#loading-icon').hide();

        // --- Add all event listeners ---

        // Chevrons - toggle subsection body
        $('div#content').find('div.subsection div.chevron img').on('click', chevronListener);

        $('div#content').find('div.subsection div.icon img').on('click', iconListener);

        // Subsection titles - toggle subsection body
        $('div#content').find('div.subsection div.subsection-content div.title').on('click', subsectionTitleListener);

    })
    .fail(function() { // Error when reading in JSON

        // Hide loading icon now that get request is finished
        $('div#loading-icon').hide();

        let adminEmail = 'hello@luisarojas.com'
        let errorMsg = `Unable to read or load JSON file <code>${CONFIG_FILE_PATH}</code>.<br>Please try loading the page again or contact the page administrator: <a href="mailto:${adminEmail}">${adminEmail}</a>.`;
        displayError(errorMsg);
    });
});

const populateMenu = (data) => {

    let indexCount = 0;
    for (sectionCamelCase in data) {

        // Generate section name with spaces, from camel case in JSON file
        let sectionName = camelCaseToSpaced(sectionCamelCase);

        // <li class="nav-item">
        //     <a href="#sectionName" class="nav-link active">Section Name</a>
        // </li>
        let $link = $('<a></a>').attr('href', `#${sectionCamelCase}`)
                                        .addClass('nav-link')
                                        .html(sectionName);
        if (indexCount === 0) { $link.addClass('active'); }

        let $listItem = $('<li></li>').addClass('nav-item')
                                        .append($link);

        $('div#menu').show()
                    .find('ul#menu-elements')
                    .append($listItem);

        indexCount += 1;
    }

    // Must refresh menu's scrollspy feature after editing it and the content it spies on
    $('[data-spy="scroll"]').each(function () {
        let $spy = $(this).scrollspy('refresh')
    });

    // Set offset point for scrollspy to the middle of the current window height
    setScrollspyOffset(($(window).height())/2);
    // setScrollspyOffset(250);

    // Re-calculate offset point for scrollspy every time the window is resized.
    $(window).resize(function(event) {
        setScrollspyOffset(($(window).height())/2);
        // setScrollspyOffset(250);
    });
}

const createAbout = (data) => {

    // Update tab title
    $('head title').html(`${data.name.first} ${data.name.last}`);

    //Append to "name" div element
    let $nameContent = About.build(data);
    $('div#header').append($nameContent);
}

const createSections = (data) => {

    $.each(data, function (sectionCamelCase, content) {

        let sectionHTML = Section.build(sectionCamelCase, content);

        $('div#content').show()
                        .append(sectionHTML);
    });
}