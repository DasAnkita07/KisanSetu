"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; 
import { BarChartIcon, UsersIcon, BuildingOfficeIcon, TicketIcon, WheatIcon, CreditCardIcon, DocumentTextIcon, ShieldCheckIcon, PresentationChartLineIcon, Cog6ToothIcon, BellIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '../components/Icons';


interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  land: string;
  crop: string;
  kyc: "Verified" | "Pending";
  status: string;
  
  
}

const initialFarmers: Farmer[] = [
  { id: "FAR-001", name: "Rohit Das", phone: "+91 98765 43210", village: "Kalyani, Nadia", land: "4.5 Acres", crop: "Potato, Paddy", kyc: "Verified", status: "Active" },
  { id: "FAR-002", name: "Rajesh Kumar", phone: "+91 98765 11223", village: "Burdwan Central", land: "6.2 Acres", crop: "Wheat", kyc: "Verified", status: "Active" },
  { id: "FAR-003", name: "Anita Devi", phone: "+91 98765 44556", village: "Singur, Hooghly", land: "3.0 Acres", crop: "Potato, Mustard", kyc: "Verified", status: "Active" },
  { id: "FAR-004", name: "Suresh Patel", phone: "+91 98765 77889", village: "Guskara, Purba Bardhaman", land: "5.0 Acres", crop: "Paddy", kyc: "Pending", status: "Under Review" },
  { id: "FAR-005", name: "Mohan Lal", phone: "+91 98765 99001", village: "Memari, Burdwan", land: "8.1 Acres", crop: "Potato, Maize", kyc: "Verified", status: "Active" },
  { id: "FAR-006", name: "Vikram Yadav", phone: "+91 98765 22334", village: "Ranaghat, Nadia", land: "2.8 Acres", crop: "Wheat, Mustard", kyc: "Pending", status: "Action Required" },
  { id: "FAR-007", name: "Priya Mondal", phone: "+91 94321 56789", village: "Tamluk, Purba Medinipur", land: "3.5 Acres", crop: "Paddy, Jute", kyc: "Verified", status: "Active" },
  { id: "FAR-008", name: "Gopal Sarkar", phone: "+91 97654 32100", village: "Malda Town, Malda", land: "7.0 Acres", crop: "Mango, Paddy", kyc: "Verified", status: "Active" },
  { id: "FAR-009", name: "Savitri Khatun", phone: "+91 98123 45670", village: "Islampur, Uttar Dinajpur", land: "2.2 Acres", crop: "Maize, Wheat", kyc: "Pending", status: "Under Review" },
  { id: "FAR-010", name: "Ramesh Mahato", phone: "+91 99876 54321", village: "Purulia Sadar, Purulia", land: "5.8 Acres", crop: "Paddy, Vegetables", kyc: "Verified", status: "Active" },
  { id: "FAR-011", name: "Lakshmi Tamang", phone: "+91 98456 78901", village: "Kurseong, Darjeeling", land: "1.5 Acres", crop: "Tea, Ginger", kyc: "Verified", status: "Active" },
  { id: "FAR-012", name: "Biswanath Roy", phone: "+91 97890 12345", village: "Krishnanagar, Nadia", land: "4.0 Acres", crop: "Paddy, Mustard", kyc: "Verified", status: "Active" },
  { id: "FAR-013", name: "Fatima Bibi", phone: "+91 96543 21098", village: "Lalgola, Murshidabad", land: "3.2 Acres", crop: "Jute, Paddy", kyc: "Pending", status: "Under Review" },
  { id: "FAR-014", name: "Arun Ghosh", phone: "+91 95432 10987", village: "Asansol, Paschim Bardhaman", land: "6.5 Acres", crop: "Wheat, Potato", kyc: "Verified", status: "Active" },
  { id: "FAR-015", name: "Kamala Barman", phone: "+91 94321 09876", village: "Jalpaiguri Sadar, Jalpaiguri", land: "4.8 Acres", crop: "Paddy, Tea", kyc: "Verified", status: "Active" },
  { id: "FAR-016", name: "Nikhil Chatterjee", phone: "+91 93210 98765", village: "Hooghly Sadar, Hooghly", land: "9.2 Acres", crop: "Paddy, Potato, Jute", kyc: "Verified", status: "Active" },
];

