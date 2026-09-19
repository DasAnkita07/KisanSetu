"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-md">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#351903] font-oldenburg">Notifications</h1>
            <p className="text-sm text-[#8A7B58] mt-0.5 font-medium">Important updates about your slots and payments.</p>
          </div>
        </div>
        <button className="text-sm text-[#365006] bg-[#EAF3D8] px-4 py-2 rounded-lg font-bold hover:bg-[#b4d374] transition-colors flex items-center gap-2 shadow-sm">
          <CheckCircle className="w-4 h-4" /> Mark all as read
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl border border-[#D8C867]/60 shadow-lg overflow-hidden relative"
      >
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
        />
        <div className="text-center p-16 bg-[#FAF9F6] relative z-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-[#EAF3D8]">
            <Bell className="w-10 h-10 text-[#b4d374]" />
          </div>
          <h3 className="text-xl font-bold text-[#351903] font-oldenburg">You're All Caught Up!</h3>
          <p className="text-[#8A7B58] mt-2 font-medium">There are no new alerts at the moment.</p>
        </div>
      </motion.div>
    </div>
  );
}
