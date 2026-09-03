"use client";
import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
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
} from 'lucide-react';

export interface SampleReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface LiveCharger {
  id: string;
  name: string;
  power: string;
  status: 'Available' | 'In Use' | 'Maintenance' | string;
}

export interface PropertyDetailData {
  id: string;
  name: string;
  category: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  evBadgeText: string;
  heroImage: string;
  photos: string[];
  chargingAmenities: {
    chargersCount: string;
    powerOutput: string;
    parkingSpaces: string;
    bayType: string;
  };
  reviewsSummary: {
    overallRating: number;
    reviewCount: number;
    categories: {
      chargingExperience: number;
      staffAssistance: number;
      propertyExperience: number;
    };
    sampleReviews: SampleReview[];
  };
  liveChargers: LiveCharger[];
  keyInfo: {
    parkingSpaces: string;
    chargingLocation: string;
    access: string;
    operatingHours: string;
  };
  operatingHours: string;
}

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
      }
    ]
  },
  liveChargers: [
    { id: "c1", name: "Charger 01 — 60 kW DC Fast", power: "60 kW", status: "Available" },
    { id: "c2", name: "Charger 02 — 60 kW DC Fast", power: "60 kW", status: "In Use" },
    { id: "c3", name: "Charger 03 — 22 kW AC Type 2", power: "22 kW", status: "Available" }
  ],
  keyInfo: {
    parkingSpaces: "6 Reserved EV bays",
    chargingLocation: "Ground floor visitor parking (P1)",
    access: "Open for hotel guests & public EV drivers",
    operatingHours: "24 Hours / 7 Days a week"
  },
  operatingHours: "Open 24/7"
};

interface PropertyDetailMobileViewProps {
  property?: PropertyDetailData;
  onClose?: () => void;
}