export default function FarmersManagementPage() {

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

  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  useEffect(() => {
    let filtered = [...initialFarmers];
    if (adminScope.startsWith("Centre: ")) {
       // Centre admin sees a few farmers
       filtered = initialFarmers.slice(0, 4);
    } else if (adminScope.startsWith("District: ")) {
       filtered = initialFarmers.slice(0, 8);
    }
    setFarmers(filtered);
  }, [adminScope]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [filter, setFilter] = useState("All");

  // Interactive Modals
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Farmer Form State
  const [newFarmer, setNewFarmer] = useState({
    name: "",
    phone: "",
    village: "",
    land: "",
    crop: "",
  });

  const handleVerifyKyc = (id: string) => {
    setFarmers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, kyc: "Verified", status: "Active" } : f
      )
    );
    if (selectedFarmer && selectedFarmer.id === id) {
      setSelectedFarmer((prev) => (prev ? { ...prev, kyc: "Verified", status: "Active" } : null));
    }
  };

  const handleAddFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmer.name || !newFarmer.phone) return;

    const created: Farmer = {
      id: `FAR-00${farmers.length + 1}`,
      name: newFarmer.name,
      phone: `+91 ${newFarmer.phone}`,
      village: newFarmer.village || "Burdwan Rural",
      land: newFarmer.land ? `${newFarmer.land} Acres` : "3.0 Acres",
      crop: newFarmer.crop || "Paddy",
      kyc: "Verified",
      status: "Active",
    };

    setFarmers([created, ...farmers]);
    setNewFarmer({ name: "", phone: "", village: "", land: "", crop: "" });
    setShowAddModal(false);
  };

  const filtered = farmers.filter((f) => {
    const matchQuery =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase()) ||
      f.village.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || f.kyc === filter || f.status === filter;
    return matchQuery && matchFilter;
  });

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] font-sans pb-12 select-none">
      {/* Top Header Bar */}
      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/login/admin/dashboard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-sm cursor-pointer"
          ><ArrowLeftIcon className="w-5 h-5 inline" /></Link>
          <div>
            <h1 className="text-xl font-bold font-oldenburg">Farmers Directory</h1>
            <p className="text-[11px] text-[#E9DF87]">Manage verified farmer registry, KYC &amp; land holdings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="text-xs bg-[#EAF3D8] hover:bg-white text-[#344E06] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer shadow-xs"
          >
            + Add Farmer
          </button>
          <Link
            href="/login/admin/dashboard"
            className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Total Registered</p>
            <h3 className="text-3xl font-bold text-[#1F2937] font-oldenburg mt-1">{farmers.length}</h3>
            <span className="text-xs text-green-700 font-semibold">+12 this week</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E7E2D2] shadow-xs">
            <p className="text-xs text-gray-500 font-semibold uppercase">Active Today</p>
            <h3 className="text-3xl font-bold text-[#1F2937] font-oldenburg mt-1">42</h3>
            <span className="text-xs text-blue-700 font-semibold">Slot visits active</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-2xl border border-[#E7E2D2] shadow-xs mb-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <input
            type="text"
            placeholder="Search by farmer name, ID, village..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 h-10 px-4 rounded-xl border border-gray-300 text-xs outline-none focus:border-[#344E06]"
          />
          <div className="flex gap-2">
            {["All", "Verified", "Pending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  filter === tab
                    ? "bg-[#344E06] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {(() => {
          const totalPages = Math.ceil(filtered.length / pageSize);
          const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
          return (
            <>
              <div className="bg-white rounded-2xl border border-[#E7E2D2] shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-[#FAF8F3] border-b border-[#E7E2D2] text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Farmer ID</th>
                      <th className="px-4 py-3">Farmer Name</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Village & District</th>
                      <th className="px-4 py-3">Land Holding</th>
                      <th className="px-4 py-3">Primary Crops</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginated.map((farmer) => (
                      <tr key={farmer.id} className="hover:bg-[#FAFAF5] transition">
                        <td className="px-4 py-3 font-mono font-bold text-[#344E06] text-[11px]">{farmer.id}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{farmer.name}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-[11px]">{farmer.phone}</td>
                        <td className="px-4 py-3 text-gray-700">{farmer.village}</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{farmer.land}</td>
                        <td className="px-4 py-3 text-gray-700">{farmer.crop}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            farmer.kyc === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {farmer.kyc === "Verified" ? "Verified" : "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedFarmer(farmer)}
                            className="text-[#344E06] hover:underline font-semibold text-xs cursor-pointer flex items-center gap-1"
                          >
                            View <ArrowRightIcon className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="p-10 text-center text-gray-400 text-sm">No farmers found matching your search.</div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 px-1">
                  <span className="text-xs text-gray-500">
                    Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} farmers
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          currentPage === p ? "bg-[#344E06] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </main>

      {/* ================= FARMER PROFILE MODAL ================= */}
      <AnimatePresence>
        {selectedFarmer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EAF3D8] text-[#344E06] flex items-center justify-center font-bold">
                    <UsersIcon className="w-5 h-5 inline" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1F2937] font-oldenburg">{selectedFarmer.name}</h3>
                    <span className="text-[11px] font-mono text-gray-500">{selectedFarmer.id}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFarmer(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 inline" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-semibold text-gray-800">{selectedFarmer.name.toLowerCase().replace(/\s+/g, '.')}@example.com</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Farmer Status:</span>
                  <span className="font-semibold text-gray-800">{selectedFarmer.status}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Registration Date:</span>
                  <span className="font-semibold text-gray-800">12 Aug 2026</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Land Holding:</span>
                  <span className="font-semibold text-gray-800">{selectedFarmer.land}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Village / District:</span>
                  <span className="font-semibold text-gray-800">{selectedFarmer.village}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Primary Crops:</span>
                  <span className="font-semibold text-gray-800">{selectedFarmer.crop}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Last Procurement:</span>
                  <span className="font-semibold text-gray-800">18 Sep 2026</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSelectedFarmer(null)}
                  className="flex-1 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Close
                </button>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= REGISTER NEW FARMER MODAL ================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-[#1F2937] font-oldenburg">Register New Farmer</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 inline" />
                </button>
              </div>

              <form onSubmit={handleAddFarmer} className="py-4 space-y-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={newFarmer.name}
                    onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={newFarmer.phone}
                    onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Village / Cluster</label>
                  <input
                    type="text"
                    placeholder="e.g. Singur, Hooghly"
                    value={newFarmer.village}
                    onChange={(e) => setNewFarmer({ ...newFarmer, village: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Land (Acres)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 4.0"
                      value={newFarmer.land}
                      onChange={(e) => setNewFarmer({ ...newFarmer, land: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Crops</label>
                    <input
                      type="text"
                      placeholder="Potato, Wheat"
                      value={newFarmer.crop}
                      onChange={(e) => setNewFarmer({ ...newFarmer, crop: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#344E06]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#344E06] text-white font-bold hover:bg-[#283C04] cursor-pointer"
                  >
                    Save &amp; Register
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
