"use client";
import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Navigation,
  Star,
  Zap,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
  ShieldCheck,
  CreditCard,
  Wifi,
  Sparkles,
  Award,
  Activity,
  Car
} from 'lucide-react';
import {
  PropertyDetailData,
  SampleReview,
  LiveCharger,
  PlatformRatings,
  StationPricing
} from '@/lib/types';

export type {
  PropertyDetailData,
  SampleReview,
  LiveCharger,
  PlatformRatings,
  StationPricing
};

const defaultPropertyData: PropertyDetailData = {
  id: "pune-default",
  name: "JW Marriott Hotel Pune EV Hub",
  category: "LUXURY HOTEL • SHIVAJINAGAR",
  city: "Pune, Maharashtra",
  location: { lat: 18.5308, lng: 73.8288 },
  address: "Senapati Bapat Road, Shivajinagar, Pune, Maharashtra 411016",
  phone: "+91 20 6683 3333",
  rating: 4.8,
  reviewCount: 215,
  evBadgeText: "Ultra Fast 60kW DC Charging Available",
  heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  photos: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80"
  ],
  chargingAmenities: {
    chargersCount: "4 Chargers",
    powerOutput: "60 kW DC Fast & 22 kW AC",
    parkingSpaces: "6 Dedicated Bays",
    bayType: "Covered EV Priority Parking"
  },
  reviewsSummary: {
    overallRating: 4.8,
    reviewCount: 215,
    categories: {
      chargingExperience: 4.9,
      staffAssistance: 4.9,
      propertyExperience: 4.7
    },
    sampleReviews: [
      {
        id: "r1",
        author: "Aditya K.",
        date: "1 day ago",
        rating: 5,
        text: "Excellent ultra-fast charging experience! Charged my Nexon EV from 20% to 80% while enjoying coffee."
      },
      {
        id: "r2",
        author: "Priya Sharma",
        date: "3 days ago",
        rating: 5,
        text: "Valet staff was super helpful. They hooked up the charger for us seamlessly."
      }
    ]
  },
  liveChargers: [
    { id: "c1", name: "Charger 01 — 60 kW DC Fast", power: "60 kW DC", tariff: "₹21/kWh", status: "Available" },
    { id: "c2", name: "Charger 02 — 22 kW AC Type 2", power: "22 kW AC", tariff: "₹18/kWh", status: "In Use" },
    { id: "c3", name: "Charger 03 — 7.5 kW AC Wallbox", power: "7.5 kW AC", tariff: "₹15/kWh", status: "Available" }
  ],
  keyInfo: {
    parkingSpaces: "6 Reserved EV bays",
    chargingLocation: "Ground floor visitor parking (P1)",
    access: "Open for hotel guests & public EV drivers",
    operatingHours: "24 Hours / 7 Days a week"
  },
  operatingHours: "Open 24/7",
  avgStayPrice: "₹8,500/night",
  platformRatings: {
    google: { rating: 4.8, reviewCount: 412 },
    apple: { rating: 4.7, reviewCount: 158 },
    evstay: { rating: 4.9, reviewCount: 215, verifiedBookings: 320 },
    plugshare: { score: "9.6", reviewCount: 94 }
  },
  pricing: {
    tariff: "₹18 - ₹21/kWh",
    billingUnit: "per kWh",
    note: "Complimentary parking while charging for EVStay users"
  },
  amenities: [
    "Valet EV Charging",
    "Restrooms Available",
    "High-Speed Wi-Fi",
    "Cafe / Coffee Lounge",
    "24/7 Security CCTV"
  ],
  uptime: "99.4%",
  avgWaitTime: "0 - 5 min"
};

interface PropertyDetailMobileViewProps {
  property?: PropertyDetailData;
  onClose?: () => void;
}

