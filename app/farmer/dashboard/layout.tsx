"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import { ToastProvider } from './components/ToastProvider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch with localStorage mocks

  return (
    <ToastProvider>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(54, 80, 6, 0.2);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(54, 80, 6, 0.4);
        }
      `}</style>

      <div className="flex flex-col h-screen bg-[#F8F6ED] overflow-hidden">

        {/* Static Top Header */}
        <TopHeader
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Sidebar + Main Content */}
        <div className="flex flex-1 min-h-0">

          <Sidebar
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />

          <div className="flex-1 flex flex-col min-w-0 min-h-0">

            <main className="flex-1 overflow-y-auto w-full custom-scrollbar relative">
              <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
                {children}
              </div>

              <footer className="mt-12 py-6 border-t border-[#D5D0BD] text-center">
                <span className="font-onest text-xs text-[#351903]/60">
                  © {new Date().getFullYear()} KisanSetu - The Digital Bridge for Every Farmer
                </span>
              </footer>
            </main>

          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
