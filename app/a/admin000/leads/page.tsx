"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/component/admin/AdminHeader';
import { LeadData } from '@/lib/types';
import {
  PhoneCall,
  Search,
  RefreshCw,
  Globe,
  Clock,
  Trash2,
  Building,
  CheckCircle2,
  Filter,
  Calendar,
  X,
  CheckSquare,
  Square
} from 'lucide-react';

export default function AdminLeadsPage() {
  const { status } = useSession();
  const router = useRouter();

  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Protect route
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/a/admin000/login');
    }
  }, [status, router]);

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/leads', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setLeads(json.data);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      loadLeads();
    }
  }, [status]);

  // Unique list of target station names for station filter dropdown
  const uniqueStations = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.stationName) set.add(l.stationName);
    });
    return Array.from(set).sort();
  }, [leads]);

  // Filtered leads based on search, station, and date range
  const filteredLeads = useMemo(() => {
    return leads.filter((item) => {
      // 1. Search Query filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesQuery =
          item.stationName.toLowerCase().includes(q) ||
          item.ipAddress.toLowerCase().includes(q) ||
          (item.action && item.action.toLowerCase().includes(q)) ||
          (item.phone && item.phone.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. Target Station filter
      if (selectedStation !== 'ALL' && item.stationName !== selectedStation) {
        return false;
      }

      // 3. Date range filter
      if (item.createdAt) {
        const leadDate = new Date(item.createdAt).getTime();

        if (fromDate) {
          const fromTime = new Date(`${fromDate}T00:00:00`).getTime();
          if (leadDate < fromTime) return false;
        }

        if (toDate) {
          const toTime = new Date(`${toDate}T23:59:59.999`).getTime();
          if (leadDate > toTime) return false;
        }
      }

      return true;
    });
  }, [leads, searchQuery, selectedStation, fromDate, toDate]);

  // Select all logic
  const isAllSelected = useMemo(() => {
    if (filteredLeads.length === 0) return false;
    return filteredLeads.every((l) => selectedIds.includes(l.id));
  }, [filteredLeads, selectedIds]);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      // Unselect all filtered leads
      const filteredIds = new Set(filteredLeads.map((l) => l.id));
      setSelectedIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      // Select all filtered leads
      const filteredIds = filteredLeads.map((l) => l.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSingleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead entry?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to delete lead');
      }

      setLeads((prev) => prev.filter((l) => l.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      setToastMessage({ type: 'success', text: 'Lead entry deleted successfully' });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected lead entry(s)?`)) return;

    try {
      setIsDeletingBulk(true);
      const res = await fetch('/api/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to bulk delete leads');
      }

      const deletedSet = new Set(selectedIds);
      setLeads((prev) => prev.filter((l) => !deletedSet.has(l.id)));
      setSelectedIds([]);
      setToastMessage({
        type: 'success',
        text: `Successfully deleted ${json.count || selectedIds.length} lead entry(s)`
      });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsDeletingBulk(false);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStation('ALL');
    setFromDate('');
    setToDate('');
  };

  const hasActiveFilters = searchQuery !== '' || selectedStation !== 'ALL' || fromDate !== '' || toDate !== '';

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 text-sm">
        Loading Admin Leads Center...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">

      <main className="flex-1 p-4 sm:p-8 w-full mx-auto space-y-6">

        {/* Toast Alert */}
        {toastMessage && (
          <div
            className={`p-4 rounded-2xl text-xs font-medium border shadow-xs flex items-center justify-between animate-in fade-in ${
              toastMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <span>{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-gray-700">
              ✕
            </button>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-950">Call Lead Tracker</h2>
              <p className="text-xs text-gray-500 font-normal">
                {filteredLeads.length} of {leads.length} total call inquiry leads
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isDeletingBulk}
                className="h-10 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}

            <button
              onClick={loadLeads}
              className="h-10 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Comprehensive Filters Bar */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-900 uppercase">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>Filters & Search</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Target Station Filter Dropdown */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5">
                Target Station
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className="h-10 w-full pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-normal text-gray-900 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer appearance-none"
                >
                  <option value="ALL">All Stations ({uniqueStations.length})</option>
                  {uniqueStations.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. From Date Filter */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5">
                Date From
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="h-10 w-full pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-normal text-gray-900 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* 3. To Date Filter */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5">
                Date To
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="h-10 w-full pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-normal text-gray-900 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* 4. Search Keyword Input */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search IP, Station, Action..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-normal text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        {isLoading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400 text-xs border border-gray-200">
            Fetching call lead records...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">No Call Leads Match Filters</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your station selection, date range, or search terms to view logged lead records.
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/90 border-b border-gray-100 text-gray-500 font-semibold uppercase text-xs">
                  <tr>
                    {/* Checkbox Select All */}
                    <th className="py-4 px-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                        title="Select All Filtered Leads"
                      />
                    </th>

                    {/* Exactly requested columns: Target Station, Caller IP Address, Timestamp, Action */}
                    <th className="py-4 px-5">Target Station</th>
                    <th className="py-4 px-4">Caller IP Address</th>
                    <th className="py-4 px-4">Timestamp</th>
                    <th className="py-4 px-5 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-normal text-gray-800">
                  {filteredLeads.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    const formattedDate = item.createdAt
                      ? new Date(item.createdAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })
                      : 'N/A';

                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors ${
                          isSelected ? 'bg-emerald-50/40' : 'hover:bg-gray-50/70'
                        }`}
                      >
                        {/* Checkbox row select */}
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(item.id)}
                            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                          />
                        </td>

                        {/* 1. Target Station */}
                        <td className="py-4 px-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                              <Building className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-semibold text-gray-950 block text-sm capitalize max-w-40 truncate">
                                {item.stationName}
                              </span>
                              {item.phone && (
                                <span className="text-xs text-gray-400 block mt-0.5">
                                  {item.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 2. Caller IP Address */}
                        <td className="py-4 px-4">
                          <div className="inline-flex items-center space-x-1.5 bg-gray-100/90 px-2.5 py-1 rounded-lg font-mono text-xs text-gray-700 border border-gray-200">
                            <Globe className="w-3 h-3 text-emerald-600" />
                            <span>{item.ipAddress || '127.0.0.1'}</span>
                          </div>
                        </td>

                        {/* 3. Timestamp */}
                        <td className="py-4 px-4 text-gray-600">
                          <div className="flex items-center space-x-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className="font-medium text-xs">{formattedDate}</span>
                          </div>
                        </td>

                        {/* Delete Action Button */}
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleSingleDelete(item.id)}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Lead Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

