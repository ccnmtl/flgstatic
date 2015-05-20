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
    item.forEach(function(d) {
        index.add(d);
        data[d.url] = d;
    });
}).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ', ' + error;
    console.error('Error getting Hugo index flie:', err);
});

var doSearch = function() {
    var q = $('#q').val();
    var results = index.search(q);
    var $el = $('#search-results');
    $el.empty();
    $el.show();
    if (results.length == 0) {
        $el.html('sorry, no results found');
    } else {
        $el.append(
           $('<h2>Search Results: "' + q + '"</h2>')
        );

        for (r in results.slice(0, 10)) {
            if (results.hasOwnProperty(r)) {
                var d = data[results[r].ref];
                var $result = $('<div>');
                $result.append(d.type + ': ');
                if (d.type === 'term') {
                    $result.append($('<a>', {
                      href: d.url,
                      text: d.title
                    }));
                } else {
                    $result.append($('<a>', {
                        href: d.url,
                        text: d.title + ' -- from "'
                               + d.film + '" by '
                               + d['director_first']
                               + ' ' + d['director_last']
                               + ' (' + d.year + ')'
                    }));
                }
                $el.append($result);
            }
        }
    }
    return false;
}

$(document).ready(function() {
    $('#search').click(doSearch);
    $('#q').keyup(function() {
        $('#search-results').empty();
        if ($(this).val().length < 2) {
            return;
        }
        return doSearch();
    });
});
