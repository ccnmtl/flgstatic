(function() {
    jQuery(".widget-allterms-menu h4").click(function(){
        jQuery("#wrapper").slideToggle(200);
        jQuery(this).toggleClass("open");
        jQuery(this).find('.glyphicon').toggleClass('glyphicon-triangle-right glyphicon-triangle-bottom');
    });
    jQuery('.share-window').click(function(event) {
        var width  = 575,
            height = 400,
            left   = (jQuery(window).width()  - width)  / 2,
            top    = (jQuery(window).height() - height) / 2,
            url    = this.href,
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;
        window.open(url, 'sharecflg', opts);
        return false;
    });
})();
