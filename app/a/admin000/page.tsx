"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Compass,
  MapPin,
  Building,
  UtensilsCrossed,
  ShoppingBag,
  Palmtree
} from 'lucide-react';
import { PropertyDetailData } from '@/lib/types';
import StationDrawer from '@/component/admin/StationDrawer';
import { getStationMarkerHtml, getClickPinMarkerHtml } from '@/component/admin/stationPin';

const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

export default function MapOnboarderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [chargers, setChargers] = useState<PropertyDetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hotels' | 'resorts' | 'malls' | 'restaurants'>('all');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Map state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const clickMarkerRef = useRef<any>(null);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<PropertyDetailData | null>(null);
  const [clickCoords, setClickCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Protect route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/a/admin000/login');
    }
  }, [status, router]);

  // Load stations
  const loadChargers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/chargers');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setChargers(json.data);
      }
    } catch (err) {
      console.error('Failed to load chargers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      loadChargers();
    }
  }, [status]);

  // Category filter: Strictly Hotels, Resorts, Malls, Restaurants
  const filteredChargers = useMemo(() => {
    return chargers.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      if (selectedCategory === 'hotels') return cat.includes('hotel');
      if (selectedCategory === 'resorts') return cat.includes('resort');
      if (selectedCategory === 'malls') return cat.includes('mall') || cat.includes('shopping');
      if (selectedCategory === 'restaurants') return cat.includes('restaurant') || cat.includes('cafe') || cat.includes('dining');
      return true;
    });
  }, [chargers, selectedCategory]);

  // Expose global window handler for popup edit clicks
  useEffect(() => {
    (window as any).__handleEditStationFromMap = (stationId: string) => {
      const found = chargers.find((s) => s.id === stationId);
      if (found) {
        setEditingStation(found);
        setClickCoords(null);
        setIsDrawerOpen(true);
      }
    };
    return () => {
      delete (window as any).__handleEditStationFromMap;
    };
  }, [chargers]);

  // Disable map scroll wheel zoom while the drawer is open to prevent scroll conflicts
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (isDrawerOpen) {
      mapInstanceRef.current.scrollWheelZoom?.disable();
    } else {
      mapInstanceRef.current.scrollWheelZoom?.enable();
    }
  }, [isDrawerOpen]);

  // Leaflet Map Initialization
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container) return;

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (!mapInstanceRef.current) {
        const map = L.map(container, {
          center: PUNE_CENTER,
          zoom: 13,
          zoomControl: false, // We place zoom control cleanly
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: '&copy; Google Maps',
        }).addTo(map);

        map.on('click', (e: any) => {
          const lat = parseFloat(e.latlng.lat.toFixed(5));
          const lng = parseFloat(e.latlng.lng.toFixed(5));

          if (clickMarkerRef.current) {
            clickMarkerRef.current.remove();
          }

          const clickIcon = L.divIcon({
            html: getClickPinMarkerHtml('#2563eb'),
            className: 'click-station-pin',
            iconSize: [44, 52],
            iconAnchor: [22, 48],
          });

          clickMarkerRef.current = L.marker([lat, lng], { icon: clickIcon }).addTo(map);

          setEditingStation(null);
          setClickCoords({ lat, lng });
          setIsDrawerOpen(true);
        });

        mapInstanceRef.current = map;
        setTimeout(() => map.invalidateSize(), 200);
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Render custom SVG station pointers
      filteredChargers.forEach((station) => {
        if (!station.location?.lat || !station.location?.lng) return;

        const customIcon = L.divIcon({
          html: getStationMarkerHtml('#109034'),
          className: 'custom-station-pin',
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -40]
        });

        const marker = L.marker([station.location.lat, station.location.lng], { icon: customIcon }).addTo(map);

        const imgUrl = station.photos?.[0] || station.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

        marker.bindPopup(`
          <div style="font-family:inherit; min-width:210px; padding:4px;">
            <div style="width:100%; height:110px; border-radius:8px; overflow:hidden; margin-bottom:8px; background:#f3f4f6;">
              <img src="${imgUrl}" alt="${station.name}" style="width:100%; height:100%; object-fit:cover; display:block;" />
            </div>
            <div style="font-weight:600; font-size:13px; color:#111827;">${station.name}</div>
            <div style="font-size:11px; color:#059669; font-weight:500; margin-top:2px;">${station.category} • ${station.city}</div>
            ${station.avgStayPrice ? `<div style="font-size:11px; color:#2563eb; margin-top:2px; font-weight:500;">Stay: ${station.avgStayPrice.startsWith('₹') ? station.avgStayPrice : `₹${station.avgStayPrice}`}</div>` : ''}
            <div style="font-size:11px; color:#6b7280; margin-top:3px;">${station.liveChargers?.length || 0} Charging Points</div>
            <button 
              onclick="window.__handleEditStationFromMap('${station.id}')"
              style="margin-top:8px; width:100%; background:#109034; color:#ffffff; border:none; padding:5px 8px; border-radius:8px; font-size:11px; font-weight:500; cursor:pointer;"
            >
              Edit Station Details
            </button>
          </div>
        `);

        markersRef.current.push(marker);
      });
    });
  }, [filteredChargers]);

  const handleDrawerSuccess = (savedStation: PropertyDetailData, isEdit: boolean) => {
    if (clickMarkerRef.current) {
      clickMarkerRef.current.remove();
      clickMarkerRef.current = null;
    }
    loadChargers();
    setToastMessage({
      type: 'success',
      text: isEdit ? `Station "${savedStation.name}" updated successfully.` : `Station "${savedStation.name}" onboarded to map!`
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden select-none">
      {/* 100% Full-Screen Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Top-Left Pill: Guide */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-sm pointer-events-auto">
        <Compass className="w-4 h-4 text-green-600 animate-spin-slow" />
        <span className="text-xs font-medium text-gray-800">
          Click anywhere on the map to drop a pin & onboard
        </span>
      </div>

      {/* Floating Top-Right Controls: Category Pills & Refresh */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200/80 shadow-sm pointer-events-auto">
        <div className="flex items-center space-x-1 px-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All ({chargers.length})
          </button>

          <button
            onClick={() => setSelectedCategory('hotels')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'hotels'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Hotels</span>
          </button>

          <button
            onClick={() => setSelectedCategory('resorts')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'resorts'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Palmtree className="w-3.5 h-3.5" />
            <span>Resorts</span>
          </button>

          <button
            onClick={() => setSelectedCategory('malls')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'malls'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Malls</span>
          </button>

          <button
            onClick={() => setSelectedCategory('restaurants')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'restaurants'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Restaurants</span>
          </button>
        </div>

        <div className="h-5 w-px bg-gray-200" />

        <button
          onClick={loadChargers}
          className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950 flex items-center justify-center transition-colors cursor-pointer"
          title="Refresh Stations"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-green-600' : ''}`} />
        </button>
      </div>

      {/* Floating Bottom Toast Notification */}
      {toastMessage && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 text-emerald-800 shadow-lg animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-medium">{toastMessage.text}</span>
        </div>
      )}

      {/* Onboarding / Editing Drawer */}
      <StationDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          if (clickMarkerRef.current) {
            clickMarkerRef.current.remove();
            clickMarkerRef.current = null;
          }
        }}
        onSuccess={handleDrawerSuccess}
        editingStation={editingStation}
        initialCoordinates={clickCoords}
      />
    </div>
  );
}
