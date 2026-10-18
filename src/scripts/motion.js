// Motion: intro control, scroll-reveal/unroll fallback, top bar,
// contents highlighting and the reading-progress fallback. Most motion is CSS;
// this only does what CSS can't. Loaded as a deferred module.
const d = document, r = d.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const on = (t, e, f, o) => t.addEventListener(e, f, o);

// Intro (home): plays on every visit; any input during the first 3.2s adds
// .intro-done (skip to the end).
const hero = d.querySelector('.hero');
const SKIP = ['keydown', 'pointerdown', 'wheel', 'touchmove'];
let skipTimer;
function armSkip() {
  const disarm = () => { SKIP.forEach(e => removeEventListener(e, skip)); clearTimeout(skipTimer); };
  const skip = e => { r.classList.add('intro-done'); disarm(); window.gtag?.('event', 'intro_skip', { input: e.type }); };
  SKIP.forEach(e => on(window, e, skip, { passive: true }));
  skipTimer = setTimeout(disarm, 3200);
}
if (hero && !reduced && !r.classList.contains('intro-done')) armSkip();

// Replay intro: restart the animations
const replay = d.querySelector('[data-replay-intro]');
if (replay && hero && !reduced) {
  replay.hidden = false;
  on(replay, 'click', () => {
    scrollTo({ top: 0, behavior: 'instant' });
    r.classList.add('intro-done');
    void r.offsetWidth;
    r.classList.remove('intro-done');
    setTimeout(armSkip, 0);
  });
}

// Top bar: hide on scroll down, show on scroll up
const bar = d.querySelector('.topbar, .article-top');
if (bar) {
  let y = scrollY;
  on(window, 'scroll', () => {
    const ny = scrollY;
    bar.classList.toggle('is-hidden', ny > y && ny > 240);
    y = ny;
  }, { passive: true });
}

// Scroll reveals / unroll: IntersectionObserver fallback where view() timelines aren't supported
if (!reduced && !CSS.supports('animation-timeline: view()') && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  d.querySelectorAll('.reveal, .unroll, .case-row-item').forEach(el => io.observe(el));
}

// Case study contents: highlight the section being read
const links = [...d.querySelectorAll('.toc a')];
if (links.length && 'IntersectionObserver' in window) {
  const byId = new Map(links.map(a => [decodeURIComponent(a.hash.slice(1)), a]));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.removeAttribute('aria-current'));
    byId.get(e.target.id)?.setAttribute('aria-current', 'true');
  }), { rootMargin: '-25% 0px -65% 0px' });
  byId.forEach((a, id) => { const s = d.getElementById(id); if (s) io.observe(s); });
}

// Reading progress: JS fallback where scroll() timelines aren't supported
const progress = d.querySelector('.progress');
if (progress && !CSS.supports('animation-timeline: scroll()')) {
  const set = () => {
    const h = r.scrollHeight - innerHeight;
    progress.style.setProperty('--progress', h > 0 ? Math.min(1, scrollY / h) : 0);
  };
  on(window, 'scroll', set, { passive: true });
  set();
}
