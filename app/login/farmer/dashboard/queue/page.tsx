"use client";

import { motion } from "framer-motion";
import { ListOrdered, Clock, MapPin, Search, Wheat } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyQueuePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#365006] text-white flex items-center justify-center shadow-lg">
          <ListOrdered className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#351903] font-oldenburg">My Queue Status</h1>
          <p className="text-sm text-[#8A7B58] mt-0.5 font-medium">Track your live position at the procurement centre.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-[#D8C867]/60 shadow-xl overflow-hidden"
      >
        <div className="relative bg-[#365006] p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-8 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
          />
          
          <div className="relative z-10 w-full sm:w-auto text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0E383]/20 border border-[#F0E383]/30 text-[#F0E383] text-[10px] font-bold uppercase tracking-widest mb-3">
              <Wheat className="w-3 h-3" /> Live Gate Position
            </div>
            <div className="flex items-baseline justify-center sm:justify-start gap-3">
              <span className="text-6xl sm:text-7xl font-black font-oldenburg text-white drop-shadow-md">#12</span>
              <span className="text-[#EAF3D8] text-lg font-medium">in queue</span>
            </div>
          </div>
          
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 w-full sm:w-72 text-sm border border-white/20 shadow-inner">
            <div className="flex justify-between items-center gap-8 mb-3 pb-3 border-b border-white/10">
              <span className="text-[#EAF3D8] font-medium">Token No.</span>
              <span className="font-bold text-lg text-[#F0E383] font-oldenburg">TKN-9823-A</span>
            </div>
            <div className="flex justify-between items-center gap-8 mb-3 pb-3 border-b border-white/10">
              <span className="text-[#EAF3D8] font-medium">Est. Wait</span>
              <span className="font-bold text-white">~45 mins</span>
            </div>
            <div className="flex justify-between items-center gap-8">
              <span className="text-[#EAF3D8] font-medium">Currently Serving</span>
              <span className="font-bold text-white">#4</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 bg-[#FAF9F6]">
          <h3 className="text-sm font-bold text-[#8A7B58] uppercase tracking-widest mb-6">Journey to Gate</h3>
          
          <div className="relative border-l-2 border-[#b4d374] ml-4 space-y-10 pb-4">
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-[3px] border-[#FAF9F6] bg-[#365006] shadow-sm"></div>
              <h4 className="font-bold text-[#351903] text-lg font-oldenburg">Arrived at Centre</h4>
              <p className="text-sm text-[#8A7B58] mt-1 font-medium">Token verified at entrance gate.</p>
              <span className="text-xs text-[#365006] font-bold mt-2 inline-block bg-[#EAF3D8] px-3 py-1 rounded-full">10:15 AM</span>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-[3px] border-[#FAF9F6] bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"></div>
              <h4 className="font-bold text-[#351903] text-lg font-oldenburg">Waiting for Quality Check</h4>
              <p className="text-sm text-[#8A7B58] mt-1 font-medium">Please wait in the holding area until called.</p>
              <span className="text-xs text-amber-700 font-bold mt-2 inline-block bg-amber-100 px-3 py-1 rounded-full border border-amber-200">In Progress</span>
            </div>
            
            <div className="relative pl-8 opacity-50">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-[3px] border-[#FAF9F6] bg-[#C9C4B2]"></div>
              <h4 className="font-bold text-[#8A7B58] text-lg font-oldenburg">Weighbridge Allocation</h4>
              <p className="text-sm text-[#8A7B58] mt-1 font-medium">Vehicle will be directed to weighbridge bay.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
