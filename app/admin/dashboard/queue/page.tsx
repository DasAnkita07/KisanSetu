"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface QueueItem {
  token: string;
  farmer: string;
  phone: string;
  crop: string;
  quantity: string;
  slotTime: string;
  bay: string;
  status: "Waiting" | "At Weighbridge" | "Quality Check" | "Completed" | "Skipped";
  arrivalTime: string;
}

const initialQueue: QueueItem[] = [
  { token: "T-042", farmer: "Anita Devi", phone: "+91 98765 44556", crop: "Potato (Chandramukhi)", quantity: "220 kg", slotTime: "10:00 - 10:30 AM", bay: "Bay #1", status: "Quality Check", arrivalTime: "09:55 AM" },
  { token: "T-043", farmer: "Suresh Patel", phone: "+91 98765 77889", crop: "Paddy (Minikit)", quantity: "400 kg", slotTime: "10:30 - 11:00 AM", bay: "Bay #2", status: "At Weighbridge", arrivalTime: "10:12 AM" },
  { token: "T-044", farmer: "Mohan Lal", phone: "+91 98765 99001", crop: "Mustard Seed", quantity: "170 kg", slotTime: "10:30 - 11:00 AM", bay: "Bay #1", status: "Waiting", arrivalTime: "10:20 AM" },
  { token: "T-045", farmer: "Rajesh Kumar", phone: "+91 98765 11223", crop: "Wheat (Sharbati)", quantity: "350 kg", slotTime: "11:00 - 11:30 AM", bay: "Bay #3", status: "Waiting", arrivalTime: "10:25 AM" },
  { token: "T-046", farmer: "Gopal Roy", phone: "+91 98765 33445", crop: "Potato (Jyoti)", quantity: "500 kg", slotTime: "11:00 - 11:30 AM", bay: "Bay #2", status: "Waiting", arrivalTime: "10:28 AM" },
  { token: "T-041", farmer: "Rohit Das", phone: "+91 98765 43210", crop: "Potato (Jyoti)", quantity: "500 kg", slotTime: "09:30 - 10:00 AM", bay: "Bay #1", status: "Completed", arrivalTime: "09:20 AM" },
];

const timeSlots = [
  { time: "08:00 AM - 10:00 AM", booked: 25, total: 25, status: "Closed / Completed" },
  { time: "10:00 AM - 12:00 PM", booked: 30, total: 30, status: "Active (Full)" },
  { time: "12:00 PM - 02:00 PM", booked: 18, total: 25, status: "Open (7 Available)" },
  { time: "02:00 PM - 04:00 PM", booked: 12, total: 25, status: "Open (13 Available)" },
  { time: "04:00 PM - 06:00 PM", booked: 5, total: 20, status: "Open (15 Available)" },
];

