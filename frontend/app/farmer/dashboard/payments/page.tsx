"use client";

import React from 'react';
import { useKisanData } from '../services/useDataHooks';
import { motion } from 'framer-motion';

export default function PaymentsPage() {
  const { payments } = useKisanData();

  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadReceipt = (id: string) => {
    // Mock downloading a receipt
    alert(`Downloading receipt for transaction ${id}...`);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Payments & Earnings</h1>
        <p className="font-onest text-sm text-[#351903]/70">Track your procurement payments and download receipts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#365006] text-white rounded-xl p-6 shadow-sm">
          <p className="font-onest text-sm text-white/80 font-semibold mb-2 uppercase tracking-wider">Total Earnings</p>
          <h2 className="font-oldenburg text-4xl">₹{totalEarnings.toLocaleString('en-IN')}</h2>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-[#D5D0BD] rounded-xl p-6 shadow-sm">
          <p className="font-onest text-sm text-[#351903]/60 font-semibold mb-2 uppercase tracking-wider">Paid Amount</p>
          <h2 className="font-oldenburg text-4xl text-[#351903]">₹{totalPaid.toLocaleString('en-IN')}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white border border-[#FDEBBE] rounded-xl p-6 shadow-sm">
          <p className="font-onest text-sm text-[#9A7314] font-semibold mb-2 uppercase tracking-wider">Pending Amount</p>
          <h2 className="font-oldenburg text-4xl text-[#9A7314]">₹{totalPending.toLocaleString('en-IN')}</h2>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E9DDBD] bg-[#F9FAF6]">
          <h3 className="font-oldenburg text-xl text-[#351903]">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead className="bg-[#F9FAF6]">
              <tr className="border-b border-[#E9DDBD] text-[#351903]/70">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Crop</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => {
                const date = new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                return (
                  <motion.tr 
                    key={p.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + idx * 0.1 }}
                    className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]"
                  >
                    <td className="px-6 py-4 text-[#351903]">{date}</td>
                    <td className="px-6 py-4 font-semibold text-[#351903]">{p.crop}</td>
                    <td className="px-6 py-4 font-semibold text-[#365006]">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === 'Paid' ? 'bg-[#E3F2E3] text-[#1E5D1E]' : 'bg-[#FFF7E3] text-[#9A7314]'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="text-[#365006] font-semibold hover:underline text-xs">View</button>
                        {p.status === 'Paid' && (
                          <button onClick={() => handleDownloadReceipt(p.id)} className="text-[#351903]/60 hover:text-[#365006] font-semibold text-xs transition">
                            Download Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#351903]/50">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
