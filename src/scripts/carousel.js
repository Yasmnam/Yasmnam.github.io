// Controls for .cs-carousel. The track scroll-snaps on its own, so without this
// script the slides still swipe; this adds a counter, a segmented progress
// line (each segment jumps to its slide) and prev/next arrows.
(function(){
  function pad(n){ return (n < 10 ? '0' : '') + n; }

  document.querySelectorAll('.cs-carousel').forEach(function(root){
    var track = root.querySelector('.cs-carousel-track');
    var controls = root.querySelector('.cs-carousel-controls');
    var slides = Array.prototype.slice.call(track.children);
    if(!controls || slides.length < 2) return;
    var name = root.getAttribute('aria-label') || 'carousel';

    var counter = document.createElement('span');
    counter.className = 'cs-carousel-count';
    counter.setAttribute('aria-hidden', 'true');

    var bar = document.createElement('div');
    bar.className = 'cs-carousel-segments';
    var segs = slides.map(function(_, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
      b.dataset.gaEvent = 'carousel_nav'; b.dataset.gaCarousel = name; b.dataset.gaControl = 'segment_' + (i + 1);
      b.addEventListener('click', function(){ go(i); });
      bar.appendChild(b);
      return b;
    });

    function arrow(dir){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cs-carousel-arrow';
      b.setAttribute('aria-label', dir < 0 ? 'Previous slide' : 'Next slide');
      b.dataset.gaEvent = 'carousel_nav'; b.dataset.gaCarousel = name; b.dataset.gaControl = dir < 0 ? 'prev' : 'next';
      b.innerHTML = '<span aria-hidden="true">' + (dir < 0 ? '←' : '→') + '</span>';
      b.addEventListener('click', function(){ go(current + dir); });
      return b;
    }
    var prev = arrow(-1), next = arrow(1);
    var arrows = document.createElement('div');
    arrows.className = 'cs-carousel-arrows';
    arrows.append(prev, next);

    controls.append(counter, bar, arrows);
    controls.hidden = false;

    var current = 0;
    function go(i){
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: slides[i].offsetLeft });
      setCurrent(i);
    }
    function setCurrent(i){
      current = i;
      counter.textContent = pad(i + 1) + ' / ' + pad(slides.length);
      segs.forEach(function(s, j){ s.setAttribute('aria-current', j === i ? 'true' : 'false'); });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }

    track.addEventListener('scroll', function(){
      var i = Math.round(track.scrollLeft / (slides[1].offsetLeft || 1));
      if(i !== current) setCurrent(Math.max(0, Math.min(slides.length - 1, i)));
    }, { passive: true });
    track.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft'){ e.preventDefault(); go(current - 1); }
      if(e.key === 'ArrowRight'){ e.preventDefault(); go(current + 1); }
    });
    setCurrent(0);
  });
})();
