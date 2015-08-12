jQuery(document).ready(function() {
    var shrinkHeader = 100;
    jQuery(window).scroll(function() {
        var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
            jQuery('.index-list-page-header').addClass('shrink');
        } else {
            jQuery('.index-list-page-header').removeClass('shrink');
        }
    });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
});
