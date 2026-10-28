'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X, Navigation, Zap, Loader2 } from 'lucide-react';
import type { Location } from '@/lib/chargers';
import { loadMaps } from '@/lib/maps';
import { customerMapTheme } from '@/lib/map-theme';
import PropertyDetailMobileView from '@/component/PropertyDetailMobileView';

type Status = { siteId: string; chargerId: string; ports: { connectorId: string; status: string; online: boolean; stale: boolean }[] };
function mergeStatus(location: Location, statuses: Status[]): Location {
  return { ...location, connectors: location.connectors.map(connector => {
    const device = statuses.find(s => s.siteId === location.id && s.chargerId === connector.chargerPublicId);
    const port = device?.ports.find(p => `${device.chargerId}-${p.connectorId}` === connector.id);
    return port ? { ...connector, status: port.status, online: port.online, stale: port.stale } : { ...connector, online: false, stale: true };
  }) };
}
export default function MapPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapError, setMapError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Location | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [ready, setReady] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const requestId = useRef(0);
  const fitted = useRef(false);
  const selectedId = useRef<string | null>(null);

  async function loadLocations(signal?: AbortSignal) {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/chargers', { cache: 'no-store', signal });
      const body = await response.json();
      if (!response.ok || !body.success) throw Error(body.error || 'Unable to load locations.');
      setLocations(body.data);
    } catch (e) { if (!signal?.aborted) setError(e instanceof Error ? e.message : 'Unable to load locations.'); }
    finally { if (!signal?.aborted) setLoading(false); }
  }
  useEffect(() => {
    const controller = new AbortController();
    queueMicrotask(() => { if (!controller.signal.aborted) void loadLocations(controller.signal); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let disposed = false;
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch('/api/charger-status', { cache: 'no-store', signal: controller.signal });
        const body = await response.json();
        if (!response.ok || !body.success) throw Error('Status unavailable');
        if (disposed) return;
        setLocations(rows => rows.map(row => mergeStatus(row, body.data)));
        setSelected(row => row ? mergeStatus(row, body.data) : null);
        setStatusError('');
      } catch {
        if (disposed) return;
        setStatusError('Live status unavailable. Last known status may be outdated.');
        const stale = (row: Location) => ({ ...row, connectors: row.connectors.map(c => ({ ...c, stale: true, online: false })) });
        setLocations(rows => rows.map(stale)); setSelected(row => row ? stale(row) : null);
      }
    }
    let timer: ReturnType<typeof setTimeout>;
    async function poll() { await refresh(); if (!disposed) timer = setTimeout(poll, 15000); }
    timer = setTimeout(poll, 15000);
    return () => { disposed = true; clearTimeout(timer); controller.abort(); };
  }, []);

  useEffect(() => {
    let disposed = false;
    loadMaps().then(() => {
      if (disposed || !container.current) return;
      map.current = new google.maps.Map(container.current, { center: { lat: 20.5937, lng: 78.9629 }, zoom: 5, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || 'DEMO_MAP_ID', disableDefaultUI: true, zoomControl: true, mapTypeControl: false });
      map.current.mapTypes.set('evstay', new google.maps.StyledMapType(customerMapTheme));
      map.current.setMapTypeId('evstay');
      setReady(true);
    }).catch(e => { if (!disposed) setMapError(e.message); });
    return () => { disposed = true; map.current = null; };
  }, []);

  const visible = useMemo(() => locations.filter(row => {
    const match = `${row.name} ${row.city} ${row.address}`.toLowerCase().includes(query.toLowerCase().trim());
    return match && (filter === 'all' || row.connectors.some(c => filter === 'available' ? c.online && !c.stale && c.status === 'available' : c.type === filter));
  }), [locations, query, filter]);

  async function select(row: Location) {
    const id = ++requestId.current;
    selectedId.current = row.id;
    setSelected(row); setDetailLoading(true); setDetailError('');
    if (row.location && map.current) { map.current.panTo(row.location); map.current.setZoom(15); }
    try {
      const response = await fetch(`/api/chargers/${encodeURIComponent(row.id)}`, { cache: 'no-store' });
      const body = await response.json();
      if (!response.ok || !body.success) throw Error(body.error || 'Hotel details unavailable.');
      if (requestId.current === id && selectedId.current === row.id) setSelected(body.data);
    } catch (e) { if (requestId.current === id) setDetailError(e instanceof Error ? e.message : 'Hotel details unavailable.'); }
    finally { if (requestId.current === id) setDetailLoading(false); }
  }
  useEffect(() => {
    if (!ready || !map.current) return;
    const bounds = new google.maps.LatLngBounds();
    const markers = visible.flatMap(row => {
      if (!row.location || !Number.isFinite(row.location.lat) || !Number.isFinite(row.location.lng)) return [];
      bounds.extend(row.location);
      const icon = document.createElement('img');
      icon.src = '/images/logo-icon.png';
      icon.alt = '';
      icon.width = 42;
      icon.height = 48;
      icon.style.width = '42px';
      icon.style.height = '48px';
      icon.style.objectFit = 'contain';
      icon.style.filter = 'drop-shadow(0 3px 4px rgba(16, 42, 39, 0.25))';
      const marker = new google.maps.marker.AdvancedMarkerElement({ map: map.current, position: row.location, title: row.name, content: icon });
      marker.addListener('click', () => void select(row));
      return [marker];
    });
    if (!fitted.current && markers.length) { map.current.fitBounds(bounds, 80); if (markers.length === 1) map.current.setZoom(14); fitted.current = true; }
    return () => markers.forEach(marker => { google.maps.event.clearInstanceListeners(marker); marker.map = null; });
  }, [ready, visible]);

  function close() { selectedId.current = null; requestId.current++; setSelected(null); setDetailError(''); setDetailLoading(false); }
  function locate() {
    if (!navigator.geolocation) { setMapError('Your browser does not support location.'); return; }
    navigator.geolocation.getCurrentPosition(position => {
      setMapError(''); map.current?.panTo({ lat: position.coords.latitude, lng: position.coords.longitude }); map.current?.setZoom(12);
    }, () => setMapError('Location unavailable. Search for a hotel or city instead.'));
  }
  return <main className="relative h-dvh w-full overflow-hidden bg-[#f4f7f6] font-sans text-gray-900">
    <div ref={container} className="absolute inset-0" aria-label="EVStay charging location map" />
    <aside className="absolute bottom-4 left-4 top-4 z-10 flex w-[calc(100%-2rem)] max-w-sm flex-col rounded-3xl bg-white/95 p-4 shadow-xl backdrop-blur-sm max-sm:bottom-auto max-sm:max-h-[48dvh]">
      <div className="flex items-center justify-between"><Link href="/" className="text-xl font-bold text-[#52b31f]">EVStay</Link><button onClick={locate} className="rounded-full bg-gray-100 p-2" aria-label="Use my location"><Navigation size={18} /></button></div>
      <h1 className="mt-3 text-lg font-semibold">Find a charging stay</h1>
      <label className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 px-3"><Search size={17} /><input aria-label="Search hotels, cities or addresses" placeholder="Search hotel, city or address" value={query} onChange={e => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" /></label>
      <div className="my-3 flex flex-wrap gap-2">{[['all', 'All'], ['available', 'Available'], ['AC', 'AC'], ['DC', 'DC']].map(([value, title]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-3 py-2 text-xs ${filter === value ? 'bg-[#52b31f] text-white' : 'bg-gray-100'}`}>{title}</button>)}</div>
      <div aria-live="polite" className="text-xs text-gray-500">{loading ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" />Loading EVStay locations…</span> : `${visible.length} charging locations`}{error && <p role="alert" className="mt-2 text-red-700">{error} <button onClick={() => void loadLocations()} className="underline">Retry</button></p>}{mapError && <p className="mt-2">{mapError}</p>}{statusError && <p className="mt-2 text-amber-700">{statusError}</p>}</div>
      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto">{visible.map(row => <button key={row.id} onClick={() => void select(row)} className="block w-full rounded-xl border border-gray-100 p-3 text-left hover:bg-green-50"><h2 className="text-sm font-semibold">{row.name}</h2><p className="mt-1 text-xs text-gray-500">{row.address}</p><p className="mt-2 flex items-center gap-1 text-xs text-green-700"><Zap size={13} />{row.connectors.filter(c => c.online && !c.stale && c.status === 'available').length} / {row.connectors.length} connectors available</p></button>)}{!loading && !error && !visible.length && <p className="py-5 text-sm text-gray-500">No published locations match your search.</p>}</div>
    </aside>
    {selected && <div className="absolute inset-0 z-20 flex justify-end bg-black/30" onClick={close}><section role="dialog" aria-modal="true" aria-label={selected.name} className="relative h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl max-sm:mt-[8dvh] max-sm:h-[92dvh] max-sm:rounded-t-3xl" onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') close(); }}><button autoFocus onClick={close} aria-label="Close details" className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2"><X size={18} /></button>{detailLoading && <p role="status" className="px-5 pt-16 text-sm text-gray-500">Loading hotel photos and reviews…</p>}{detailError && <p role="alert" className="px-5 pt-16 text-sm text-red-700">{detailError} <button className="underline" onClick={() => void select(selected)}>Retry</button></p>}<PropertyDetailMobileView property={selected} onClose={close} /></section></div>}
  </main>;
}
