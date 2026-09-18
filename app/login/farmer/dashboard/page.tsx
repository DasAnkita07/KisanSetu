"use client";

import { motion } from "framer-motion";
import { Leaf, Clock, TrendingUp, CreditCard, ChevronRight, Wheat, CloudRain, Sun, Calendar, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { label: "Upcoming Slot", value: "Tomorrow", sub: "10:00 AM", icon: Clock, color: "text-[#B18A3D]", bg: "bg-[#F0E383]/30", border: "border-[#D8C867]/50" },
  { label: "Queue Position", value: "Gate Closed", sub: "--", icon: Leaf, color: "text-[#365006]", bg: "bg-[#EAF3D8]", border: "border-[#b4d374]/50" },
  { label: "Total Sold", value: "2,450 kg", sub: "This season", icon: Wheat, color: "text-amber-700", bg: "bg-amber-100", border: "border-amber-200" },
  { label: "Next Payout", value: ",1 45,200", sub: "Processing", icon: CreditCard, color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-200" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function FarmerDashboardOverview() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-6 pb-12 font-onest"
    >
      {/* Hero Welcome Card */}
      <motion.div 
        variants={item}
        className="relative bg-[#365006] rounded-3xl overflow-hidden shadow-xl border border-[#2c4205]"
      >
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
        />
        
        <div className="flex flex-col-reverse md:flex-row items-center justify-between p-8 sm:p-10 relative z-10">
          <div className="md:w-2/3 space-y-4 text-center md:text-left mt-6 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0E383]/20 border border-[#F0E383]/30 text-[#F0E383] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Welcome to KisanSetu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-oldenburg leading-tight">
              Aapka Swagat Hai, <span className="text-[#F0E383]">Ramesh!</span>
            </h1>
            <p className="text-[#EAF3D8] text-sm sm:text-base max-w-md font-medium leading-relaxed">
              Manage your crop procurement, check live queue status, and track instant DBT payments directly from your dashboard.
            </p>
            <div className="pt-2 flex gap-4">
              <Link 
                href="/login/farmer/dashboard/book-slot"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F0E383] text-[#365006] font-bold rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg"
              >
                <span>Book New Slot</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col items-center justify-center gap-4">
            {/* Weather Widget injected into Hero */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-3 text-white">
               <Sun className="w-6 h-6 text-[#F0E383]" />
               <div className="text-left">
                 <p className="text-sm font-bold">28C, Sunny</p>
                 <p className="text-[10px] text-[#EAF3D8] uppercase tracking-wider">Purba Bardhaman</p>
               </div>
            </div>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#F0E383]/20 flex items-center justify-center border-4 border-[#F0E383]/30 backdrop-blur-sm overflow-visible">
               <img 
                  src="/onboardingFarmer.png" 
                  alt="Farmer" 
                  className="w-full h-full object-contain absolute bottom-0 drop-shadow-2xl scale-110 origin-bottom" 
                />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-white p-6 rounded-2xl border ${stat.border} shadow-sm hover:shadow-lg transition-all relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-24 h-24 text-gray-900" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-[#8A7B58] text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-[#351903] font-oldenburg">{stat.value}</p>
              <p className="text-xs text-[#8A7B58] mt-1 font-medium">{stat.sub}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column (Quick Actions & MSP) */}
        <div className="lg:col-span-2 space-y-6">
          
          <motion.div variants={item} className="bg-white rounded-3xl border border-[#D8C867]/60 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-lg bg-[#365006]/10 flex items-center justify-center">
                 <Wheat className="w-5 h-5 text-[#365006]" />
               </div>
               <h2 className="text-xl font-bold text-[#351903] font-oldenburg">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/login/farmer/dashboard/book-slot" className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-[#EAF3D8] bg-[#F8F6ED] hover:bg-[#EAF3D8] hover:border-[#b4d374] transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 text-[#365006]" />
                </div>
                <div>
                  <p className="font-bold text-[#351903] group-hover:text-[#365006] flex items-center gap-2">Book New Slot <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" /></p>
                  <p className="text-xs text-[#8A7B58] mt-1 font-medium">Schedule drop-off at nearest Mandi</p>
                </div>
              </Link>
              <Link href="/login/farmer/dashboard/queue" className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-[#EAF3D8] bg-[#F8F6ED] hover:bg-[#EAF3D8] hover:border-[#b4d374] transition-all cursor-pointer shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 text-[#365006]" />
                </div>
                <div>
                  <p className="font-bold text-[#351903] group-hover:text-[#365006] flex items-center gap-2">View Live Queue <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" /></p>
                  <p className="text-xs text-[#8A7B58] mt-1 font-medium">Track your gate entry status</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* MSP Market Widget */}
          <motion.div variants={item} className="bg-white rounded-3xl border border-[#D8C867]/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#D8C867]/30 bg-[#FAF9F6] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#351903] font-oldenburg">Current MSP Rates (Govt.)</h2>
              <span className="text-xs text-[#365006] font-bold bg-[#EAF3D8] border border-[#b4d374] px-3 py-1.5 rounded-lg">Updated Today</span>
            </div>
            <div className="divide-y divide-[#D8C867]/20">
              {[
                { crop: "Paddy (Common)", rate: ",1 2,183", unit: "per quintal", trend: "+5%", img: "/crops/rice.jpg" },
                { crop: "Wheat", rate: ",1 2,275", unit: "per quintal", trend: "+2%", img: "/crops/wheat.jpg" },
                { crop: "Mustard Seed", rate: ",1 5,450", unit: "per quintal", trend: "0%", img: "/crops/mustard.jpg" },
                { crop: "Maize", rate: ",1 2,090", unit: "per quintal", trend: "+1%", img: "/crops/maize.jpg" },
                { crop: "Potato", rate: ",1 1,500", unit: "per quintal", trend: "-2%", img: "/crops/potato.jpg" },
              ].map((m) => (
                <div key={m.crop} className="p-5 flex justify-between items-center hover:bg-[#FAF9F6] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#EAF3D8] shadow-sm group-hover:scale-110 transition-transform">
                      {/* Using standard img tag to bypass Next Image unconfigured host errors */}
                      <img src={m.img} alt={m.crop} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#351903]">{m.crop}</p>
                      <p className="text-xs text-[#8A7B58] font-medium">{m.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-[#351903]">{m.rate}</p>
                    <p className={`text-[11px] font-bold ${m.trend.startsWith('-') ? 'text-red-500' : m.trend === '0%' ? 'text-gray-400' : 'text-[#365006]'}`}>{m.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (Activity) */}
        <div className="space-y-6">
          <motion.div variants={item} className="bg-white rounded-3xl border border-[#D8C867]/60 shadow-sm p-6 sm:p-8">
             <div className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                 <Bell className="w-5 h-5 text-blue-700" />
               </div>
               <h2 className="text-xl font-bold text-[#351903] font-oldenburg">Recent Activity</h2>
             </div>
             
             <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#D8C867]/50 before:to-transparent">
               
               <div className="relative flex items-start gap-4">
                 <div className="absolute left-2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-[#365006] shadow-sm z-10"></div>
                 <div className="pl-6 w-full">
                   <p className="text-sm font-bold text-[#351903] bg-[#EAF3D8] inline-block px-2 py-0.5 rounded text-[11px] uppercase tracking-wider mb-1">Payment Received</p>
                   <p className="text-xs text-[#8A7B58] mt-1 font-medium">,1 45,200 credited via DBT to your SBI Account.</p>
                   <p className="text-[10px] text-[#C9C4B2] mt-1 font-bold">2 days ago</p>
                 </div>
               </div>
               
               <div className="relative flex items-start gap-4">
                 <div className="absolute left-2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-blue-500 shadow-sm z-10"></div>
                 <div className="pl-6 w-full">
                   <p className="text-sm font-bold text-[#351903] bg-blue-50 inline-block px-2 py-0.5 rounded text-[11px] uppercase tracking-wider mb-1">Procurement Done</p>
                   <p className="text-xs text-[#8A7B58] mt-1 font-medium">2,450 kg Wheat deposited at Main Mandi.</p>
                   <p className="text-[10px] text-[#C9C4B2] mt-1 font-bold">3 days ago</p>
                 </div>
               </div>

               <div className="relative flex items-start gap-4">
                 <div className="absolute left-2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-amber-500 shadow-sm z-10"></div>
                 <div className="pl-6 w-full">
                   <p className="text-sm font-bold text-[#351903] bg-amber-50 inline-block px-2 py-0.5 rounded text-[11px] uppercase tracking-wider mb-1">Slot Booked</p>
                   <p className="text-xs text-[#8A7B58] mt-1 font-medium">Token TKN-9823 generated for drop-off.</p>
                   <p className="text-[10px] text-[#C9C4B2] mt-1 font-bold">1 week ago</p>
                 </div>
               </div>
             </div>
             
             <button className="w-full mt-8 py-3 bg-[#FAF9F6] border-2 border-[#D8C867]/40 hover:bg-[#F0E383] hover:border-[#F0E383] text-[#351903] text-sm font-bold rounded-xl transition-all shadow-sm">
               View All Activity
             </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
