"use client";

import { motion } from "framer-motion";
import { User, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-md">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#351903] font-oldenburg">Farmer Profile</h1>
          <p className="text-sm text-[#8A7B58] mt-0.5 font-medium">Manage your personal details and Aadhaar verification.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1 bg-white p-8 rounded-3xl border border-[#D8C867]/60 shadow-lg text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-[#365006]"></div>
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-[#365006] mb-4 relative z-10 border-4 border-white shadow-xl mt-4">
            <span className="text-4xl font-black font-oldenburg">RK</span>
          </div>
          <h2 className="text-2xl font-bold text-[#351903] font-oldenburg mt-2">Ramesh Kumar</h2>
          <p className="text-sm text-[#8A7B58] font-bold uppercase tracking-widest mt-1">ID: KISAN-8921</p>
          
          <div className="mt-6 pt-6 border-t border-[#D8C867]/30">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 shadow-sm">
              <ShieldCheck className="w-4 h-4" /> Pending e-KYC
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-[#D8C867]/60 shadow-lg relative overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
            style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
          />
          <h3 className="text-xl font-bold text-[#351903] font-oldenburg border-b-2 border-[#EAF3D8] pb-4 mb-6 relative z-10">Verified Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#D8C867]/30">
              <p className="text-xs text-[#8A7B58] uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#365006]" /> Registered Mobile
              </p>
              <p className="font-black text-lg text-[#351903]">+91 98765 43210</p>
            </div>
            
            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#D8C867]/30">
              <p className="text-xs text-[#8A7B58] uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#365006]" /> District
              </p>
              <p className="font-black text-lg text-[#351903]">Purba Bardhaman</p>
            </div>

            <div className="sm:col-span-2 bg-[#F0E383]/20 p-5 rounded-2xl border border-[#F0E383]/50">
               <p className="text-xs text-[#8A7B58] uppercase tracking-wider font-bold mb-2">Primary Crop Registered</p>
               <p className="font-black text-lg text-[#365006] font-oldenburg">Wheat (Sharbati)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
