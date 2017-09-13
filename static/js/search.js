/* eslint-env jquery */
/* globals lunr */

var index = lunr(function() {
    this.field('url');
    this.field('title', {boost: 10});
    this.field('film', {boost: 5});
    this.field('director', {boost: 5});
    this.field('content');
});
index.ref('url');
var data = {};
$.getJSON('/js/all.json').done(function(item) {
    var k1 = 'director_first';
    var k2 = 'director_last';
    item.forEach(function(d) {
        if (d.type === 'clip') {
            d.director = d[k1] + ' ' + d[k2];
        }
        index.add(d);
        data[d.url] = d;
    });
});

var doSearch = function() {
    var q = $('#q').val();
    var results = index.search(q);
    var $el = $('#search-results');
    var k1 = 'director_first';
    var k2 = 'director_last';
    $el.empty();
    $el.show();
    $el.append('<div class="arrow"></div>');
    $el.append(
        $('<h2>RESULTS FOR: "' + q + '"</h2>')
    );
    if (results.length === 0) {
        $el.append('<div class="q-no-item">Unfortunately, there are ' +
                   'no results matching what you\'re looking for in ' +
                   'the Columbia Film Glossary content.</div>');
    } else {
        for (var r in results.slice(0, 10)) {
            if (results.hasOwnProperty(r)) {
                var d = data[results[r].ref];
                var $result = $('<div class="q-item">');
                $result.append('<span class="type">' + d.type + ': </span>');
                if (d.type === 'term') {
                    $result.append($('<a>', {
                        href: d.url,
                        text: d.title
                    }));
                } else {
                    $result.append($('<a>', {
                        href: d.url,
                        html: d.title + ' -- from <i>' +
                            d.film + '</i> by ' +
                            d[k1] + ' ' +
                            d[k2] + ' (' + d.year + ')'
                    }));
                }
                $el.append($result);
            }
        }
    }
    return false;
};

var clearSearch = function() {
    $('#search-results').empty();
    $('#search-results').hide();
};

$(document).ready(function() {
    $('#search').click(doSearch);
    $('#clear-search').click(clearSearch);
    $('#q').keyup(function() {
        $('#search-results').empty();
        if ($(this).val().length < 2) {
            $('#search-results').hide();
            return;
        }
        return doSearch();
    });

});
