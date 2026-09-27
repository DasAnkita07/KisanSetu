"use client";
import Link from "next/link";
import { ArrowLeftIcon } from "../components/Icons";

export default function HelpPage() {
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
            <h1 className="text-xl font-bold font-oldenburg">Help & Support</h1>
            <p className="text-[11px] text-[#E9DF87]">Guides, FAQs, and Contact</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-white rounded-2xl p-12 border border-[#E7E2D2] shadow-xs text-center">
          <div className="w-16 h-16 rounded-full bg-[#EFF6FF] text-[#2563EB] mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold font-oldenburg text-gray-800">Help & Support</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto mb-8">
            Need assistance? Our support portal and documentation will be available here soon.
          </p>
          <div className="inline-flex flex-col text-left bg-gray-50 p-6 rounded-xl border border-gray-100 w-full max-w-sm">
            <h4 className="font-bold text-gray-700 mb-2">Contact IT Admin</h4>
            <p className="text-sm text-gray-600">Email: support@kisansetu.gov.in</p>
            <p className="text-sm text-gray-600">Helpline: 1800-123-4567</p>
          </div>
        </div>
      </main>
    </div>
  );
}
