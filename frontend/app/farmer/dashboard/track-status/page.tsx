"use client";

import React from 'react';
import { useKisanData } from '../services/useDataHooks';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TrackStatusIndex() {
  const { orders } = useKisanData();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Track Status</h1>
        <p className="font-onest text-sm text-[#351903]/70">Track the journey of your listed produce from order to payment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="font-onest text-xs font-semibold text-[#351903]/50 tracking-wider">ORDER ID</span>
                <h3 className="font-oldenburg text-xl text-[#351903]">{order.id}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Processing' ? 'bg-[#E3F2E3] text-[#1E5D1E]' :
                  order.status === 'In Transit' ? 'bg-[#E9F0FD] text-[#1D54A0]' :
                  order.status === 'Completed' ? 'bg-[#F2F2F2] text-[#555]' :
                  'bg-[#FFF7E3] text-[#9A7314]'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 mb-6 flex-1">
              <div className="flex justify-between text-sm font-onest">
                <span className="text-[#351903]/60">Crop:</span>
                <span className="font-medium text-[#351903]">{order.crop} ({order.quantity} {order.unit})</span>
              </div>
              <div className="flex justify-between text-sm font-onest">
                <span className="text-[#351903]/60">Amount:</span>
                <span className="font-medium text-[#365006]">₹{order.amount}</span>
              </div>
              <div className="flex justify-between text-sm font-onest">
                <span className="text-[#351903]/60">Center:</span>
                <span className="font-medium text-[#351903]">{order.center}</span>
              </div>
            </div>

            <Link href={`/farmer/dashboard/track-status/${order.id}`} className="block w-full text-center py-2.5 rounded border border-[#365006] text-[#365006] font-onest font-semibold hover:bg-[#F9FAF6] transition">
              Track Detailed Status
            </Link>
          </motion.div>
        ))}

        {orders.length === 0 && (
          <div className="col-span-full py-12 text-center text-[#351903]/50 bg-white rounded-xl border border-[#D5D0BD]">
            <span className="text-4xl mb-4 block">📦</span>
            <p className="font-onest">No active orders to track.</p>
          </div>
        )}
      </div>
    </div>
  );
}
