// Sends a GA4 event for any clicked element carrying data-ga-event.
// Other data-ga-* attributes become event params (data-ga-item-id -> item_id).
(function(){
  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-ga-event]');
    if(!el || typeof window.gtag !== 'function') return;
    var params = {};
    for(var i = 0; i < el.attributes.length; i++){
      var attr = el.attributes[i];
      if(attr.name.indexOf('data-ga-') === 0 && attr.name !== 'data-ga-event'){
        params[attr.name.slice(8).replace(/-/g, '_')] = attr.value;
      }
    }
    window.gtag('event', el.getAttribute('data-ga-event'), params);
  });

  // GA4's built-in video tracking only covers YouTube, so report self-hosted plays here (once per video per page view).
  document.addEventListener('play', function(e){
    var v = e.target;
    if(!v || v.tagName !== 'VIDEO' || v.dataset.gaPlayed || typeof window.gtag !== 'function') return;
    v.dataset.gaPlayed = '1';
    window.gtag('event', 'video_play', { video_src: (v.currentSrc || v.src).split('/').pop() });
  }, true);
})();
