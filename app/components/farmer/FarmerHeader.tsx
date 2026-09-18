"use client";

import { Bell, Search } from "lucide-react";

export default function FarmerHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#F8F6ED]/90 backdrop-blur-md border-b border-[#D8C867]/50 lg:pl-6 pl-16">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7B58]" />
          <input
            type="text"
            placeholder="Search bookings, payments..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#D8C867] rounded-full text-sm font-medium text-[#351903] focus:outline-none focus:ring-2 focus:ring-[#365006]/30 focus:border-[#365006] transition-all shadow-sm placeholder:text-[#C9C4B2]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5 ml-4">
        <button className="relative p-2.5 text-[#8A7B58] bg-white border border-[#D8C867]/60 hover:bg-[#F0E383] hover:text-[#365006] hover:border-[#F0E383] rounded-full transition-all shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-5 border-l border-[#D8C867]/50">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#351903]">Ramesh Kumar</p>
            <p className="text-xs text-[#8A7B58] font-medium">Verified Farmer</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#365006] border-2 border-[#F0E383] flex items-center justify-center text-[#F0E383] font-bold shadow-md">
            RK
          </div>
        </div>
      </div>
    </header>
  );
}
