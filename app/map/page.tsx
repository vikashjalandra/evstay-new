"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropertyDetailMobileView, { PropertyDetailData } from '@/component/PropertyDetailMobileView';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Minus,
  Navigation,
  X,
  MapPin,
  Star,
  Zap,
  Building2,
  Loader2,
  Compass,
} from 'lucide-react';

const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

interface LocationSuggestion {
  displayName: string;
  shortName: string;
  lat: number;
  lng: number;
  type: 'city' | 'area' | 'map_place';
  propertyCount?: number;
}

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getOverallRating(charger: PropertyDetailData): number {
  const gRating = Number(charger.platformRatings?.google?.rating || charger.rating || 4.7);
  const gCount = Number(charger.platformRatings?.google?.reviewCount || charger.reviewCount || 180);
  const aRating = Number(charger.platformRatings?.apple?.rating || Math.max(4.0, gRating - 0.1));
  const aCount = Number(charger.platformRatings?.apple?.reviewCount || Math.floor(gCount * 0.6));
  const eRating = Number(charger.platformRatings?.evstay?.rating || Math.min(5.0, gRating + 0.1));
  const eCount = Number(charger.platformRatings?.evstay?.reviewCount || Math.floor(gCount * 0.8));
  const total = gCount + aCount + eCount;
  return total > 0
    ? Number((((gRating * gCount) + (aRating * aCount) + (eRating * eCount)) / total).toFixed(1))
    : Number(gRating.toFixed(1));
}

