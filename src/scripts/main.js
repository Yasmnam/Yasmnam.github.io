(function(){
  var meter = document.getElementById('meter');
  if(!meter || matchMedia('(hover: none)').matches) return;

  var vEl = document.getElementById('m-verdict');
  var rEl = document.getElementById('m-ratio');
  var sEl = document.getElementById('m-size');
  var reqEl = document.getElementById('m-req');
  var sampleEl = document.getElementById('m-sample');
  var fgSw = document.getElementById('m-fg');
  var bgSw = document.getElementById('m-bg');

  function parseRGB(str){
    var m = str.match(/rgba?\(([^)]+)\)/);
    if(!m) return null;
    var p = m[1].split(',').map(function(n){ return parseFloat(n); });
    return { r:p[0], g:p[1], b:p[2], a: p.length > 3 ? p[3] : 1 };
  }

  // Walk up the tree until we hit a genuinely opaque background
  function effectiveBg(el){
    while(el && el !== document.documentElement){
      var c = parseRGB(getComputedStyle(el).backgroundColor);
      if(c && c.a > 0.85) return c;
      el = el.parentElement;
    }
    return parseRGB(getComputedStyle(document.body).backgroundColor) || {r:255,g:255,b:255,a:1};
  }

  function lum(c){
    var v = [c.r, c.g, c.b].map(function(x){
      x = x/255;
      return x <= 0.03928 ? x/12.92 : Math.pow((x+0.055)/1.055, 2.4);
    });
    return 0.2126*v[0] + 0.7152*v[1] + 0.0722*v[2];
  }

  function contrast(a,b){
    var l1 = lum(a), l2 = lum(b);
    var hi = Math.max(l1,l2), lo = Math.min(l1,l2);
    return (hi + 0.05) / (lo + 0.05);
  }

  function hasText(el){
    if(!el) return false;
    for(var i=0;i<el.childNodes.length;i++){
      var n = el.childNodes[i];
      if(n.nodeType === 3 && n.textContent.trim().length) return true;
    }
    return false;
  }

  var raf = null, lastEl = null;

  function measure(el){
    // climb to the nearest ancestor that actually renders text
    while(el && !hasText(el) && el !== document.body) el = el.parentElement;
    if(!el || el === document.body || el === document.documentElement){
      meter.classList.remove('on');
      return;
    }
    if(el === lastEl) return;
    lastEl = el;

    var cs = getComputedStyle(el);
    var fg = parseRGB(cs.color);
    var bg = effectiveBg(el);
    if(!fg || !bg){ meter.classList.remove('on'); return; }

    var px = parseFloat(cs.fontSize);
    var weight = parseInt(cs.fontWeight, 10) || 400;
    // WCAG "large text": 24px+, or 18.66px+ when bold
    var large = px >= 24 || (px >= 18.66 && weight >= 700);
    var threshold = large ? 3 : 4.5;

    var ratio = contrast(fg, bg);
    var pass = ratio >= threshold;

    rEl.textContent = ratio.toFixed(2) + ':1';
    reqEl.textContent = threshold.toFixed(1) + ':1';
    sEl.textContent = Math.round(px) + 'px ' + (large ? 'large' : 'normal');
    vEl.textContent = pass ? 'PASS' : 'FAIL';
    var txt = (el.textContent || '').trim().replace(/\s+/g, ' ');
    sampleEl.textContent = txt ? '"' + txt.slice(0, 34) + (txt.length > 34 ? '…' : '') + '"' : '';
    vEl.className = 'verdict ' + (pass ? 'pass' : 'fail');
    fgSw.style.background = 'rgb(' + fg.r + ',' + fg.g + ',' + fg.b + ')';
    bgSw.style.background = 'rgb(' + bg.r + ',' + bg.g + ',' + bg.b + ')';
    meter.classList.add('on');
  }

  document.addEventListener('mousemove', function(e){
    if(raf) return;
    raf = requestAnimationFrame(function(){
      raf = null;
      measure(document.elementFromPoint(e.clientX, e.clientY));
    });
  });

  document.addEventListener('mouseleave', function(){ meter.classList.remove('on'); });
})();

(function(){
  if (matchMedia('(hover: none)').matches) return;

  var h = document.createElement('div');
  h.className = 'cross-line h';
  var v = document.createElement('div');
  v.className = 'cross-line v';
  var tick = document.createElement('div');
  tick.className = 'cross-tick';
  document.body.append(h, v, tick);

  var raf = null;
  document.addEventListener('mousemove', function(e){
    if (raf) return;
    raf = requestAnimationFrame(function(){
      raf = null;
      h.style.top = e.clientY + 'px';
      v.style.left = e.clientX + 'px';
      tick.style.top = e.clientY + 'px';
      tick.style.left = e.clientX + 'px';
    });
  });

  document.addEventListener('mouseleave', function(){
    h.style.opacity = v.style.opacity = tick.style.opacity = 0;
  });
  document.addEventListener('mouseenter', function(){
    h.style.opacity = v.style.opacity = tick.style.opacity = '';
  });
})();

(function(){
  var targets = document.querySelectorAll('.reveal-target');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduced || !('IntersectionObserver' in window)){
    targets.forEach(function(t){ t.classList.add('revealed'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });

  targets.forEach(function(t){ io.observe(t); });
})();