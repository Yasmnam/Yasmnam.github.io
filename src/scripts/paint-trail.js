// Wet trail: the pointer leaves watery blooms that reveal the tulip painting
// behind the page, and they dry away over a few seconds. The faint wash
// (.paint-bg__wash) is plain CSS; this only draws the trail, and only runs
// while something is still wet. Off for reduced motion and touch-only
// devices, where the wash stays on its own.
const root = document.querySelector('.paint-bg');
const canvas = root?.querySelector('.paint-bg__trail');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && finePointer && !reduced) {
  const img = new Image();
  img.src = root.dataset.src;
  img.decode().then(() => start(img), () => {});
}

function start(img) {
  const view = canvas.getContext('2d');
  const mask = document.createElement('canvas').getContext('2d');
  const DRY_FRAMES = 420; // keep drawing ~7s after the last bloom
  let W = 0, H = 0, x = 0, y = 0, lastX = 0, lastY = 0;
  let hasLast = false, wet = 0, frameNo = 0, running = false;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    view.setTransform(dpr, 0, 0, dpr, 0, 0);
    mask.canvas.width = W; mask.canvas.height = H;
  }

  function bloom(bx, by) {
    for (let i = 0; i < 3; i++) {
      const r = 50 + Math.random() * 70;
      const cx = bx + (Math.random() - .5) * 50, cy = by + (Math.random() - .5) * 50;
      const g = mask.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(0,0,0,.16)');
      g.addColorStop(.6, 'rgba(0,0,0,.08)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      mask.fillStyle = g;
      mask.fillRect(cx - r, cy - r, r * 2, r * 2);
    }
  }

  function frame() {
    // Stamp blooms along the path travelled since the last frame
    if (hasLast) {
      const dx = x - lastX, dy = y - lastY;
      const steps = Math.min(30, Math.floor(Math.hypot(dx, dy) / 14));
      for (let i = 1; i <= steps; i++) bloom(lastX + dx * i / steps, lastY + dy * i / steps);
      if (steps) wet = DRY_FRAMES;
    }
    lastX = x; lastY = y; hasLast = true;

    // Dry: fade the mask in coarse steps (tiny per-frame fades get stuck in 8-bit alpha)
    if (++frameNo % 6 === 0) {
      mask.globalCompositeOperation = 'destination-out';
      mask.fillStyle = 'rgba(0,0,0,.05)';
      mask.fillRect(0, 0, W, H);
      mask.globalCompositeOperation = 'source-over';
    }

    // The painting, kept only where the mask is wet. Framed like the wash
    // (cover, centred, 40% down).
    const s = Math.max(W / img.width, H / img.height);
    const dw = img.width * s, dh = img.height * s;
    view.globalCompositeOperation = 'source-over';
    view.clearRect(0, 0, W, H);
    view.drawImage(img, (W - dw) / 2, (H - dh) * .4, dw, dh);
    view.globalCompositeOperation = 'destination-in';
    view.drawImage(mask.canvas, 0, 0, W, H);

    if (--wet > 0) return requestAnimationFrame(frame);
    // Fully dry: clear and sleep until the pointer moves again
    view.clearRect(0, 0, W, H);
    mask.clearRect(0, 0, W, H);
    running = false;
  }

  fit();
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fit, 120); });
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    x = e.clientX; y = e.clientY;
    if (!running) { running = true; wet = DRY_FRAMES; requestAnimationFrame(frame); }
  }, { passive: true });
  // Leaving the window shouldn't draw a streak from the exit to the re-entry point
  document.addEventListener('pointerout', e => { if (!e.relatedTarget) hasLast = false; });
}
