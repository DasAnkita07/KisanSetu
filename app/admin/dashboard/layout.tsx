"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChartIcon, UsersIcon, TicketIcon, WheatIcon, CreditCardIcon, DocumentTextIcon, Cog6ToothIcon, BellIcon } from './components/Icons';
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [adminRole, setAdminRole] = useState("Super Admin");
  const [adminScope, setAdminScope] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedAdminId = localStorage.getItem("kisanSetu_adminId") || "SA-100";
    const idUpper = storedAdminId.toUpperCase();
    
    if (idUpper.startsWith("SA") || idUpper.startsWith("SUPER")) {
      setAdminRole("Super Admin");
      setAdminScope("All");
    } else if (idUpper.startsWith("ST")) {
      setAdminRole("State-level Admin");
      setAdminScope("State: " + idUpper.substring(3));
    } else if (idUpper.startsWith("DT")) {
      setAdminRole("District-level Admin");
      setAdminScope("District: " + idUpper.substring(3));
    } else if (idUpper.startsWith("PC") || idUpper.startsWith("CENTRE")) {
      setAdminRole("Procurement Centre-level Admin");
      setAdminScope("Centre: " + idUpper.substring(3));
    } else {
      setAdminRole("Admin");
      setAdminScope(idUpper);
    }
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChartIcon className="w-5 h-5" />, href: '/login/admin/dashboard', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'farmers', label: 'Farmers', icon: <UsersIcon className="w-5 h-5" />, href: '/login/admin/dashboard/farmers', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'queue', label: 'Slots & Queue', icon: <TicketIcon className="w-5 h-5" />, href: '/login/admin/dashboard/queue', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'procurement', label: 'Procurement', icon: <WheatIcon className="w-5 h-5" />, href: '/login/admin/dashboard/procurement', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'payments', label: 'Payments', icon: <CreditCardIcon className="w-5 h-5" />, href: '/login/admin/dashboard/payments', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" />, href: '/login/admin/dashboard/notifications', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" />, href: '/login/admin/dashboard/settings', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] },
    { id: 'help', label: 'Help & Support', icon: <DocumentTextIcon className="w-5 h-5" />, href: '/login/admin/dashboard/help', roles: ['Super Admin', 'State-level Admin', 'District-level Admin', 'Procurement Centre-level Admin'] }
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(adminRole));

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F1EA] text-[#1E293B] font-sans select-none">

      {/* MOBILE HAMBURGER BUTTON (Only visible on mobile) */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-3 left-4 z-[60] text-white p-1 rounded-md cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[70] md:hidden cursor-pointer"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#365006] shadow-2xl z-[80] md:hidden flex flex-col"
            >
              <div className="h-14 flex items-center justify-end px-4 border-b border-white/10 relative shrink-0">
                <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1 cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
    
              <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
                {visibleMenuItems.map(item => {
                  const isActive = pathname === item.href || (item.href !== '/login/admin/dashboard' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        isActive ? "text-white font-semibold bg-[#E9DDBD]" : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="text-lg shrink-0">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-[#365006] flex-shrink-0 flex flex-col shadow-xl z-[50] hidden md:flex">
        

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {visibleMenuItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/login/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive ? "text-white font-semibold bg-[#E9DDBD]" : "text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT PANE ================= */}
      <div className="flex-1 overflow-y-auto relative flex flex-col h-screen">
        {children}
      </div>
    </div>
  );
}
