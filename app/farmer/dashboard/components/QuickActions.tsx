"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const actions = [
  { title: 'Add Crop', desc: 'Add a new crop to your farm profile.', icon: '🌱', path: '/farmer/dashboard/crops?add=true' },
  { title: 'Sell Produce', desc: 'List your produce for procurement.', icon: '🛒', path: '/farmer/dashboard/sell' },
  { title: 'Market Prices', desc: 'Check latest prices in your area.', icon: '📊', path: '/farmer/dashboard/market' },
  { title: 'Live Queue', desc: 'Check your current procurement queue.', icon: '👥', path: '/farmer/dashboard/queue' },
  { title: 'Track Status', desc: 'Track your orders and payments.', icon: '🚚', path: '/farmer/dashboard/track-status' },
];

export default function QuickActions() {
  return (
    <div className="mt-8">
      <h3 className="font-oldenburg text-xl text-[#351903] mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action, idx) => (
          <Link href={action.path} key={action.title} className="block outline-none group">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white rounded-lg p-4 border border-[#D5D0BD] shadow-sm hover:border-[#365006] hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</span>
                <h4 className="font-onest font-semibold text-[#351903] text-sm leading-tight">{action.title}</h4>
              </div>
              <p className="font-onest text-[#351903]/70 text-xs leading-relaxed">
                {action.desc}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
