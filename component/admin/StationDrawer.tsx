"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  MapPin,
  UploadCloud,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { PropertyDetailData, LiveCharger, SampleReview } from '@/lib/types';

// Helper to parse power into number and unit (defaults to kW AC / kW DC / kW)
const parsePowerInfo = (powerStr: string = '') => {
  const str = (powerStr || '').trim();
  const match = str.match(/^([\d.]+)\s*(.*)$/);
  if (match) {
    let unit = match[2].trim() || 'kW AC';
    if (unit.toUpperCase().includes('DC')) unit = 'kW DC';
    else if (unit.toUpperCase().includes('AC')) unit = 'kW AC';
    else if (unit.toLowerCase() === 'kw') unit = 'kW';
    else unit = 'kW AC';
    return { num: match[1], unit };
  }
  return { num: str.replace(/[^\d.]/g, ''), unit: 'kW AC' };
};

// Helper to extract just the number from tariff string e.g. "₹14/kWh" -> "14"
const parseTariffNumber = (tariffStr: string = '') => {
  return (tariffStr || '').replace(/[^\d.]/g, '');
};

// Helper to extract just digits from stay price e.g. "₹4,500/night" -> "4500"
const parseStayPriceNumber = (priceStr: string = '') => {
  return (priceStr || '').replace(/[^\d]/g, '');
};

const POPULAR_AMENITIES = [
  'Restrooms Available',
  'High-Speed Wi-Fi',
  'Valet EV Parking',
  'Cafe / Coffee Lounge',
  'Restaurant Dining',
  '24/7 Security CCTV',
  'Swimming Pool',
  'Executive Lounge'
];

interface StationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (station: PropertyDetailData, isEdit: boolean) => void;
  editingStation: PropertyDetailData | null;
  initialCoordinates?: { lat: number; lng: number } | null;
}

