"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useKisanData } from '../services/useDataHooks';

export default function Hero() {
  const { profile } = useKisanData();
  
  // Format current date "14 Apr 2026 | 10:24 AM"
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden shadow-sm border border-[#D5D0BD] bg-white flex"
    >
      {/* Background landscape (simulated with a gradient/color overlay since we don't have the exact image asset) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F9FAF6] via-[#F9FAF6] to-transparent z-0" />
      <div 
        className="absolute inset-y-0 right-0 w-2/3 md:w-1/2 bg-cover bg-left z-0"
        style={{ backgroundImage: "url('/bgsketch.png')", opacity: 0.8 }}
      />
      {/* We can use a solid green tint on the right if image is missing */}
      <div className="absolute inset-y-0 right-0 w-2/3 md:w-1/2 bg-[#365006]/10 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-8 md:px-12 w-full md:w-3/5">
        <h2 className="font-oldenburg text-2xl sm:text-3xl lg:text-4xl text-[#351903] leading-snug mb-2 break-words">
          Welcome Back,<br/>{profile?.name || 'Loading...'} <span className="inline-block hover:rotate-12 transition-transform">👋</span>
        </h2>
        
        <p className="font-onest text-[#351903]/70 text-sm sm:text-base mb-4 sm:mb-6 max-w-sm line-clamp-2 sm:line-clamp-none">
          Manage your crops, procurement, orders and payments from one place.
        </p>

        <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-md border border-[#D5D0BD] w-max mb-4 sm:mb-6">
          <span className="text-[#365006] text-base sm:text-lg">📅</span>
          <span className="font-onest text-xs sm:text-sm text-[#351903] font-medium">{dateStr} | {timeStr}</span>
        </div>

        <p className="font-oldenburg text-[#365006] italic text-base sm:text-lg md:text-xl">
          "Good crops today, a brighter tomorrow."
        </p>
      </div>

      {/* Right side Farmer Graphic area */}
      <div className="hidden md:flex relative z-10 w-2/5 h-full items-end justify-end p-4">
        {/* Intentionally left empty to allow the agricultural background sketch to be visible */}
      </div>
    </motion.div>
  );
}
