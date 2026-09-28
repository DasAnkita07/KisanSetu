"use client";

import React from 'react';
import { useKisanData } from '../services/useDataHooks';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useKisanData();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">My Orders</h1>
        <p className="font-onest text-sm text-[#351903]/70">Manage and track all your procurement orders.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead className="bg-[#F9FAF6]">
              <tr className="border-b border-[#E9DDBD] text-[#351903]/70">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Crop</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Procurement Center</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <motion.tr 
                  key={o.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}
                  className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]"
                >
                  <td className="px-6 py-4 font-semibold text-[#351903]">{o.id}</td>
                  <td className="px-6 py-4 text-[#351903]">{o.crop}</td>
                  <td className="px-6 py-4 text-[#351903]">{o.quantity} {o.unit}</td>
                  <td className="px-6 py-4 text-[#351903]">{o.center}</td>
                  <td className="px-6 py-4 font-semibold text-[#365006]">₹{o.amount.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                      o.status === 'Processing' ? 'bg-[#E3F2E3] text-[#1E5D1E]' :
                      o.status === 'In Transit' ? 'bg-[#E9F0FD] text-[#1D54A0]' :
                      o.status === 'Completed' ? 'bg-[#F2F2F2] text-[#555]' :
                      'bg-[#FFF7E3] text-[#9A7314]'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/farmer/dashboard/track-status/${o.id}`} className="text-[#365006] font-semibold hover:underline text-xs">
                      Track
                    </Link>
                  </td>
                </motion.tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#351903]/50">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
