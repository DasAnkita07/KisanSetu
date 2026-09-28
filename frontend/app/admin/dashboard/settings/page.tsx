"use client";
import Link from "next/link";
import { ArrowLeftIcon } from "../components/Icons";

export default function SettingsPage() {
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
            <h1 className="text-xl font-bold font-oldenburg">Settings</h1>
            <p className="text-[11px] text-[#E9DF87]">Manage application configurations</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-white rounded-2xl p-12 border border-[#E7E2D2] shadow-xs text-center">
          <div className="w-16 h-16 rounded-full bg-[#F3F4F6] text-gray-600 mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold font-oldenburg text-gray-800">System Settings</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            This module is currently under active development. Configuration options will be available in the next release.
          </p>
        </div>
      </main>
    </div>
  );
}
