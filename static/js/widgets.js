(function() {
    jQuery(".widget-allterms-menu h4").click(function(){
        jQuery("#wrapper").slideToggle(200);
        jQuery(this).toggleClass("open");
        jQuery(this).find('.glyphicon').toggleClass('glyphicon-triangle-right glyphicon-triangle-bottom');
    });
})();
