'use client';
import HotelPhotoGallery from '@/component/HotelPhotoGallery';
import type { Location, Review } from '@/lib/chargers';
import { ArrowLeft, Navigation, Phone, Zap } from 'lucide-react';

export function PhotoCredits({ location, photo }: { location: Location; photo?: string | null }) {
  const authors = location.photoCredits?.find(item => item.url === photo)?.authors || [];
  return <div className="text-xs text-gray-500">{photo && 'Google Maps · '}{authors.map((author, i) => <a key={i} href={author.uri} target="_blank" rel="noopener noreferrer" className="mr-2 underline">{author.displayName}</a>)}</div>;
}
function Reviews({ title, rating, count, reviews }: { title: string; rating?: number | null; count?: number; reviews: Review[] }) {
  return <section className="space-y-3 border-t border-gray-100 pt-5"><h2 className="font-semibold">{title}</h2>
    <p className="text-sm text-gray-600">{rating != null && count ? `${rating.toFixed(1)} / 5 · ${count} reviews` : 'No ratings available'}</p>
    {reviews.map((r, i) => <article key={i} className="rounded-xl bg-gray-50 p-4 text-sm"><div className="flex justify-between gap-3"><a href={r.authorUrl || undefined} target="_blank" rel="noopener noreferrer" className="font-medium">{r.author}</a><span>{r.rating} / 5</span></div><p className="mt-2 whitespace-pre-wrap text-gray-600">{r.comment}</p><div className="mt-2 flex justify-between text-xs text-gray-500"><time>{r.date ? new Date(r.date).toLocaleDateString() : ''}</time>{r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">View on Google Maps</a>}</div></article>)}
  </section>;
}
export default function PropertyDetailMobileView({ property: data, onClose }: { property: Location; onClose: () => void }) {
  return <div className="min-h-full bg-white pb-10 font-sans text-gray-900">
    <button onClick={onClose} className="m-4 flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm"><ArrowLeft size={16} /> Back to map</button>
    <div className="space-y-5 px-5"><div><p className="text-xs font-semibold uppercase tracking-widest text-[#52b31f]">EVStay · {data.category}</p><h1 className="mt-2 text-2xl font-semibold">{data.name}</h1><p className="mt-2 text-sm text-gray-500">{data.address}</p></div>
      <HotelPhotoGallery key={data.id} location={data} />
      <div className="flex flex-wrap gap-3 text-sm">{data.googleMapsUrl && <a href={data.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#52b31f] px-4 py-3 text-white"><Navigation size={16} /> Directions</a>}{data.phone && <a href={`tel:${data.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-3"><Phone size={16} /> Call hotel</a>}{data.websiteUrl && <a href={data.websiteUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 px-4 py-3">Hotel website</a>}</div>
      <section className="space-y-3"><h2 className="font-semibold">Live EVStay chargers</h2><p className="text-xs text-gray-500">Status refreshes every 15 seconds. Use the EVStay app to charge.</p>{data.connectors.map(c => <div key={c.id} className="rounded-xl border border-gray-100 p-4 text-sm"><div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 font-medium"><Zap size={16} className="text-[#52b31f]" />{c.id}</span><span className={c.online && !c.stale && c.status === 'available' ? 'text-green-700' : 'text-gray-500'}>{!c.online || c.stale ? 'Offline' : c.status.replaceAll('_', ' ')}</span></div><p className="mt-2 text-gray-500">{c.capacityKw != null ? `${c.capacityKw} kW` : 'Power unavailable'} · {c.standard || c.type}{c.tariffInclusive != null ? ` · ₹${c.tariffInclusive}/kWh` : ' · Tariff unavailable'}</p></div>)}</section>
      {data.operatingHours && <section><h2 className="font-semibold">Hotel opening hours</h2><p className="mt-2 whitespace-pre-line text-sm text-gray-500">{data.operatingHours}</p></section>}
      <Reviews title="Google Maps hotel reviews" rating={data.googleRating} count={data.googleReviewCount} reviews={data.googleReviews || []} />
      <Reviews title="EVStay charging reviews" rating={data.rating} count={data.reviewCount} reviews={data.reviews || []} />
      <p className="text-xs text-gray-500">Hotel information: {data.hotelDetailsStatus === 'available' ? 'Google Maps' : 'EVStay; Google Maps details unavailable'}. Charger status and pricing: EVStay.</p>
      {data.providerAttributions?.map((item, i) => <a key={i} href={item.providerUri} target="_blank" rel="noopener noreferrer" className="block text-xs underline">{item.provider}</a>)}
    </div>
  </div>;
}