export default function StationDrawer({
  isOpen,
  onClose,
  onSuccess,
  editingStation,
  initialCoordinates
}: StationDrawerProps) {
  const [formData, setFormData] = useState<Partial<PropertyDetailData>>({});
  const [customAmenityInput, setCustomAmenityInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cloudinary parallel upload state
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');

  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent wheel / touch events from bubbling up to map container while scrolling the drawer
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  // Sync state with editingStation or initialCoordinates
  useEffect(() => {
    if (editingStation) {
      setFormData({
        ...editingStation,
        photos: editingStation.photos || [],
        amenities: editingStation.amenities || [],
        liveChargers: editingStation.liveChargers || [],
        keyInfo: editingStation.keyInfo || {
          parkingSpaces: '6 Reserved EV Spaces',
          chargingLocation: 'East Block Open Visitor Parking',
          operatingHours: editingStation.operatingHours || '24/7 Access',
          access: 'Open to Public & Guests'
        },
        platformRatings: editingStation.platformRatings || {
          google: { rating: editingStation.rating || 4.7, reviewCount: editingStation.reviewCount || 120 },
          apple: { rating: Math.max(4.0, (editingStation.rating || 4.7) - 0.1), reviewCount: Math.floor((editingStation.reviewCount || 120) * 0.6) },
          evstay: { rating: Math.min(5.0, (editingStation.rating || 4.7) + 0.1), reviewCount: Math.floor((editingStation.reviewCount || 120) * 0.8) }
        },
        reviewsSummary: editingStation.reviewsSummary || {
          overallRating: 4.8,
          reviewCount: 24,
          categories: {
            chargingExperience: 4.9,
            staffAssistance: 4.8,
            propertyExperience: 4.7
          },
          sampleReviews: []
        }
      });
    } else {
      setFormData({
        id: `station-${Date.now()}`,
        name: '',
        category: 'Hotel',
        city: 'Pune, Maharashtra',
        address: '',
        avgStayPrice: '',
        location: initialCoordinates || { lat: 18.5204, lng: 73.8567 },
        rating: 4.8,
        reviewCount: 24,
        keyInfo: {
          parkingSpaces: '6 Reserved EV Spaces',
          chargingLocation: 'East Block Open Visitor Parking',
          operatingHours: '24/7 Access',
          access: 'Open to Public & Guests'
        },
        operatingHours: '24/7 Access',
        platformRatings: {
          google: { rating: 4.7, reviewCount: 120 },
          apple: { rating: 4.6, reviewCount: 68 },
          evstay: { rating: 4.9, reviewCount: 42 }
        },
        photos: [],
        amenities: ['Restrooms Available', 'High-Speed Wi-Fi', 'Valet EV Parking'],
        liveChargers: [
          {
            id: 'gun-1',
            name: '3.5 kW AC',
            power: '3.5 kW AC',
            tariff: '₹12/kWh',
            status: 'Available'
          }
        ],
        reviewsSummary: {
          overallRating: 4.8,
          reviewCount: 24,
          categories: {
            chargingExperience: 4.9,
            staffAssistance: 4.8,
            propertyExperience: 4.7
          },
          sampleReviews: [
            {
              id: 'rev-1',
              author: 'Rahul Sharma (Tata Nexon EV)',
              date: '2 days ago',
              rating: 5,
              text: 'Seamless charging experience while having breakfast. Staff was courteous.'
            }
          ]
        }
      });
    }
    setErrorMessage(null);
  }, [editingStation, initialCoordinates, isOpen]);

  if (!isOpen) return null;

  const isHotelOrResort =
    formData.category?.toLowerCase().includes('hotel') ||
    formData.category?.toLowerCase().includes('resort');

  // Parallel Cloudinary Photo Upload
  const handleParallelUploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentPhotos = formData.photos || [];
    const remainingSlots = 4 - currentPhotos.length;
    if (remainingSlots <= 0) {
      alert('Maximum 4 images allowed. Please delete existing images first.');
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setIsUploadingPhotos(true);
    setUploadProgressText(`Uploading ${filesToUpload.length} image(s) in parallel to Cloudinary...`);

    try {
      const uploadPromises = filesToUpload.map(async (file, idx) => {
        const data = new FormData();
        data.append('file', file);
        data.append('folder', 'evstay-stations');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || `Upload failed for file ${idx + 1}`);
        }
        return json.secure_url || json.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newPhotosList = [...currentPhotos, ...uploadedUrls].slice(0, 4);

      setFormData(prev => ({
        ...prev,
        photos: newPhotosList
      }));

      setUploadProgressText('Upload complete!');
      setTimeout(() => setUploadProgressText(''), 2000);
    } catch (err: any) {
      console.error('Parallel upload failed:', err);
      alert(`Upload error: ${err.message || 'Failed to upload images'}`);
    } finally {
      setIsUploadingPhotos(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const updated = (formData.photos || []).filter((_, idx) => idx !== indexToRemove);
    setFormData({ ...formData, photos: updated });
  };

  // Charging Points
  const handleAddConnectorPoint = () => {
    const currentPoints = formData.liveChargers || [];
    const nextIdx = currentPoints.length + 1;
    const defaultPower = '3.5 kW AC';
    const newPoint: LiveCharger = {
      id: `gun-${Date.now()}-${nextIdx}`,
      name: defaultPower,
      power: defaultPower,
      tariff: '₹12/kWh',
      status: 'Available'
    };
    setFormData({
      ...formData,
      liveChargers: [...currentPoints, newPoint]
    });
  };

  const handleRemoveConnectorPoint = (idxToRemove: number) => {
    const current = (formData.liveChargers || []).filter((_, i) => i !== idxToRemove);
    setFormData({ ...formData, liveChargers: current });
  };

  const handleUpdatePower = (idx: number, num: string, unit: string) => {
    const updated = [...(formData.liveChargers || [])];
    const cleanNum = num.trim();
    const finalPower = cleanNum ? `${cleanNum} ${unit}` : '';
    updated[idx] = {
      ...updated[idx],
      power: finalPower,
      name: finalPower || 'EV Charger'
    };
    setFormData({ ...formData, liveChargers: updated });
  };

  const handleUpdateTariff = (idx: number, num: string) => {
    const updated = [...(formData.liveChargers || [])];
    const cleanNum = num.trim();
    const finalTariff = cleanNum ? `₹${cleanNum}/kWh` : '';
    updated[idx] = {
      ...updated[idx],
      tariff: finalTariff
    };
    setFormData({ ...formData, liveChargers: updated });
  };

  const handleUpdateConnectorPoint = (idx: number, field: keyof LiveCharger, value: any) => {
    const updated = [...(formData.liveChargers || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, liveChargers: updated });
  };

  // Amenities
  const handleTogglePopularAmenity = (amenity: string) => {
    const current = formData.amenities || [];
    if (current.includes(amenity)) {
      setFormData({ ...formData, amenities: current.filter(a => a !== amenity) });
    } else {
      setFormData({ ...formData, amenities: [...current, amenity] });
    }
  };

  const handleAddCustomAmenity = () => {
    if (!customAmenityInput.trim()) return;
    const current = formData.amenities || [];
    if (!current.includes(customAmenityInput.trim())) {
      setFormData({ ...formData, amenities: [...current, customAmenityInput.trim()] });
    }
    setCustomAmenityInput('');
  };

  const handleRemoveAmenity = (idx: number) => {
    const current = (formData.amenities || []).filter((_, i) => i !== idx);
    setFormData({ ...formData, amenities: current });
  };

  // In-Person Reviews (Max 2)
  const handleAddReview = () => {
    const current = formData.reviewsSummary?.sampleReviews || [];
    if (current.length >= 2) return;
    const newReview: SampleReview = {
      id: `rev-${Date.now()}`,
      author: 'Verified EV Driver',
      date: 'Just now',
      rating: 5,
      text: 'Great spot with active charging and helpful staff.'
    };
    setFormData({
      ...formData,
      reviewsSummary: {
        ...(formData.reviewsSummary as any),
        sampleReviews: [...current, newReview]
      }
    });
  };

  const handleRemoveReview = (idx: number) => {
    const current = (formData.reviewsSummary?.sampleReviews || []).filter((_, i) => i !== idx);
    setFormData({
      ...formData,
      reviewsSummary: {
        ...(formData.reviewsSummary as any),
        sampleReviews: current
      }
    });
  };

  const handleUpdateReview = (idx: number, field: keyof SampleReview, val: any) => {
    const current = [...(formData.reviewsSummary?.sampleReviews || [])];
    current[idx] = { ...current[idx], [field]: val };
    setFormData({
      ...formData,
      reviewsSummary: {
        ...(formData.reviewsSummary as any),
        sampleReviews: current
      }
    });
  };

  // Save Station Submit
  const handleSaveStation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const isEdit = !!editingStation;
      const url = isEdit ? `/api/chargers/${editingStation.id}` : '/api/chargers';
      const method = isEdit ? 'PUT' : 'POST';

      const gRating = Number(formData.platformRatings?.google?.rating ?? 4.7);
      const gCount = Number(formData.platformRatings?.google?.reviewCount ?? 120);
      const aRating = Number(formData.platformRatings?.apple?.rating ?? 4.6);
      const aCount = Number(formData.platformRatings?.apple?.reviewCount ?? 68);
      const eRating = Number(formData.platformRatings?.evstay?.rating ?? 4.9);
      const eCount = Number(formData.platformRatings?.evstay?.reviewCount ?? 42);

      const totalReviewsSum = gCount + aCount + eCount;
      const computedOverallRating = totalReviewsSum > 0
        ? Number((((gRating * gCount) + (aRating * aCount) + (eRating * eCount)) / totalReviewsSum).toFixed(1))
        : Number(gRating.toFixed(1));

      const primaryPower = formData.liveChargers?.[0]?.power || '22 kW AC';
      const gunsCount = formData.liveChargers?.length || 1;
      const heroImage = formData.photos?.[0] || formData.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

      const payload = {
        ...formData,
        heroImage,
        rating: computedOverallRating,
        reviewCount: totalReviewsSum,
        platformRatings: {
          google: { rating: gRating, reviewCount: gCount },
          apple: { rating: aRating, reviewCount: aCount },
          evstay: { rating: eRating, reviewCount: eCount, verifiedBookings: Math.floor(eCount * 1.4) }
        },
        chargingAmenities: formData.chargingAmenities || {
          chargersCount: `${gunsCount} ${gunsCount === 1 ? 'Charging Gun' : 'Charging Guns'}`,
          powerOutput: primaryPower,
          parkingSpaces: isHotelOrResort ? 'Dedicated Hotel EV Parking' : 'Public EV Bay',
          bayType: '24/7 Access'
        }
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      if (!res.ok || !resJson.success) {
        throw new Error(resJson.error || 'Failed to save station');
      }

      onSuccess(resJson.data, isEdit);
      onClose();
    } catch (err: any) {
      console.error('Error saving station:', err);
      setErrorMessage(err.message || 'Failed to save station');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={drawerRef}
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-all overscroll-contain"
    >
      <div className="bg-white h-full w-full max-w-5xl shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-200 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/60 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-base font-medium text-gray-950">
                {editingStation ? `Edit: ${editingStation.name}` : 'Onboard Station at Pinpoint'}
              </h2>
              <span className="text-sm text-gray-500 font-light">
                Location: {formData.location?.lat?.toFixed(4)}, {formData.location?.lng?.toFixed(4)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2 text-xs shrink-0">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Drawer Form Body */}
        <form
          id="station-drawer-form"
          onSubmit={handleSaveStation}
          onWheel={(e) => e.stopPropagation()}
          className="p-6 overflow-y-auto space-y-6 flex-1 min-h-0 text-xs overscroll-contain"
        >
          {/* SECTION 1: BASIC DETAILS */}
          <div className="space-y-3">
            <span className="text-base font-medium text-gray-900 block">
              1. Basic Information
            </span>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Station Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. JW Marriott Hotel Pune EV Hub"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Station Contact / Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Category *
                </label>
                <select
                  required
                  value={formData.category || 'Hotel'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500 cursor-pointer"
                >
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Mall">Mall</option>
                  <option value="Restaurant">Restaurant</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Pune, Maharashtra"
                  value={formData.city || 'Pune, Maharashtra'}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Average Stay Price (if Hotel or Resort) */}
            {isHotelOrResort && (
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1.5">
                  Average Stay / Room Price per Night (Hotels & Resorts)
                </label>
                <div className="flex items-center rounded-xl border border-green-200 bg-white overflow-hidden focus-within:border-green-500 h-11 max-w-xs transition-colors shadow-2xs">
                  <span className="px-3 bg-green-50 text-green-700 font-bold text-xs border-r border-green-200 select-none flex items-center h-full">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="4500"
                    value={parseStayPriceNumber(formData.avgStayPrice)}
                    onChange={(e) => {
                      const cleanNum = e.target.value.replace(/[^\d]/g, '');
                      setFormData({
                        ...formData,
                        avgStayPrice: cleanNum ? `₹${Number(cleanNum).toLocaleString('en-IN')}/night` : ''
                      });
                    }}
                    className="w-full h-full px-3 text-xs font-normal text-gray-900 focus:outline-none"
                  />
                  <span className="px-3 bg-green-50 text-green-700 font-normal text-xs border-l border-green-200 select-none flex items-center h-full">
                    /night
                  </span>
                </div>
              </div>
            )}

            <div className='mt-5'>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Physical Address *
              </label>
              <input
                type="text"
                required
                placeholder="Street, locality, landmarks"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* SECTION 2: STATION LOCATION & ACCESS */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div>
              <span className="text-base font-medium text-gray-900 block">
                2. Station Location & Access
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Parking Bays *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6 Reserved EV Spaces"
                  value={formData.keyInfo?.parkingSpaces || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      keyInfo: {
                        ...(formData.keyInfo as any),
                        parkingSpaces: e.target.value
                      }
                    })
                  }
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Operating Hours *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24/7 Access or 06:00 AM - 11:00 PM"
                  value={formData.keyInfo?.operatingHours || formData.operatingHours || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operatingHours: e.target.value,
                      keyInfo: {
                        ...(formData.keyInfo as any),
                        operatingHours: e.target.value
                      }
                    })
                  }
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Charging Location on Property *
              </label>
              <input
                type="text"
                placeholder="e.g. East Block Open Visitor Parking"
                value={formData.keyInfo?.chargingLocation || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keyInfo: {
                      ...(formData.keyInfo as any),
                      chargingLocation: e.target.value
                    }
                  })
                }
                className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Access Policy
              </label>
              <input
                type="text"
                placeholder="e.g. 24/7 Access, Open to Public & Guests"
                value={formData.keyInfo?.access || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keyInfo: {
                      ...(formData.keyInfo as any),
                      access: e.target.value
                    }
                  })
                }
                className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* SECTION 3: CHARGING POINTS (POWER & INDIVIDUAL PRICING) */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  3. Charging Points & Individual Tariffs
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddConnectorPoint}
                className="h-9 px-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center space-x-1"
              >
                <span>+ Add Connector</span>
              </button>
            </div>

            <div className="space-y-3">
              {(formData.liveChargers || []).map((gun, idx) => {
                const powerInfo = parsePowerInfo(gun.power);
                const tariffNum = parseTariffNumber(gun.tariff);

                return (
                  <div key={gun.id || idx} className="p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 fill-green-600 text-green-600" />
                        </div>
                        <span className="font-semibold text-base text-gray-900">
                          {gun.power ? `${gun.power}` : `Point #${idx + 1}`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveConnectorPoint(idx)}
                        className="text-gray-400 hover:text-red-600 cursor-pointer p-1 transition-colors"
                        title="Remove Gun"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Power: number only, kW automatic */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Power Output (kW) *
                        </label>
                        <div className="flex items-center rounded-xl border-2 border-gray-100 bg-white overflow-hidden focus-within:border-green-500 h-12 transition-colors shadow-2xs">
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={powerInfo.num}
                            onChange={(e) => handleUpdatePower(idx, e.target.value, powerInfo.unit)}
                            placeholder="e.g. 22"
                            className="w-full h-12 px-3 text-xs font-medium text-gray-900 focus:outline-none"
                          />
                          <select
                            value={powerInfo.unit}
                            onChange={(e) => handleUpdatePower(idx, powerInfo.num, e.target.value)}
                            className="h-full bg-gray-50 border-l border-gray-200 px-2 text-xs text-gray-700 font-medium focus:outline-none cursor-pointer"
                          >
                            <option value="kW AC">kW AC</option>
                            <option value="kW DC">kW DC</option>
                            <option value="kW">kW</option>
                          </select>
                        </div>
                      </div>

                      {/* Tariff: number only, ₹ and /kWh automatic */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Price *
                        </label>
                        <div className="flex items-center rounded-xl border-2 border-gray-100 bg-white overflow-hidden focus-within:border-green-500 h-12 transition-colors shadow-2xs">
                          <span className="px-2.5 bg-gray-50 text-gray-600 font-bold text-xs border-r border-gray-200 select-none flex items-center h-full">
                            ₹
                          </span>
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={tariffNum}
                            onChange={(e) => handleUpdateTariff(idx, e.target.value)}
                            placeholder="14"
                            className="w-full h-12 px-3 text-xs font-medium text-gray-900 focus:outline-none"
                          />
                          <span className="px-2.5 bg-gray-50 text-gray-500 font-normal text-xs border-l border-gray-200 select-none flex items-center h-full">
                            /kWh
                          </span>
                        </div>
                      </div>

                      {/* Live Status */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Live Status
                        </label>
                        <select
                          value={gun.status || 'Available'}
                          onChange={(e) => handleUpdateConnectorPoint(idx, 'status', e.target.value)}
                          className="h-12 w-full px-3 text-xs font-normal bg-white border-2 border-gray-100 rounded-xl focus:outline-none focus:border-green-500 cursor-pointer shadow-2xs"
                        >
                          <option value="Available">🟢 Available</option>
                          <option value="In Use">🟡 In Use</option>
                          <option value="Maintenance">🔴 Maintenance</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: PARALLEL CLOUDINARY PHOTOS UPLOAD (MAX 4) */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  4. Station Photos (Max 4 Images)
                </span>
              </div>
              <span className="text-sm font-medium text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                {(formData.photos?.length || 0)} / 4 Uploaded
              </span>
            </div>

            {/* Upload Button Box */}
            {(formData.photos?.length || 0) < 4 && (
              <label className="flex items-center justify-center space-x-2.5 h-32 bg-white border border-dashed border-green-400 hover:border-green-600 rounded-2xl cursor-pointer transition-colors p-3">
                <UploadCloud className={`w-5 h-5 ${isUploadingPhotos ? 'animate-bounce text-green-600' : 'text-green-500'}`} />
                <span className="text-base font-medium text-gray-700">
                  {isUploadingPhotos ? uploadProgressText || 'Uploading...' : 'Select Photos to Upload (Max 4)'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={isUploadingPhotos}
                  onChange={handleParallelUploadPhotos}
                  className="hidden"
                />
              </label>
            )}

            {/* Live Photos Grid Preview */}
            {(formData.photos?.length || 0) > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {(formData.photos || []).map((imgUrl, idx) => (
                  <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-gray-200 shadow-2xs group">
                    <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 rounded text-white text-[9px] font-medium">
                      {idx === 0 ? 'Hero' : `#${idx + 1}`}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 cursor-pointer shadow-xs"
                      title="Remove Image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 h-20 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-200 text-center text-gray-400 text-base font-light">
                No images uploaded yet.
              </div>
            )}
          </div>

          {/* SECTION 5: ON-SITE AMENITIES ADDING */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <span className="text-base font-medium text-gray-900 block">
              5. On-Site Amenities
            </span>

            {/* Quick Add Pills */}
            <div className="grid grid-cols-3 gap-1.5">
              {POPULAR_AMENITIES.map((am, idx) => {
                const isSelected = (formData.amenities || []).includes(am);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTogglePopularAmenity(am)}
                    className={`px-10 py-3 rounded-full text-sm font-normal transition-colors cursor-pointer border ${isSelected
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {am}
                  </button>
                );
              })}
            </div>

            {/* Custom Amenity Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={customAmenityInput}
                onChange={(e) => setCustomAmenityInput(e.target.value)}
                placeholder="Add custom amenity (e.g. Lounge, Kids Area)"
                className="h-12 flex-1 bg-white border-2 border-gray-100 rounded-xl px-4 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
              />
              <button
                type="button"
                onClick={handleAddCustomAmenity}
                className="h-12 px-6 rounded-xl bg-gray-900 hover:bg-gray-800 text-sm font-medium text-white cursor-pointer"
              >
                + Add
              </button>
            </div>

            {/* Selected Amenities Chips */}
            {(formData.amenities || []).length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(formData.amenities || []).map((item, idx) => (
                  <span
                    onClick={() => handleRemoveAmenity(idx)}
                    key={idx}
                    className="inline-flex items-center space-x-1 px-5 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-normal border border-emerald-200 cursor-pointer hover:bg-red-200"
                  >
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 6: MULTI-PLATFORM RATINGS & REVIEWS INPUTS */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  6. Multi-Platform Ratings & Reviews (Google, Apple, EVStay)
                </span>
                <span className="text-sm pl-4 text-gray-500 font-normal">
                  Set rating score (1.0 - 5.0) and total review count for each platform
                </span>
              </div>
            </div>

            {/* 3 Platform Card Inputs */}
            <div className="space-y-2.5">

              
              {/* EVStay Community */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-24 shrink-0">
                  <span className="text-sm font-medium text-emerald-950">EVStay</span>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1">
                    <label className="block text-xs text-emerald-800 mb-0.5 font-medium">Rating (1-5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.platformRatings?.evstay?.rating ?? 4.9}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setFormData({
                          ...formData,
                          platformRatings: {
                            ...formData.platformRatings,
                            google: formData.platformRatings?.google || { rating: 4.7, reviewCount: 120 },
                            apple: formData.platformRatings?.apple || { rating: 4.6, reviewCount: 68 },
                            evstay: {
                              rating: val,
                              reviewCount: formData.platformRatings?.evstay?.reviewCount ?? 42
                            }
                          }
                        });
                      }}
                      className="h-10 w-full bg-white border border-emerald-200 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs text-emerald-800 mb-0.5 font-medium">Total Reviews</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.platformRatings?.evstay?.reviewCount ?? 42}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        setFormData({
                          ...formData,
                          platformRatings: {
                            ...formData.platformRatings,
                            google: formData.platformRatings?.google || { rating: 4.7, reviewCount: 120 },
                            apple: formData.platformRatings?.apple || { rating: 4.6, reviewCount: 68 },
                            evstay: {
                              rating: formData.platformRatings?.evstay?.rating ?? 4.9,
                              reviewCount: val
                            }
                          }
                        });
                      }}
                      className="h-10 w-full bg-white border border-emerald-200 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-24 shrink-0">
                  <span className="text-sm font-medium text-gray-800">Google</span>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.platformRatings?.google?.rating ?? 4.7}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setFormData({
                          ...formData,
                          platformRatings: {
                            ...formData.platformRatings,
                            google: {
                              rating: val,
                              reviewCount: formData.platformRatings?.google?.reviewCount ?? 120
                            },
                            apple: formData.platformRatings?.apple || { rating: 4.6, reviewCount: 68 },
                            evstay: formData.platformRatings?.evstay || { rating: 4.9, reviewCount: 42 }
                          }
                        });
                      }}
                      className="h-10 w-full bg-white border border-gray-200 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      value={formData.platformRatings?.google?.reviewCount ?? 120}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        setFormData({
                          ...formData,
                          platformRatings: {
                            ...formData.platformRatings,
                            google: {
                              rating: formData.platformRatings?.google?.rating ?? 4.7,
                              reviewCount: val
                            },
                            apple: formData.platformRatings?.apple || { rating: 4.6, reviewCount: 68 },
                            evstay: formData.platformRatings?.evstay || { rating: 4.9, reviewCount: 42 }
                          }
                        });
                      }}
                      className="h-10 w-full bg-white border border-gray-200 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Apple Maps */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-24 shrink-0">
                  <span className="text-sm font-medium text-gray-800">Apple</span>
                </div>

                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.platformRatings?.apple?.rating ?? 4.6}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setFormData({
                          ...formData,
                          platformRatings: {
                            ...formData.platformRatings,
                            google: formData.platformRatings?.google || { rating: 4.7, reviewCount: 120 },
                            apple: {
                              rating: val,
                              reviewCount: formData.platformRatings?.apple?.reviewCount ?? 68
                            },
                            evstay: formData.platformRatings?.evstay || { rating: 4.9, reviewCount: 42 }
                          }
                        });
                      }}
                      className="h-10 w-full bg-white border border-gray-200 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      value={formData.platformRatings?.apple?.reviewCount ?? 68}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        setFormData({
                          ...formData,
                          platformRatings: {
                            ...formData.platformRatings,
                            google: formData.platformRatings?.google || { rating: 4.7, reviewCount: 120 },
                            apple: {
                              rating: formData.platformRatings?.apple?.rating ?? 4.6,
                              reviewCount: val
                            },
                            evstay: formData.platformRatings?.evstay || { rating: 4.9, reviewCount: 42 }
                          }
                        });
                      }}
                      className="h-10 w-full bg-white border border-gray-200 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Live Calculated Overall Summary Badge */}
            {(() => {
              const gR = Number(formData.platformRatings?.google?.rating ?? 4.7);
              const gC = Number(formData.platformRatings?.google?.reviewCount ?? 120);
              const aR = Number(formData.platformRatings?.apple?.rating ?? 4.6);
              const aC = Number(formData.platformRatings?.apple?.reviewCount ?? 68);
              const eR = Number(formData.platformRatings?.evstay?.rating ?? 4.9);
              const eC = Number(formData.platformRatings?.evstay?.reviewCount ?? 42);
              const totalRev = gC + aC + eC;
              const overall = totalRev > 0 ? (((gR * gC) + (aR * aC) + (eR * eC)) / totalRev).toFixed(1) : gR.toFixed(1);

              return (
                <div className="p-4 border border-emerald-200 rounded-xl flex items-center justify-between text-sm">
                  <span className="font-light text-emerald-950">
                    Live Weighted Score: <strong className="text-emerald-700 font-semibold text-md">⭐ {overall} / 5.0</strong>
                  </span>
                  <span className="text-emerald-800 font-medium">
                    {totalRev} Total Reviews
                  </span>
                </div>
              );
            })()}
          </div>

          {/* SECTION 7: EXPERIENCE BREAKDOWN IN RATINGS */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <span className="text-base font-medium text-gray-900 block">
              7. Experience Breakdown Scores (Out of 5.0)
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Charging Exp</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.reviewsSummary?.categories?.chargingExperience ?? 4.9}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewsSummary: {
                        ...(formData.reviewsSummary as any),
                        categories: {
                          ...(formData.reviewsSummary?.categories as any),
                          chargingExperience: parseFloat(e.target.value)
                        }
                      }
                    })
                  }
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Staff & Valet</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.reviewsSummary?.categories?.staffAssistance ?? 4.8}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewsSummary: {
                        ...(formData.reviewsSummary as any),
                        categories: {
                          ...(formData.reviewsSummary?.categories as any),
                          staffAssistance: parseFloat(e.target.value)
                        }
                      }
                    })
                  }
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Property Exp</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.reviewsSummary?.categories?.propertyExperience ?? 4.7}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reviewsSummary: {
                        ...(formData.reviewsSummary as any),
                        categories: {
                          ...(formData.reviewsSummary?.categories as any),
                          propertyExperience: parseFloat(e.target.value)
                        }
                      }
                    })
                  }
                  className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal text-gray-900 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 7: IN-PERSON REVIEWS (MAX 2 REVIEWS) */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  7. In-Person Client Reviews (Max 2)
                </span>
                <span className="text-sm pl-4 text-gray-500 font-normal">
                  Real driver reviews displayed on the public station card
                </span>
              </div>
              {(formData.reviewsSummary?.sampleReviews?.length || 0) < 2 && (
                <button
                  type="button"
                  onClick={handleAddReview}
                  className="h-9 px-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                >
                  + Add Review
                </button>
              )}
            </div>

            <div className="space-y-3">
              {(formData.reviewsSummary?.sampleReviews || []).slice(0, 2).map((rev, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xs text-gray-700">Review #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveReview(idx)}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="col-span-1">
                      <label className="block text-xs text-gray-500 mb-1">Author</label>
                      <input
                        type="text"
                        value={rev.author}
                        onChange={(e) => handleUpdateReview(idx, 'author', e.target.value)}
                        placeholder="Driver Name"
                        className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Date</label>
                      <input
                        type="text"
                        value={rev.date}
                        onChange={(e) => handleUpdateReview(idx, 'date', e.target.value)}
                        placeholder="2 days ago"
                        className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Stars (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rev.rating}
                        onChange={(e) => handleUpdateReview(idx, 'rating', parseInt(e.target.value, 10))}
                        className="h-14 w-full bg-white border-2 border-gray-100 rounded-xl px-3 text-sm font-normal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Review Quote</label>
                    <textarea
                      rows={2}
                      value={rev.text}
                      onChange={(e) => handleUpdateReview(idx, 'text', e.target.value)}
                      placeholder="Write review experience..."
                      className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs font-normal focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Drawer Actions - Fixed Sticky Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-white flex items-center justify-end space-x-3 shrink-0 z-10 shadow-xs">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="station-drawer-form"
            disabled={isSubmitting || isUploadingPhotos}
            className="h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-xs shadow-xs disabled:opacity-50 cursor-pointer transition-all"
          >
            {isSubmitting ? 'Saving...' : editingStation ? 'Save Changes' : 'Publish Station on Map'}
          </button>
        </div>
      </div>
    </div>
  );
}
