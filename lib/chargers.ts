import 'server-only';

export interface Connector {
  id: string; chargerPublicId: string; type: string; standard: string | null;
  capacityKw: number | null; tariffInclusive: number | null;
  status: string; online: boolean; stale: boolean;
}
export interface Review {
  author: string; authorUrl?: string | null; rating: number;
  comment: string; date: string; url?: string | null;
}
export interface Location {
  id: string; name: string; category: string; city: string; address: string; phone: string | null;
  location: { lat: number; lng: number } | null;
  heroImage: string | null; photos: string[];
  photoCredits: { url: string; authors: { displayName: string; uri?: string }[] }[];
  providerAttributions?: { provider: string; providerUri?: string }[];
  operatingHours: string | null; googleMapsUrl: string | null; websiteUrl: string | null;
  hotelDetailsStatus: string; rating: number | null; reviewCount: number; reviews: Review[];
  googleRating?: number | null; googleReviewCount?: number; googleReviews?: Review[];
  connectors: Connector[];
}
export class DirectoryError extends Error {
  constructor(public status: number) { super('EVStay directory unavailable'); }
}
async function directory(path: string) {
  const base = (process.env.EVSTAY_API_URL || 'https://api.evstay.in').replace(/\/$/, '');
  const response = await fetch(`${base}/api/customer/v1/${path}`, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new DirectoryError(response.status === 404 ? 404 : 502);
  const body = await response.json();
  if (body.ok !== true) throw new DirectoryError(502);
  return body;
}
export async function getAllChargers(): Promise<Location[]> {
  const locations: Location[] = [];
  let offset = 0;
  for (let page = 0; page < 100; page++) {
    const body = await directory(`locations?limit=100&offset=${offset}`);
    if (!Array.isArray(body.locations)) throw new DirectoryError(502);
    locations.push(...body.locations);
    if (!body.pagination?.hasMore) return locations;
    const next = body.pagination.nextOffset;
    if (!Number.isInteger(next) || next <= offset) throw new DirectoryError(502);
    offset = next;
  }
  throw new DirectoryError(502);
}
export async function getChargerById(id: string): Promise<Location> {
  const body = await directory(`locations/${encodeURIComponent(id)}`);
  if (!body.location?.id || !Array.isArray(body.location.connectors)) throw new DirectoryError(502);
  return body.location;
}
