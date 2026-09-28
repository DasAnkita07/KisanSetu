"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useKisanData } from '../services/useDataHooks';

export default function DashboardTables() {
  const { market, crops, orders } = useKisanData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch">
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

{/* Track Your Orders */}
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm h-full flex flex-col"
>
  <div className="px-4 pt-4 pb-2 flex items-center justify-between mb-2">
    <h3 className="font-oldenburg text-lg text-[#351903]">
      Track Your Orders
    </h3>

    <Link
      href="/farmer/dashboard/orders"
      className="font-onest text-xs font-semibold text-[#365006] hover:underline"
    >
      View All →
    </Link>
  </div>

  <div className="overflow-x-auto flex-1">
    <table className="w-full h-full table-fixed text-left font-onest text-sm">
      <thead>
  <tr className="border-b border-[#E9DDBD] text-[#351903]/60">
    <th className="py-2 pl-3 px-2 font-medium w-[19%]">Order ID</th>
    <th className="py-2 px-2 font-medium w-[14%]">Crop</th>
    <th className="py-2 px-2 font-medium w-[17%]">Quantity</th>
    <th className="py-2 px-2 font-medium w-[14%]">Center</th>
    <th className="py-2 px-2 font-medium w-[18%]">Status</th>
    <th className="py-2 pl-2 pr-2 font-medium w-[13%] text-right">Action</th>
  </tr>
</thead>

      <tbody>
        {orders.slice(0, 4).map((o) => (
          <tr
            key={o.id}
            className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]"
          >
            <td className="py-3 pl-3 pr-2 text-[#351903] font-medium text-sm">
              {o.id}
            </td>

            <td className="py-3 text-[#351903] text-sm">
              {o.crop}
            </td>

            <td className="py-3 text-[#351903] text-sm">
              {o.quantity} {o.unit}
            </td>

            <td className="py-3 text-[#351903] text-sm">
              {o.center}
            </td>

            <td className="py-3 text-sm">
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                  o.status === 'Processing'
                    ? 'bg-[#E3F2E3] text-[#365006]'
                    : o.status === 'In Transit'
                    ? 'bg-[#E9F0FD] text-[#1D5A4A]'
                    : o.status === 'Completed'
                    ? 'bg-[#F2F2F2] text-[#555]'
                    : 'bg-[#FFF7E3] text-[#9A7314]'
                }`}
              >
                {o.status}
              </span>
            </td>

            <td className="py-3 pl-2 pr-3 text-right">
              <Link
                href={`/farmer/dashboard/orders/${o.id}`}
                className="text-[#365006] font-semibold text-sm hover:underline"
              >
                Track
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.div>

    </div>
  );
}
