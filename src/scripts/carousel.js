// Controls and parallax for .cs-carousel. The track scroll-snaps on its own, so
// without this script the slides still swipe; this adds prev/next arrows, dots,
// fades the off-centre slides and drifts each image against the scroll.
(function(){
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><polyline points="10,3 5,8 10,13"/></svg>';

  document.querySelectorAll('.cs-carousel').forEach(function(root){
    var track = root.querySelector('.cs-carousel-track');
    var controls = root.querySelector('.cs-carousel-controls');
    var slides = Array.prototype.slice.call(track.children);
    if(!controls || slides.length < 2) return;
    var imgs = slides.map(function(s){ return s.querySelector('.cs-carousel-frame img'); });

    function makeArrow(dir){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cs-carousel-arrow';
      b.setAttribute('aria-label', dir < 0 ? 'Previous slide' : 'Next slide');
      b.innerHTML = ARROW;
      if(dir > 0) b.firstChild.style.transform = 'scaleX(-1)';
      b.addEventListener('click', function(){ go(current + dir); });
      return b;
    }
    var prev = makeArrow(-1), next = makeArrow(1);
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'cs-carousel-dots';
    var dots = slides.map(function(_, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
      b.addEventListener('click', function(){ go(i); });
      dotsWrap.appendChild(b);
      return b;
    });
    controls.appendChild(prev);
    controls.appendChild(dotsWrap);
    controls.appendChild(next);
    controls.hidden = false;

    var current = 0;
    function go(i){
      i = Math.max(0, Math.min(slides.length - 1, i));
      var s = slides[i];
      track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2 });
      setCurrent(i);
    }
    function setCurrent(i){
      current = i;
      dots.forEach(function(d, j){ d.setAttribute('aria-current', j === i ? 'true' : 'false'); });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }

    function update(){
      var view = track.scrollLeft + track.clientWidth / 2;
      var nearest = 0, best = Infinity;
      slides.forEach(function(s, i){
        // p: -1 (one slide left of centre) … 0 (centred) … 1 (one slide right)
        var step = s.offsetWidth || 1;
        var p = (s.offsetLeft + s.offsetWidth / 2 - view) / step;
        var a = Math.min(Math.abs(p), 1);
        if(Math.abs(p) < best){ best = Math.abs(p); nearest = i; }
        s.style.opacity = String(1 - a * 0.55);
        if(!reduceMotion && imgs[i]){
          imgs[i].style.transform = 'translateX(' + (Math.max(-1, Math.min(1, p)) * -4).toFixed(2) + '%)';
        }
      });
      if(nearest !== current) setCurrent(nearest);
    }

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft'){ e.preventDefault(); go(current - 1); }
      if(e.key === 'ArrowRight'){ e.preventDefault(); go(current + 1); }
    });
    setCurrent(0);
    update();
  });
})();