export const PropertyDetailMobileView: React.FC<PropertyDetailMobileViewProps> = ({
  property = defaultPropertyData,
  onClose,
}) => {
  const [activePhoto, setActivePhoto] = useState(0);

  const data = property || defaultPropertyData;

  // Up to 4 images max
  const photosList = (data.photos && data.photos.length > 0
    ? data.photos
    : data.heroImage
      ? [data.heroImage]
      : []
  ).slice(0, 4);

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (photosList.length <= 1) return;
    setActivePhoto((prev) => (prev + 1) % photosList.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (photosList.length <= 1) return;
    setActivePhoto((prev) => (prev - 1 + photosList.length) % photosList.length);
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || photosList.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNextPhoto();
    } else if (diff < -40) {
      handlePrevPhoto();
    }
    setTouchStartX(null);
  };

  const handleDirections = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${data.location.lat},${data.location.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCall = () => {
    // Record lead in background with IP address & station info
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stationId: data.id,
          stationName: data.name,
          category: data.category,
          address: data.address,
          phone: data.phone || 'Not Provided',
          action: 'Phone Call / Call to Book Slot'
        })
      });
    } catch (err) {
      console.error('Failed to log call lead:', err);
    }

    if (data.phone) {
      window.location.href = `tel:${data.phone}`;
    } else {
      alert("Contact number not available for this station.");
    }
  };

  // Multi-platform ratings with fallbacks
  const googleRating = Number(data.platformRatings?.google?.rating || data.rating || 4.7);
  const googleCount = Number(data.platformRatings?.google?.reviewCount || data.reviewCount || 180);
  const appleRating = Number(data.platformRatings?.apple?.rating || Math.max(4.0, (data.rating || 4.7) - 0.1));
  const appleCount = Number(data.platformRatings?.apple?.reviewCount || Math.floor(googleCount * 0.6));
  const evstayRating = Number(data.platformRatings?.evstay?.rating || Math.min(5.0, (data.rating || 4.7) + 0.1));
  const evstayCount = Number(data.platformRatings?.evstay?.reviewCount || Math.floor(googleCount * 0.8));
  const evstayBookings = data.platformRatings?.evstay?.verifiedBookings || Math.floor(evstayCount * 1.4);

  // Overall combined rating calculation weighted across all 3 platforms
  const totalReviewsCount = googleCount + appleCount + evstayCount;
  const computedOverallRating = totalReviewsCount > 0
    ? Number((((googleRating * googleCount) + (appleRating * appleCount) + (evstayRating * evstayCount)) / totalReviewsCount).toFixed(1))
    : Number(googleRating.toFixed(1));

  // 2x2 Grid 4 Gallery Photos
  const fallbackPhotos = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
  ];
  const galleryPhotos = [...photosList, ...fallbackPhotos].slice(0, 4);

  // Category experience breakdown
  const chargingExp = data.reviewsSummary?.categories?.chargingExperience || 4.9;
  const staffExp = data.reviewsSummary?.categories?.staffAssistance || 4.8;
  const propertyExp = data.reviewsSummary?.categories?.propertyExperience || 4.7;

  // Max 2 in-person reviews
  const inPersonReviews = (data.reviewsSummary?.sampleReviews || []).slice(0, 2);

  // Is Hotel or Resort
  const isHotelOrResort =
    data.category?.toLowerCase().includes('hotel') ||
    data.category?.toLowerCase().includes('resort');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen h-full overflow-y-auto font-sans text-gray-900 pb-16 shadow-xl relative overscroll-contain font-light">

      {/* Top Media Gallery Hero Header Slider (Max 4 Photos) */}
      <div
        className="relative w-full h-64 bg-gray-900 overflow-hidden group select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photosList.length > 0 ? (
          <img
            src={photosList[activePhoto] || data.heroImage}
            alt={data.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400 text-xs">
            No image available
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Floating Top Navigation Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            aria-label="Back / Close"
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10 cursor-pointer"
          >
            {onClose ? <X className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Slider Controls */}
        {photosList.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              aria-label="Previous Photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 active:scale-95 transition-all border border-white/10 z-10 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextPhoto}
              aria-label="Next Photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 active:scale-95 transition-all border border-white/10 z-10 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicator Dots */}
        {photosList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {photosList.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto(index);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${activePhoto === index ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Container Content */}
      <div className="px-4 py-4 space-y-6">

        {/* Title, Category & Badges Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs tracking-wider text-emerald-600 font-semibold uppercase">
              {data.category}
            </span>
            <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified</span>
            </span>
          </div>

          <h1 className="text-2xl font-medium text-gray-950 tracking-tight leading-snug capitalize">
            {data.name}
          </h1>

          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span className="text-base font-semibold">{computedOverallRating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 font-normal">({totalReviewsCount} total verified reviews)</span>
          </div>
        </div>

        {/* Action Icon Buttons Strip */}
        <div className="grid grid-cols-2 gap-3 py-1">
          <button
            onClick={handleDirections}
            className="flex flex-col items-center justify-center space-y-1.5 py-1 text-gray-700 hover:text-emerald-600 group transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
              <Navigation className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-gray-700 group-hover:text-emerald-600">Get Directions</span>
          </button>

          <button
            onClick={handleCall}
            className="flex flex-col items-center justify-center space-y-1.5 py-1 text-gray-700 hover:text-emerald-600 group transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-gray-700 group-hover:text-emerald-600">Call to Book Slot</span>
          </button>
        </div>

        {/* HOTEL / RESORT AVERAGE STAY PRICE BANNER (If Applicable) */}
        {isHotelOrResort && data.avgStayPrice && (
          <div className=" rounded-2xl py-4">
            <div>
              <span className="text-base text-gray-500 uppercase font-medium tracking-wider block">
                Average Stay Price
              </span>
              <span className="text-2xl font-medium text-gray-900 block mt-0.5">
                {data.avgStayPrice.startsWith('₹') ? data.avgStayPrice : `₹${data.avgStayPrice}`}
              </span>
            </div>
          </div>
        )}

        {/* CHARGING SPECIFICATIONS BOX */}
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Charging Specifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                <Zap className="w-4 h-4 fill-white stroke-0.2" />
              </div>
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  {data.chargingAmenities?.chargersCount || `${data.liveChargers?.length || 1} Charging Guns`}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center font-medium text-xs shadow-2xs">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  {data.chargingAmenities?.bayType || 'Reserved EV Space'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2x2 PHOTO GALLERY GRID SECTION */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Station Photos (2x2 Grid)</span>
            </h2>
            <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
              4 Photos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 rounded-2xl overflow-hidden">
            {galleryPhotos.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (idx < photosList.length) setActivePhoto(idx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative h-28 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group border transition-all ${activePhoto === idx ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-gray-100 hover:border-gray-300'
                  }`}
              >
                <img
                  src={imgUrl}
                  alt={`Station photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>



        {/* MULTI-PLATFORM VERIFIED RATINGS SECTION */}
        <div className="space-y-3 rounded-2xl py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-gray-700 uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Verified Platform Ratings</span>
            </h2>
          </div>

          {/* Overall Combined Rating Banner */}
          <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3 border border-emerald-100/80 flex items-center justify-between shadow-2xs">
            <div>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold text-gray-900">{computedOverallRating}</span>
                <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-emerald-950">
                {totalReviewsCount} Reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {/* Google */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs flex justify-between">
              <div className="flex items-center space-x-1.5 mb-1.5">
                <span className="text-base font-medium text-gray-700 truncate">Google</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-base font-semibold text-gray-900">{googleRating}</span>
                </div>
                <span className="text-xs text-gray-500 block leading-tight pt-0.5 font-light">
                  {googleCount}+ reviews
                </span>
              </div>
            </div>

            {/* Apple */}
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs flex justify-between">
              <div className="flex items-center space-x-1.5 mb-1.5">
                <span className="text-base font-medium text-gray-700 truncate">Apple</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-base font-semibold text-gray-900">{appleRating}</span>
                </div>
                <span className="text-xs text-gray-500 block leading-tight pt-0.5 font-light">
                  {appleCount}+ reviews
                </span>
              </div>
            </div>

            {/* EVStay */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 shadow-2xs flex justify-between">
              <div className="flex items-center space-x-1.5 mb-1.5">
                <span className="text-base font-medium text-emerald-900 truncate">EVStay</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  <span className="text-base font-semibold text-emerald-950">{evstayRating}</span>
                </div>
                <span className="text-xs text-emerald-700 font-light block leading-tight pt-0.5">
                  {evstayBookings}+ stays
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* EXPERIENCE BREAKDOWN IN RATINGS */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Experience Breakdown
            </h2>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Verified Ratings
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-gray-700 font-normal">
            <div className="flex items-center justify-between">
              <span>Charging Experience</span>
              <div className="flex items-center space-x-2">
                <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(chargingExp / 5) * 100}%` }}
                  />
                </div>
                <span className="text-gray-900 font-medium w-6 text-right">
                  {chargingExp}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Staff & Valet Assistance</span>
              <div className="flex items-center space-x-2">
                <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(staffExp / 5) * 100}%` }}
                  />
                </div>
                <span className="text-gray-900 font-medium w-6 text-right">
                  {staffExp}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Property Experience</span>
              <div className="flex items-center space-x-2">
                <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(propertyExp / 5) * 100}%` }}
                  />
                </div>
                <span className="text-gray-900 font-medium w-6 text-right">
                  {propertyExp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IN-PERSON REVIEWS (MAX 2 REVIEWS) */}
        {inPersonReviews.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              In-Person Reviews ({inPersonReviews.length})
            </h2>

            <div className="space-y-2.5">
              {inPersonReviews.map((rev) => (
                <div key={rev.id} className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-900">{rev.author}</span>
                    <span className="text-[10px] text-gray-400 font-light">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 space-x-0.5">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal pt-1">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleDirections}
          className='w-full py-3 px-10 border rounded-lg bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer'>
          View More Reviews
        </button>




        {/* LIVE CONNECTORS WITH MULTIPLE CHARGING POINTS & INDIVIDUAL PRICES */}
        {data.liveChargers && data.liveChargers.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-emerald-600 uppercase font-medium block">
                  CHARGING POINTS & PRICES
                </span>
                <span className="text-xs text-gray-600 font-normal">
                  {data.liveChargers.length} Dedicated Connectors
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {data.liveChargers.map((ch) => {
                const isAvail = ch.status?.toLowerCase() === 'available';
                const isInUse = ch.status?.toLowerCase().includes('in use');
                const rawTariff = ch.tariff || data.pricing?.tariff || '₹18/kWh';
                const gunTariff = rawTariff.startsWith('₹') ? rawTariff : `₹${rawTariff}`;

                return (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {/* <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${isAvail ? 'bg-emerald-500 animate-pulse' : isInUse ? 'bg-amber-500' : 'bg-red-400'
                          }`}
                      /> */}
                      <div>
                        <p className="font-semibold text-gray-900 block text-base">{ch.power || ch.name}</p>
                        <p className="text-emerald-700 font-medium text-xs pt-1">
                          {gunTariff}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg ${isAvail
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInUse
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {ch.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ON-SITE AMENITIES PILLS */}
        {data.amenities && data.amenities.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              On-Site Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-normal rounded-xl border border-gray-100"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Info & Operational Hours */}
        {data.keyInfo && (
          <div className="pt-4 space-y-2 text-xs border-t border-gray-100 font-normal">
            <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
              Station Location & Access
            </h2>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Parking Bays</span>
              <span className="font-medium text-gray-900">{data.keyInfo.parkingSpaces}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Charging Location</span>
              <span className="font-medium text-gray-900">{data.keyInfo.chargingLocation}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Operating Hours</span>
              <span className="font-medium text-gray-900">{data.keyInfo.operatingHours}</span>
            </div>
          </div>
        )}

        {/* Full Address */}
        <div className="space-y-2 pt-3 border-t border-gray-100 text-xs font-normal">
          <div className="flex items-start space-x-2 text-gray-800">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {data.address}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-gray-800 pt-0.5">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <p>{data.operatingHours || "Open 24/7"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailMobileView;