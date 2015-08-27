jQuery(document).ready(function() {
    var shrinkHeader = 60;
    jQuery(window).scroll(function() {
        var scroll = getCurrentScroll();
        if ( scroll >= shrinkHeader ) {
            jQuery('.page-main-title').addClass('shrink');
        } else {
            jQuery('.page-main-title').removeClass('shrink');
        }
    });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
});