export default function QueueSlotManagementPage() {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [currentServingIndex, setCurrentServingIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMandi, setSelectedMandi] = useState("Centre A - Burdwan Mandi");
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [alertBanner, setAlertBanner] = useState<string | null>(null);

  // Emergency Token Form
  const [emergencyFarmer, setEmergencyFarmer] = useState("");
  const [emergencyCrop, setEmergencyCrop] = useState("Potato");
  const [emergencyQty, setEmergencyQty] = useState("");

  const currentToken = queue.find((q) => q.status === "Quality Check" || q.status === "At Weighbridge") || queue[0];

  const handleCallNext = () => {
    const nextWaiting = queue.find((q) => q.status === "Waiting");
    if (nextWaiting) {
      setQueue((prev) =>
        prev.map((item) =>
          item.token === nextWaiting.token ? { ...item, status: "At Weighbridge" } : item
        )
      );
      setAlertBanner(`📢 Called Token ${nextWaiting.token} (${nextWaiting.farmer}) to Weighbridge!`);
      setTimeout(() => setAlertBanner(null), 3500);
    } else {
      setAlertBanner("No more waiting vehicles in current queue!");
      setTimeout(() => setAlertBanner(null), 3000);
    }
  };

  const handleAdvanceStatus = (token: string) => {
    setQueue((prev) =>
      prev.map((item) => {
        if (item.token === token) {
          if (item.status === "Waiting") return { ...item, status: "At Weighbridge" };
          if (item.status === "At Weighbridge") return { ...item, status: "Quality Check" };
          if (item.status === "Quality Check") return { ...item, status: "Completed" };
        }
        return item;
      })
    );
  };

  const handleSkipToken = (token: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.token === token ? { ...item, status: "Skipped" } : item))
    );
    setAlertBanner(`Token ${token} marked as Skipped / Absent.`);
    setTimeout(() => setAlertBanner(null), 3000);
  };

  const handleAddEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyFarmer || !emergencyQty) return;

    const newTok: QueueItem = {
      token: `EMG-${Math.floor(100 + Math.random() * 900)}`,
      farmer: emergencyFarmer,
      phone: "+91 98765 00112",
      crop: emergencyCrop,
      quantity: `${emergencyQty} kg`,
      slotTime: "Immediate Express",
      bay: "Express Bay",
      status: "Waiting",
      arrivalTime: "Just now",
    };

    setQueue([newTok, ...queue]);
    setShowEmergencyModal(false);
    setEmergencyFarmer("");
    setEmergencyQty("");
    setAlertBanner(`Emergency priority token ${newTok.token} created!`);
    setTimeout(() => setAlertBanner(null), 3500);
  };

  const filteredQueue = queue.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status === activeFilter;
  });

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] font-sans pb-12 select-none">
      {/* Top Header Bar */}
      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm cursor-pointer"
          >
            ←
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-oldenburg">Live Queue &amp; Slot Management</h1>
              <span className="bg-green-500/20 text-[#E9DF87] border border-green-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Stream
              </span>
            </div>
            <p className="text-[11px] text-[#E9DF87]">Real-time token calling, weighbridge queue &amp; slot quotas</p>
          </div>
        </div>

        {/* Mandi Selector & Back */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedMandi}
            onChange={(e) => setSelectedMandi(e.target.value)}
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 outline-none cursor-pointer"
          >
            <option className="text-gray-900">Centre A - Burdwan Mandi</option>
            <option className="text-gray-900">Centre B - Singur Agro Hub</option>
            <option className="text-gray-900">Centre C - Memari Depot</option>
          </select>
          <Link
            href="/admin/dashboard"
            className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-medium"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Banner Announcement */}
        {alertBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-[#EAF3D8] border border-[#344E06]/30 text-[#344E06] text-xs font-bold rounded-xl flex items-center justify-between shadow-xs"
          >
            <span>{alertBanner}</span>
            <button onClick={() => setAlertBanner(null)} className="text-gray-500 hover:text-black">✕</button>
          </motion.div>
        )}

        {/* ================= QUEUE METRIC TILES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Now Serving</p>
              <h3 className="text-3xl font-extrabold text-[#344E06] font-oldenburg mt-1">{currentToken.token}</h3>
              <p className="text-xs font-medium text-gray-600 mt-0.5">{currentToken.farmer}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#EAF3D8] text-[#344E06] flex items-center justify-center text-xl">
              🎟️
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">In Weighbridge / Inspection</p>
              <h3 className="text-3xl font-extrabold text-[#0284C7] font-oldenburg mt-1">
                {queue.filter((q) => q.status === "At Weighbridge" || q.status === "Quality Check").length}
              </h3>
              <p className="text-xs text-blue-700 font-semibold mt-0.5">Active on bays</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-xl">
              ⚖️
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Waiting in Line</p>
              <h3 className="text-3xl font-extrabold text-[#D97706] font-oldenburg mt-1">
                {queue.filter((q) => q.status === "Waiting").length}
              </h3>
              <p className="text-xs text-amber-700 font-semibold mt-0.5">Vehicles staged outside</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center text-xl">
              ⏳
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Avg Clearance Time</p>
              <h3 className="text-3xl font-extrabold text-[#1F2937] font-oldenburg mt-1">11.4 min</h3>
              <p className="text-xs text-green-700 font-semibold mt-0.5">Below 15m threshold</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center text-xl">
              ⚡
            </div>
          </div>
        </div>

        {/* ================= LIVE CALLING STATION CONSOLE ================= */}
        <div className="bg-gradient-to-r from-[#FAF6EB] to-[#F1E8CD] p-6 rounded-2xl border border-[#E2D5B5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-[#344E06] uppercase tracking-wider bg-white/80 border border-[#D5C69F] px-2.5 py-0.5 rounded-full">
              Calling Station #01
            </span>
            <div className="flex items-baseline gap-3 pt-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] font-oldenburg">
                Serving: <span className="text-[#344E06]">{currentToken.token}</span>
              </h2>
              <span className="text-sm font-semibold text-gray-700">· {currentToken.farmer}</span>
            </div>
            <p className="text-xs text-gray-600">
              Crop: <strong className="text-gray-900">{currentToken.crop}</strong> ({currentToken.quantity}) · Assigned: <strong>{currentToken.bay}</strong> · Status: <span className="font-bold text-[#344E06]">{currentToken.status}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCallNext}
              className="bg-[#344E06] hover:bg-[#283C04] text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>📢</span> Call Next Waiting
            </button>
            <button
              onClick={() => handleAdvanceStatus(currentToken.token)}
              className="bg-white hover:bg-gray-50 text-[#344E06] border border-[#CAD8B2] px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-2xs"
            >
              ✓ Advance Status
            </button>
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#B45309] border border-[#FCD34D] px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-2xs"
            >
              + Emergency Token
            </button>
          </div>
        </div>

        {/* ================= QUEUE TABLE & SLOT CONTROLS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Live Queue Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E7E2D2] shadow-xs">
              <h3 className="font-bold text-base text-[#1F2937] font-oldenburg">
                Active Vehicle Queue ({filteredQueue.length})
              </h3>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["All", "Waiting", "At Weighbridge", "Quality Check", "Completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                      activeFilter === tab
                        ? "bg-[#344E06] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E7E2D2] shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F3] border-b border-[#E7E2D2] text-gray-600 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Token</th>
                    <th className="p-3.5">Farmer &amp; Crop</th>
                    <th className="p-3.5">Slot Window</th>
                    <th className="p-3.5">Bay</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredQueue.map((item) => (
                    <tr key={item.token} className="hover:bg-gray-50/80 transition">
                      <td className="p-3.5 font-mono font-bold text-[#344E06] text-sm">
                        {item.token}
                      </td>
                      <td className="p-3.5">
                        <p className="font-bold text-gray-900">{item.farmer}</p>
                        <p className="text-gray-500 text-[11px]">{item.crop} · {item.quantity}</p>
                      </td>
                      <td className="p-3.5 text-gray-600 font-medium text-[11px]">
                        {item.slotTime}
                      </td>
                      <td className="p-3.5 font-semibold text-gray-700">
                        {item.bay}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Quality Check"
                              ? "bg-purple-100 text-purple-800"
                              : item.status === "At Weighbridge"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "Skipped"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        {item.status !== "Completed" && item.status !== "Skipped" && (
                          <>
                            <button
                              onClick={() => handleAdvanceStatus(item.token)}
                              className="px-2 py-1 bg-[#344E06] hover:bg-[#283C04] text-white rounded text-[11px] font-semibold transition cursor-pointer"
                            >
                              Advance ›
                            </button>
                            <button
                              onClick={() => handleSkipToken(item.token)}
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-[11px] font-semibold transition cursor-pointer"
                            >
                              Skip
                            </button>
                          </>
                        )}
                        {item.status === "Completed" && (
                          <span className="text-xs text-gray-400 font-medium">✓ Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right 1 Col: Slot Time-Windows */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-[#1F2937] font-oldenburg">
                  Today&apos;s Slot Quotas
                </h3>
                <span className="text-xs font-semibold text-[#344E06]">Centre A</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Monitor and balance incoming hourly arrival quotas to prevent mandi road congestion.
              </p>

              <div className="space-y-3 text-xs">
                {timeSlots.map((slot, index) => {
                  const pct = Math.round((slot.booked / slot.total) * 100);
                  const isFull = pct >= 100;

                  return (
                    <div key={index} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                      <div className="flex justify-between font-bold text-gray-800">
                        <span>{slot.time}</span>
                        <span className={isFull ? "text-red-600" : "text-[#344E06]"}>
                          {slot.booked}/{slot.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isFull ? "bg-red-500" : "bg-[#344E06]"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-500">
                        <span>{slot.status}</span>
                        <span>{pct}% booked</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setAlertBanner("All slots locked for the next 60 minutes to clear weighbridge backlog.");
                    setTimeout(() => setAlertBanner(null), 4000);
                  }}
                  className="w-full py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition cursor-pointer"
                >
                  ⏸️ Temporarily Pause Slot Admissions
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ================= EMERGENCY TOKEN MODAL ================= */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚨</span>
                  <h3 className="text-base font-bold text-[#1F2937] font-oldenburg">
                    Generate Emergency Fast-Track Token
                  </h3>
                </div>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddEmergency} className="py-4 space-y-3 text-xs">
                <p className="text-gray-500 text-[11px]">
                  Emergency tokens bypass regular queue time-windows for perishable produce or vulnerable farmers.
                </p>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Farmer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shyamal Ghosh"
                    value={emergencyFarmer}
                    onChange={(e) => setEmergencyFarmer(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Crop</label>
                    <select
                      value={emergencyCrop}
                      onChange={(e) => setEmergencyCrop(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    >
                      <option>Potato</option>
                      <option>Wheat</option>
                      <option>Paddy</option>
                      <option>Tomato</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Estimated Qty (kg) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 300"
                      value={emergencyQty}
                      onChange={(e) => setEmergencyQty(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmergencyModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#344E06] text-white font-bold hover:bg-[#283C04] cursor-pointer"
                  >
                    Generate Express Pass
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
