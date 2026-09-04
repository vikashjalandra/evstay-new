"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/a/admin000') return 'Interactive Map Onboarder';
    if (pathname.startsWith('/a/admin000/stations')) return 'Charging Stations Directory';
    if (pathname.startsWith('/a/admin000/connectors')) return 'Connectors & Live Guns';
    if (pathname.startsWith('/a/admin000/ratings')) return 'Platform Ratings & Reviews';
    if (pathname.startsWith('/a/admin000/leads')) return 'Call Leads Tracker';
    return 'Control Center';
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
      <div className="flex items-center space-x-2 text-xs text-gray-500 font-normal">
        <span>Control Center</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">{getPageTitle()}</span>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/map"
          target="_blank"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors"
        >
          <span>Public Live Map</span>
          <ExternalLink className="w-3 h-3 text-gray-500" />
        </Link>

        <div className="h-4 w-px bg-gray-200" />

        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 font-medium text-xs flex items-center justify-center border border-green-200">
            A
          </div>
          <span className="text-xs font-medium text-gray-700 hidden sm:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}
