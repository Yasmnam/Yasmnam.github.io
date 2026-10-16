// Case study videos play while hovered or focused and pause on leave.
// Skipped on touch devices and for reduced-motion users, who use the controls.
// Once a visitor clicks a video they are in control and hover no longer pauses it.
(function(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.cs-figure video').forEach(function(v){
    var pinned = false;
    function play(){
      if(pinned) return;
      var p = v.play();
      if(p && p.catch) p.catch(function(){});
    }
    function pause(){ if(!pinned) v.pause(); }
    v.addEventListener('mouseenter', play);
    v.addEventListener('mouseleave', pause);
    v.addEventListener('focus', play);
    v.addEventListener('blur', pause);
    v.addEventListener('click', function(){ pinned = true; });
  });
})();
