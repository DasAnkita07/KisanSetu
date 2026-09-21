"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useKisanData } from '../services/useDataHooks';

export default function TopHeader() {
  const { profile, notifications } = useKisanData();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-16 bg-[#365006] shadow-md flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex-1">
        {/* Mobile menu toggle would go here */}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white hover:text-[#F0E383] transition">
          <span className="text-xl">🌐</span>
        </button>

        <Link href="/farmer/dashboard/notifications" className="relative text-white hover:text-[#F0E383] transition">
          <span className="text-xl">🔔</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:bg-[#2d4305] p-1.5 rounded-lg transition"
          >
            <div className="w-8 h-8 rounded-full bg-[#E9DDBD] flex items-center justify-center font-bold text-[#351903] font-onest">
              {profile?.name?.charAt(0) || 'R'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-onest font-semibold text-white leading-tight">{profile?.name || 'Loading...'}</p>
              <p className="text-[10px] font-onest text-[#F0E383] leading-tight">{profile?.id || 'FRM-...'}</p>
            </div>
            <span className="text-white text-xs ml-1">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
              <Link onClick={() => setShowDropdown(false)} href="/farmer/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F6ED] hover:text-[#365006]">
                My Profile
              </Link>
              <Link onClick={() => setShowDropdown(false)} href="/farmer/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F6ED] hover:text-[#365006]">
                Settings
              </Link>
              <div className="h-[1px] bg-gray-100 my-1" />
              <Link href="/farmer/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
