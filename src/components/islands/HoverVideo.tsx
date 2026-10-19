import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  poster?: string;
  ariaLabel?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

/**
 * Case study video: plays while hovered or focused and pauses on leave.
 * Skipped on touch devices and for reduced-motion users, who use the controls.
 * Once a visitor clicks the video they're in control and hover no longer pauses it.
 */
export default function HoverVideo({ src, poster, ariaLabel, preload = 'metadata' }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pinned = false;
    const play = () => { if (!pinned) v.play().catch(() => {}); };
    const pause = () => { if (!pinned) v.pause(); };
    const pin = () => { pinned = true; };
    const events: [string, () => void][] = [['mouseenter', play], ['mouseleave', pause], ['focus', play], ['blur', pause], ['click', pin]];
    events.forEach(([e, f]) => v.addEventListener(e, f));
    return () => events.forEach(([e, f]) => v.removeEventListener(e, f));
  }, []);

  return <video ref={ref} src={src} poster={poster} controls preload={preload} muted loop playsInline aria-label={ariaLabel} />;
}
