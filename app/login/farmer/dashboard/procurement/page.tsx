"use client";

import { motion } from "framer-motion";
import { Wheat, FileText } from "lucide-react";

export default function MyProcurementPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F0E383] text-[#365006] flex items-center justify-center shadow-md">
          <Wheat className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#351903] font-oldenburg">My Procurement</h1>
          <p className="text-sm text-[#8A7B58] mt-0.5 font-medium">View your crop procurement history and generated receipts.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-[#D8C867]/60 shadow-lg p-6 sm:p-10 relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
        />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
          <h2 className="text-xl font-bold text-[#351903] font-oldenburg">Recent Transactions</h2>
          <select className="px-5 py-3 bg-[#FAF9F6] border-2 border-[#D8C867]/50 rounded-xl text-sm font-bold text-[#351903] outline-none focus:border-[#365006] shadow-sm">
            <option>All Crops</option>
            <option>Wheat</option>
            <option>Rice</option>
          </select>
        </div>

        <div className="text-center p-12 bg-[#FAF9F6] border-2 border-[#EAF3D8] border-dashed rounded-3xl relative z-10">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#D8C867]/30">
            <FileText className="w-8 h-8 text-[#C9C4B2]" />
          </div>
          <h3 className="text-lg font-bold text-[#351903] font-oldenburg">No Procurement History Yet</h3>
          <p className="text-[#8A7B58] mt-2 max-w-sm mx-auto font-medium">Your verified weight receipts and crop details will appear here once the gate passes are processed.</p>
        </div>
      </motion.div>
    </div>
  );
}