export default function MapPage() {
  const [chargers, setChargers] = useState<PropertyDetailData[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Fetch dynamic chargers from API
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicChargers() {
      try {
        setIsLoadingLive(true);
        const res = await fetch('/api/chargers', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && isMounted) {
            setChargers(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic chargers:', err);
      } finally {
        if (isMounted) setIsLoadingLive(false);
      }
    }

    loadDynamicChargers();
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Starting with NULL so default page is JUST the map without any preview box
  const [selectedCharger, setSelectedCharger] = useState<PropertyDetailData | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Location suggestions & selected location state
  const [mapLocationSuggestions, setMapLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(null);

  const dragStartY = useRef<number | null>(null);

  const handlePreviewTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  };

  const handlePreviewTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = dragStartY.current - currentY;
    // Immediate response if swiped up by more than 15px
    if (diffY > 15) {
      setIsDetailOpen(true);
      dragStartY.current = null;
    }
  };

  const handlePreviewTouchEnd = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = dragStartY.current - touchEndY;
    if (diffY > 15) {
      setIsDetailOpen(true);
    }
    dragStartY.current = null;
  };

  const handlePreviewMouseDown = (e: React.MouseEvent) => {
    dragStartY.current = e.clientY;
  };

  const handlePreviewMouseMove = (e: React.MouseEvent) => {
    if (dragStartY.current === null) return;
    const diffY = dragStartY.current - e.clientY;
    if (diffY > 15) {
      setIsDetailOpen(true);
      dragStartY.current = null;
    }
  };

  const handlePreviewMouseUp = (e: React.MouseEvent) => {
    if (dragStartY.current === null) return;
    const diffY = dragStartY.current - e.clientY;
    if (diffY > 15) {
      setIsDetailOpen(true);
    }
    dragStartY.current = null;
  };

  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  // Fetch map location suggestions (local charger locations + OpenStreetMap geocoding)
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setMapLocationSuggestions([]);
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    const normQ = normalizeText(query);

    // 1. Gather matching cities / areas from database chargers
    const localCityMatches: LocationSuggestion[] = [];
    const cityGroupMap = new Map<string, PropertyDetailData[]>();

    chargers.forEach((c) => {
      const city = c.city || '';
      const address = c.address || '';
      const locationCandidates = [city, address].filter(Boolean);
      
      locationCandidates.forEach((locStr) => {
        const parts = locStr.split(',').map(s => s.trim());
        parts.forEach((part) => {
          if (part.length >= 3) {
            if (!cityGroupMap.has(part)) cityGroupMap.set(part, []);
            cityGroupMap.get(part)!.push(c);
          }
        });
      });
    });

    cityGroupMap.forEach((propsInLoc, locName) => {
      if (
        locName.toLowerCase().includes(query) ||
        normalizeText(locName).includes(normQ)
      ) {
        const avgLat = propsInLoc.reduce((acc, curr) => acc + curr.location.lat, 0) / propsInLoc.length;
        const avgLng = propsInLoc.reduce((acc, curr) => acc + curr.location.lng, 0) / propsInLoc.length;
        
        // Don't add duplicates
        if (!localCityMatches.some(m => m.shortName.toLowerCase() === locName.toLowerCase())) {
          localCityMatches.push({
            displayName: `${locName} (${propsInLoc.length} station${propsInLoc.length > 1 ? 's' : ''})`,
            shortName: locName,
            lat: avgLat,
            lng: avgLng,
            type: 'city',
            propertyCount: propsInLoc.length,
          });
        }
      }
    });

    // 2. Fetch place suggestions from OpenStreetMap Nominatim API
    const timer = setTimeout(async () => {
      try {
        setIsGeocodingLoading(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}&countrycodes=in&limit=4`,
          { headers: { 'Accept-Language': 'en' } }
        );
        if (res.ok) {
          const data = await res.json();
          const apiSuggestions: LocationSuggestion[] = data.map((item: any) => {
            const shortName = item.display_name.split(',')[0];
            return {
              displayName: item.display_name,
              shortName: shortName,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              type: 'map_place' as const,
            };
          });

          // Merge local city matches & API suggestions
          const combined = [...localCityMatches];
          apiSuggestions.forEach((apiItem) => {
            if (!combined.some((c) => c.shortName.toLowerCase() === apiItem.shortName.toLowerCase())) {
              combined.push(apiItem);
            }
          });

          setMapLocationSuggestions(combined.slice(0, 5));
        } else {
          setMapLocationSuggestions(localCityMatches.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching map location suggestions:', err);
        setMapLocationSuggestions(localCityMatches.slice(0, 5));
      } finally {
        setIsGeocodingLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, chargers]);

  // Visible chargers for rendering map pins (Keep ALL pins visible, filter only by category tabs if chosen)
  const visibleMapChargers = useMemo(() => {
    return chargers.filter((c) => {
      if (activeFilter === 'fast') {
        const pOutput = c.chargingAmenities?.powerOutput?.toLowerCase() || c.liveChargers?.[0]?.power?.toLowerCase() || '';
        return pOutput.includes('dc') ||
          pOutput.includes('60') ||
          pOutput.includes('50') ||
          pOutput.includes('120');
      }
      if (activeFilter === 'hotels') {
        return c.category.toLowerCase().includes('hotel') || c.category.toLowerCase().includes('resort');
      }
      if (activeFilter === 'malls') {
        return c.category.toLowerCase().includes('mall') || c.category.toLowerCase().includes('shopping');
      }
      return true;
    });
  }, [chargers, activeFilter]);

  // Filter chargers for search suggestions dropdown
  const filteredChargers = useMemo(() => {
    return chargers.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const normQ = normalizeText(q);

      // Check search match (name, city, address, category)
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        normalizeText(c.name).includes(normQ) ||
        normalizeText(c.city).includes(normQ) ||
        normalizeText(c.address).includes(normQ);

      return matchSearch;
    });
  }, [chargers, searchQuery]);

  // Leaflet Map Initialization & Markers Update
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix Leaflet default icon path issues
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (!mapRef.current) {
        // Initialize Map centered on Pune
        const map = L.map(container, {
          center: PUNE_CENTER,
          zoom: 13,
          zoomControl: false, // We render custom zoom buttons
        });

        // Add Google Maps Roadmap tile layer
        L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: '&copy; Google Maps',
        }).addTo(map);

        mapRef.current = map;
      }

      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Custom Green Marker Icon Generator
      const createGreenPinIcon = (isSelected: boolean) => {
        const pinColor = isSelected ? '#3b82f6' : '#4ba818'; // Blue if selected, Green default
        const svgPin = `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.7422 15.4372C29.7422 23.622 21.4179 31.0172 15.7422 38.6172C13.8503 35.9572 1.74219 23.622 1.74219 15.4372C1.74219 7.25233 8.0102 0.617188 15.7422 0.617188C23.4742 0.617188 29.7422 7.25233 29.7422 15.4372Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.464 11.4907C31.3863 11.5499 31.309 11.6091 31.2312 11.6683C31.1711 11.6414 31.1106 11.6148 31.0505 11.5882C30.9904 11.6426 30.9298 11.6969 30.8697 11.7513C30.4679 11.597 30.2013 11.8448 29.8303 11.9813C29.5835 11.9012 29.3223 11.6937 29.062 11.6671C28.897 11.6502 28.7664 11.736 28.6091 11.7501C28.4993 11.7602 28.3994 11.7332 28.2937 11.7115C28.2182 11.7884 28.1432 11.8649 28.0677 11.9419C27.7211 11.8774 27.3749 11.8126 27.0283 11.7481C26.8475 11.8782 26.6672 12.0079 26.4864 12.138C26.3657 12.1115 26.2451 12.0853 26.1244 12.0587C26.0598 12.1026 26.0263 12.184 25.9631 12.2162C25.9034 12.2464 25.785 12.2379 25.7177 12.2444C25.3602 12.2794 25.2544 12.2593 24.9946 12.0394C24.8595 12.0615 24.7239 12.1654 24.5878 12.1675C24.4428 12.1695 24.3189 12.0583 24.1784 12.0442C24.0993 12.0365 24.0324 12.0639 23.9551 12.0716C23.7057 12.0962 23.5805 12.1006 23.3871 12.25C22.8967 12.1473 22.429 12.0361 21.9214 12.0043C21.2322 11.9612 20.5313 11.9991 19.8426 12.0261C19.3766 12.0446 18.908 12.0337 18.4416 12.0337C17.6132 12.0337 16.7843 12.0317 15.9559 12.0337C15.0015 12.0361 14.0809 12.047 13.3203 12.6291C12.9158 12.9385 12.6962 13.4182 12.4761 13.8384C11.7864 13.8408 11.0963 13.8428 10.4067 13.8448C10.7628 13.6116 11.4466 13.3985 11.8886 13.4734C11.969 13.4311 12.0499 13.3888 12.1303 13.3465C11.9807 13.1943 11.8312 13.042 11.6816 12.8897C12.0314 12.3898 12.2736 11.8343 11.9455 11.2619C11.4294 10.3616 9.84401 10.2282 9.26192 11.1455C9.03415 11.5048 9.06172 11.8561 9.05629 12.2533C8.93337 12.1622 8.92614 12.0261 8.9058 11.8835C8.76163 12.3705 8.60346 12.4257 8.04713 12.4406C8.01143 12.1183 7.97573 11.7956 7.94002 11.473C7.88037 10.6895 7.91065 9.90195 7.91969 9.11683C7.9233 8.80222 7.99606 8.33816 7.73711 8.08358C7.52515 7.87531 7.11705 7.88297 6.82691 7.87773C6.68184 7.87491 6.52819 7.87773 6.38538 7.9023C5.57868 8.04168 5.75222 8.76275 5.75267 9.31825C5.75358 10.0095 5.76352 10.7016 5.7486 11.3928C5.71652 11.3288 5.68398 11.2647 5.65189 11.2007C5.60444 11.3477 5.61438 11.5016 5.61122 11.6547C5.60173 12.0486 5.62161 12.5292 5.42592 12.8905C4.94959 13.0863 4.30965 13.0021 3.79897 12.9739C3.64938 12.9655 3.51787 12.9332 3.36692 12.9437C3.3154 13.0029 3.26343 13.0621 3.21146 13.1218C3.00086 13.0086 2.82777 12.9715 2.57875 12.9626C2.45312 13.0791 2.34465 13.1902 2.17201 13.2462C1.99983 13.1242 1.90628 13.0347 1.67489 13.0432C1.56688 13.1234 1.52711 13.1854 1.49412 13.3075C1.21482 13.3614 1.03586 13.4078 0.831583 13.5882C0.675214 13.529 0.644031 13.5769 0.499865 13.6458C0.415353 13.5612 0.37242 13.5544 0.246783 13.5685C0.171762 13.2164 0.229609 12.8108 0.282937 12.4583C0.403151 11.6667 0.62505 10.907 0.910671 10.1505C1.99757 7.27147 3.72937 4.86296 6.48209 3.02929C8.94286 1.38978 11.828 0.441517 14.8763 0.169607C15.5329 0.111197 16.2018 0.118851 16.8598 0.143424C22.0728 0.337587 27.0608 2.98055 29.6477 7.04428C30.51 8.39859 31.3275 9.91645 31.464 11.4907Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.464 11.4907C31.3863 11.5499 31.309 11.6091 31.2312 11.6683C31.1711 11.6414 31.1106 11.6148 31.0505 11.5882C30.9904 11.6426 30.9298 11.6969 30.8697 11.7513C30.4679 11.597 30.2013 11.8448 29.8303 11.9813C29.5835 11.9012 29.3223 11.6937 29.062 11.6671C28.897 11.6502 28.7664 11.736 28.6091 11.7501C28.4993 11.7602 28.3994 11.7332 28.2937 11.7115C28.2182 11.7884 28.1432 11.8649 28.0677 11.9419C27.7211 11.8774 27.3749 11.8126 27.0283 11.7481C26.8475 11.8782 26.6672 12.0079 26.4864 12.138C26.3657 12.1115 26.2451 12.0853 26.1244 12.0587C26.0598 12.1026 26.0263 12.184 25.9631 12.2162C25.9034 12.2464 25.785 12.2379 25.7177 12.2444C25.3602 12.2794 25.2544 12.2593 24.9946 12.0394C24.8595 12.0615 24.7239 12.1654 24.5878 12.1675C24.4428 12.1695 24.3189 12.0583 24.1784 12.0442C24.0993 12.0365 24.0324 12.0639 23.9551 12.0716C23.7057 12.0962 23.5805 12.1006 23.3871 12.25C22.8967 12.1473 22.429 12.0361 21.9214 12.0043C21.2322 11.9612 20.5313 11.9991 19.8426 12.0261C19.3766 12.0446 18.908 12.0337 18.4416 12.0337C17.6132 12.0337 16.7843 12.0317 15.9559 12.0337C15.0015 12.0361 14.0809 12.047 13.3203 12.6291C12.9158 12.9385 12.6962 13.4182 12.4761 13.8384C11.7864 13.8408 11.0963 13.8428 10.4067 13.8448C10.7628 13.6116 11.4466 13.3985 11.8886 13.4734C11.969 13.4311 12.0499 13.3888 12.1303 13.3465C11.9807 13.1943 11.8312 13.042 11.6816 12.8897C12.0314 12.3898 12.2736 11.8343 11.9455 11.2619C11.4294 10.3616 9.84401 10.2282 9.26192 11.1455C9.03415 11.5048 9.06172 11.8561 9.05629 12.2533C8.93337 12.1622 8.92614 12.0261 8.9058 11.8835C8.76163 12.3705 8.60346 12.4257 8.04713 12.4406C8.01143 12.1183 7.97573 11.7956 7.94002 11.473C7.88037 10.6895 7.91065 9.90195 7.91969 9.11683C7.9233 8.80222 7.99606 8.33816 7.73711 8.08358C7.52515 7.87531 7.11705 7.88297 6.82691 7.87773C6.68184 7.87491 6.52819 7.87773 6.38538 7.9023C5.57868 8.04168 5.75222 8.76275 5.75267 9.31825C5.75358 10.0095 5.76352 10.7016 5.7486 11.3928C5.71652 11.3288 5.68398 11.2647 5.65189 11.2007C5.60444 11.3477 5.61438 11.5016 5.61122 11.6547C5.60173 12.0486 5.62161 12.5292 5.42592 12.8905C4.94959 13.0863 4.30965 13.0021 3.79897 12.9739C3.64938 12.9655 3.51787 12.9332 3.36692 12.9437C3.3154 13.0029 3.26343 13.0621 3.21146 13.1218C3.00086 13.0086 2.82777 12.9715 2.57875 12.9626C2.45312 13.0791 2.34465 13.1902 2.17201 13.2462C1.99983 13.1242 1.90628 13.0347 1.67489 13.0432C1.56688 13.1234 1.52711 13.1854 1.49412 13.3075C1.21482 13.3614 1.03586 13.4078 0.831583 13.5882C0.675214 13.529 0.644031 13.5769 0.499865 13.6458C0.415353 13.5612 0.37242 13.5544 0.246783 13.5685C0.171762 13.2164 0.229609 12.8108 0.282937 12.4583C0.403151 11.6667 0.62505 10.907 0.910671 10.1505C1.99757 7.27147 3.72937 4.86296 6.48209 3.02929C8.94286 1.38978 11.828 0.441517 14.8763 0.169607C15.5329 0.111197 16.2018 0.118851 16.8598 0.143424C22.0728 0.337587 27.0608 2.98055 29.6477 7.04428C30.51 8.39859 31.3275 9.91645 31.464 11.4907Z" fill="${pinColor}" stroke="${pinColor}" stroke-width="0.25" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.74372 11.3926C5.78575 13.0885 5.76315 14.7921 5.74417 16.4884C5.73603 17.2211 5.62712 17.9728 5.72022 18.7039C5.73468 18.8183 5.74914 18.9577 5.81151 19.06C6.0325 19.4246 6.69775 19.4443 7.09319 19.4081C7.33768 19.3859 7.6694 19.3211 7.81085 19.1209C8.11003 18.6963 7.76611 17.8983 7.97942 17.4954C13.3276 17.5087 18.6762 17.5224 24.0244 17.5357C24.1211 17.951 23.9774 18.3998 24.0641 18.8248C24.1098 19.0504 24.2286 19.2941 24.5003 19.3593C24.7475 19.4181 25.0096 19.375 25.2609 19.3738C25.509 19.3726 25.7914 19.4101 26.0025 19.2647C26.3003 19.0592 26.219 18.6306 26.2135 18.3414C26.2004 17.63 26.2149 16.9178 26.2049 16.2064C26.2004 15.8781 26.1991 15.5192 25.8023 15.3806C25.3625 15.2271 24.8577 15.3371 24.4022 15.3387C23.4228 15.3427 22.444 15.3375 21.4646 15.3383C18.4218 15.3415 15.3785 15.3383 12.3356 15.3383C11.4168 15.3383 10.4976 15.3351 9.57881 15.3387C9.04779 15.3407 8.4874 15.404 7.97039 15.2799C7.95864 14.011 7.94689 12.7417 7.93514 11.4728C7.97084 11.7954 8.00654 12.1181 8.04224 12.4403C8.59857 12.4254 8.75675 12.3703 8.90092 11.8832C8.92125 12.0258 8.92848 12.162 9.05141 12.253C9.32573 12.8565 9.98013 13.4003 10.7538 13.2879C11.0928 13.2383 11.4078 13.0728 11.6767 12.8895C11.8263 13.0418 11.9759 13.194 12.1255 13.3463C12.045 13.3886 11.9641 13.4309 11.8837 13.4732C11.4417 13.3983 10.7579 13.6114 10.4018 13.8446C9.86398 13.903 8.82499 13.7024 8.72195 14.378C8.70613 14.4791 8.7215 14.5753 8.73506 14.6756C14.0778 14.6813 19.421 14.6869 24.7637 14.6926C25.0304 13.5787 24.2124 12.9125 23.3822 12.2498C23.5756 12.1004 23.7008 12.0959 23.9503 12.0714C24.0275 12.0637 24.0944 12.0363 24.1735 12.044C24.3141 12.0581 24.4379 12.1692 24.583 12.1672C24.719 12.1652 24.8546 12.0613 24.9897 12.0391C25.2496 12.2591 25.3553 12.2792 25.7128 12.2442C25.7801 12.2377 25.8985 12.2462 25.9582 12.216C26.0215 12.1837 26.0549 12.1024 26.1195 12.0585C26.2402 12.0851 26.3609 12.1112 26.4815 12.1378C26.6623 12.0077 26.8426 11.878 27.0234 11.7479C27.37 11.8123 27.7162 11.8772 28.0628 11.9416C28.1383 11.8647 28.2133 11.7882 28.2888 11.7112C28.3946 11.733 28.4944 11.76 28.6042 11.7499C28.7615 11.7358 28.8921 11.65 29.0571 11.6669C29.3174 11.6935 29.5786 11.901 29.8254 11.9811C30.1964 11.8446 30.463 11.5968 30.8648 11.7511C30.9249 11.6967 30.9855 11.6423 31.0456 11.588C31.1057 11.6145 31.1662 11.6411 31.2264 11.6681C31.3041 11.6089 31.3814 11.5497 31.4591 11.4905C31.7506 12.3046 31.7443 13.1836 31.7416 14.0311C31.737 15.3959 31.5093 16.7482 31.126 18.0671C30.9068 18.8216 30.6628 19.5475 30.2601 20.2407C30.0938 20.5275 30.0003 20.8736 29.8077 21.141C29.7987 21.0609 29.7892 20.981 29.7802 20.901C29.5777 21.1882 29.4435 21.7328 29.1226 21.9249C28.9721 22.0152 28.7751 21.968 28.6056 21.9914C28.4678 22.0103 28.3652 22.1022 28.2328 22.134C28.052 22.1775 28.8568 22.1509 27.6737 22.1683C27.4816 22.3572 27.2588 22.5558 26.9696 22.6214C26.8765 22.6428 26.7739 22.6255 26.684 22.6533C26.576 22.6871 26.5484 22.8055 26.4503 22.8462C26.3816 22.8744 26.2863 22.8635 26.2122 22.8792C26.04 22.9155 25.8899 23.0086 25.7128 23.0315C25.5659 23.0504 25.4118 23.0218 25.2667 23.0472C25.1976 23.0593 25.147 23.1085 25.0787 23.1213C24.9612 23.1435 24.8387 23.1052 24.7185 23.1165C24.5188 23.1358 24.3281 23.2172 24.1242 23.2164C23.9783 23.2156 23.8626 23.1262 23.7238 23.1181C23.5788 23.1101 23.4215 23.1624 23.2724 23.1653C22.8561 23.1725 22.4403 23.1217 22.0752 23.3365C22.0973 23.386 22.1651 23.473 22.1466 23.5278C22.1272 23.5854 22.0092 23.6362 21.9645 23.6821C21.7968 23.8537 21.729 24.0632 21.4646 24.1284C21.3539 24.0164 21.2961 23.8404 21.329 23.6877C21.4221 23.6644 21.5148 23.6414 21.6079 23.6184C21.5821 23.4976 21.5568 23.3767 21.5311 23.2559C21.2884 23.1475 21.0461 23.0392 20.8034 22.9308C20.5838 22.6798 20.4455 22.3741 20.2304 22.1195C19.9574 21.7956 19.5412 21.4754 19.1503 21.2707C18.4313 20.8937 17.5161 20.9735 16.7193 20.9835C16.2516 20.99 15.7861 20.9892 15.3183 20.9835C14.6617 20.9759 13.9964 20.9449 13.3624 21.1269C12.9557 21.2434 12.6755 21.4911 12.3171 21.6788C12.0952 21.6466 12.0287 21.7517 11.8837 21.8814C11.6948 21.8955 11.5049 21.8851 11.3183 21.9266C11.2229 21.9479 11.072 21.9741 11.0327 22.0333C10.992 22.0655 10.9744 22.1127 10.9224 22.1348C10.7602 22.2041 10.522 22.1844 10.3471 22.1993C10.2657 22.2814 10.2038 22.3874 10.1089 22.4575C9.99504 22.5417 9.85088 22.5413 9.73111 22.6085C9.64931 22.6549 9.59463 22.7451 9.53362 22.8104C9.36776 22.7838 9.20235 22.7572 9.03649 22.7306C9.05457 22.8974 9.09163 23.0444 8.9913 23.1947C8.84216 23.2643 8.70071 23.239 8.54027 23.2559C8.57914 23.3095 8.61846 23.3634 8.65732 23.417C8.5344 23.438 8.4056 23.3908 8.28222 23.4174C8.1715 23.4412 8.1028 23.5544 7.99027 23.5923C7.7634 23.668 7.46693 23.6486 7.22877 23.6321C6.86225 23.6068 6.51245 23.4585 6.14413 23.4484C5.73197 23.4372 5.5408 23.7171 5.10469 23.5266C4.90358 23.7103 4.85748 23.6249 4.66993 23.7361C4.60846 23.7723 4.57547 23.844 4.50678 23.871C4.25596 23.9697 4.36035 23.8412 4.15563 24.0567C3.87182 23.9633 4.02864 23.9141 3.92062 23.7284C3.80493 23.529 3.66393 23.5395 3.57354 23.2559C3.54959 23.2676 3.50575 23.3018 3.47728 23.3006C3.40587 23.2974 3.35209 23.1838 3.31684 23.1387C3.21877 23.0142 3.12251 22.8917 2.96162 22.8329C2.77724 22.5791 2.65883 22.2847 2.488 22.022C2.35513 21.8174 2.19967 21.6309 2.08307 21.4162C1.87021 21.0254 1.70932 20.6129 1.53985 20.2065C0.988037 18.8844 0.515316 17.5321 0.326409 16.1266C0.220656 15.3403 -0.0175122 14.3377 0.241897 13.5683C0.367534 13.5542 0.410468 13.561 0.494979 13.6456C0.639145 13.5767 0.670328 13.5288 0.826697 13.588C1.03097 13.4075 1.20994 13.3612 1.48923 13.3072C1.52222 13.1852 1.56199 13.1231 1.67 13.043C1.90139 13.0345 1.99494 13.1239 2.16713 13.246C2.33977 13.19 2.44823 13.0788 2.57387 12.9624C2.82288 12.9713 2.99597 13.0083 3.20657 13.1215C3.25854 13.0619 3.31052 13.0027 3.36204 12.9435C3.51298 12.933 3.64449 12.9652 3.79408 12.9737C4.30477 13.0019 4.9447 13.0861 5.42104 12.8903C5.61673 12.529 5.59684 12.0484 5.60633 11.6544C5.60949 11.5014 5.59955 11.3475 5.647 11.2004C5.67909 11.2645 5.71163 11.3285 5.74372 11.3926ZM19.5891 23.241C19.3546 23.2619 19.078 23.3409 18.8931 23.4799C18.6717 23.6462 18.5836 23.8472 18.2559 23.8621C18.2256 23.6764 18.1958 23.4907 18.1655 23.305C18.1181 23.3626 18.0702 23.4198 18.0227 23.4774C18.0083 23.3784 18.0236 23.2539 17.9775 23.1624C17.7728 22.7584 17.3704 22.6348 16.8278 22.9215C16.7763 22.8937 16.7252 22.866 16.6741 22.8382C16.5734 22.9143 16.5503 23.0424 16.4522 23.1189C16.328 23.216 15.8919 23.3244 15.7251 23.3453C15.6948 23.2821 15.665 23.2188 15.6347 23.1556C15.5809 23.1435 15.5276 23.1314 15.4738 23.1197C15.3278 23.0263 15.1294 22.8333 14.9491 22.8031C14.7494 22.7693 14.4891 22.8829 14.2893 22.9095C14.2708 22.8736 14.2522 22.8378 14.2337 22.8019C13.9386 22.8257 13.6733 22.8829 13.535 23.135C13.7452 23.2337 13.831 23.2917 13.9074 23.4976C13.6724 23.5141 13.5075 23.3739 13.3308 23.3739C13.1794 23.3739 12.8598 23.5552 12.6971 23.6027C12.5534 23.5286 12.482 23.4444 12.3957 23.3199C12.5625 22.9614 12.7826 22.5787 13.1351 22.3362C13.643 21.9862 14.2979 21.9789 14.9116 21.9805C15.5439 21.9817 16.1775 21.9858 16.8097 21.9789C17.2562 21.9741 17.7127 21.9108 18.1538 22.0023C18.7679 22.13 19.4594 22.6815 19.5891 23.241ZM17.2873 23.2761C17.4703 23.3974 17.5544 23.4431 17.3704 23.5764C17.3501 23.5515 17.4176 23.5906 17.3972 23.5653C17.3448 23.6039 17.3397 23.527 17.2873 23.5653C17.1653 23.535 17.1653 23.5931 17.1418 23.4799C17.3212 23.4106 17.2516 23.4614 17.2873 23.2761ZM15.8426 24.8829C15.9163 24.918 15.9899 24.953 16.0631 24.9881C15.9488 25.0739 15.8801 25.0364 15.7454 25.0054C15.778 24.9647 15.8105 24.924 15.8426 24.8829ZM18.7291 24.9703C18.7431 24.9832 18.7566 24.9957 18.7707 25.0082C18.8416 25.1097 18.7978 25.1971 18.7702 25.3103C18.758 25.318 18.7458 25.3252 18.7336 25.3329C18.6184 25.2716 18.5031 25.2104 18.3883 25.1492C18.4344 25.0775 18.481 25.0058 18.5271 24.9341C18.5944 24.9462 18.6617 24.9582 18.7291 24.9703Z" fill="${pinColor}" stroke="${pinColor}" stroke-width="0.25" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.811 21.141C29.6686 21.686 29.293 22.2081 29.0002 22.6983C28.4624 23.5974 27.9142 24.4905 27.3475 25.3751C25.3206 28.5381 23.0826 31.5911 20.8189 34.6224C19.8644 35.9006 18.9153 37.1844 17.8998 38.4251C17.6712 38.7043 17.4344 38.977 17.212 39.2598C17.0954 39.4076 16.9906 39.6151 16.845 39.7315C16.6968 39.4785 16.7018 39.1273 16.6954 38.8453C16.6846 38.3353 16.7095 37.8237 16.7311 37.3145C16.7438 37.0217 16.7971 36.6688 16.7 36.388C16.2254 36.3792 15.7509 36.3703 15.2764 36.3614C15.2312 37.5091 15.186 38.6572 15.1408 39.8048C14.7919 39.4105 14.5049 38.9629 14.1877 38.5472C13.6029 37.7806 13.0208 37.012 12.4233 36.2535C10.3747 33.6528 8.34419 31.0473 6.48133 28.3371C5.65836 27.1403 4.84533 25.9427 4.07931 24.7161C3.74714 24.1839 3.142 23.3928 2.96484 22.8328C3.12573 22.8917 3.22199 23.0141 3.32006 23.1386C3.35531 23.1837 3.40909 23.2973 3.4805 23.3005C3.50897 23.3017 3.55281 23.2675 3.57676 23.2558C3.66715 23.5394 3.80815 23.5289 3.92384 23.7283C4.03186 23.914 3.87504 23.9632 4.15885 24.0566C4.36357 23.8411 4.25918 23.9696 4.51 23.8709C4.57869 23.8439 4.61168 23.7722 4.67315 23.736C4.8607 23.6248 4.9068 23.7102 5.10791 23.5265C5.54402 23.7171 5.73519 23.4371 6.14735 23.4484C6.51567 23.4584 6.86547 23.6067 7.23199 23.6321C7.47016 23.6486 7.76662 23.6679 7.99349 23.5922C8.10602 23.5543 8.17472 23.4411 8.28544 23.4174C8.40882 23.3908 8.53762 23.4379 8.66054 23.4169C8.62168 23.3634 8.58236 23.3094 8.54349 23.2558C8.70393 23.2389 8.84538 23.2643 8.99452 23.1946C9.09485 23.0443 9.05779 22.8973 9.03972 22.7305C9.20557 22.7571 9.37098 22.7837 9.53684 22.8103C9.59785 22.745 9.65253 22.6548 9.73433 22.6085C9.8541 22.5412 9.99826 22.5416 10.1122 22.4574C10.2071 22.3873 10.269 22.2814 10.3503 22.1992C10.5252 22.1843 10.7634 22.204 10.9256 22.1347C10.9776 22.1126 10.9952 22.0655 11.0359 22.0332C11.1105 21.974 11.2262 21.9478 11.3215 21.9265C11.5082 21.885 11.698 21.8955 11.8869 21.8814C12.032 21.7517 12.0984 21.6465 12.3203 21.6787C12.1354 21.9575 11.8557 22.1915 11.6487 22.4594C11.3843 22.8022 11.1968 23.1853 11.0531 23.5793C10.5944 24.8393 10.7331 26.3322 11.5235 27.467C11.8471 27.9319 12.2995 28.3085 12.6651 28.7444C13.1008 29.264 13.4402 29.884 13.6119 30.5148C13.8189 31.2761 13.7253 32.0685 13.729 32.8431C13.7308 33.2085 13.6783 33.6653 13.9373 33.9771C14.2085 34.3034 14.7661 34.3828 15.1873 34.4255C15.8589 34.4931 16.5739 34.4951 17.2364 34.3727C17.5143 34.3215 17.8601 34.2498 18.0512 34.046C18.3491 33.7282 18.2695 33.2242 18.2636 32.8431C18.2514 32.0117 18.1837 31.1601 18.4236 30.3476C18.7111 29.3732 19.4915 28.7178 20.1469 27.9391C20.5156 27.5004 20.8261 27.0291 21.0222 26.5074C21.3061 25.7509 21.3788 24.8953 21.2017 24.1122C21.1117 23.7138 20.8699 23.3106 20.8067 22.9307C21.0494 23.0391 21.2916 23.1475 21.5343 23.2558C21.56 23.3767 21.5853 23.4975 21.6111 23.6184C21.518 23.6413 21.4254 23.6643 21.3323 23.6876C21.2993 23.8403 21.3571 24.0164 21.4678 24.1283C21.7322 24.0631 21.8 23.8536 21.9677 23.682C22.0124 23.6361 22.1304 23.5853 22.1498 23.5277C22.1683 23.4729 22.1006 23.3859 22.0784 23.3364C22.4436 23.1217 22.8593 23.1724 23.2756 23.1652C23.4247 23.1624 23.582 23.11 23.7271 23.118C23.8658 23.1261 23.9815 23.2155 24.1275 23.2163C24.3313 23.2171 24.522 23.1358 24.7218 23.1164C24.842 23.1052 24.9644 23.1434 25.0819 23.1213C25.1502 23.1084 25.2008 23.0592 25.27 23.0472C25.415 23.0218 25.5691 23.0504 25.716 23.0314C25.8932 23.0085 26.0432 22.9154 26.2154 22.8792C26.2895 22.8635 26.3849 22.8743 26.4536 22.8461C26.5516 22.8055 26.5792 22.687 26.6872 22.6532C26.7771 22.6254 26.8797 22.6427 26.9728 22.6214C27.2621 22.5557 27.4849 22.3571 27.6769 22.1682C27.86 22.1509 28.0552 22.1774 28.236 22.1339C28.3684 22.1021 28.471 22.0103 28.6088 21.9913C28.7783 21.968 28.9753 22.0151 29.1258 21.9249C29.4467 21.7327 29.5809 21.1881 29.7834 20.9009C29.7924 20.981 29.8019 21.0608 29.811 21.141ZM14.2925 22.9094C14.1904 23.0097 14.1018 23.1164 14.0878 23.2558C14.0679 23.454 14.0788 23.7553 14.2627 23.8983C14.6866 24.2282 15.4056 24.0417 15.5466 23.5583C15.5936 23.3976 15.5042 23.2719 15.477 23.1197C15.5308 23.1313 15.5841 23.1434 15.6379 23.1555C15.6682 23.2188 15.698 23.282 15.7283 23.3452C15.8951 23.3243 16.3312 23.2159 16.4555 23.1189C16.5535 20.0423 16.5766 22.9142 16.6774 22.8381C16.7284 22.8659 16.7795 22.8937 16.831 22.9215C16.4473 23.2554 16.6186 23.9487 17.1609 24.0587C17.456 24.1187 17.6156 23.968 17.8189 23.8109C17.9618 23.7001 18.0038 23.6498 18.0259 23.4774C18.0734 23.4198 18.1213 23.3626 18.1687 23.305C18.199 23.4907 18.2288 23.6764 18.2591 23.8621C18.5868 23.8472 18.6749 23.6462 18.8964 23.4798C19.0812 23.3408 19.3578 23.2619 19.5923 23.2409C20.0953 23.823 20.207 24.6826 20.1374 25.3908C20.075 26.0281 19.8178 26.6404 19.4143 27.1681C18.1154 28.866 15.2416 29.2974 13.4506 27.9665C12.4482 27.2217 11.7784 26.0462 11.8815 24.8691C11.9009 24.6468 11.9687 24.428 12.0279 24.2121C12.0939 23.9696 12.224 23.5064 12.3989 23.3199C12.4852 23.4443 12.5567 23.5285 12.7004 23.6027C12.8631 23.5551 13.1826 23.3738 13.334 23.3738C13.5107 23.3738 13.6756 23.514 13.9106 23.4975C13.8343 23.2917 13.7484 23.2337 13.5382 23.135C13.6765 22.8828 13.9418 22.8256 14.2369 22.8018C14.2555 22.8377 14.274 22.8735 14.2925 22.9094ZM14.8696 23.3199C15.0269 23.4395 14.9866 23.3694 14.9735 23.5583C14.8976 23.6075 14.9456 23.5535 14.8696 23.6027C14.3829 23.5221 14.3929 23.4125 14.8696 23.3199ZM17.4005 23.305C17.3648 23.4903 17.2729 23.4959 17.0935 23.5652C16.9737 23.3593 17.1382 23.3779 17.3163 23.3452C17.3262 23.3569 17.3711 23.3893 17.4005 23.305ZM17.4517 23.5781C17.3771 23.6474 17.3092 23.6421 17.2125 23.6027C17.2649 23.5644 17.348 23.6039 17.4005 23.5652C17.4208 23.5906 17.3749 23.5406 17.4517 23.5781ZM15.8711 24.2939C14.7232 24.4925 14.8945 26.0837 16.0899 25.9753C16.6936 25.9205 17.0339 25.4645 16.9327 24.9473C16.8961 24.76 16.8152 24.559 16.6268 24.4454C16.5156 24.3785 16.3565 24.3443 16.2272 24.3181C16.1057 24.2935 15.9963 24.2722 15.8711 24.2939ZM18.3613 24.3406C17.2604 24.4703 17.3815 25.9999 18.4851 25.9709C19.3013 25.9499 19.6687 25.1515 19.1662 24.6021C19.0676 24.4941 18.9587 24.4003 18.8087 24.3531C18.6708 24.3096 18.5032 24.3237 18.3613 24.3406ZM13.3421 24.3757C12.9932 24.4466 12.6434 24.6967 12.5951 25.0295C12.5246 25.5153 13.0687 26.07 13.6327 25.9963C14.2121 25.9209 14.6432 25.2434 14.4326 24.7547C14.2772 24.3926 13.7113 24.3004 13.3421 24.3757ZM15.7486 25.0053C15.8833 25.0363 15.952 25.0738 16.0664 24.988C15.9931 24.9529 15.9195 24.9179 15.8458 24.8828C15.8973 24.8571 15.9484 24.8317 15.9995 24.8059C16.2996 24.8941 16.5544 25.2289 16.1911 25.421C15.8752 25.5882 15.5963 25.2679 15.7486 25.0053ZM13.4506 24.934C13.5382 24.9024 13.7561 24.8921 13.8198 24.9767C13.9468 25.1447 13.8632 25.4726 13.6033 25.4891C13.1143 25.5201 13.179 25.0319 13.4506 24.934ZM14.6979 26.271C13.4686 26.4329 13.7651 28.0591 14.9989 27.894C16.1567 27.7393 15.7843 26.128 14.6979 26.271ZM17.0981 26.2742C15.8436 26.449 16.2205 28.1099 17.4777 27.8912C18.6049 27.695 18.213 26.1191 17.0981 26.2742ZM17.2197 26.7532C17.6892 26.9199 17.7037 27.274 17.2197 27.4372C16.949 27.3498 16.8957 27.2076 16.8979 26.9618C17.005 26.8922 17.1126 26.8229 17.2197 26.7532ZM14.6961 26.791C15.101 26.6984 15.3478 27.2406 14.9587 27.3852C14.5248 27.5467 14.2677 26.8889 14.6961 26.791ZM14.3273 30.091C14.8475 30.1297 14.8836 30.4298 14.9112 30.8278C14.9555 31.4699 14.9194 32.1197 14.9248 32.7626C14.927 33.0566 15.007 33.4268 14.7793 33.6689C14.3648 33.5509 14.391 33.2137 14.3897 32.8834C14.387 32.2401 14.4222 31.5928 14.3906 30.9498C14.3761 30.663 14.2433 30.3746 14.3273 30.091ZM14.0562 34.5983C14.015 34.736 13.9961 34.8746 13.9947 35.0184C13.9938 35.1413 14.0006 35.2581 14.0408 35.3765C14.2604 36.019 15.1864 35.9087 15.7735 35.9344C16.5951 35.9707 17.9166 36.0605 17.9952 35.0571C18.0069 34.908 17.9803 34.7606 17.9428 34.6168C17.7516 34.6152 17.5428 34.6792 17.3539 34.7127C16.9431 34.7852 16.088 34.8226 16.0899 34.8251C15.6565 34.8271 15.205 34.7896 14.7797 34.7147C14.5415 34.6724 14.2975 34.6099 14.0562 34.5983Z" fill="${pinColor}"/>
</svg>`;
        return L.divIcon({
          className: 'custom-leaflet-marker',
          html: svgPin,
          iconSize: [32, 40],
          iconAnchor: [16, 40],
        });
      };

      // Add pins for visible map chargers (Keeps all pins on map!)
      visibleMapChargers.forEach((charger) => {
        const isSelected = selectedCharger?.id === charger.id;
        const icon = createGreenPinIcon(isSelected);

        const marker = L.marker([charger.location.lat, charger.location.lng], { icon }).addTo(
          mapRef.current
        );

        marker.on('click', () => {
          setSelectedCharger(charger);
          setIsDetailOpen(false); // Show small preview card first!
          if (mapRef.current) {
            mapRef.current.flyTo([charger.location.lat, charger.location.lng], 14, {
              duration: 1,
            });
          }
        });

        markersRef.current.push(marker);
      });
    });
  }, [visibleMapChargers, selectedCharger]);

  // Zoom handlers
  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  const handleRecenter = () => {
    setSelectedLocationFilter(null);
    if (mapRef.current) {
      mapRef.current.flyTo(PUNE_CENTER, 13);
    }
  };

  const handleSelectLocationSuggestion = (loc: LocationSuggestion) => {
    setSelectedLocationFilter({
      name: loc.shortName,
      lat: loc.lat,
      lng: loc.lng,
    });
    setSearchQuery(''); // Clear search query so dropdown closes & map pins remain visible
    setIsSearchOpen(false);

    if (mapRef.current) {
      mapRef.current.flyTo([loc.lat, loc.lng], 13, { duration: 1.2 });
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden font-sans bg-gray-100 text-gray-900 select-none">
      
      {/* Full Screen Google Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Search & Filter Bar */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-1000 w-[92%] sm:w-96 max-w-md">
        
        {/* Active Location Filter Badge */}
        {selectedLocationFilter && (
          <div className="mb-2 bg-[#52b31f] text-white backdrop-blur-md rounded-xl p-2 px-3 flex items-center justify-between shadow-lg text-xs font-medium animate-fadeIn">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 fill-white/20" />
              <span>Location: <strong className="font-semibold">{selectedLocationFilter.name}</strong></span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                {filteredChargers.length} hotel{filteredChargers.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedLocationFilter(null);
                setSearchQuery('');
              }}
              className="text-white/80 hover:text-white p-0.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-2.5 px-4 flex items-center gap-3 transition-all">
          
          {isGeocodingLoading ? (
            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
          )}

          <input
            type="text"
            placeholder="Search city, hotel, resort, restaurant..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocationFilter(null);
                setIsSearchOpen(false);
              }}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="w-px h-6 bg-gray-200" />

          <button
            onClick={() => setShowFilterModal(!showFilterModal)}
            className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
              activeFilter !== 'all'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
            }`}
            aria-label="Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Live Search Autocomplete Dropdown */}
        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div
            className="mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-96 overflow-y-auto z-1001 overscroll-contain divide-y divide-gray-100"
            onWheel={(e) => e.stopPropagation()}
            onWheelCapture={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Section 1: Map & City Location Suggestions */}
            {mapLocationSuggestions.length > 0 && (
              <div className="p-2 bg-slate-50/80">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  Map & Location Suggestions
                </span>
                {mapLocationSuggestions.map((loc, idx) => (
                  <div
                    key={`loc-${idx}`}
                    onClick={() => handleSelectLocationSuggestion(loc)}
                    className="p-2.5 px-3 hover:bg-emerald-50/80 rounded-xl cursor-pointer transition-colors flex items-start gap-2.5 my-0.5 group"
                  >
                    <div className="p-1.5 bg-emerald-100/70 text-emerald-700 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {loc.shortName}
                        </h4>
                        {loc.propertyCount !== undefined && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {loc.propertyCount} hotel{loc.propertyCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {loc.displayName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section 2: Hotel & Property Suggestions */}
            <div className="p-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider px-3 py-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Hotels & Stations ({filteredChargers.length})
              </span>
              
              {filteredChargers.length === 0 && mapLocationSuggestions.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-500">
                  No places or hotels found matching "{searchQuery}"
                </div>
              ) : filteredChargers.length === 0 ? (
                <div className="p-3 text-center text-xs text-gray-400 italic">
                  No specific hotels matching query (click a location suggestion above to view map area)
                </div>
              ) : (
                filteredChargers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCharger(c);
                      setIsDetailOpen(false); // Open preview card
                      setIsSearchOpen(false);
                      setSearchQuery(''); // Clear text search so all pins remain on map!
                      if (mapRef.current) {
                        mapRef.current.flyTo([c.location.lat, c.location.lng], 15);
                      }
                    }}
                    className="p-2.5 px-3 hover:bg-blue-50/70 rounded-xl cursor-pointer transition-colors flex items-start gap-2.5 my-0.5 group"
                  >
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{c.name}</h4>
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{c.city ? `${c.city} • ` : ''}{c.address}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Filter Popup Menu */}
        {showFilterModal && (
          <div
            className="mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 space-y-2 z-1001"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block px-1">
              Filter Chargers
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All Locations' },
                { id: 'hotels', label: 'Hotels & Resorts' },
                { id: 'malls', label: 'Malls' },
                { id: 'restaurants', label: 'Restaurants' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFilter(f.id);
                    setShowFilterModal(false);
                  }}
                  className={`px-4 py-2.5 cursor-pointer rounded-full font-medium transition-all ${
                    activeFilter === f.id
                      ? 'bg-[#52b31f] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Small Preview Box (Shown when a pin is clicked) */}
      {selectedCharger && !isDetailOpen && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-1000 w-[94%] sm:w-96 max-w-sm transition-all duration-300 animate-in slide-in-from-bottom touch-none select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handlePreviewTouchStart}
          onTouchMove={handlePreviewTouchMove}
          onTouchEnd={handlePreviewTouchEnd}
          onMouseDown={handlePreviewMouseDown}
          onMouseMove={handlePreviewMouseMove}
          onMouseUp={handlePreviewMouseUp}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-gray-100/90 space-y-2.5 relative">
        
            {/* Close Button on Preview Box */}
            <button
              onClick={() => setSelectedCharger(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Property Image Preview (Clicking opens drawer) */}
            <div
              onClick={() => setIsDetailOpen(true)}
              className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 shadow-sm cursor-pointer group"
            >
              <img
                src={selectedCharger.photos?.[0] || selectedCharger.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedCharger.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-black text-xs font-semibold flex items-center gap-1 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {getOverallRating(selectedCharger)}
              </div>
            </div>

            {/* Property Name & Location Info */}
            <div onClick={() => setIsDetailOpen(true)} className="cursor-pointer">
              <h3 className="text-base font-semibold text-gray-950 leading-snug tracking-tight">
                {selectedCharger.name}
              </h3>
              <p className="text-xs text-gray-500 font-normal line-clamp-1 mt-0.5">
                {selectedCharger.address}
              </p>
            </div>

            {/* Charging Model Info & VIEW DETAILS Green Button */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block">
                  Charging Specs
                </span>
                <span className="text-xs font-semibold text-emerald-700 block mt-0.5">
                  {selectedCharger.chargingAmenities?.powerOutput || selectedCharger.liveChargers?.[0]?.power || '22 kW Fast Charger'}
                </span>
              </div>

              {/* Action Button: Open PropertyDetailMobileView */}
              <button
                onClick={() => setIsDetailOpen(true)}
                className="bg-[#4ba818] hover:bg-[#409313] text-white text-xs font-semibold px-4 py-2.5 rounded-full uppercase tracking-wide shrink-0 cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                VIEW DETAILS
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Bottom-Right Floating Map Controls (+, -, Locate) */}
      <div className="absolute bottom-6 right-4 sm:right-6 z-1000 flex flex-col gap-2.5">
        <button
          onClick={handleRecenter}
          className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Target Location"
          title="Reset Map & Location"
        >
          <Navigation className="w-5 h-5" />
        </button>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <button
            onClick={handleZoomIn}
            className="w-11 h-11 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 active:bg-gray-100 transition-all border-b border-gray-100 cursor-pointer"
            aria-label="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-11 h-11 flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 active:bg-gray-100 transition-all cursor-pointer"
            aria-label="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full Property Detail Drawer / Modal (Slide-Up from Bottom to Top in Mobile) */}
      {isDetailOpen && selectedCharger && (
        <div
          className="fixed inset-0 z-2000 flex items-end sm:items-stretch justify-center sm:justify-start bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsDetailOpen(false)}
          />

          {/* Drawer Content Container (Mobile bottom sheet slide-up animation) */}
          <div
            className="relative w-full max-w-md h-[92vh] sm:h-full bg-white text-gray-900 shadow-2xl rounded-t-3xl sm:rounded-none overflow-y-auto z-10 transition-all duration-300 animate-in slide-in-from-bottom overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Drag Handle Bar */}
            <div
              onClick={() => setIsDetailOpen(false)}
              className="sm:hidden pt-3 pb-1 flex justify-center cursor-pointer"
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <PropertyDetailMobileView
              property={selectedCharger}
              onClose={() => setIsDetailOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}