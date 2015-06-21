(function() {

    videojs.Commentary = videojs.Button.extend({
    /** @constructor */
        init: function(player, options) {
            this.div = options.div;
            this.sources = options.sources;
            this.activeIdx = options.activeIdx;
            this.v = options.v;
            videojs.Button.call(this, player, options);
            this.on('click', this.onClick);
        }
    });

    videojs.Commentary.prototype.onClick = function() {
    /* function for clip changing */
        var inactiveIdx = (this.activeIdx + 1) % this.sources.length;
        var tc = this.v.currentTime;
        var paused = this.v.paused;
        this.v.src = this.sources[inactiveIdx];
        var self = this;
        this.v.addEventListener('loadeddata', function() {
            self.v.currentTime = tc;
        }, false);
        this.v.play();
        if (paused) {
            this.v.pause();
        } else {
            this.v.play();
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
            'aria-live': 'polite', // let the screen reader user know that the text of the button may change
            tabIndex: 0
          };
        return videojs.Component.prototype.createEl(null, props);
    };

    /* Add Commentary button to the control bar */
    var commentary;
    videojs.plugin('commentary', function(options) {
        options.el = createCommentaryButton();
        commentary = new videojs.Commentary(this, options);
        this.controlBar.el().appendChild(commentary.el());
    });

    jQuery('video').each(function(index, video) {
        var div = jQuery(video).parent();
        var sources = [];
        for (var s = 0; s < video.children.length; s++) {
            sources.push(video.children[s].src);
        }
        var activeIdx = 0;
        if (sources.length > 1) {
            var vid = videojs(video.id, {
            plugins: {commentary: {
                div: div,
                v: document.getElementById(video.id),
                sources: sources,
                activeIdx: activeIdx
            }}
        });
        }
    });

})();
