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
})();
