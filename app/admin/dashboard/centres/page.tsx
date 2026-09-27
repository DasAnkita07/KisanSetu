"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; 
import { BarChartIcon, UsersIcon, BuildingOfficeIcon, TicketIcon, WheatIcon, CreditCardIcon, DocumentTextIcon, ShieldCheckIcon, PresentationChartLineIcon, Cog6ToothIcon, BellIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '../components/Icons';


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
  { id: "C-07", name: "Centre G - Asansol Krishi Bhawan", supervisor: "D. Ghosh", capacity: 70, current: 35, status: "Active", weighbridges: 3, diversionEnabled: false },
  { id: "C-08", name: "Centre H - Hooghly Agri Depot", supervisor: "S. Banerjee", capacity: 85, current: 60, status: "Active", weighbridges: 3, diversionEnabled: false },
  { id: "C-09", name: "Centre I - Islampur Mandi Yard", supervisor: "R. Haque", capacity: 55, current: 30, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-10", name: "Centre J - Jalpaiguri Krishi Kendra", supervisor: "K. Barman", capacity: 65, current: 42, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-11", name: "Centre K - Krishnanagar Procurement Hub", supervisor: "A. Biswas", capacity: 75, current: 55, status: "Active", weighbridges: 3, diversionEnabled: false },
  { id: "C-12", name: "Centre L - Lalgola Sub-Mandi", supervisor: "M. Sheikh", capacity: 45, current: 20, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-13", name: "Centre M - Malda Agri Market Yard", supervisor: "T. Mandal", capacity: 95, current: 78, status: "Active", weighbridges: 4, diversionEnabled: false },
  { id: "C-14", name: "Centre N - Nabadwip Krishak Mandi", supervisor: "P. Saha", capacity: 50, current: 28, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-15", name: "Centre O - Onda Procurement Depot", supervisor: "B. Khatun", capacity: 40, current: 15, status: "Active", weighbridges: 1, diversionEnabled: false },
  { id: "C-16", name: "Centre P - Purulia Krishi Bhawan", supervisor: "R. Mahato", capacity: 60, current: 44, status: "Active", weighbridges: 2, diversionEnabled: false },
  { id: "C-17", name: "Centre Q - Katwa Regulated Market", supervisor: "S. Chatterjee", capacity: 55, current: 50, status: "Nearing Capacity", weighbridges: 2, diversionEnabled: true },
  { id: "C-18", name: "Centre R - Raiganj Agro Centre", supervisor: "N. Sarkar", capacity: 70, current: 32, status: "Active", weighbridges: 3, diversionEnabled: false },
  { id: "C-19", name: "Centre S - Siliguri Mandi Complex", supervisor: "L. Tamang", capacity: 110, current: 85, status: "Active", weighbridges: 5, diversionEnabled: false },
  { id: "C-20", name: "Centre T - Tamluk Krishak Mandi", supervisor: "G. Maity", capacity: 65, current: 40, status: "Active", weighbridges: 2, diversionEnabled: false },
];

export default function CentresManagementPage() {

  const [adminRole, setAdminRole] = useState("Super Admin");
  const [adminScope, setAdminScope] = useState("All");

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

  const [centres, setCentres] = useState<Centre[]>(initialCentres);
  useEffect(() => {
    let filtered = [...initialCentres];
    if (adminScope.startsWith("Centre: ")) {
       const centreCode = adminScope.replace("Centre: ", ""); // e.g. "001"
       filtered = initialCentres.filter(c => c.id.includes(centreCode));
       if (filtered.length === 0) filtered = [initialCentres[0]]; // fallback
    }
    setCentres(filtered);
  }, [adminScope]);

  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);
  const [capacityInput, setCapacityInput] = useState<number>(0);
  const [diversion, setDiversion] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

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
            href="/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm cursor-pointer"
          ><ArrowLeftIcon className="w-5 h-5 inline" /></Link>
          <div>
            <h1 className="text-xl font-bold font-oldenburg">Procurement Centres</h1>
            <p className="text-[11px] text-[#E9DF87]">Live capacity, weighbridge operations &amp; congestion monitoring</p>
          </div>
        </div>
        <Link
          href="/admin/dashboard"
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-medium cursor-pointer"
        >
          Back to Dashboard
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs">
            <span><CheckCircleIcon className="w-4 h-4 inline" /></span> {toastMsg}
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

        {/* Search Procurement Centre */}
        <div className="mb-6 relative">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search procurement centre by name or ID..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E7E2D2] rounded-xl text-sm text-gray-800 placeholder-gray-400 shadow-xs focus:outline-none focus:border-[#344E06] focus:ring-2 focus:ring-[#344E06]/20 transition"
            />
            {searchQuery && (
              <button
                onMouseDown={(e) => { e.preventDefault(); setSearchQuery(""); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute z-40 mt-1 w-full bg-white border border-[#E7E2D2] rounded-xl shadow-lg max-h-72 overflow-y-auto"
              >
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {searchQuery ? "Search Results" : "All Procurement Centres (A-Z)"}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {initialCentres.filter(c => {
                      const q = searchQuery.toLowerCase();
                      return !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
                    }).length} centres
                  </span>
                </div>
                {initialCentres
                  .filter(c => {
                    const q = searchQuery.toLowerCase();
                    return !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
                  })
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(c => {
                    const pct = Math.round((c.current / c.capacity) * 100);
                    return (
                      <div
                        key={c.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchQuery(c.name);
                          setSearchFocused(false);
                          // Scroll to / filter to show only this centre
                          setCentres([c]);
                        }}
                        className="px-4 py-3 hover:bg-[#F8F6ED] cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono font-bold text-[#344E06] bg-[#EAF3D8] px-2 py-0.5 rounded flex-shrink-0">
                            {c.id}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                            <p className="text-[11px] text-gray-500">Supervisor: {c.supervisor} &bull; {c.weighbridges} weighbridges</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pct >= 95 ? "bg-red-100 text-red-700" : pct >= 85 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                          }`}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                {initialCentres.filter(c => {
                  const q = searchQuery.toLowerCase();
                  return !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
                }).length === 0 && (
                  <div className="p-6 text-center text-gray-400 text-sm">
                    No centres found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Show All button when filtered */}
        {centres.length < initialCentres.length && (
          <div className="mb-4">
            <button
              onClick={() => { setCentres(initialCentres); setSearchQuery(""); }}
              className="text-xs font-semibold text-[#344E06] hover:underline cursor-pointer flex items-center gap-1"
            >
              <ArrowLeftIcon className="w-3 h-3" /> Show all {initialCentres.length} centres
            </button>
          </div>
        )}

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
                      <span><ExclamationTriangleIcon className="w-5 h-5 inline text-amber-500" /></span> Traffic auto-diversion active
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Hours: 8:00 AM - 6:00 PM</span>
                  <button
                    onClick={() => handleOpenManage(centre)}
                    className="text-xs font-bold text-[#344E06] hover:underline cursor-pointer"
                  >
                    Manage Slots <ArrowRightIcon className="w-4 h-4 inline" />
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
                  <XMarkIcon className="w-4 h-4 inline" />
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
