"use client";

import { motion } from "framer-motion";
import { HelpCircle, PhoneCall, Mail, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-md">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#351903] font-oldenburg">Help & Support</h1>
          <p className="text-sm text-[#8A7B58] mt-0.5 font-medium">Get assistance with your procurement and payments.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#365006] p-8 sm:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
          />
          <PhoneCall className="w-12 h-12 mb-6 text-[#F0E383] relative z-10" />
          <h3 className="text-2xl font-bold mb-2 font-oldenburg relative z-10">Kisan Helpline</h3>
          <p className="text-[#EAF3D8] font-medium mb-8 relative z-10 max-w-xs">Available 6:00 AM to 10:00 PM everyday for immediate assistance.</p>
          <a href="tel:18001801551" className="inline-block px-6 py-3 bg-[#F0E383] text-[#365006] font-black rounded-xl text-lg hover:bg-white transition-all shadow-lg relative z-10">
            1800-180-1551
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8C867]/60 shadow-lg"
        >
          <MessageSquare className="w-12 h-12 mb-6 text-[#C9C4B2]" />
          <h3 className="text-2xl font-bold text-[#351903] mb-2 font-oldenburg">Write to Us</h3>
          <p className="text-[#8A7B58] font-medium mb-8 max-w-xs">Send us a message and our support team will respond within 24 hours.</p>
          <button className="px-6 py-3 bg-[#FAF9F6] border-2 border-[#D8C867]/50 text-[#351903] font-bold rounded-xl text-lg hover:bg-[#F0E383] hover:border-[#F0E383] transition-all shadow-sm w-full text-center">
            Open Support Ticket
          </button>
        </motion.div>
      </div>
    </div>
  );
}
