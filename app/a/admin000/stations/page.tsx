"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  Building,
  Palmtree,
  ShoppingBag,
  UtensilsCrossed,
  MapPin,
  Compass,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PropertyDetailData } from '@/lib/types';
import StationDrawer from '@/component/admin/StationDrawer';

export default function StationsDirectoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [chargers, setChargers] = useState<PropertyDetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hotels' | 'resorts' | 'malls' | 'restaurants'>('all');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<PropertyDetailData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/a/admin000/login');
    }
  }, [status, router]);

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

  const filteredChargers = useMemo(() => {
    return chargers.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.name || '').toLowerCase().includes(q) ||
        (item.address || '').toLowerCase().includes(q) ||
        (item.city || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q);

      if (!matchSearch) return false;

      const cat = (item.category || '').toLowerCase();
      if (selectedCategory === 'hotels') return cat.includes('hotel');
      if (selectedCategory === 'resorts') return cat.includes('resort');
      if (selectedCategory === 'malls') return cat.includes('mall') || cat.includes('shopping');
      if (selectedCategory === 'restaurants') return cat.includes('restaurant') || cat.includes('cafe') || cat.includes('dining');
      return true;
    });
  }, [chargers, searchQuery, selectedCategory]);

  const handleDeleteStation = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/chargers/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to delete station');
      }

      setChargers(prev => prev.filter(c => c.id !== id));
      setToastMessage({ type: 'success', text: `Station "${name}" removed successfully.` });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Error deleting station' });
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleOpenEdit = (station: PropertyDetailData) => {
    setEditingStation(station);
    setIsDrawerOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingStation(null);
    setIsDrawerOpen(true);
  };

  const handleDrawerSuccess = (savedStation: PropertyDetailData, isEdit: boolean) => {
    loadChargers();
    setToastMessage({
      type: 'success',
      text: isEdit ? `Station "${savedStation.name}" updated successfully.` : `Station "${savedStation.name}" added successfully.`
    });
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-gray-950">
            Charging Stations Directory
          </h1>
          <p className="text-gray-500 text-xs mt-0.5 font-light">
            Manage charging hubs filtered strictly by Hotels, Resorts, Malls, and Restaurants.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadChargers}
            className="h-11 px-3.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-950 transition-colors shadow-2xs cursor-pointer flex items-center justify-center"
            title="Refresh Directory"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-green-600' : ''}`} />
          </button>

          <Link
            href="/a/admin000"
            className="h-11 inline-flex items-center space-x-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-gray-600" />
            <span>Open Map View</span>
          </Link>

          <button
            onClick={handleOpenCreate}
            className="h-11 inline-flex items-center space-x-2 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Station</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between shadow-xs transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center space-x-2 text-xs font-medium">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-600 text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col md:flex-row items-center gap-3 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by hotel, mall, street..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full bg-gray-50/70 border border-gray-200 rounded-xl pl-10 pr-4 text-xs font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto md:ml-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
            }`}
          >
            All Categories ({chargers.length})
          </button>

          <button
            onClick={() => setSelectedCategory('hotels')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'hotels'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Hotels</span>
          </button>

          <button
            onClick={() => setSelectedCategory('resorts')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'resorts'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
            }`}
          >
            <Palmtree className="w-3.5 h-3.5" />
            <span>Resorts</span>
          </button>

          <button
            onClick={() => setSelectedCategory('malls')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'malls'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Malls</span>
          </button>

          <button
            onClick={() => setSelectedCategory('restaurants')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === 'restaurants'
                ? 'bg-green-600 text-white font-medium shadow-2xs'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Restaurants</span>
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400 text-xs font-light">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-green-600" />
          Loading stations directory...
        </div>
      ) : filteredChargers.length === 0 ? (
        <div className="py-20 text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-2xs space-y-3">
          <MapPin className="w-8 h-8 text-gray-300 mx-auto" />
          <h3 className="font-medium text-gray-900 text-sm">No charging stations found</h3>
          <p className="text-gray-500 text-xs font-light">
            Try adjusting your search query or onboard a new station using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChargers.map((station) => {
            const heroPhoto = station.photos?.[0] || '/images/default-hotel.jpg';
            const guns = station.liveChargers || [];

            return (
              <div
                key={station.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={heroPhoto}
                      alt={station.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[11px] font-medium text-gray-800 shadow-2xs">
                      {station.category}
                    </div>

                    {station.avgStayPrice && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-xs text-[11px] font-medium text-white shadow-2xs">
                        Stay: {station.avgStayPrice.startsWith('₹') ? station.avgStayPrice : `₹${station.avgStayPrice}`}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-medium text-sm text-gray-950 line-clamp-1">{station.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1 font-light">{station.address}</p>
                    </div>

                    {/* Charging Points summary */}
                    <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px]">Guns & Tariffs:</span>
                        <span className="font-medium text-green-700">{guns.length} Points</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {guns.slice(0, 3).map((g, idx) => {
                          const formattedTariff = g.tariff
                            ? (g.tariff.startsWith('₹') ? g.tariff : `₹${g.tariff}`)
                            : '₹14/kWh';
                          return (
                            <span key={idx} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700 font-normal">
                              {g.power || g.name} • {formattedTariff}
                            </span>
                          );
                        })}
                        {guns.length > 3 && (
                          <span className="text-[10px] text-gray-400 self-center">+{guns.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    {/* Ratings row */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 text-gray-600">
                      <span>Google: <strong className="text-gray-900">{station.platformRatings?.google?.rating || station.rating || 4.7}★</strong></span>
                      <span>EVStay: <strong className="text-emerald-700">{station.platformRatings?.evstay?.rating || 4.9}★</strong></span>
                      <span>{station.photos?.length || 0} Photos</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-3 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">
                    {station.location?.lat?.toFixed(3)}, {station.location?.lng?.toFixed(3)}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(station)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-medium flex items-center space-x-1 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteStation(station.id, station.name)}
                      className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-600 transition-colors cursor-pointer shadow-2xs"
                      title="Delete Station"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Drawer */}
      <StationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={handleDrawerSuccess}
        editingStation={editingStation}
      />
    </div>
  );
}
