"use client";

import React, { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/farmer/dashboard", icon: "🏠" },
  { name: "My Profile", path: "/farmer/dashboard/profile", icon: "👤" },
  { name: "My Crops", path: "/farmer/dashboard/crops", icon: "🌱" },
  { name: "Market Prices", path: "/farmer/dashboard/market", icon: "📊" },
  { name: "Sell Produce", path: "/farmer/dashboard/sell", icon: "🛒" },
  { name: "Slot Booking", path: "/farmer/dashboard/slot-booking", icon: "📅" },
  { name: "Live Queue", path: "/farmer/dashboard/queue", icon: "👥" },
  { name: "Orders", path: "/farmer/dashboard/orders", icon: "📦" },
  { name: "Payments", path: "/farmer/dashboard/payments", icon: "💳" },
  { name: "Track Status", path: "/farmer/dashboard/track-status", icon: "🚚" },
  { name: "Crop Assistant (AI)", path: "/farmer/dashboard/crop-assistant", icon: "🤖" },
  { name: "Voice Assistant", path: "/farmer/dashboard/voice-assistant", icon: "🎙️" },
  { name: "Notifications", path: "/farmer/dashboard/notifications", icon: "🔔" },
];

const BOTTOM_ITEMS = [
  { name: "Help & Support", path: "/farmer/dashboard/help", icon: "❓" },
  { name: "Settings", path: "/farmer/dashboard/settings", icon: "⚙️" },
];

export default function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
}: {
  isMobileOpen: boolean;
  setIsMobileOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const showLabels = !isCollapsed || isMobileOpen;

  const renderLink = (item: {
    name: string;
    path: string;
    icon: string;
  }) => {
    const isActive =
      pathname === item.path ||
      (item.path !== "/farmer/dashboard" &&
        pathname.startsWith(item.path));

    return (
      <Link
        href={item.path}
        key={item.name}
        onClick={() => setIsMobileOpen(false)}
        className={`relative block outline-none ${
          isCollapsed ? "px-2" : "px-4"
        } py-3 mb-1 rounded-md transition`}
        title={isCollapsed ? item.name : undefined}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-[#E9DDBD]/90 rounded-md"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}

        <div
          className={`relative flex items-center z-10 transition-colors ${
            isCollapsed
              ? "justify-center"
              : "gap-3"
          } ${
            isActive
              ? "text-[#351903] font-semibold"
              : "text-white hover:text-[#E9DDBD]"
          }`}
        >
          <span className="text-lg opacity-80 shrink-0">
            {item.icon}
          </span>

          {showLabels && (
            <span className="font-onest text-sm whitespace-nowrap">
              {item.name}
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {/* <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-[60] md:hidden w-11 h-11 rounded-lg bg-[#365006] text-white shadow-lg flex items-center justify-center text-xl"
        aria-label="Open menu"
      >
        ☰
      </button> */}

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[40] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          h-full
          flex-shrink-0
          bg-[#365006]
          flex flex-col
          overflow-y-auto
          custom-scrollbar
          shadow-xl
          z-[50]
          transition-all duration-300 ease-in-out

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          w-72
        `}
      >

        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end px-4 py-3">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="w-9 h-9 rounded-md text-white hover:bg-[#4A6B0A] transition flex items-center justify-center"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>  

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1">

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex w-full items-center justify-center py-2 mb-2 rounded-md text-white hover:bg-[#4A6B0A] transition"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="text-lg">
              {isCollapsed ? "→" : "←"}
            </span>
          </button>

          {NAV_ITEMS.map(renderLink)}

        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 mt-auto border-t border-[#4A6B0A]">
          {BOTTOM_ITEMS.map(renderLink)}

          <Link
            href="/farmer/login"
            onClick={() => setIsMobileOpen(false)}
            className={`relative block ${
              isCollapsed ? "px-2" : "px-4"
            } py-3 outline-none group`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <div
              className={`relative flex items-center z-10 text-white group-hover:text-red-300 transition-colors ${
                isCollapsed
                  ? "justify-center"
                  : "gap-3"
              }`}
            >
              <span className="text-lg opacity-80">
                🚪
              </span>

              {showLabels && (
                <span className="font-onest text-sm">
                  Logout
                </span>
              )}
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}