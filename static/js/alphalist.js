/* eslint-env jquery */

(function() {
    var list = {letters: []};
    jQuery('#index-list').children('.list-item').each(function() {
        var itmLetter = jQuery(this).text().substring(0, 1).toUpperCase();
        if (jQuery.isNumeric(itmLetter)) {
            itmLetter = '0-9';
        }
        if (!(itmLetter in list)) {
            list[itmLetter] = [];
            list.letters.push(itmLetter);
        }
        list[itmLetter].push(jQuery(this));
    });
    list.letters.sort();
    jQuery('#index-list').empty();
    jQuery.each(list.letters, function(i, letter) {
        list[letter].sort(function(a, b) {
            return jQuery(a).text().toUpperCase()
                .localeCompare(jQuery(b).text().toUpperCase());
        });
        var ul = jQuery('<div class="list-group-items"/>');
        jQuery.each(list[letter], function(idx, itm) {
            ul.append(itm);
        });
        jQuery('#index-list')
            .append(
                jQuery('<div class="list-group"' + 'id="' +
                       letter.toLowerCase() + '"/>')
                    .append(
                        jQuery('<a/>')
                            .attr('name', letter.toLowerCase())
                            .addClass('list-group-title').html(letter))
                    .append(jQuery('<hr/>'))
                    .append(ul)
                    .append(jQuery('<a/>')));

        jQuery('<li><a></a></li>') // li
            .find('a') // a
            .attr('href', '#' + letter.toLowerCase()) // a
            .html(letter) // a
            .end() // li
            .appendTo('#nav-index-list');

        jQuery('<li><a></a></li>') // li
            .find('a') // a
            .attr('href', '#' + letter.toLowerCase()) // a
            .html(letter) // a
            .end() // li
            .appendTo('.side-nav-index-list');

    });
    jQuery('#index-list-page').show();
})();
