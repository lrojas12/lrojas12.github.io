let CONFIG_FILE_PATH = 'config.json';
let WEBSITE_LINK = 'https://www.luisarojas.com';

let IMGS_DIR_PATH = 'assets/img/';
let ICONS_DIR_PATH = `${IMGS_DIR_PATH}icons/`;
let PDFS_DIR_PATH = 'assets/pdf/';

let ADMIN_EMAIL = 'hello@luisarojas.com';

$(function () {

    if (window.innerWidth <= 991) {
        $('codersrank-widget').attr('layout', 'vertical');
    } else {
        $('codersrank-widget').attr('layout', 'horizontal');
    }

    // Menu listener
    $('nav.navbar .nav-item a').on('click', function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });

    $('nav.navbar div.navbar-collapse li').on('click', function() {
        $(this).parent().parent().removeClass('show');
	});
	
	// Update copyright year
	let todaysDate = new Date();
	let currentYear = todaysDate.getFullYear();
	$('div#copyright div#year').html(currentYear);

});

$(window).resize(function() {

    if (window.innerWidth <= 991) {
        $('codersrank-widget').attr('layout', 'vertical');
    } else {
        $('codersrank-widget').attr('layout', 'horizontal');
    }
});