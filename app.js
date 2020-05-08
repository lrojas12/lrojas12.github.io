let CONFIG_FILE_PATH = 'config.json';
let WEBSITE_LINK = 'https://www.luisarojas.com';

let IMGS_DIR_PATH = 'assets/img/';
let ICONS_DIR_PATH = `${IMGS_DIR_PATH}icons/`;
let PDFS_DIR_PATH = 'assets/pdf/';

let ADMIN_EMAIL = 'hello@luisarojas.com';

$(function () {

    // Menu listener
    $("nav.navbar .nav-item a").on("click", function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
    
})