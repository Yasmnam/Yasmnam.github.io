// Motion: intro control, scroll-reveal/unroll fallback, top bar,
// contents highlighting and the reading-progress fallback. Most motion is CSS;
// this only does what CSS can't. Loaded as a deferred module.
const d = document, r = d.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const on = (t, e, f, o) => t.addEventListener(e, f, o);

// Intro (home): plays on every visit; any input while it runs (about 5.6s,
// including the typewriter) adds .intro-done (skip to the end).
const hero = d.querySelector('.hero');
const SKIP = ['keydown', 'pointerdown', 'wheel', 'touchmove'];
let skipTimer;
function armSkip() {
  const disarm = () => { SKIP.forEach(e => removeEventListener(e, skip)); clearTimeout(skipTimer); };
  const skip = e => { r.classList.add('intro-done'); disarm(); window.gtag?.('event', 'intro_skip', { input: e.type }); };
  SKIP.forEach(e => on(window, e, skip, { passive: true }));
  skipTimer = setTimeout(disarm, 5600);
}

// Typewriter on the masthead's first word: Product → UX → UI → Interface →
// Brand → Product, starting from a blank slot with a grey underline. It types
// into a fixed slot the width of "Product" (the real, accessible word stays in
// place, just transparent), so nothing around it moves; longer words are
// scaled down to fit. Stops if the intro is skipped.
const slot = d.querySelector('.type-slot');
let typeRun = 0;
async function typewriter() {
  if (!slot || reduced) return;
  const run = ++typeRun;
  const ghost = slot.querySelector('.type-slot__ghost'), out = slot.querySelector('.type-word');
  const alive = () => run === typeRun && !r.classList.contains('intro-done');
  const wait = ms => new Promise(res => setTimeout(res, ms));
  // Blank slot with a grey underline straight away; typing starts once fonts are in
  out.textContent = '';
  r.classList.add('is-typing');
  await d.fonts?.ready;
  if (!alive()) return;
  const slotW = ghost.getBoundingClientRect().width;
  await wait(650);
  const words = ['Product', 'UX', 'UI', 'Interface', 'Brand', 'Product'];
  for (let i = 0; i < words.length && alive(); i++) {
    const w = words[i];
    out.style.transform = 'none';
    out.textContent = w;
    const full = out.getBoundingClientRect().width, fit = Math.min(1, slotW / full);
    // end each word right next to "Design"; shorter words leave the gap on the left
    out.style.transform = `translateX(${(slotW - full * fit).toFixed(1)}px) scale(${fit.toFixed(3)})`;
    out.textContent = '';
    for (const ch of w) { if (!alive()) break; out.textContent += ch; await wait(62); }
    if (i === words.length - 1) break;
    await wait(420);
    while (out.textContent && alive()) { out.textContent = out.textContent.slice(0, -1); await wait(34); }
    await wait(140);
  }
  if (run !== typeRun) return;
  await wait(alive() ? 700 : 0);
  if (run === typeRun) r.classList.remove('is-typing');
}
if (hero && !reduced && !r.classList.contains('intro-done')) { armSkip(); typewriter(); }

// Replay intro: restart the animations
const replay = d.querySelector('[data-replay-intro]');
if (replay && hero && !reduced) {
  replay.hidden = false;
  on(replay, 'click', () => {
    scrollTo({ top: 0, behavior: 'instant' });
    r.classList.add('intro-done');
    void r.offsetWidth;
    r.classList.remove('intro-done');
    setTimeout(() => { armSkip(); typewriter(); }, 0);
  });
}

// Home top bar: hide on scroll down, show on scroll up
const bar = d.querySelector('.topbar');
if (bar) {
  let y = scrollY;
  on(window, 'scroll', () => {
    const ny = scrollY;
    bar.classList.toggle('is-hidden', ny > y && ny > 240);
    y = ny;
  }, { passive: true });
}

// Case study story bar: shown once the headline block has scrolled out of view
const storyBar = d.querySelector('.story-bar');
const head = d.querySelector('.article-head');
if (storyBar && head) {
  let shown = false;
  const check = () => {
    const show = head.getBoundingClientRect().bottom < 0;
    if (show === shown) return;
    shown = show;
    storyBar.classList.toggle('is-visible', show);
    storyBar.inert = !show;
  };
  on(window, 'scroll', check, { passive: true });
  check();
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
