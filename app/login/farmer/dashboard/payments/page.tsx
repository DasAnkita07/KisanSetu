"use client";

import { motion } from "framer-motion";
import { IndianRupee, ShieldCheck, CheckCircle2, Clock, Landmark, FileText, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function PaymentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Official Govt Portal Header Style */}
      <div className="bg-white border-t-4 border-[#F0E383] shadow-sm rounded-b-xl overflow-hidden mb-8">
        <div className="bg-[#365006] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-4 border-[#b4d374]">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full hidden sm:block">
              <Landmark className="w-8 h-8 text-[#365006]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">Direct Benefit Transfer (DBT) Portal</h1>
              <p className="text-xs sm:text-sm text-[#EAF3D8] font-medium">Department of Food and Public Distribution, Govt. of India</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 bg-white/10 px-4 py-2 rounded-md border border-white/20 text-right">
            <p className="text-[10px] uppercase tracking-wider text-[#EAF3D8]">Farmer ID</p>
            <p className="font-bold font-mono tracking-widest text-white">UP-8923-4410</p>
          </div>
        </div>
        
        {/* Aadhaar Seeding Status */}
        <div className="px-6 py-3 bg-[#FAF9F6] border-b border-[#D8C867]/30 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#365006]" />
            <span className="text-sm font-semibold text-[#8A7B58]">Aadhaar Seeded: <span className="text-[#365006]">YES</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#365006]" />
            <span className="text-sm font-semibold text-[#8A7B58]">Bank Linked: <span className="text-[#351903]">STATE BANK OF INDIA (**** 3042)</span></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#365006]" />
            <span className="text-sm font-semibold text-[#8A7B58]">PFMS Status: <span className="text-[#365006]">ACTIVE</span></span>
          </div>
        </div>
      </div>

      {/* Official Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Remittance Processed", value: ",1 1,45,200", subtitle: "Financial Year 2026-27", color: "text-[#365006]", border: "border-[#365006]" },
          { label: "Pending with Treasury", value: ",1 0", subtitle: "Under PFMS clearance", color: "text-amber-600", border: "border-amber-500" },
          { label: "Failed Transactions", value: ",1 0", subtitle: "Requires bank branch visit", color: "text-red-600", border: "border-red-500" }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white p-5 rounded-lg border-l-4 ${stat.border} shadow-sm border-y border-r border-gray-200`}
          >
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
            <p className={`text-2xl font-bold font-mono tracking-tight ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-[10px] text-gray-400 font-semibold">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Strict Tabular Transaction History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden mt-6"
      >
        <div className="bg-gray-100 border-b border-gray-300 px-6 py-4 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            DBT Ledger & Payment Advices
          </h2>
          <button className="text-xs bg-white border border-gray-300 px-3 py-1.5 rounded text-gray-700 font-semibold hover:bg-gray-50">
            Download PDF Statement
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-300 text-[11px] uppercase tracking-wider text-gray-600 font-bold">
                <th className="p-4 whitespace-nowrap">Date of Credit</th>
                <th className="p-4 whitespace-nowrap">Gate Pass Ref / Crop</th>
                <th className="p-4 whitespace-nowrap">PFMS Transaction ID</th>
                <th className="p-4 whitespace-nowrap text-right">Amount (INR)</th>
                <th className="p-4 whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-700 divide-y divide-gray-200">
              
              {/* Dummy rows for visual dev, can be replaced by map */}
              <tr className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 whitespace-nowrap font-mono text-xs">18-SEP-2026</td>
                <td className="p-4">
                  <span className="block text-gray-900">GP-2026-89112</span>
                  <span className="text-[10px] text-gray-500 uppercase">Wheat (500 KG)</span>
                </td>
                <td className="p-4 font-mono text-xs text-gray-500">PFMS-CR-992837110</td>
                <td className="p-4 font-mono text-right text-gray-900 font-bold">11,375.00</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Credited
                  </span>
                </td>
              </tr>
              
              <tr className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 whitespace-nowrap font-mono text-xs">12-SEP-2026</td>
                <td className="p-4">
                  <span className="block text-gray-900">GP-2026-88402</span>
                  <span className="text-[10px] text-gray-500 uppercase">Paddy (1200 KG)</span>
                </td>
                <td className="p-4 font-mono text-xs text-gray-500">PFMS-CR-992815523</td>
                <td className="p-4 font-mono text-right text-gray-900 font-bold">26,196.00</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Credited
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-blue-50/50 transition-colors bg-amber-50/30">
                <td className="p-4 whitespace-nowrap font-mono text-xs">10-SEP-2026</td>
                <td className="p-4">
                  <span className="block text-gray-900">GP-2026-87991</span>
                  <span className="text-[10px] text-gray-500 uppercase">Wheat (200 KG)</span>
                </td>
                <td className="p-4 font-mono text-xs text-gray-500">Pending generation</td>
                <td className="p-4 font-mono text-right text-gray-900 font-bold">4,550.00</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider border border-amber-200">
                    <Clock className="w-3 h-3" /> In Process
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs text-gray-500 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <p>Disclaimer: Payments are processed via the Public Financial Management System (PFMS). It may take up to 48 working hours for credited amounts to reflect in your bank passbook. For discrepancies, quote the PFMS Transaction ID at your nearest Mandi helpdesk.</p>
        </div>
      </motion.div>
    </div>
  );
}
