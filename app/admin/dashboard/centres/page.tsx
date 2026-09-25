"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Centre {
  id: string;
  name: string;
  supervisor: string;
  capacity: number;
  current: number;
  status: string;
  weighbridges: number;
  diversionEnabled?: boolean;
}

const initialCentres: Centre[] = [
  { id: "C-01", name: "Centre A - Burdwan Mandi", supervisor: "A. Sengupta", capacity: 80, current: 45, status: "Active", weighbridges: 3, diversionEnabled: false },
  { id: "C-02", name: "Centre B - Singur Agro Hub", supervisor: "R. K. Verma", capacity: 100, current: 88, status: "Nearing Capacity", weighbridges: 4, diversionEnabled: true },
  { id: "C-03", name: "Centre C - Memari Procurement Depot", supervisor: "P. Mukherjee", capacity: 60, current: 18, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-04", name: "Centre D - Ranaghat Krishak Mandi", supervisor: "S. Roy", capacity: 90, current: 52, status: "Active", weighbridges: 3, diversionEnabled: false },
  { id: "C-05", name: "Centre E - Kalyani Storage & Hub", supervisor: "M. Das", capacity: 50, current: 12, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-06", name: "Centre F - Guskara Sub-Mandi", supervisor: "B. Mondal", capacity: 40, current: 39, status: "Critical (98%)", weighbridges: 2, diversionEnabled: true },
];

export default function CentresManagementPage() {
  const [centres, setCentres] = useState<Centre[]>(initialCentres);
  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);
  const [capacityInput, setCapacityInput] = useState<number>(0);
  const [diversion, setDiversion] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");

  const handleOpenManage = (c: Centre) => {
    setSelectedCentre(c);
    setCapacityInput(c.capacity);
    setDiversion(!!c.diversionEnabled);
  };

  const handleSaveSettings = () => {
    if (!selectedCentre) return;

    setCentres((prev) =>
      prev.map((c) =>
        c.id === selectedCentre.id
          ? {
              ...c,
              capacity: capacityInput,
              diversionEnabled: diversion,
              status: diversion ? "Traffic Diverted" : c.status,
            }
          : c
      )
    );

    setToastMsg(`Settings saved for ${selectedCentre.name}!`);
    setSelectedCentre(null);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] font-sans pb-12 select-none">
      {/* Top Header Bar */}
      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/login/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm cursor-pointer"
          >
            ←
          </Link>
          <div>
            <h1 className="text-xl font-bold font-oldenburg">Procurement Centres</h1>
            <p className="text-[11px] text-[#E9DF87]">Live capacity, weighbridge operations &amp; congestion monitoring</p>
          </div>
        </div>
        <Link
          href="/login/admin/dashboard"
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-medium cursor-pointer"
        >
          Back to Dashboard
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs">
            <span>✓</span> {toastMsg}
          </div>
        )}

        {/* Quick summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Total Centres</p>
            <h3 className="text-3xl font-bold text-[#1F2937] font-oldenburg mt-1">{centres.length}</h3>
            <span className="text-xs text-green-700 font-semibold">100% operational</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Total Daily Capacity</p>
            <h3 className="text-3xl font-bold text-[#1F2937] font-oldenburg mt-1">750 MT</h3>
            <span className="text-xs text-gray-500">Across 12 mandis</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Average Utilization</p>
            <h3 className="text-3xl font-bold text-[#2563EB] font-oldenburg mt-1">68%</h3>
            <span className="text-xs text-blue-700 font-semibold">Optimal flow</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Congested Centres</p>
            <h3 className="text-3xl font-bold text-[#DC2626] font-oldenburg mt-1">2</h3>
            <span className="text-xs text-red-700 font-semibold">Centre B &amp; Centre F</span>
          </div>
        </div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {centres.map((centre) => {
            const percentage = Math.round((centre.current / centre.capacity) * 100);
            const isHigh = percentage >= 85;
            const isCritical = percentage >= 95;

            return (
              <div
                key={centre.id}
                className="bg-white rounded-2xl p-5 border border-[#E7E2D2] shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-[#344E06] bg-[#EAF3D8] px-2 py-0.5 rounded">
                      {centre.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCritical
                          ? "bg-red-100 text-red-700"
                          : isHigh
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {centre.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-gray-900 font-oldenburg">{centre.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Supervisor: {centre.supervisor}</p>
                  <p className="text-xs text-gray-500">Weighbridges: {centre.weighbridges} active</p>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-600">Capacity Load</span>
                      <span className={isHigh ? "text-amber-700 font-bold" : "text-gray-800"}>
                        {centre.current} / {centre.capacity} MT ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCritical
                            ? "bg-red-500"
                            : isHigh
                            ? "bg-amber-500"
                            : "bg-[#344E06]"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {centre.diversionEnabled && (
                    <div className="mt-3 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 font-medium flex items-center gap-1.5">
                      <span>⚠️</span> Traffic auto-diversion active
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Hours: 8:00 AM - 6:00 PM</span>
                  <button
                    onClick={() => handleOpenManage(centre)}
                    className="text-xs font-bold text-[#344E06] hover:underline cursor-pointer"
                  >
                    Manage Slots ›
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ================= MANAGE CENTRE SLOTS MODAL ================= */}
      <AnimatePresence>
        {selectedCentre && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-[#1F2937] font-oldenburg">
                    Slot &amp; Capacity Control
                  </h3>
                  <p className="text-xs text-gray-500">{selectedCentre.name}</p>
                </div>
                <button
                  onClick={() => setSelectedCentre(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Daily Maximum Capacity (MT)
                  </label>
                  <input
                    type="number"
                    value={capacityInput}
                    onChange={(e) => setCapacityInput(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Current load: {selectedCentre.current} MT ({Math.round((selectedCentre.current / capacityInput) * 100)}%)
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-amber-900">Traffic Congestion Diversion</p>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        Reroute incoming booking overflow to Centre C
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDiversion(!diversion)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${
                        diversion ? "bg-[#344E06]" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                          diversion ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-600">Active Weighbridges:</span>
                  <span className="font-bold text-gray-800">{selectedCentre.weighbridges} Operational</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCentre(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="flex-1 py-2.5 rounded-xl bg-[#344E06] text-white text-xs font-bold hover:bg-[#283C04] cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