export const PropertyDetailMobileView: React.FC<PropertyDetailMobileViewProps> = ({
  property = defaultPropertyData,
  onClose,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  const data = property || defaultPropertyData;
  const photosList = data.photos && data.photos.length > 0 ? data.photos : [data.heroImage];

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhoto((prev) => (prev + 1) % photosList.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhoto((prev) => (prev - 1 + photosList.length) % photosList.length);
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
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
    if (data.phone) {
      window.location.href = `tel:${data.phone}`;
    } else {
      alert("Contact number not available for this station.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen h-full overflow-y-auto font-sans text-gray-900 pb-12 shadow-xl relative overscroll-contain">
      
      {/* Top Media Gallery Hero Header Slider */}
      <div
        className="relative w-full h-64 bg-gray-900 overflow-hidden group select-none cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={photosList[activePhoto] || data.heroImage}
          alt={data.name}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Gradient Overlay for Top Controls Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Floating Top Navigation Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            aria-label="Back / Close"
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10 cursor-pointer"
          >
            {onClose ? <X className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>

          {/* Photo Counter Badge */}
          {photosList.length > 1 && (
            <span className="bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">
              {activePhoto + 1} / {photosList.length}
            </span>
          )}
        </div>

        {/* Slider Previous & Next Controls */}
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

        {/* Carousel Pagination Indicator Dots */}
        {photosList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {photosList.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto(index);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activePhoto === index ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Container Content */}
      <div className="px-5 py-6 space-y-6">
        
        {/* Title, Category & Ratings Header */}
        <div className="space-y-2">
          <span className="text-[11px] tracking-wider text-emerald-600 font-medium">
            {data.category}
          </span>
          <h1 className="text-2xl font-medium text-gray-950 tracking-tight leading-snug">
            {data.name}
          </h1>

          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
              <span>{data.rating}</span>
            </div>
            <span className="text-gray-500">({data.reviewCount} reviews)</span>
          </div>

          {/* EV Charging Badge Tag */}
          <div className="pt-1">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 animate-pulse" />
              <span>{data.evBadgeText}</span>
            </span>
          </div>
        </div>

        {/* Action Icon Buttons Strip */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100">
          <button
            onClick={handleDirections}
            className="flex flex-col items-center justify-center space-y-1.5 py-1 text-gray-700 hover:text-emerald-600 group transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Navigation className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-emerald-600">Directions</span>
          </button>

          <button
            onClick={handleCall}
            className="flex flex-col items-center justify-center space-y-1.5 py-1 text-gray-700 hover:text-emerald-600 group transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-emerald-600">Call to Book Slot</span>
          </button>

          {/* <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex flex-col items-center justify-center space-y-1.5 py-1 text-gray-700 hover:text-emerald-600 group transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              isSaved ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-800 group-hover:bg-emerald-600 group-hover:text-white'
            }`}>
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-emerald-600">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button> */}

          {/* <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center space-y-1.5 py-1 text-gray-700 hover:text-emerald-600 group transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 group-hover:text-emerald-600">Share</span>
          </button> */}
        </div>

        {/* Charging Amenities Quick Overview Cards */}
        <div className="space-y-3">
          <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Charging Amenities
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Chargers Box */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-emerald-100/30 rounded-2xl p-4 border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 fill-white stroke-0.2" />
              </div>
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  {data.chargingAmenities.chargersCount}
                </span>
                <span className="text-sm font-medium text-emerald-800 block">
                  {data.chargingAmenities.powerOutput}
                </span>
              </div>
            </div>

            {/* Parking Spaces Box */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/60 rounded-2xl p-4 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center font-medium text-xs shadow-sm">
                P
              </div>
              <div>
                <span className="text-base font-medium text-gray-900 block">
                  {data.chargingAmenities.parkingSpaces}
                </span>
                <span className="text-sm font-medium text-gray-600 block">
                  {data.chargingAmenities.bayType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        {data.photos && data.photos.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photos ({data.photos.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {data.photos.slice(0, 4).map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setActivePhoto(index)}
                  className={`h-28 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer border-2 transition-all ${
                    activePhoto === index ? 'border-emerald-500 scale-[0.98]' : 'border-transparent hover:opacity-90'
                  }`}
                >
                  <img
                    src={photo}
                    alt={`${data.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guest Reviews Breakdown */}
        {data.reviewsSummary && (
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guest Reviews & Experience
            </h2>

            <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-3xl font-semibold text-gray-950">{data.reviewsSummary.overallRating}</span>
              <div className="space-y-0.5">
                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 block font-medium">
                  Based on {data.reviewsSummary.reviewCount} EVStay user reviews
                </span>
              </div>
            </div>

            {/* Rating Categories Bars */}
            {data.reviewsSummary.categories && (
              <div className="space-y-2.5 text-xs text-gray-700 bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Charging Experience</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(data.reviewsSummary.categories.chargingExperience / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-bold w-6 text-right">
                      {data.reviewsSummary.categories.chargingExperience}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Staff Assistance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(data.reviewsSummary.categories.staffAssistance / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-bold w-6 text-right">
                      {data.reviewsSummary.categories.staffAssistance}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Property Experience</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(data.reviewsSummary.categories.propertyExperience / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-bold w-6 text-right">
                      {data.reviewsSummary.categories.propertyExperience}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sample User Review Cards */}
            {data.reviewsSummary.sampleReviews && data.reviewsSummary.sampleReviews.map((rev) => (
              <div key={rev.id} className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{rev.author}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                </div>
                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pt-1 font-normal">
                  "{rev.text}"
                </p>
              </div>
            ))}

            <button onClick={()=> {}} className='w-full bg-gray-50 py-3 rounded-xl text-xs font-medium border border-gray-100 cursor-pointer'>View All Reviews</button>
          </div>
        )}

        {/* Live EV Stay Charging Status */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          {/* <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-600 uppercase font-bold block">
                EV STAY LIVE CHARGERS
              </span>
              <span className="text-xs text-gray-600 font-medium">
                {data.liveChargers ? `${data.liveChargers.length} Connectors Active` : 'Charging Bays'}
              </span>
            </div>
            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Live</span>
            </span>
          </div>
          <div className="space-y-2.5 text-xs">
            {data.liveChargers && data.liveChargers.map((ch) => {
              const isAvail = ch.status === 'Available';
              const isInUse = ch.status === 'In Use';
              return (
                <div
                  key={ch.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isAvail ? 'bg-emerald-500 animate-pulse' : isInUse ? 'bg-amber-500' : 'bg-red-400'
                    }`} />
                    <span className="font-semibold text-gray-900">{ch.name}</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    isAvail
                      ? 'bg-emerald-100 text-emerald-800'
                      : isInUse
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {ch.status}
                  </span>
                </div>
              );
            })}
          </div> */}

          {/* Specific Information Key-Values */}
          {data.keyInfo && (
            <div className="pt-2 space-y-2.5 text-sm border-t border-gray-100">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">Parking Bays</span>
                <span className="font-medium text-gray-900">{data.keyInfo.parkingSpaces}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">Charging Location</span>
                <span className="font-medium text-gray-900">{data.keyInfo.chargingLocation}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">Access Type</span>
                <span className="font-medium text-gray-900">{data.keyInfo.access}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500">Operating Hours</span>
                <span className="font-medium text-gray-900">{data.keyInfo.operatingHours}</span>
              </div>
            </div>
          )}

          {/* Address & Operational Note */}
          <div className="space-y-2.5 pt-3 border-t border-gray-100 text-sm">
            <div className="flex items-start space-x-2.5 text-gray-800">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                {data.address}
              </p>
            </div>

            <div className="flex items-center space-x-2.5 text-gray-800 pt-0.5">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="font-medium">{data.operatingHours || "Open 24/7"}</p>
            </div>
          </div>

          {/* Directions Main Action Button */}
          {/* <div className="pt-2">
            <button
              onClick={handleDirections}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Navigate in Google Maps</span>
            </button>
          </div> */}

        </div>

      </div>
    </div>
  );
};

export default PropertyDetailMobileView;