(function() {
   var v = document.getElementById('vid');
   var sources = [];
   for (var s=0; s < v.children.length; s++) {
      sources.push(v.children[s].src);
   }
   var buttonclass = ['commentary-on', 'commentary-off'];
   var label = ['Commentary is on', 'Commentary is off'];
   var activeIdx = 0;

   var b = document.getElementById('switch');
   var tl = document.getElementById('text-label');
   b.addEventListener('click', function(event) {
        var inactiveIdx = (activeIdx + 1) % sources.length;
        var tc = v.currentTime;
        var paused = v.paused;
        v.src = sources[inactiveIdx];
        v.currentTime = tc;
        v.play();
        if (paused) {
           v.pause();
        } else {
           v.play();
        }
        activeIdx = inactiveIdx;
        b.className = buttonclass[activeIdx];
        tl.innerHTML = label[activeIdx];
   }, false);
})();
