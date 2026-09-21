"use client";

import React, { useState } from 'react';
import { useKisanData } from '../services/useDataHooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function MarketPricesPage() {
  const { market } = useKisanData();
  const searchParams = useSearchParams();
  const highlightCrop = searchParams.get('crop');

  const [selectedCrop, setSelectedCrop] = useState<string | null>(
    highlightCrop ? highlightCrop : null
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Market Prices</h1>
        <p className="font-onest text-sm text-[#351903]/70">Track live procurement prices and demand across government centers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden h-fit">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-onest text-sm">
              <thead className="bg-[#F9FAF6]">
                <tr className="border-b border-[#E9DDBD] text-[#351903]/70">
                  <th className="px-6 py-4 font-semibold">Crop</th>
                  <th className="px-6 py-4 font-semibold">Current Price</th>
                  <th className="px-6 py-4 font-semibold">Change</th>
                  <th className="px-6 py-4 font-semibold">Demand</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {market.map((m) => (
                  <motion.tr 
                    key={m.id} 
                    className={`border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6] transition-colors cursor-pointer ${selectedCrop?.toLowerCase() === m.crop.toLowerCase() ? 'bg-[#F9FAF6] ring-1 ring-inset ring-[#365006]' : ''}`}
                    onClick={() => setSelectedCrop(m.crop.toLowerCase())}
                  >
                    <td className="px-6 py-4 font-semibold text-[#351903]">{m.crop}</td>
                    <td className="px-6 py-4 text-[#351903]">₹{m.currentPrice}/kg</td>
                    <td className={`px-6 py-4 font-medium ${m.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {m.change > 0 ? '+' : ''}₹{m.change}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        m.demand === 'High' ? 'bg-[#D1F0E0] border-[#A3E0C1] text-[#0A6B36]' :
                        m.demand === 'Medium' ? 'bg-[#FDF2D9] border-[#FBE6B1] text-[#9A7314]' :
                        'bg-[#FDE2E2] border-[#FBC5C5] text-[#A61A1A]'
                      }`}>
                        {m.demand}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#365006] font-semibold hover:underline text-sm">View Details</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Details Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedCrop ? (() => {
              const data = market.find(m => m.crop.toLowerCase() === selectedCrop);
              if (!data) return null;
              return (
                <motion.div 
                  key={data.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-6 sticky top-24"
                >
                  <div className="flex items-center justify-between border-b border-[#E9DDBD] pb-4 mb-4">
                    <h3 className="font-oldenburg text-2xl text-[#351903]">{data.crop}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        data.demand === 'High' ? 'bg-[#D1F0E0] text-[#0A6B36]' :
                        data.demand === 'Medium' ? 'bg-[#FDF2D9] text-[#9A7314]' :
                        'bg-[#FDE2E2] text-[#A61A1A]'
                    }`}>
                      {data.demand} Demand
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="font-onest text-sm text-[#351903]/60 uppercase tracking-wider mb-1">Current MSP</p>
                    <div className="flex items-end gap-3">
                      <span className="font-oldenburg text-4xl text-[#365006]">₹{data.currentPrice}</span>
                      <span className="font-onest text-[#351903]/60 mb-1">per kg</span>
                    </div>
                    <div className={`mt-2 font-onest text-sm font-semibold flex items-center gap-1 ${data.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.change > 0 ? '↑' : '↓'} ₹{Math.abs(data.change)} from yesterday
                    </div>
                  </div>

                  {/* Mock Chart Area */}
                  <div className="w-full h-32 bg-[#F9FAF6] border border-[#E9DDBD] rounded-lg mb-6 flex items-end px-2 pb-2 gap-2">
                    {[40, 50, 45, 60, 75, 80, 100].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex-1 bg-[#365006]/80 rounded-t-sm"
                      />
                    ))}
                  </div>

                  <div className="bg-[#E3F2E3] border border-[#C8E4C8] rounded-md p-4 mb-6">
                    <h4 className="font-onest font-semibold text-[#1E5D1E] text-sm mb-1">Market Insight</h4>
                    <p className="font-onest text-xs text-[#1E5D1E]/90 leading-relaxed">
                      {data.demand === 'High' 
                        ? `Demand for ${data.crop} is peaking at Haldia and Medinipur centers. Recommended to list produce within the next 48 hours for optimal pricing.` 
                        : `Prices for ${data.crop} are stable. Continue to monitor the trends over the next week.`}
                    </p>
                  </div>

                  <button className="w-full h-12 bg-[#365006] text-white font-onest font-semibold rounded-md hover:bg-[#2d4305] transition shadow-sm">
                    Sell {data.crop} Now
                  </button>
                </motion.div>
              );
            })() : (
              <div className="bg-[#F9FAF6] rounded-xl border border-[#D5D0BD] shadow-sm p-6 h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-4 opacity-50">📈</span>
                <p className="font-onest text-[#351903]/60">Select a crop from the table to view detailed market insights and price trends.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
