import { useEffect, useRef, useState } from 'react';
import type { Slide } from '../../data/types';

interface Props {
  /** Accessible name, also sent with analytics events */
  label: string;
  slides: Slide[];
  /** default: image in a hairline frame; fit: same-height frames, contained;
   *  bleed: fills its container, images cropped, controls over the bottom */
  variant?: 'default' | 'fit' | 'bleed';
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Minimal carousel. Slides are native scroll-snap, so the server-rendered HTML
 * already swipes; after hydration this adds a counter, a segmented progress
 * line (each segment jumps to its slide), bare arrows and arrow-key support.
 */
export default function Carousel({ label, slides, variant = 'default' }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setReady(true);
    const t = track.current;
    if (!t) return;
    const onScroll = () => {
      const step = (t.children[1] as HTMLElement | undefined)?.offsetLeft || 1;
      setCurrent(Math.max(0, Math.min(slides.length - 1, Math.round(t.scrollLeft / step))));
    };
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => t.removeEventListener('scroll', onScroll);
  }, [slides.length]);

  const go = (i: number) => {
    const t = track.current;
    if (!t) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    t.scrollTo({ left: (t.children[next] as HTMLElement).offsetLeft });
    setCurrent(next);
  };

  const className = ['cs-carousel', variant === 'fit' && 'cs-carousel-fit', variant === 'bleed' && 'cs-carousel--bleed']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        className="cs-carousel-track"
        tabIndex={0}
        ref={track}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
        }}
      >
        {slides.map((s, i) => {
          const img = (
            <img
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              loading={s.lazy === false ? undefined : 'lazy'}
              className={s.className}
            />
          );
          return (
            <figure className="cs-figure" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} key={s.src}>
              {variant === 'bleed' ? img : <div className="cs-carousel-frame">{img}</div>}
              {s.caption && <figcaption>{s.caption}</figcaption>}
            </figure>
          );
        })}
      </div>
      <div className="cs-carousel-controls" hidden={!ready}>
        <span className="cs-carousel-count" aria-hidden="true">{`${pad(current + 1)} / ${pad(slides.length)}`}</span>
        <div className="cs-carousel-segments">
          {slides.map((_, i) => (
            <button
              type="button"
              key={i}
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              aria-current={i === current ? 'true' : 'false'}
              data-ga-event="carousel_nav"
              data-ga-carousel={label}
              data-ga-control={`segment_${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="cs-carousel-arrows">
          {[-1, 1].map((dir) => (
            <button
              type="button"
              key={dir}
              className="cs-carousel-arrow"
              aria-label={dir < 0 ? 'Previous slide' : 'Next slide'}
              data-ga-event="carousel_nav"
              data-ga-carousel={label}
              data-ga-control={dir < 0 ? 'prev' : 'next'}
              disabled={dir < 0 ? current === 0 : current === slides.length - 1}
              onClick={() => go(current + dir)}
            >
              <span aria-hidden="true">{dir < 0 ? '←' : '→'}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
