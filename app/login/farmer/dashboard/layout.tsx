"use client";

import { ReactNode } from "react";
import FarmerSidebar from "@/app/components/farmer/FarmerSidebar";
import FarmerHeader from "@/app/components/farmer/FarmerHeader";

export default function FarmerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F6ED] font-onest relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "600px" }}
      />
      
      <FarmerSidebar />
      <div className="flex-1 flex flex-col max-w-[100vw] relative z-10">
        <FarmerHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
