/* eslint-env jquery */
/* globals videojs */

(function() {

    videojs.Commentary = videojs.Button.extend({
        /** @constructor */
        init: function(player, options) {
            this.div = options.div;
            this.sources = options.sources;
            this.activeIdx = options.activeIdx;
            this.v = options.v;
            this.vplayer = player;
            videojs.Button.call(this, player, options);
            this.on('click', this.onClick);
        }
    });

    videojs.Commentary.prototype.onClick = function() {
        /* function for clip changing */
        var inactiveIdx = (this.activeIdx + 1) % this.sources.length;
        var tc = this.vplayer.currentTime();
        var isPaused = this.vplayer.paused();
        this.vplayer.poster('/img/assets/clipposter/transition.jpg');
        jQuery(this.v).attr('poster','/img/assets/clipposter/transition.jpg');
        this.vplayer.src(this.sources[inactiveIdx]);
        var self = this;
        this.vplayer.on('loadedmetadata', function() {
            self.vplayer.currentTime(tc);
        });
        this.vplayer.play();
        if (isPaused) {
            this.vplayer.pause();
        } else {
            this.vplayer.load();
            this.vplayer.play();
        }
        this.activeIdx = inactiveIdx;
        jQuery(this.div).toggleClass('commentary-on commentary-off');
    };

    /* Create Commentary button for control bar */
    var createCommentaryButton = function() {
        var props = {
            className: 'vjs-commentary-button vjs-control',
            innerHTML: '<div class="vjs-control-content" ' +
                'title="Commentary On/Off">' +
                '<span class="vjs-control-text">' +
                ('Commentary') + '</span></div>',
            role: 'button',
            title: 'Commentary On/Off',
            // let the screen reader user know that the text of
            //  the button may change
            'aria-live': 'polite',
            tabIndex: 0
        };
        return videojs.Component.prototype.createEl(null, props);
    };

    /* Add Commentary button to the control bar */
    videojs.plugin('commentary', function(options) {
        options.el = createCommentaryButton();
        var commentary = new videojs.Commentary(this, options);
        this.controlBar.el().appendChild(commentary.el());
    });

    jQuery('video').each(function(index, video) {
        var div = jQuery(video).parent();
        var sources = [];
        for (var s = 0; s < video.children.length; s++) {
            sources.push(video.children[s].src);
        }
        var activeIdx = 0;
        var plugins = {};
        if (sources.length > 1) {
            plugins.commentary = {
                div: div,
                v: document.getElementById(video.id),
                sources: sources,
                activeIdx: activeIdx
            };
            videojs(video.id, {plugins: plugins});
        }
    });

})();
