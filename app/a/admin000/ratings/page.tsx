"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Star,
  RefreshCw,
  Edit2,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { PropertyDetailData } from '@/lib/types';
import StationDrawer from '@/component/admin/StationDrawer';

export default function PlatformRatingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [chargers, setChargers] = useState<PropertyDetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleEditRatings = (station: PropertyDetailData) => {
    setEditingStation(station);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-gray-950">
            Platform Ratings & Experience Breakdown
          </h1>
          <p className="text-gray-500 text-xs mt-0.5 font-light">
            Review ratings from Google Maps, Apple Maps, EVStay Client verified reviews, and experience category breakdowns.
          </p>
        </div>

        <button
          onClick={loadChargers}
          className="h-11 px-4 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-gray-950 text-xs font-medium transition-colors shadow-2xs cursor-pointer flex items-center space-x-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-green-600' : ''}`} />
          <span>Refresh Ratings</span>
        </button>
      </div>

      {/* Ratings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chargers.map((station) => (
          <div key={station.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-sm text-gray-900">{station.name}</h2>
                <span className="text-xs text-gray-500 font-light">{station.address}</span>
              </div>
              <button
                onClick={() => handleEditRatings(station)}
                className="inline-flex items-center space-x-1 text-xs text-green-600 hover:text-green-700 font-medium cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Ratings</span>
              </button>
            </div>

            {/* 3 Platforms Score */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                <span className="text-[10px] text-gray-500 block uppercase font-medium">Google Maps</span>
                <span className="text-sm font-semibold text-gray-900 block mt-0.5">
                  {station.platformRatings?.google?.rating || station.rating || 4.7}★
                </span>
                <span className="text-[10px] text-gray-400">({station.platformRatings?.google?.reviewCount || 120})</span>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                <span className="text-[10px] text-gray-500 block uppercase font-medium">Apple Maps</span>
                <span className="text-sm font-semibold text-gray-900 block mt-0.5">
                  {station.platformRatings?.apple?.rating || 4.6}★
                </span>
                <span className="text-[10px] text-gray-400">({station.platformRatings?.apple?.reviewCount || 68})</span>
              </div>

              <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 text-center">
                <span className="text-[10px] text-emerald-700 block uppercase font-medium">EVStay Clients</span>
                <span className="text-sm font-semibold text-emerald-900 block mt-0.5">
                  {station.platformRatings?.evstay?.rating || 4.9}★
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">({station.platformRatings?.evstay?.reviewCount || 42})</span>
              </div>
            </div>

            {/* Experience Breakdown preview */}
            <div className="p-3 bg-gray-50 rounded-xl space-y-2 text-xs text-gray-700">
              <span className="text-[10px] text-gray-500 uppercase font-medium block">
                Experience Category Breakdown
              </span>
              <div className="flex justify-between items-center">
                <span>Charging Experience:</span>
                <span className="font-semibold text-gray-900">
                  {station.reviewsSummary?.categories?.chargingExperience || 4.9} / 5.0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Staff & Valet Assistance:</span>
                <span className="font-semibold text-gray-900">
                  {station.reviewsSummary?.categories?.staffAssistance || 4.8} / 5.0
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Property Experience:</span>
                <span className="font-semibold text-gray-900">
                  {station.reviewsSummary?.categories?.propertyExperience || 4.7} / 5.0
                </span>
              </div>
            </div>

            {/* Sample In-person Reviews Preview */}
            {(station.reviewsSummary?.sampleReviews || []).length > 0 && (
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <span className="text-[10px] text-gray-500 uppercase font-medium flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-gray-400" />
                  <span>Featured In-Person Reviews</span>
                </span>
                {station.reviewsSummary?.sampleReviews?.slice(0, 2).map((rev, i) => (
                  <div key={i} className="text-xs p-2.5 bg-gray-50/70 rounded-lg border border-gray-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{rev.author}</span>
                      <span className="text-[10px] text-amber-600 font-semibold">{rev.rating}★</span>
                    </div>
                    <p className="text-gray-600 font-light italic text-[11px]">"{rev.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Drawer */}
      <StationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={() => {
          loadChargers();
          setIsDrawerOpen(false);
        }}
        editingStation={editingStation}
      />
    </div>
  );
}
