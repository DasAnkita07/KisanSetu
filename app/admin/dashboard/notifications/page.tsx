"use client";
import Link from "next/link";
import { ArrowLeftIcon } from "../components/Icons";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] font-sans pb-12 select-none">
      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/login/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm cursor-pointer"
          >
            <ArrowLeftIcon className="w-5 h-5 inline" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-oldenburg">Notifications</h1>
            <p className="text-[11px] text-[#E9DF87]">System alerts and updates</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-white rounded-2xl p-12 border border-[#E7E2D2] shadow-xs text-center">
          <div className="w-16 h-16 rounded-full bg-[#F0FDF4] text-[#16A34A] mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <h2 className="text-2xl font-bold font-oldenburg text-gray-800">Notifications</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            You're all caught up! There are no new notifications at the moment.
          </p>
        </div>
      </main>
    </div>
  );
}
