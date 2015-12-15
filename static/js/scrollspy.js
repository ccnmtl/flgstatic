jQuery(document).ready(function() {
    var offsetHeight = 130;
    jQuery('body').scrollspy({
        target: '#index-list-navbar',
        offset: offsetHeight
    });
    jQuery('#nav-index-list li a').click(function(event) {
        var firstLetter = jQuery(this).parent().is(':first-child');
        if (firstLetter) {
            offsetHeight = 200;
        } else {
            offsetHeight = 130;
        }
        var scrollPos = jQuery('body')
            .find(jQuery(this)
                  .attr('href'))
            .offset()
            .top - (offsetHeight - 1);
        jQuery('body,html').animate({
            scrollTop: scrollPos
        }, 10);
        return false;
    });
});
