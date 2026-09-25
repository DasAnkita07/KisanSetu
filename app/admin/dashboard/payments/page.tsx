"use client";

import { useState } from "react";
import Link from "next/link";

const initialPayments = [
  { id: "PAY-981", farmer: "Rajesh Kumar", amount: "₹ 42,500", crop: "Wheat (18 Q)", bank: "SBI ···· 4091", date: "14 Apr 2026", status: "Pending Approval" },
  { id: "PAY-980", farmer: "Anita Devi", amount: "₹ 28,400", crop: "Potato (22 Q)", bank: "PNB ···· 8112", date: "14 Apr 2026", status: "Pending Approval" },
  { id: "PAY-979", farmer: "Suresh Patel", amount: "₹ 64,000", crop: "Paddy (30 Q)", bank: "HDFC ···· 1024", date: "14 Apr 2026", status: "Pending Approval" },
  { id: "PAY-978", farmer: "Bikash Ghosh", amount: "₹ 19,200", crop: "Mustard (6 Q)", bank: "UBI ···· 9011", date: "13 Apr 2026", status: "Completed" },
  { id: "PAY-977", farmer: "Subhash Roy", amount: "₹ 52,100", crop: "Wheat (24 Q)", bank: "SBI ···· 5532", date: "13 Apr 2026", status: "Completed" },
  { id: "PAY-976", farmer: "Pranab Mandal", amount: "₹ 34,800", crop: "Potato (35 Q)", bank: "CBI ···· 2291", date: "13 Apr 2026", status: "Completed" },
];

export default function PaymentsManagementPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [filter, setFilter] = useState("All");

  const handleApprove = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Completed" } : p))
    );
  };

  const filtered = payments.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Pending") return p.status === "Pending Approval";
    if (filter === "Completed") return p.status === "Completed";
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] font-sans pb-12">
      {/* Top Header Bar */}
      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm"
          >
            ←
          </Link>
          <div>
            <h1 className="text-xl font-bold font-oldenburg">Payments & Dues</h1>
            <p className="text-[11px] text-[#E9DF87]">Direct Benefit Transfer (DBT) approval & bank disbursals</p>
          </div>
        </div>
        <Link
          href="/admin/dashboard"
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-medium"
        >
          Back to Dashboard
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Pending Approvals</p>
            <h3 className="text-3xl font-bold text-[#DC2626] font-oldenburg mt-1">14</h3>
            <span className="text-xs text-red-600 font-semibold">₹ 4,12,000 awaiting release</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Disbursed Today</p>
            <h3 className="text-3xl font-bold text-[#16A34A] font-oldenburg mt-1">₹ 9,80,000</h3>
            <span className="text-xs text-green-700 font-semibold">32 transactions cleared</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Cumulative Total (Month)</p>
            <h3 className="text-3xl font-bold text-[#1F2937] font-oldenburg mt-1">₹ 48.6 Lakh</h3>
            <span className="text-xs text-gray-500">100% DBT Aadhaar Seeded</span>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex gap-2 mb-4">
          {["All", "Pending", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === tab
                  ? "bg-[#344E06] text-white"
                  : "bg-white text-gray-600 border border-[#E7E2D2] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-2xl border border-[#E7E2D2] shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E7E2D2] text-gray-600 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Farmer Name</th>
                <th className="p-4">Produce Details</th>
                <th className="p-4">Net Payout Amount</th>
                <th className="p-4">Target Bank Account</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition">
                  <td className="p-4 font-mono font-bold text-[#344E06]">{item.id}</td>
                  <td className="p-4 font-bold text-gray-900">{item.farmer}</td>
                  <td className="p-4 text-gray-700">{item.crop}</td>
                  <td className="p-4 font-bold text-[#1F2937] text-sm">{item.amount}</td>
                  <td className="p-4 text-gray-600 font-mono text-[11px]">{item.bank}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.status === "Pending Approval" ? (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-[#344E06] hover:bg-[#283C04] text-white px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Approve DBT
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">✓ Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
