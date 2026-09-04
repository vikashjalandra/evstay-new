"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Car
} from 'lucide-react';
import { PropertyDetailData, LiveCharger } from '@/lib/types';

export default function ConnectorsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [chargers, setChargers] = useState<PropertyDetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  // Quick toggle status of an individual gun
  const handleToggleGunStatus = async (station: PropertyDetailData, gunIdx: number, newStatus: 'Available' | 'In Use' | 'Maintenance') => {
    const updatedGuns = [...(station.liveChargers || [])];
    updatedGuns[gunIdx] = { ...updatedGuns[gunIdx], status: newStatus };

    const updatedStation = { ...station, liveChargers: updatedGuns };

    try {
      const res = await fetch(`/api/chargers/${station.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStation),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update connector status');
      }

      setChargers(prev => prev.map(c => c.id === station.id ? json.data : c));
      setToastMessage({
        type: 'success',
        text: `Status updated for ${station.name} - ${updatedGuns[gunIdx].power || updatedGuns[gunIdx].name} to "${newStatus}"`
      });
      setTimeout(() => setToastMessage(null), 2500);
    } catch (err: any) {
      setToastMessage({ type: 'error', text: err.message || 'Error updating status' });
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Aggregated totals
  let totalAvailable = 0;
  let totalInUse = 0;
  let totalMaintenance = 0;

  chargers.forEach(st => {
    (st.liveChargers || []).forEach(g => {
      if (g.status === 'Available') totalAvailable++;
      else if (g.status === 'In Use') totalInUse++;
      else totalMaintenance++;
    });
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-gray-950">
            Connectors & Live Guns Telemetry
          </h1>
          <p className="text-gray-500 text-xs mt-0.5 font-light">
            Real-time status monitoring, power distribution, and instant state switching.
          </p>
        </div>

        <button
          onClick={loadChargers}
          className="h-11 px-4 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-gray-950 text-xs font-medium transition-colors shadow-2xs cursor-pointer flex items-center space-x-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-green-600' : ''}`} />
          <span>Refresh Guns</span>
        </button>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Available Guns</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-emerald-600 mt-2">{totalAvailable}</div>
          <span className="text-[11px] text-gray-400 mt-1 block">Ready for EV drivers</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">In Use (Charging)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-amber-600 mt-2">{totalInUse}</div>
          <span className="text-[11px] text-gray-400 mt-1 block">Active charging sessions</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Maintenance</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-red-600 mt-2">{totalMaintenance}</div>
          <span className="text-[11px] text-gray-400 mt-1 block">Offline or servicing</span>
        </div>
      </div>

      {/* Telemetry Station Groups */}
      <div className="space-y-4">
        {chargers.map((station) => (
          <div key={station.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-medium text-sm text-gray-900">{station.name}</h3>
                <span className="text-xs text-gray-500 font-light">{station.address} • {station.category}</span>
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                {station.liveChargers?.length || 0} Connectors
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(station.liveChargers || []).map((gun, idx) => {
                const isAvail = gun.status === 'Available';
                const isInUse = gun.status === 'In Use';

                return (
                  <div
                    key={gun.id || idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isAvail
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : isInUse
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <Zap className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span className="font-semibold text-xs text-gray-950">{gun.power || gun.name}</span>
                      </div>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAvail ? 'bg-emerald-500' : isInUse ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                      />
                    </div>

                    <div className="mt-2 space-y-0.5 text-xs text-gray-600 font-light">
                      <div>
                        Tariff:{' '}
                        <strong className="text-gray-900 font-medium">
                          {gun.tariff
                            ? (gun.tariff.startsWith('₹') ? gun.tariff : `₹${gun.tariff}`)
                            : '₹14/kWh'}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">Change Status:</span>
                      <select
                        value={gun.status}
                        onChange={(e) => handleToggleGunStatus(station, idx, e.target.value as any)}
                        className="h-7 text-[11px] bg-white border border-gray-200 rounded-lg px-2 focus:outline-none focus:border-green-500 cursor-pointer font-medium"
                      >
                        <option value="Available">Available</option>
                        <option value="In Use">In Use</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
