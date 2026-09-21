"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/farmer/dashboard', icon: '🏠' },
  { name: 'My Profile', path: '/farmer/dashboard/profile', icon: '👤' },
  { name: 'My Crops', path: '/farmer/dashboard/crops', icon: '🌱' },
  { name: 'Market Prices', path: '/farmer/dashboard/market', icon: '📊' },
  { name: 'Sell Produce', path: '/farmer/dashboard/sell', icon: '🛒' },
  { name: 'Slot Booking', path: '/farmer/dashboard/slot-booking', icon: '📅' },
  { name: 'Live Queue', path: '/farmer/dashboard/queue', icon: '👥' },
  { name: 'Orders', path: '/farmer/dashboard/orders', icon: '📦' },
  { name: 'Payments', path: '/farmer/dashboard/payments', icon: '💳' },
  { name: 'Track Status', path: '/farmer/dashboard/track-status', icon: '🚚' },
  { name: 'Crop Assistant (AI)', path: '/farmer/dashboard/crop-assistant', icon: '🤖' },
  { name: 'Voice Assistant', path: '/farmer/dashboard/voice-assistant', icon: '🎙️' },
  { name: 'Notifications', path: '/farmer/dashboard/notifications', icon: '🔔' },
];

const BOTTOM_ITEMS = [
  { name: 'Help & Support', path: '/farmer/dashboard/help', icon: '❓' },
  { name: 'Settings', path: '/farmer/dashboard/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderLink = (item: { name: string, path: string, icon: string }) => {
    const isActive = pathname === item.path || (item.path !== '/farmer/dashboard' && pathname.startsWith(item.path));
    
    return (
      <Link href={item.path} key={item.name} className="relative block px-4 py-3 mb-1 outline-none">
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-[#E9DDBD]/90 rounded-md"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className={`relative flex items-center gap-3 z-10 transition-colors ${isActive ? 'text-[#351903] font-semibold' : 'text-white hover:text-[#E9DDBD]'}`}>
          <span className="text-lg opacity-80">{item.icon}</span>
          <span className="font-onest text-sm">{item.name}</span>
        </div>
      </Link>
    );
  };

  return (
    <aside className="w-64 h-screen flex-shrink-0 bg-[#365006] flex flex-col overflow-y-auto hidden md:flex sticky top-0 custom-scrollbar shadow-xl z-20">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <img src="/mainLogo.svg" alt="KisanSetu" className="w-10 h-10" />
          <h1 className="font-oldenburg text-white text-2xl tracking-wide leading-none">KisanSetu</h1>
        </div>
        <p className="font-onest text-[10px] text-[#F0E383] pl-1">
          The Digital Bridge for Every Farmer
        </p>
      </div>

      <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
        {NAV_ITEMS.map(renderLink)}
      </nav>

      <div className="px-3 py-4 mt-auto border-t border-[#4A6B0A]">
        {BOTTOM_ITEMS.map(renderLink)}
        
        <Link href="/farmer/login" className="relative block px-4 py-3 outline-none group">
          <div className="relative flex items-center gap-3 z-10 text-white group-hover:text-red-300 transition-colors">
            <span className="text-lg opacity-80">🚪</span>
            <span className="font-onest text-sm">Logout</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
