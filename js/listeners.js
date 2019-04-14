const iconListener = () => {

    let $targetElement = $(event.target);
    let $bodyElement = $targetElement.parent().parent().find('div.subsection-body');
    let $chevronElement = $targetElement.parent().parent().find('div.chevron img');

    if ($bodyElement.html() !== '') {

        // Change chevron from pointing from right to down and vice-versa
        $chevronElement.toggleClass('right')
                        .toggleClass('down');

        $bodyElement.slideToggle();
    }
}

const chevronListener = () => {

    let $targetElement = $(event.target);
    let $bodyElement = $targetElement.parent().parent().find('div.subsection-body');

    if ($bodyElement.html() !== '') {

        // Change chevron from pointing from right to down and vice-versa
        $targetElement.toggleClass('right')
                        .toggleClass('down');

        $bodyElement.slideToggle();
    }
}

const subsectionTitleListener = () => {

    let $targetElement = $(event.target);
    let $subsectionChevron = $targetElement.parent().parent().parent().parent().find('div.chevron img');
    let $bodyElement = $targetElement.parent().parent().parent().find('div.subsection-body');

    if (!$subsectionChevron.hasClass('empty')) {
        // Change chevron from pointing from right to down and vice-versa
        $subsectionChevron.toggleClass('right')
                        .toggleClass('down');

        $bodyElement.slideToggle();
    }
}