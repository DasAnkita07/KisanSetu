"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <main className="h-screen w-full bg-slate-50 relative flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. TOP GREEN ARC: Morphs seamlessly from page 3's bottom curtain */}
      <motion.div
        layoutId="green-header"
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[11vh] bg-[#365006] z-20 shadow-md shrink-0"
      />

      {/* 2. DASHBOARD CONTENT CONTAINER */}
      <div className="flex-1 z-10 flex flex-col items-center justify-center p-6 text-center">
        {/* Placeholder for your upcoming dashboard content */}
      </div>

      {/* 3. BOTTOM YELLOW STRIP: Morphs smoothly from the GET STARTED button */}
      <motion.div
        layoutId="yellow-bar"
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-9 bg-[#F0E383] border-t border-[#d8c867] z-30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] shrink-0"
      />

    </main>
  );
}