// Dots for .cs-carousel. The track scroll-snaps on its own, so without this
// script the slides still swipe; the dots only add a way to see and pick one.
(function(){
  document.querySelectorAll('.cs-carousel').forEach(function(root){
    var track = root.querySelector('.cs-carousel-track');
    var dotsWrap = root.querySelector('.cs-carousel-dots');
    var slides = Array.prototype.slice.call(track.children);
    if(!dotsWrap || slides.length < 2) return;

    var dots = slides.map(function(slide, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
      b.addEventListener('click', function(){ track.scrollTo({ left: slide.offsetLeft }); setCurrent(i); });
      dotsWrap.appendChild(b);
      return b;
    });
    dotsWrap.hidden = false;

    function setCurrent(i){
      dots.forEach(function(d, j){ d.setAttribute('aria-current', j === i ? 'true' : 'false'); });
    }
    function update(){ setCurrent(Math.round(track.scrollLeft / (slides[1].offsetLeft || 1))); }
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
