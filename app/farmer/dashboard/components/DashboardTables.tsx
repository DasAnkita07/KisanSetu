"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useKisanData } from '../services/useDataHooks';

export default function DashboardTables() {
  const { market, crops, orders } = useKisanData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Today's Market Prices */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-oldenburg text-lg text-[#351903]">Today's Market Prices</h3>
          <Link href="/farmer/dashboard/market" className="font-onest text-xs font-semibold text-[#365006] hover:underline flex items-center gap-1">
            View All <span>→</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead>
              <tr className="border-b border-[#E9DDBD] text-[#351903]/60">
                <th className="pb-2 font-medium">Crop</th>
                <th className="pb-2 font-medium">Current Price</th>
                <th className="pb-2 font-medium">Change</th>
                <th className="pb-2 font-medium">Demand</th>
                <th className="pb-2 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {market.slice(0, 5).map((m, i) => (
                <tr key={m.id} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]">
                  <td className="py-3 text-[#351903]">{m.crop}</td>
                  <td className="py-3 font-semibold text-[#351903]">₹{m.currentPrice}/kg</td>
                  <td className={`py-3 font-medium ${m.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {m.change > 0 ? '+' : ''}₹{m.change}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      m.demand === 'High' ? 'bg-[#D1F0E0] text-[#0A6B36]' :
                      m.demand === 'Medium' ? 'bg-[#FDF2D9] text-[#9A7314]' :
                      'bg-[#FDE2E2] text-[#A61A1A]'
                    }`}>
                      {m.demand}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link href={`/farmer/dashboard/market?crop=${m.crop.toLowerCase()}`} className="text-[#365006] font-semibold hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* My Crops */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-oldenburg text-lg text-[#351903]">My Crops</h3>
          <div className="flex items-center gap-3">
            <Link href="/farmer/dashboard/crops?add=true" className="bg-[#365006] text-white px-3 py-1.5 rounded text-xs font-onest font-semibold hover:bg-[#2d4305] transition">
              + Add Crop
            </Link>
            <Link href="/farmer/dashboard/crops" className="font-onest text-xs font-semibold text-[#365006] hover:underline flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead>
              <tr className="border-b border-[#E9DDBD] text-[#351903]/60">
                <th className="pb-2 font-medium">Crop</th>
                <th className="pb-2 font-medium">Quantity</th>
                <th className="pb-2 font-medium">Harvest Date</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {crops.slice(0, 5).map((c) => {
                const date = new Date(c.harvestDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                return (
                  <tr key={c.id} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]">
                    <td className="py-3 text-[#351903]">{c.name}</td>
                    <td className="py-3 text-[#351903]">{c.quantity} {c.unit}</td>
                    <td className="py-3 text-[#351903]/80">{date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        c.status === 'Ready to Sell' ? 'bg-[#E3F2E3] border-[#C8E4C8] text-[#1E5D1E]' :
                        c.status === 'Listed' ? 'bg-[#FFF7E3] border-[#FDEBBE] text-[#9A7314]' :
                        c.status === 'Sold' ? 'bg-[#F2F2F2] border-[#E0E0E0] text-[#555]' :
                        'bg-[#E9F0FD] border-[#C8DDF8] text-[#1D54A0]'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link href={`/farmer/dashboard/crops`} className="text-[#365006] font-semibold hover:underline">View</Link>
                    </td>
                  </tr>
                );
              })}
              {crops.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-[#351903]/50">No crops found. Add your first crop!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Track Your Orders */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-5 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-oldenburg text-lg text-[#351903]">Track Your Orders</h3>
          <Link href="/farmer/dashboard/orders" className="font-onest text-xs font-semibold text-[#365006] hover:underline flex items-center gap-1">
            View All <span>→</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead>
              <tr className="border-b border-[#E9DDBD] text-[#351903]/60">
                <th className="pb-2 font-medium">Order ID</th>
                <th className="pb-2 font-medium">Crop</th>
                <th className="pb-2 font-medium">Quantity</th>
                <th className="pb-2 font-medium">Center</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 4).map((o) => (
                <tr key={o.id} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]">
                  <td className="py-3 font-semibold text-[#351903]">{o.id}</td>
                  <td className="py-3 text-[#351903]">{o.crop}</td>
                  <td className="py-3 text-[#351903]">{o.quantity} {o.unit}</td>
                  <td className="py-3 text-[#351903]">{o.center}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                      o.status === 'Processing' ? 'bg-[#E3F2E3] text-[#1E5D1E]' :
                      o.status === 'In Transit' ? 'bg-[#E9F0FD] text-[#1D54A0]' :
                      o.status === 'Completed' ? 'bg-[#F2F2F2] text-[#555]' :
                      'bg-[#FFF7E3] text-[#9A7314]'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link href={`/farmer/dashboard/track-status/${o.id}`} className="text-[#365006] font-semibold hover:underline">Track</Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-[#351903]/50">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
