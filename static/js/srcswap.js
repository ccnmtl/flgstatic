(function() {
    var v = document.getElementById('vid');
    var sources = [];
    for (var s=0; s < v.children.length; s++) {
        sources.push(v.children[s].src);
   }
    var labels = ['Commentary', 'Original'];
    var activeIdx = 0;

    var p = document.getElementById('play');
    p.addEventListener('click', function(event) {
        if (v.paused) {
            v.play();
            p.innerHTML = 'pause';
        } else {
            v.pause();
            p.innerHTML = 'play';
        }
    }, false);

    var b = document.getElementById('switch');
    b.addEventListener('click', function(event) {
        var inactiveIdx = (activeIdx + 1) % sources.length;
        var tc = v.currentTime;
        var paused = v.paused;
        v.src = sources[inactiveIdx];
        v.addEventListener('loadeddata', function(){
            v.currentTime = tc;
        }, false);
        v.play();
        if (paused) {
            v.pause();
        } else {
            v.play();
        }
        activeIdx = inactiveIdx;
        b.innerHTML = labels[activeIdx] + ' (switch)';
    }, false);
})();