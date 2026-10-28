'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Images, ImageOff } from 'lucide-react';
import type { Location } from '@/lib/chargers';

export default function HotelPhotoGallery({ location }: { location: Location }) {
  const photos = [...new Set([...(location.photos || []), location.heroImage].filter((photo): photo is string => Boolean(photo)))];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const track = useRef<HTMLDivElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const active = Math.min(index, Math.max(0, photos.length - 1));
  const credits = location.photoCredits?.find(photo => photo.url === photos[active])?.authors || [];

  useEffect(() => {
    const strip = thumbnails.current;
    const thumbnail = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumbnail) return;
    strip.scrollTo({ left: thumbnail.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumbnail.clientWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [active, photos.length]);

  function goTo(next: number) {
    if (!track.current || !photos.length) return;
    const target = (next + photos.length) % photos.length;
    track.current.scrollTo({ left: target * track.current.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  if (!photos.length) return <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border border-[#dbe6e2] bg-[#f4f7f6] text-[#73847d]"><ImageOff size={28} strokeWidth={1.5} /><p className="text-sm">Hotel photos unavailable</p></div>;

  return <section aria-label={`${location.name} photo gallery`} aria-roledescription="carousel" className="space-y-3">
    <div className="relative isolate overflow-hidden rounded-3xl bg-[#102a27] shadow-[0_12px_32px_-16px_rgba(16,42,39,0.35)]">
      <div ref={track} tabIndex={photos.length > 1 ? 0 : -1} aria-label="Hotel photos. Use left and right arrow keys to browse." className="flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#80dc5d] [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }} onScroll={event => { const element = event.currentTarget; if (element.clientWidth) setIndex(Math.round(element.scrollLeft / element.clientWidth)); }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goTo(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
        {photos.map((photo, i) => <figure key={photo} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${photos.length}`} className="relative h-full w-full shrink-0 snap-center snap-always">
          {failed.has(photo) ? <div className="flex h-full flex-col items-center justify-center gap-2 text-white/60"><ImageOff size={28} /><p className="text-xs">Photo unavailable</p></div> : <Image unoptimized fill sizes="(max-width: 448px) calc(100vw - 40px), 408px" src={photo} alt={`${location.name}, photo ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} className="object-cover" onError={() => setFailed(previous => new Set(previous).add(photo))} />}
        </figure>)}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-wide text-white backdrop-blur-md"><Images size={13} />HOTEL GALLERY</div>
      {photos.length > 1 && <><button aria-label="Previous photo" onClick={() => goTo(active - 1)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/90 text-[#102a27] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ChevronLeft size={19} /></button><button aria-label="Next photo" onClick={() => goTo(active + 1)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/90 text-[#102a27] shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ChevronRight size={19} /></button></>}
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium tabular-nums text-white backdrop-blur-md" aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2,'0')}<span className="mx-1.5 text-white/50">/</span>{String(photos.length).padStart(2,'0')}</div>
      {photos.length > 1 && <span className="pointer-events-none absolute bottom-5 left-4 text-[10px] tracking-wide text-white/80">Swipe to explore</span>}
    </div>
    {photos.length > 1 && <div ref={thumbnails} className="relative flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:thin]" aria-label="Choose a photo">{photos.map((photo,i) => <button key={photo} aria-label={`Show photo ${i+1}`} aria-pressed={active === i} onClick={() => goTo(i)} className={`relative h-14 w-[72px] shrink-0 overflow-hidden rounded-xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#206d00] ${active === i ? 'ring-2 ring-[#206d00] ring-offset-2' : 'opacity-55 hover:opacity-100'}`}>
      {failed.has(photo) ? <span className="grid h-full place-items-center bg-[#edf6ed] text-[#73847d]"><ImageOff size={16}/></span> : <Image unoptimized fill sizes="72px" src={photo} alt="" className="object-cover" />}<span className="absolute bottom-1 right-1 rounded bg-black/45 px-1 text-[9px] text-white">{i+1}</span>
    </button>)}</div>}
    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[10px] leading-relaxed text-[#73847d]"><span className="font-medium">Google Maps</span>{credits.length > 0 && <><span aria-hidden="true">·</span><span>Photo by</span>{credits.map((author,i) => <a key={i} href={author.uri} target="_blank" rel="noopener noreferrer" className="underline decoration-[#bbc9c2] underline-offset-2 hover:text-[#206d00]">{author.displayName}{i < credits.length - 1 ? ',' : ''}</a>)}</>}</div>
  </section>;
}
