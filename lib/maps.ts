'use client';
let loading: Promise<void> | undefined;
export function loadMaps(): Promise<void> {
  if (window.google?.maps) return Promise.resolve();
  if (loading) return loading;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.reject(Error('Map is not configured. Charging locations are listed below.'));
  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&libraries=marker`;
    script.async = true;
    script.onload = () => window.google?.maps ? resolve() : reject(Error('Unable to load Google Maps.'));
    script.onerror = () => { loading = undefined; script.remove(); reject(Error('Unable to load Google Maps.')); };
    document.head.appendChild(script);
  });
  return loading;
}
