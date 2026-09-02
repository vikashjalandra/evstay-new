import React from 'react';
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
  ChevronRight,
} from 'lucide-react';

export const PropertyDetailMobileView: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen font-sans text-gray-900 pb-12 shadow-xl border border-gray-100">
      
      {/* Top Media Gallery Hero Header */}
      <div className="relative w-full h-64 bg-gray-900">
        <img
          src="/path-to-resort-pool-hero.jpg" // Replace with resort preview photo
          alt="The Serenity Resort"
          className="w-full h-full object-cover"
        />

        {/* Floating Top Navigation Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Main Container Content */}
      <div className="px-5 py-6 space-y-6">
        
        {/* Title, Category & Ratings Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-wider text-gray-400 uppercase">
            RESORT • MAHABALESHWAR
          </span>
          <h1 className="text-2xl font-semibold text-gray-950 tracking-tight">
            The Serenity Resort
          </h1>

          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center text-black font-semibold">
              <Star className="w-3.5 h-3.5 fill-black text-black mr-1" />
              <span>4.6</span>
            </div>
            <span className="text-gray-400">(128 reviews)</span>
          </div>

          {/* EV Charging Badge Tag */}
          <div className="pt-1">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200/60">
              <Zap className="w-3 h-3 fill-amber-600 text-amber-600" />
              <span>EV Charging Available</span>
            </span>
          </div>
        </div>

        {/* Action Icon Buttons Strip */}
        <div className="grid grid-cols-4 gap-3 py-2 border-y border-gray-100">
          <button className="flex flex-col items-center justify-center space-y-1 py-1 text-gray-700 hover:text-black">
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">Directions</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 py-1 text-gray-700 hover:text-black">
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">Call</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 py-1 text-gray-700 hover:text-black">
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">Save</span>
          </button>

          <button className="flex flex-col items-center justify-center space-y-1 py-1 text-gray-700 hover:text-black">
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-[10px] font-medium text-gray-600">Share</span>
          </button>
        </div>

        {/* Charging Amenities Quick Overview Cards */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Charging Amenities
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Chargers Box */}
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900 block">
                  2 Chargers
                </span>
                <span className="text-[11px] text-gray-500 block">
                  7.5 kW AC Type 2
                </span>
              </div>
            </div>

            {/* Parking Spaces Box */}
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/80 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                P
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900 block">
                  4 Spaces
                </span>
                <span className="text-[11px] text-gray-500 block">
                  Dedicated EV Bays
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Photos
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="h-28 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/path-to-photo-1.jpg"
                alt="Resort exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/path-to-photo-2.jpg"
                alt="EV charging vehicle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/path-to-photo-3.jpg"
                alt="Entrance charging station"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/path-to-photo-4.jpg"
                alt="Resort lounge view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="text-xs font-medium text-gray-900 pt-1 hover:underline">
            View All Photos
          </button>
        </div>

        {/* Guest Reviews Breakdown */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Guest Reviews
          </h2>

          <div className="flex items-center space-x-3">
            <span className="text-3xl font-normal text-gray-950">4.6</span>
            <div className="space-y-0.5">
              <div className="flex text-emerald-500 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <span className="text-xs text-gray-400 block">(128 reviews)</span>
            </div>
          </div>

          {/* Rating Categories Bars */}
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Charging Experience</span>
              <div className="flex items-center space-x-2">
                <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-emerald-500 rounded-full" />
                </div>
                <span className="text-gray-900 font-semibold w-5 text-right">4.8</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Staff Assistance</span>
              <div className="flex items-center space-x-2">
                <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[94%] h-full bg-emerald-500 rounded-full" />
                </div>
                <span className="text-gray-900 font-semibold w-5 text-right">4.7</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Property Experience</span>
              <div className="flex items-center space-x-2">
                <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-emerald-500 rounded-full" />
                </div>
                <span className="text-gray-900 font-semibold w-5 text-right">4.5</span>
              </div>
            </div>
          </div>

          {/* User Review Card */}
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-900">Rahul M.</span>
              <span className="text-[10px] text-gray-400">2 days ago</span>
            </div>
            <div className="flex text-emerald-500 space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pt-1">
              "Very convenient charging service. We checked in while the staff handled the car."
            </p>
          </div>

          <button className="text-xs font-medium text-gray-900 hover:underline">
            View All Reviews
          </button>
        </div>

        {/* Live EV Stay Charging Status */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block">
              EV STAY CHARGING
            </span>
            <span className="text-xs text-gray-500">2 Chargers</span>
          </div>

          {/* Charger List Status */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-gray-900">Charger 01 — 7.5 kW</span>
              <span className="text-gray-400">— Available</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-medium text-gray-900">Charger 02 — 7.5 + 7.5 kW</span>
              <span className="text-gray-400">— In Use</span>
            </div>
          </div>

          {/* Specific Information Key-Values */}
          <div className="pt-2 space-y-3 text-xs border-t border-gray-100/80">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Parking Spaces</span>
              <span className="font-medium text-gray-900">4 EV parking spaces</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Charging Location</span>
              <span className="font-medium text-gray-900">Near main entrance</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Access</span>
              <span className="font-medium text-gray-900">Hotel guests & visitors</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500">Operating Hours</span>
              <span className="font-medium text-gray-900">According to property hours</span>
            </div>
          </div>

          {/* Address & Operational Note */}
          <div className="space-y-2 pt-3 border-t border-gray-100/80 text-xs">
            <div className="flex items-start space-x-2.5 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Panchgani - Mahabaleshwar Road, Metgutad, Mahabaleshwar, Maharashtra 412806
              </p>
            </div>

            <div className="flex items-center space-x-2.5 text-gray-700 pt-1">
              <Clock className="w-4 h-4 text-gray-500 shrink-0" />
              <p>Open 24/7 for guests</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetailMobileView;