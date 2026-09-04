"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Compass,
  MapPin,
  Zap,
  Star,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'Map Onboarder',
    href: '/a/admin000',
    icon: Compass,
    exact: true
  },
  {
    name: 'Charging Stations',
    href: '/a/admin000/stations',
    icon: MapPin
  },
  {
    name: 'Connectors & Guns',
    href: '/a/admin000/connectors',
    icon: Zap
  },
  {
    name: 'Platform Ratings',
    href: '/a/admin000/ratings',
    icon: Star
  },
  {
    name: 'Call Leads',
    href: '/a/admin000/leads',
    icon: PhoneCall
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isItemActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col justify-between z-30 shrink-0 select-none relative ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Logo & Toggle Header */}
        <div className="h-16 flex items-center px-5 justify-between border-b border-gray-100">
          {!isCollapsed ? (
            <Link href="/a/admin000" className="flex items-center space-x-2.5">
              <img src="/images/logo-icon.png" alt="EVSTAY logo" className="w-9 h-9 object-contain" />
              <span className="font-semibold text-sm tracking-tight text-gray-950 uppercase">
                EVSTAY ADMIN
              </span>
            </Link>
          ) : (
            <Link href="/a/admin000" className="w-full flex items-center justify-center">
              <img src="/images/logo-icon.png" alt="EVSTAY logo" className="w-8 h-8 object-contain" />
            </Link>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3.5 top-5 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-500 hover:text-gray-900 cursor-pointer transition-all z-40"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-green-50/80 text-green-700 font-medium shadow-2xs border border-green-100'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50 font-normal'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-green-600' : 'text-gray-400'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: '/a/admin000/login' })}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm text-gray-600 hover:text-red-600 hover:bg-red-50/60 font-normal transition-colors cursor-pointer"
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-red-600" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
