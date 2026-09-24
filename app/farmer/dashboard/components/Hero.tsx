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
      className="relative w-full h-[290px] sm:h-[450px] rounded-xl overflow-hidden shadow-sm border border-[#D5D0BD] bg-white flex"
    >
      <section
        className="w-full min-h-[200px] sm:min-h-[200px] md:min-h-[420px] lg:min-h-[450px] relative overflow-hidden bg-cover bg-[66%_center] md:bg-center border-b border-[#E2D5B5]"
          style={{
            backgroundImage: "url('/farmerDashboard.png')",
          }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4">

          {/* Welcome Text */}
          <div className="max-w-xl">
            <h1 className="text-lg md:text-4xl font-bold text-[#2A3E05] flex items-center gap-2 font-oldenburg tracking-tight mt-7 md:mt-24">
              Welcome, Rajesh Kumar <span className="inline-block animate-pulse">👋</span>
            </h1>
            <p className="text-[#556934] text-xs sm:text-base font-medium">
               "Here's what's happening across KisanSetu today."
            </p>

            {/* Date & Time Pill */}
            <div className="mt-7 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#D5C69F] px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#483313] shadow-xs">
              <svg className="w-4 h-4 text-[#344E06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>14 Apr 2026</span>
              <span className="text-gray-300">|</span>
              <span>10:24 AM</span>
            </div>
          </div>

        </div>

        {/* Subtle Decorative Landscape Grass Overlay at base */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#344E06]/10 to-transparent pointer-events-none" />
      </section>
    </motion.div>
  );
}
