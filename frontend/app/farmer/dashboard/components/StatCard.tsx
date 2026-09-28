"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  link: string;
  delay?: number;
}

export default function StatCard({ title, value, subtitle, icon, trend, link, delay = 0 }: StatCardProps) {
  return (
    <Link href={link} className="block outline-none group">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white rounded-xl p-5 border border-[#D5D0BD] shadow-sm hover:shadow-md transition-shadow h-full flex items-center gap-5 relative overflow-hidden"
      >
        <div className="w-14 h-14 rounded-full bg-[#F9FAF6] border border-[#E9DDBD] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
          {icon}
        </div>
        
        <div className="flex-1">
          <p className="font-onest text-xs font-semibold text-[#351903]/60 tracking-wider uppercase mb-1">{title}</p>
          <h3 className="font-oldenburg text-3xl text-[#351903] leading-none mb-1">{value}</h3>
          <div className="flex items-center gap-1.5">
            {trend === 'up' && <span className="text-green-600 text-xs">↑</span>}
            {trend === 'down' && <span className="text-red-600 text-xs">↓</span>}
            <p className="font-onest text-xs text-[#351903]/70">{subtitle}</p>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#365006] text-xl">
          →
        </div>
      </motion.div>
    </Link>
  );
}
