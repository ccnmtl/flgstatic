/* eslint-env jquery */

(function() {
    jQuery('#cflg-slideshow div:gt(0)').hide();
    setInterval(function() {
        jQuery('#cflg-slideshow > :first-child')
            .fadeOut(2000)
            .next('div')
            .fadeIn(2000)
            .end()
            .appendTo('#cflg-slideshow');
    }, 5000);
})();

