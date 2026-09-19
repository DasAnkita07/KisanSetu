"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarPlus,
  ListOrdered,
  Wheat,
  IndianRupee,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/login/farmer/dashboard", icon: LayoutDashboard },
  { name: "Book Slot", href: "/login/farmer/dashboard/book-slot", icon: CalendarPlus },
  { name: "My Queue", href: "/login/farmer/dashboard/queue", icon: ListOrdered },
  { name: "My Procurement", href: "/login/farmer/dashboard/procurement", icon: Wheat },
  { name: "Payment Status", href: "/login/farmer/dashboard/payments", icon: IndianRupee },
  { name: "Notifications", href: "/login/farmer/dashboard/notifications", icon: Bell },
  { name: "Profile", href: "/login/farmer/dashboard/profile", icon: User },
  { name: "Help & Support", href: "/login/farmer/dashboard/support", icon: HelpCircle },
];

export default function FarmerSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    window.location.href = "/login/farmer";
  };

  const SidebarContent = (
    <div className="flex flex-col h-full bg-[#365006] text-white shadow-xl relative overflow-hidden font-onest border-r border-[#2c4205]">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/bgsketch.png')", backgroundSize: "cover" }}
      />
      
      <div className="p-6 flex items-center gap-3 relative z-10">
        <div className="bg-white p-1.5 rounded-xl shadow-lg">
          <Image src="/mainLogo.svg" alt="KisanSetu" width={32} height={32} className="w-8 h-8" />
        </div>
        <div>
          <h1 className="font-oldenburg font-bold text-2xl tracking-tight text-[#F0E383]">KisanSetu</h1>
          <p className="text-xs text-[#EAF3D8] font-medium tracking-wider uppercase">Farmer Portal</p>
        </div>
        {isMobile && (
          <button onClick={() => setIsOpen(false)} className="ml-auto text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 relative z-10">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "bg-[#F0E383] text-[#365006] font-bold shadow-md transform scale-[1.02]"
                  : "text-[#EAF3D8] hover:bg-[#4a6b0c] hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#365006]" : "text-[#b4d374] group-hover:text-[#F0E383]"}`} />
              <span className="text-sm">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#365006] rounded-r-md hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#4a6b0c] relative z-10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-semibold">Secure Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-40 p-2.5 bg-[#365006] text-white rounded-xl shadow-lg border border-[#4a6b0c] lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <aside className="hidden lg:block w-72 h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {isMobile && isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-72 max-w-[80%] h-full shadow-2xl"
          >
            {SidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
}
