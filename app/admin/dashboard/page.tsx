"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChartIcon, UsersIcon, BuildingOfficeIcon, TicketIcon, WheatIcon, CreditCardIcon, DocumentTextIcon, ShieldCheckIcon, PresentationChartLineIcon, Cog6ToothIcon, BellIcon, ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from './components/Icons';
import { motion, AnimatePresence } from "framer-motion";

type MetricTrendKey = "farmers" | "centres" | "tokens" | "procurement" | "payments" | "requests";

interface MetricTrendData {
  title: string;
  badge: string;
  mainVal: string;
  subVal: string;
  unit: string;
  insights: string;
  linkText: string;
  linkHref: string;
  bars: { label: string; value: number; display: string; highlight?: boolean }[];
}

const metricTrendDetails: Record<MetricTrendKey, MetricTrendData> = {
  farmers: {
    title: "Registered Farmers Trend",
    badge: "Registration Analytics",
    mainVal: "248",
    subVal: "+12 new farmers registered today",
    unit: "Farmers",
    insights: "Farmer registrations in Singur and Nadia clusters increased by 28% following the local Kisan Credit Card awareness camp.",
    linkText: "View Full Farmers Directory",
    linkHref: "/admin/dashboard/farmers",
    bars: [
      { label: "Mon", value: 215, display: "215" },
      { label: "Tue", value: 220, display: "220" },
      { label: "Wed", value: 226, display: "226" },
      { label: "Thu", value: 231, display: "231" },
      { label: "Fri", value: 236, display: "236" },
      { label: "Sat", value: 242, display: "242" },
      { label: "Today", value: 248, display: "248", highlight: true },
    ],
  },
  centres: {
    title: "Centres Capacity & Utilization",
    badge: "Live Capacity",
    mainVal: "12",
    subVal: "68% Average network capacity utilization",
    unit: "Centres",
    insights: "Centre B (88%) and Centre F (98%) are heavily utilized. Rebalancing incoming token slots to Centre C will prevent bottlenecks.",
    linkText: "Manage All Procurement Centres",
    linkHref: "/admin/dashboard/centres",
    bars: [
      { label: "Centre A", value: 56, display: "56%" },
      { label: "Centre B", value: 88, display: "88%", highlight: true },
      { label: "Centre C", value: 30, display: "30%" },
      { label: "Centre D", value: 58, display: "58%" },
      { label: "Centre E", value: 24, display: "24%" },
      { label: "Centre F", value: 98, display: "98%", highlight: true },
    ],
  },
  tokens: {
    title: "Today's Token Influx Analysis",
    badge: "Queue Distribution",
    mainVal: "86",
    subVal: "Tokens booked today (+18% vs yesterday)",
    unit: "Tokens",
    insights: "Peak slot booking window was 10:00 AM - 12:00 PM (34 tokens). Average weighbridge turn-around time is currently 8.5 minutes.",
    linkText: "Open Live Queue Tracker",
    linkHref: "#",
    bars: [
      { label: "08-10 AM", value: 22, display: "22" },
      { label: "10-12 PM", value: 34, display: "34", highlight: true },
      { label: "12-02 PM", value: 18, display: "18" },
      { label: "02-04 PM", value: 12, display: "12" },
    ],
  },
  procurement: {
    title: "Procurement Intake Breakdown",
    badge: "Crop Volumes",
    mainVal: "1,240 kg",
    subVal: "+22% increase compared to yesterday",
    unit: "kg",
    insights: "Potato represents 58% of today's intake. Automated grading shows 94.2% of total volume qualified for Grade A MSP premium pricing.",
    linkText: "View Complete Procurement Records",
    linkHref: "/admin/dashboard/procurement",
    bars: [
      { label: "Potato", value: 720, display: "720 kg", highlight: true },
      { label: "Wheat", value: 350, display: "350 kg" },
      { label: "Mustard", value: 170, display: "170 kg" },
    ],
  },
  payments: {
    title: "Disbursal & Payment Health",
    badge: "Direct Benefit Transfer",
    mainVal: "14",
    subVal: "₹ 4,12,000 awaiting admin disbursal approval",
    unit: "Pending",
    insights: "12 out of 14 bank accounts have completed instant Aadhaar-seeding checks. One-click batch approval will release funds in real-time.",
    linkText: "Go to Payments & Dues Portal",
    linkHref: "/admin/dashboard/payments",
    bars: [
      { label: "Cleared", value: 32, display: "32" },
      { label: "Pending", value: 14, display: "14", highlight: true },
      { label: "In Transit", value: 3, display: "3" },
    ],
  },
  requests: {
    title: "Farmer Requests Pipeline",
    badge: "Service Requests",
    mainVal: "7",
    subVal: "+2 new requests received today",
    unit: "Requests",
    insights: "Includes 4 slot reschedule requests and 3 new farmer KYC submissions. Median admin resolution turnaround is 38 minutes.",
    linkText: "Handle Pending Requests",
    linkHref: "#",
    bars: [
      { label: "Reschedule", value: 4, display: "4" },
      { label: "New KYC", value: 3, display: "3", highlight: true },
    ],
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();

  // Interactive states
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [adminRole, setAdminRole] = useState("Super Admin");
  const [adminScope, setAdminScope] = useState("All");
  const [adminId, setAdminId] = useState("SA-100");

  useEffect(() => {
    const id = localStorage.getItem("kisanSetu_adminId") || "SA-100";
    setAdminId(id);
    const idUpper = id.toUpperCase();
    if (idUpper.startsWith("SA-")) {
      setAdminRole("Super Admin");
      setAdminScope("All");
    } else if (idUpper.startsWith("ST-")) {
      setAdminRole("State-level Admin");
      setAdminScope(idUpper);
    } else if (idUpper.startsWith("DA-")) {
      setAdminRole("District-level Admin");
      setAdminScope(idUpper);
    } else if (idUpper.startsWith("PC-")) {
      setAdminRole("Procurement Centre-level Admin");
      setAdminScope(idUpper);
    }
  }, []);

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showRecentActivityModal, setShowRecentActivityModal] = useState(false);
  const [activeQuickActionModal, setActiveQuickActionModal] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // AI Procurement Assistant States
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(true);
  const [showFullInsightsModal, setShowFullInsightsModal] = useState(false);

  useEffect(() => {
    // Generate AI Insights from existing data
    setIsAiLoading(true);
    const timer = setTimeout(() => {
      const insights = [];

      // 1. Centres Analysis
      const centresData = metricTrendDetails.centres.bars;
      if (centresData && centresData.length > 0) {
        const sortedCentres = [...centresData].sort((a, b) => b.value - a.value);
        const mostLoaded = sortedCentres[0];
        const leastLoaded = sortedCentres[sortedCentres.length - 1];
        
        if (mostLoaded.value > 85) {
          insights.push({
            id: 'centre-congestion',
            title: `${mostLoaded.label} may become overloaded today.`,
            desc: leastLoaded.value < 50 ? `Consider redirecting some token bookings to ${leastLoaded.label}.` : 'Monitor capacity closely.',
            colorStyle: 'bg-[#FFFBEB] border border-[#FDE68A]',
            iconBg: 'bg-[#FEF3C7] text-[#D97706]',
            titleColor: 'text-[#92400E]',
            descColor: 'text-[#B45309]',
            icon: <ExclamationTriangleIcon className="w-5 h-5 inline" />
          });
        }
      }

      // 2. Procurement Trends
      const cropData = metricTrendDetails.procurement.bars;
      if (cropData && cropData.length > 0) {
        const sortedCrops = [...cropData].sort((a, b) => b.value - a.value);
        const topCrop = sortedCrops[0];
        const totalVolume = cropData.reduce((acc, curr) => acc + curr.value, 0);
        const topPct = Math.round((topCrop.value / totalVolume) * 100);
        insights.push({
          id: 'crop-trend',
          title: `${topCrop.label} procurement is ${topPct}% of total volume.`,
          desc: `${topCrop.display} processed. Automated grading is active.`,
          colorStyle: 'bg-[#F0FDF4] border border-[#BBF7D0]',
          iconBg: 'bg-[#DCFCE7] text-[#16A34A]',
          titleColor: 'text-[#166534]',
          descColor: 'text-[#15803D]',
          icon: <PresentationChartLineIcon className="w-5 h-5 inline" />
        });
      }

      // 3. Payment Alerts
      const pendingPayment = metricTrendDetails.payments.bars.find(b => b.label === 'Pending');
      if (pendingPayment && pendingPayment.value > 0) {
        insights.push({
          id: 'payment-alert',
          title: `${pendingPayment.value} farmer payments are pending.`,
          desc: `Totaling ${metricTrendDetails.payments.subVal}. Needs immediate attention.`,
          colorStyle: 'bg-[#EFF6FF] border border-[#BFDBFE]',
          iconBg: 'bg-[#DBEAFE] text-[#2563EB]',
          titleColor: 'text-[#1E40AF]',
          descColor: 'text-[#1D4ED8]',
          icon: <CreditCardIcon className="w-5 h-5 inline" />
        });
      }

      // 4. Token Influx
      const tokenData = metricTrendDetails.tokens.bars;
      if (tokenData && tokenData.length > 0) {
        const peakTime = [...tokenData].sort((a, b) => b.value - a.value)[0];
        insights.push({
          id: 'token-peak',
          title: `Peak slot booking is ${peakTime.label}.`,
          desc: `${peakTime.value} tokens booked during this window. Staff accordingly.`,
          colorStyle: 'bg-purple-50 border border-purple-200',
          iconBg: 'bg-purple-100 text-purple-600',
          titleColor: 'text-purple-900',
          descColor: 'text-purple-700',
          icon: <TicketIcon className="w-5 h-5 inline" />
        });
      }
      
      // 5. Farmers Registration
      insights.push({
        id: 'farmer-reg',
        title: `Consistent farmer registration growth.`,
        desc: metricTrendDetails.farmers.subVal + `.`,
        colorStyle: 'bg-teal-50 border border-teal-200',
        iconBg: 'bg-teal-100 text-teal-600',
        titleColor: 'text-teal-900',
        descColor: 'text-teal-700',
        icon: <UsersIcon className="w-5 h-5 inline" />
      });

      setAiInsights(insights);
      setIsAiLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Option C: Metric trend modal state
  const [selectedMetricTrend, setSelectedMetricTrend] = useState<MetricTrendKey | null>(null);

  // Live request state in modal
const [requestsList, setRequestsList] = useState([
    { id: 1, name: "Ramesh Singh", desc: "Mandi Slot Reschedule", time: "Requested new time: 3:00 PM today", status: "pending" },
    { id: 2, name: "Vikram Yadav", desc: "New Farmer Registration", time: "Kisan Credit Card verification pending", status: "pending" },
    { id: 3, name: "Gopal Roy", desc: "Weight Discrepancy Query", time: "Centre A Weighbridge #2", status: "pending" },
  ]);

  const handleApproveRequest = (id: number) => {
    setRequestsList((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
  };

  const handleDeclineRequest = (id: number) => {
    setRequestsList((prev) => prev.map((r) => (r.id === id ? { ...r, status: "declined" } : r)));
  };

  const handleLogout = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#1E293B] flex flex-col font-sans relative pb-8 select-none">
      
      {/* ================= 1. TOP NAVBAR ================= */}
      <header className="w-full bg-[#344E06] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md z-30 sticky top-0">
        {/* Brand */}
        <div className="hidden md:flex items-center gap-3">
          <img
            src="/mainLogo.svg"
            alt="KrishiSangam"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
          />
          <div>
            <div className="flex items-center">
              <span className="text-xl tracking-tight text-white font-oldenburg">
                KrishiSangam
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[#E9DF87] tracking-wide">
              {lang === "EN" ? "The Digital Bridge for Every Farmer" : "हर किसान के लिए डिजिटल सेतु"}
            </p>
          </div>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {/* Language Switcher */}
          <button
            onClick={() => setLang((prev) => (prev === "EN" ? "HI" : "EN"))}
            title="Toggle Language"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50 text-gray-800"
                >
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#344E06]">Alerts & Notices ({notificationCount})</span>
                    <div className="flex items-center gap-2">
                      {notificationCount > 0 && (
                        <button
                          onClick={() => setNotificationCount(0)}
                          className="text-[11px] text-[#344E06] hover:underline font-semibold cursor-pointer"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {notificationCount === 0 ? (
                      <div className="p-4 text-center text-gray-500">No new notifications</div>
                    ) : (
                      <>
                        <div
                          onClick={() => { setSelectedMetricTrend("centres"); setShowNotifications(false); }}
                          className="p-3 hover:bg-amber-50/50 flex gap-2.5 cursor-pointer"
                        >
                          <span className="text-red-500 font-bold"><ExclamationTriangleIcon className="w-4 h-4" /></span>
                          <div>
                            <p className="font-medium text-gray-900">Centre B nearing capacity (88%)</p>
                            <p className="text-gray-500 text-[11px]">Redirecting arrivals recommended</p>
                          </div>
                        </div>
                        <div
                          onClick={() => { setSelectedMetricTrend("payments"); setShowNotifications(false); }}
                          className="p-3 hover:bg-amber-50/50 flex gap-2.5 cursor-pointer"
                        >
                          <span className="text-amber-500 font-bold"><CreditCardIcon className="w-4 h-4" /></span>
                          <div>
                            <p className="font-medium text-gray-900">14 farmer payments pending</p>
                            <p className="text-gray-500 text-[11px]">Awaiting disbursal confirmation</p>
                          </div>
                        </div>
                        <div
                          onClick={() => { setActiveQuickActionModal("requests"); setShowNotifications(false); }}
                          className="p-3 hover:bg-amber-50/50 flex gap-2.5 cursor-pointer"
                        >
                          <span className="text-blue-500 font-bold"><DocumentTextIcon className="w-4 h-4" /></span>
                          <div>
                            <p className="font-medium text-gray-900">7 new farmer registration requests</p>
                            <p className="text-gray-500 text-[11px]">KYC documents submitted</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="px-4 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => { setShowNotifications(false); setShowAllNotifications(true); }}
                      className="w-full text-center text-xs font-semibold text-[#344E06] hover:underline cursor-pointer py-1"
                    >
                      See all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className="flex items-center gap-2 bg-[#283C04] hover:bg-[#223303] px-3 py-1.5 rounded-full text-white text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#E9DF87] text-[#344E06] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span>Admin</span>
              <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {showAdminMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50 text-gray-800 text-xs"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Mandi Administrator</p>
                    <p className="text-gray-500 text-[11px]">admin@KrishiSangam.gov.in</p>
                  </div>
                  <button
                    onClick={() => { setShowHelpModal(true); setShowAdminMenu(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700 cursor-pointer"
                  >
                    <span><ShieldCheckIcon className="w-5 h-5" /></span> Support & Help
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium cursor-pointer"
                  >
                    <span><XMarkIcon className="w-5 h-5" /></span> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ================= 2. HERO GREETING BANNER ================= */}
      <section
        className="w-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[450px] relative overflow-hidden bg-cover bg-center border-b border-[#E2D5B5]"
          style={{
            backgroundImage: "url('/dashboard.png')",
          }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4">

          {/* Welcome Text */}
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-[#2A3E05] flex items-center gap-2 font-oldenburg tracking-tight mt-7 md:mt-11">
              Welcome, Admin <span className="inline-block animate-pulse">👋</span>
            </h1>
            <p className="text-[#556934] text-sm sm:text-base font-medium">
              {lang === "EN"
                ? "Here's what's happening across KrishiSangam today."
                : "यहाँ देखें आज किसानसेतु में क्या हो रहा है।"}
            </p>

            {/* Date & Time Pill */}
            <div className="mt-7 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#D5C69F] px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#483313] shadow-xs">
              <svg className="w-4 h-4 text-[#344E06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>14 Apr 2026</span>
              <span className="text-gray-300">|</span>
                            <span>10:24 AM</span>
            </div>

            {/* Access Scope Card */}
            <div className="mt-5 block w-fit">
              <div className="flex items-center bg-[#F4F6F0]/90 backdrop-blur-md border border-[#E3E8D8] shadow-sm rounded-xl p-3 sm:pr-8">
                <div className="flex items-center gap-3 sm:pr-6 border-r border-[#D3D8C8]">
                  <div className="w-10 h-10 rounded-full bg-[#EAF3D8] flex items-center justify-center text-[#344E06]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">Access Scope</p>
                    <h3 className="text-[#1F2937] font-bold text-sm sm:text-base leading-none">{adminScope === "All" ? "All States & Centres" : adminScope}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{adminRole}</p>
                  </div>
                </div>
                <div className="pl-4 sm:pl-6">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-1">Admin ID</p>
                  <p className="text-[#344E06] text-xs sm:text-sm font-mono font-medium">{adminId}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Subtle Decorative Landscape Grass Overlay at base */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#344E06]/10 to-transparent pointer-events-none" />
      </section>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 w-full flex-1 flex flex-col gap-6 sm:gap-8">
        
        {/* ================= 3. SIX STATS METRICS CARDS (OPTION C: OPENS TREND POPUP) ================= */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              System Metrics (Click any card for 7-day trend analysis)
            </span>
            <span className="text-[11px] text-[#344E06] font-medium flex items-center gap-1">
              <span><BarChartIcon className="w-5 h-5" /></span> Analytics Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Registered Farmers */}
            <div
              onClick={() => setSelectedMetricTrend("farmers")}
              className="bg-white rounded-2xl p-5 border border-[#E7E2D2] shadow-xs hover:border-[#344E06] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF3D8] text-[#344E06] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#344E06] bg-[#EAF3D8] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BarChartIcon className="w-5 h-5" /> Trend
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Registered Farmers
                </p>
                <h3 className="text-3xl font-extrabold text-[#1F2937] mt-1 font-oldenburg">
                  248
                </h3>
              </div>
              <div className="mt-3 flex items-center text-xs font-semibold text-[#2E7D32]">
                <span className="mr-1">↗</span> +12 today
              </div>
            </div>

            {/* Card 2: Active Centres */}
            <div
              onClick={() => setSelectedMetricTrend("centres")}
              className="bg-white rounded-2xl p-5 border border-[#E7E2D2] shadow-xs hover:border-[#0284C7] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BarChartIcon className="w-5 h-5" /> Capacity
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Active Centres
                </p>
                <h3 className="text-3xl font-extrabold text-[#1F2937] mt-1 font-oldenburg">
                  12
                </h3>
              </div>
              <div className="mt-3 flex items-center text-xs font-semibold text-[#2E7D32]">
                <span className="mr-1">↗</span> +1 today
              </div>
            </div>

            {/* Card 3: Today's Tokens */}
            <div
              onClick={() => setSelectedMetricTrend("tokens")}
              className="bg-white rounded-2xl p-5 border border-[#E7E2D2] shadow-xs hover:border-[#D97706] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BarChartIcon className="w-5 h-5" /> Hourly
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Today&apos;s Tokens
                </p>
                <h3 className="text-3xl font-extrabold text-[#1F2937] mt-1 font-oldenburg">
                  86
                </h3>
              </div>
              <div className="mt-3 flex items-center text-xs font-semibold text-[#2E7D32]">
                <span className="mr-1">↗</span> +18% from yesterday
              </div>
            </div>

            {/* Card 4: Today's Procurement */}
            <div
              onClick={() => setSelectedMetricTrend("procurement")}
              className="bg-white rounded-2xl p-5 border border-[#E7E2D2] shadow-xs hover:border-[#16A34A] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <BarChartIcon className="w-5 h-5" /> Weight
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Today&apos;s Procurement
                </p>
                <h3 className="text-3xl font-extrabold text-[#1F2937] mt-1 font-oldenburg">
                  1,240 kg
                </h3>
              </div>
              <div className="mt-3 flex items-center text-xs font-semibold text-[#2E7D32]">
                <span className="mr-1">↗</span> +22% from yesterday
              </div>
            </div>
          </div>
        </div>

        {/* Two Lower Stat Highlights (Pending Payments & Pending Requests) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pending Payments */}
          <div
            onClick={() => setSelectedMetricTrend("payments")}
            className="bg-[#FFF8F8] rounded-2xl p-5 border border-[#FED7D7] shadow-xs hover:border-[#DC2626] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Pending Payments
                </p>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <h3 className="text-3xl font-extrabold text-[#1F2937] font-oldenburg">
                    14
                  </h3>
                  <span className="text-xs font-semibold text-[#16A34A] flex items-center">
                    ↓ -5% from yesterday
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded-full">
                <BarChartIcon className="w-5 h-5" /> Disbursal
              </span>
              <span className="text-gray-400 text-lg font-bold pr-2"><ArrowRightIcon className="w-4 h-4" /></span>
            </div>
          </div>

          {/* Pending Requests */}
          <div
            onClick={() => setSelectedMetricTrend("requests")}
            className="bg-[#FAF8FF] rounded-2xl p-5 border border-[#E9D8FD] shadow-xs hover:border-[#7C3AED] hover:shadow-md transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Pending Requests
                </p>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <h3 className="text-3xl font-extrabold text-[#1F2937] font-oldenburg">
                    7
                  </h3>
                  <span className="text-xs font-semibold text-[#E11D48] flex items-center">
                    <ArrowRightIcon className="w-3 h-3 rotate-[-45deg] mr-0.5" /> +2 today
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full flex items-center gap-1">
                <BarChartIcon className="w-3 h-3" /> Pipeline
              </span>
              <span className="text-gray-400 text-lg font-bold pr-2"><ArrowRightIcon className="w-4 h-4" /></span>
            </div>
          </div>

        </div>

        {/* ================= 4. QUICK ACTIONS SECTION (DEDICATED FULL NAVIGATION) ================= */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] font-oldenburg">
              Quick Actions
            </h2>
            <span className="text-xs font-semibold text-[#344E06] hover:underline cursor-pointer flex items-center gap-1">
              Manage everything from here <ArrowRightIcon className="w-4 h-4 inline" />
            </span>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            
            {/* 1. Farmers */}
            <Link
              href="/admin/dashboard/farmers"
              className="bg-white rounded-xl p-4 border border-[#E7E2D2] shadow-2xs hover:border-[#344E06] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF3D8] text-[#344E06] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#344E06] transition">Farmers</h4>
                  <p className="text-xs text-gray-500">View & manage farmers</p>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-[#344E06] font-bold text-base transition"><ArrowRightIcon className="w-4 h-4" /></span>
            </Link>

            {/* 2. Centres */}
            <Link
              href="/admin/dashboard/centres"
              className="bg-white rounded-xl p-4 border border-[#E7E2D2] shadow-2xs hover:border-[#344E06] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#0284C7] transition">Centres</h4>
                  <p className="text-xs text-gray-500">Manage procurement centres</p>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-[#0284C7] font-bold text-base transition"><ArrowRightIcon className="w-4 h-4" /></span>
            </Link>

            {/* 3. Tokens */}
            <div
              onClick={() => setActiveQuickActionModal("tokens")}
              className="bg-white rounded-xl p-4 border border-[#E7E2D2] shadow-2xs hover:border-[#D97706] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#D97706] transition">Tokens</h4>
                  <p className="text-xs text-gray-500">View token queue & status</p>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-[#D97706] font-bold text-base transition"><ArrowRightIcon className="w-4 h-4" /></span>
            </div>

            {/* 4. Procurement */}
            <Link
              href="/admin/dashboard/procurement"
              className="bg-white rounded-xl p-4 border border-[#E7E2D2] shadow-2xs hover:border-[#16A34A] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#16A34A] transition">Procurement</h4>
                  <p className="text-xs text-gray-500">Track procurement records</p>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-[#16A34A] font-bold text-base transition"><ArrowRightIcon className="w-4 h-4" /></span>
            </Link>

            {/* 5. Payments */}
            <Link
              href="/admin/dashboard/payments"
              className="bg-white rounded-xl p-4 border border-[#E7E2D2] shadow-2xs hover:border-[#7C3AED] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold text-base">
                  ₹
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#7C3AED] transition">Payments</h4>
                  <p className="text-xs text-gray-500">Manage payments & dues</p>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-[#7C3AED] font-bold text-base transition"><ArrowRightIcon className="w-4 h-4" /></span>
            </Link>

            {/* 6. Requests */}
            <div
              onClick={() => setActiveQuickActionModal("requests")}
              className="bg-white rounded-xl p-4 border border-[#E7E2D2] shadow-2xs hover:border-[#E11D48] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] group-hover:text-[#E11D48] transition">Requests</h4>
                  <p className="text-xs text-gray-500">Handle pending requests</p>
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-[#E11D48] font-bold text-base transition"><ArrowRightIcon className="w-4 h-4" /></span>
            </div>


          </div>

          {/* AI Insights Full-Width Banner */}
          <div
            onClick={() => setShowAIModal(true)}
            className="w-full bg-gradient-to-r from-[#FAF5FF] via-[#F3E8FF] to-[#EDE9FE] border border-[#DDD6FE] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer mt-1"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-xs">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#4C1D95]">AI Insights</h4>
                  <span className="bg-[#8B5CF6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    New
                  </span>
                </div>
                <p className="text-xs text-[#6D28D9]">Get smart insights & recommendations</p>
              </div>
            </div>
            <span className="text-[#8B5CF6] font-bold text-lg pr-2">ΓÇ║</span>
          </div>
        </section>

        {/* ================= 5. AI PROCUREMENT ASSISTANT & RECENT ACTIVITY ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: AI Procurement Assistant */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7E2D2] shadow-xs flex flex-col justify-between relative overflow-hidden">

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF3D8] text-[#344E06] flex items-center justify-center text-lg">
                    
                  </div>
                  <h3 className="font-bold text-base text-[#1F2937] font-oldenburg">
                    AI Procurement Assistant
                  </h3>
                </div>
                <span className="bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  Powered by AI
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-5">
                Here are today&apos;s key insights based on current data.
              </p>

              {/* Insights List */}
              <div className="space-y-3.5">
                {isAiLoading ? (
                  <>
                    <div className="animate-pulse flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="space-y-2 w-full pt-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>

                    <div className="animate-pulse flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                      <div className="space-y-2 w-full pt-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  aiInsights.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className={`flex items-start gap-3 p-3 rounded-xl ${insight.colorStyle}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${insight.iconBg}`}
                      >
                        {insight.icon}
                      </div>

                      <div className="text-xs">
                        <p className={`font-bold ${insight.titleColor}`}>
                          {insight.title}
                        </p>
                        <p className={`mt-0.5 ${insight.descColor}`}>
                          {insight.desc}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            {/* Bottom Button */}
            <button
              onClick={() => setShowFullInsightsModal(true)}
              disabled={isAiLoading || aiInsights.length === 0}
              className="mt-6 w-full sm:w-auto self-start bg-[#344E06] hover:bg-[#2A3E05] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
            >
              <span>View Full Insights</span>
              <span><ArrowRightIcon className="w-4 h-4 inline" /></span>
            </button>
          </div>
        </div>  

          {/* Right Column: Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border border-[#E7E2D2] shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#1F2937] text-lg"></span>
                  <h3 className="font-bold text-base text-[#1F2937] font-oldenburg">
                    Recent Activity
                  </h3>
                </div>
                <button
                  onClick={() => setShowRecentActivityModal(true)}
                  className="text-xs font-semibold text-[#344E06] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  View All <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Feed items */}
              <div className="divide-y divide-gray-100">
                
                {/* 1 */}
                <div className="py-3 flex items-center justify-between first:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center text-sm">
                      <UsersIcon className="w-4 h-4 inline" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">New farmer registered</p>
                      <p className="text-[11px] text-gray-500">Rohit Das · 5 minutes ago</p>
                    </div>
                  </div>
                </div>

                {/* 2 */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-sm">
                      <TicketIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Token booked</p>
                      <p className="text-[11px] text-gray-500">Centre A · Token #042 · 12 minutes ago</p>
                    </div>
                  </div>
                </div>

                {/* 3 */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center text-sm">
                      <CreditCardIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Payment pending</p>
                      <p className="text-[11px] text-gray-500">For 3 farmers · 30 minutes ago</p>
                    </div>
                  </div>
                </div>

                {/* 4 */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EAF3D8] text-[#344E06] flex items-center justify-center text-sm">
                      <WheatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">New procurement entry</p>
                      <p className="text-[11px] text-gray-500">Rice · 500 kg · Centre B · 1 hour ago</p>
                    </div>
                  </div>
                </div>

                {/* 5 */}
                <div className="py-3 flex items-center justify-between last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center text-sm">
                      <BuildingOfficeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Centre status updated</p>
                      <p className="text-[11px] text-gray-500">Centre C · Now Active · 2 hours ago</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

        {/* ================= 6. BOTTOM NOTIFICATIONS STRIP ================= */}
        <section
          onClick={() => setShowNotifications(true)}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7E2D2] shadow-xs hover:border-[#344E06] transition flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer"
        >
          {/* Left info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl">🔔</span>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1F2937]">Notifications</h4>
              <p className="text-xs text-gray-500">You have {notificationCount} new notifications</p>
            </div>
          </div>

          {/* Quick inline pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div
              onClick={(e) => { e.stopPropagation(); setActiveQuickActionModal("requests"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF1F2] text-[#BE123C] font-medium border border-[#FECDD3] hover:opacity-80 transition"
            >
              <span>👤</span>
              <span>7 farmer requests <strong>pending</strong></span>
            </div>

            <div
              onClick={(e) => { e.stopPropagation(); router.push("/admin/dashboard/payments"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFBEB] text-[#B45309] font-medium border border-[#FDE68A] hover:opacity-80 transition"
            >
              <span>💳</span>
              <span>14 payments <strong>pending</strong></span>
            </div>

            <div
              onClick={(e) => { e.stopPropagation(); router.push("/admin/dashboard/centres"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF2F2] text-[#B91C1C] font-medium border border-[#FECACA] hover:opacity-80 transition"
            >
              <span>⚠️</span>
              <span>Centre B nearing capacity</span>
            </div>

            <span className="text-gray-400 font-bold text-base pl-1">›</span>
          </div>
        </section>

        {/* ================= 7. FOOTER ACTIONS ================= */}
        <footer className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © 2026 KrishiSangam · Mandi Procurement Management Console
          </p>

          <div className="flex items-center gap-3">
            {/* Need Help Button */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="bg-[#F4F8EC] hover:bg-[#E9F2DB] text-[#344E06] border border-[#CAD8B2] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs"
            >
              <span className="text-sm"><ShieldCheckIcon className="w-5 h-5" /></span>
              <span>Need Help</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-red-50 text-[#1F2937] hover:text-red-700 border border-[#D5D0BD] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs"
            >
              <span className="text-sm"><XMarkIcon className="w-5 h-5" /></span>
              <span>Logout</span>
            </button>
          </div>
        </footer>

      </main>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* OPTION C: METRIC 7-DAY TREND ANALYTICS MODAL */}
      <AnimatePresence>
        {selectedMetricTrend && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              {(() => {
                const metric = metricTrendDetails[selectedMetricTrend];
                const maxVal = Math.max(...metric.bars.map((b) => b.value));

                return (
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] font-bold text-[#344E06] uppercase tracking-wider bg-[#EAF3D8] px-2.5 py-0.5 rounded-full">
                          {metric.badge}
                        </span>
                        <h3 className="text-xl font-bold text-[#1F2937] font-oldenburg mt-1.5">
                          {metric.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedMetricTrend(null)}
                        className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                      >
                        <XMarkIcon className="w-4 h-4 inline" />
                      </button>
                    </div>

                    {/* Summary Ticker */}
                    <div className="py-3.5 flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-extrabold text-[#344E06] font-oldenburg">
                          {metric.mainVal}
                        </span>
                        <span className="ml-1.5 text-xs text-gray-500 font-semibold">{metric.unit}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{metric.subVal}</p>
                    </div>

                    {/* Visual Bar Chart */}
                    <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E7E2D2] mb-4">
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        7-Day Timeline / Breakdown
                      </p>
                      <div className="flex items-end justify-between gap-2 h-32 pt-4">
                        {metric.bars.map((bar, i) => {
                          const heightPct = Math.round((bar.value / maxVal) * 100);
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                              <span className="text-[9px] font-bold text-gray-600 mb-1">{bar.display}</span>
                              <div className="w-full max-w-[32px] bg-gray-200 rounded-t-md h-full flex items-end overflow-hidden">
                                <div
                                  style={{ height: `${heightPct}%` }}
                                  className={`w-full rounded-t-md transition-all ${
                                    bar.highlight ? "bg-[#344E06]" : "bg-[#9CB370]"
                                  }`}
                                />
                              </div>
                              <span className="text-[9px] font-semibold text-gray-500 mt-1.5 whitespace-nowrap">
                                {bar.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Insight Callout */}
                    <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 mb-5 flex items-start gap-2.5">
                      <span className="text-base">💡</span>
                      <div>
                        <span className="font-bold">Operational Insight:</span>
                        <p className="mt-0.5 text-green-800">{metric.insights}</p>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMetricTrend(null)}
                        className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                      >
                        Close
                      </button>
                      {metric.linkHref !== "#" ? (
                        <Link
                          href={metric.linkHref}
                          className="flex-2 py-2.5 rounded-xl bg-[#344E06] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#283C04] transition cursor-pointer text-center"
                        >
                          <span>{metric.linkText}</span>
                          <span><ArrowRightIcon className="w-4 h-4 inline" /></span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            const action = selectedMetricTrend === "tokens" ? "tokens" : "requests";
                            setSelectedMetricTrend(null);
                            setActiveQuickActionModal(action);
                          }}
                          className="flex-2 py-2.5 rounded-xl bg-[#344E06] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#283C04] transition cursor-pointer text-center"
                        >
                          <span>{metric.linkText}</span>
                          <span><ArrowRightIcon className="w-4 h-4 inline" /></span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. NEED HELP MODAL */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#344E06] font-oldenburg flex items-center gap-2">
                  <span><ShieldCheckIcon className="w-5 h-5" /></span> Admin Helpdesk & Support
                </h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 inline" />
                </button>
              </div>
              <div className="py-4 space-y-3 text-xs text-gray-600">
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E7E2D2]">
                  <p className="font-bold text-[#344E06]">Toll-Free Admin Mandi Support</p>
                  <p className="text-gray-700 text-sm font-semibold mt-0.5">1800-180-1551</p>
                  <p className="text-[11px] text-gray-500">Available Mon-Sat: 8:00 AM - 8:00 PM</p>
                </div>
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E7E2D2]">
                  <p className="font-bold text-[#344E06]">Technical & Token Grievances</p>
                  <p className="text-gray-700 text-sm font-semibold mt-0.5">support@KrishiSangam.gov.in</p>
                </div>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full bg-[#344E06] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2A3E05] transition cursor-pointer"
              >
                Close Support
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        
      {/* 2. AI INSIGHTS MODAL */}
      <AnimatePresence>
        {showAIModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>

                  <h3 className="text-lg font-bold text-[#344E06] font-oldenburg">
                    AI Procurement Insights
                  </h3>
                </div>

                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Insights */}
              <div className="py-4 space-y-3.5 text-xs text-gray-700">

                {/* Congestion Alert */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
                  <h5 className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span>⚠️</span>
                    Congestion Alert: Mandi Centre B
                  </h5>

                  <p className="mt-1 text-amber-800">
                    Expected arrival velocity between 11:30 AM and 2:30 PM is
                    42 vehicles/hr against a throughput capacity of 28. Recommend
                    enabling automated diversion to Centre C.
                  </p>
                </div>

                {/* Demand Trend */}
                <div className="p-3.5 rounded-xl bg-green-50/80 border border-green-200">
                  <h5 className="font-bold text-green-900 flex items-center gap-1.5">
                    <span>📈</span>
                    Demand Trend: Potato Harvest Season
                  </h5>

                  <p className="mt-1 text-green-800">
                    Procurement volume is outpacing warehouse intake by 18%.
                    Quality inspection automated rejection rate is at 1.4%
                    (healthy range).
                  </p>
                </div>

                {/* Payments */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
                  <h5 className="font-bold text-blue-900 flex items-center gap-1.5">
                    <span>💳</span>
                    Auto-Reconciliation of 14 Pending Payments
                  </h5>

                  <p className="mt-1 text-blue-800">
                    Aadhaar-seeded bank account validations completed for 12 out of
                    14 accounts. Batch payout release ready for one-click approval.
                  </p>
                </div>

              </div>

              {/* Done Button */}
              <button
                onClick={() => setShowAIModal(false)}
                className="w-full bg-[#344E06] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2A3E05] transition cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>  

      {/* 3. TOKENS MODAL */}
      <AnimatePresence>
        {activeQuickActionModal === "tokens" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl"><TicketIcon className="w-5 h-5" /></span>
                  <h3 className="text-lg font-bold text-[#344E06] font-oldenburg">
                    Today&apos;s Active Tokens (86)
                  </h3>
                </div>
                <button
                  onClick={() => setActiveQuickActionModal(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 inline" />
                </button>
              </div>

              <div className="py-4 space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-bold text-gray-800">Token #041 · Rajesh Kumar</span>
                    <p className="text-[11px] text-gray-500">Wheat · 350 kg · Centre A</p>
                  </div>
                  <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">Completed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-bold text-gray-800">Token #042 · Anita Devi</span>
                    <p className="text-[11px] text-gray-500">Potato · 220 kg · Centre B</p>
                  </div>
                  <span className="text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded">In Inspection</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-bold text-gray-800">Token #043 · Suresh Patel</span>
                    <p className="text-[11px] text-gray-500">Paddy · 400 kg · Centre A</p>
                  </div>
                  <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">Weighbridge</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-bold text-gray-800">Token #044 · Mohan Lal</span>
                    <p className="text-[11px] text-gray-500">Mustard · 170 kg · Centre C</p>
                  </div>
                  <span className="text-gray-700 font-bold bg-gray-200 px-2 py-0.5 rounded">Waiting Queue</span>
                </div>
              </div>

              <button
                onClick={() => setActiveQuickActionModal(null)}
                className="w-full bg-[#344E06] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2A3E05] transition cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. REQUESTS MODAL WITH INTERACTIVE ACTIONS */}
      <AnimatePresence>
        {activeQuickActionModal === "requests" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#E11D48] flex items-center justify-center">
                    <DocumentTextIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2937] font-oldenburg">
                    Pending Requests
                  </h3>
                </div>
                <button
                  onClick={() => setActiveQuickActionModal(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs max-h-80 overflow-y-auto pr-1">
                {requestsList.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <div>
                      <span className="font-bold text-gray-800">
                        {req.name}
                      </span>

                      <p className="text-[11px] text-gray-500">
                        {req.desc} &bull; {req.time}
                      </p>
                    </div>

                    {req.status === "pending" ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleApproveRequest(req.id)}
                          className="px-2.5 py-1 bg-[#344E06] hover:bg-[#283C04] text-white font-semibold rounded text-[11px] transition cursor-pointer"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleDeclineRequest(req.id)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-[11px] transition cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    ) : req.status === "approved" ? (
                      <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded text-[11px]">
                        ✓ Approved
                      </span>
                    ) : (
                      <span className="text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded text-[11px]">
                        ✕ Declined
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-semibold">7 pending requests</span>
                <button
                  onClick={() => setActiveQuickActionModal(null)}
                  className="bg-[#344E06] text-white py-2 px-5 rounded-xl font-bold text-xs hover:bg-[#2A3E05] transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. RECENT ACTIVITY VIEW ALL MODAL */}
      <AnimatePresence>
        {showRecentActivityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl"></span>
                  <h3 className="text-lg font-bold text-[#344E06] font-oldenburg">
                    Complete Activity Audit Log
                  </h3>
                </div>
                <button
                  onClick={() => setShowRecentActivityModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4 inline" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs max-h-80 overflow-y-auto pr-1">
                <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span><UsersIcon className="w-4 h-4 inline" /></span>
                    <div>
                      <p className="font-bold text-gray-800">New farmer registered: Rohit Das</p>
                      <p className="text-gray-500 text-[10px]">Singur cluster · 5 mins ago</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-700">Verified</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span><TicketIcon className="w-5 h-5" /></span>
                    <div>
                      <p className="font-bold text-gray-800">Token booked: #042 Anita Devi</p>
                      <p className="text-gray-500 text-[10px]">Centre A · 12 mins ago</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-700">Active</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span><CreditCardIcon className="w-5 h-5" /></span>
                    <div>
                      <p className="font-bold text-gray-800">Payment pending for 3 farmers</p>
                      <p className="text-gray-500 text-[10px]">Total ₹ 98,900 · 30 mins ago</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-700">Pending</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span><WheatIcon className="w-5 h-5" /></span>
                    <div>
                      <p className="font-bold text-gray-800">New procurement entry: Rice 500 kg</p>
                      <p className="text-gray-500 text-[10px]">Centre B · 1 hour ago</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-700">Grade A</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span><BuildingOfficeIcon className="w-5 h-5" /></span>
                    <div>
                      <p className="font-bold text-gray-800">Centre status updated: Centre C</p>
                      <p className="text-gray-500 text-[10px]">Now Active · 2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-700">Operational</span>
                </div>
              </div>

              <button
                onClick={() => setShowRecentActivityModal(false)}
                className="w-full bg-[#344E06] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#2A3E05] transition cursor-pointer"
              >
                Close Audit Log
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FULL NOTIFICATIONS PAGE MODAL ================= */}
      <AnimatePresence>
        {showAllNotifications && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100] flex items-start justify-center pt-12 sm:pt-20"
            onClick={() => setShowAllNotifications(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[95%] max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#F8F6ED]">
                <div>
                  <h2 className="text-lg font-bold text-[#1F2937] font-oldenburg">All Notifications</h2>
                  <p className="text-xs text-gray-500 mt-0.5">System alerts, updates &amp; notices</p>
                </div>
                <button
                  onClick={() => setShowAllNotifications(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                <div className="p-4 hover:bg-amber-50/40 flex gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Centre B nearing capacity (88%)</p>
                    <p className="text-xs text-gray-500 mt-0.5">Redirecting arrivals recommended</p>
                    <p className="text-[10px] text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                </div>
                <div className="p-4 hover:bg-amber-50/40 flex gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CreditCardIcon className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">14 farmer payments pending</p>
                    <p className="text-xs text-gray-500 mt-0.5">Awaiting disbursal confirmation</p>
                    <p className="text-[10px] text-gray-400 mt-1">15 minutes ago</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                </div>
                <div className="p-4 hover:bg-amber-50/40 flex gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <DocumentTextIcon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">7 new farmer registration requests</p>
                    <p className="text-xs text-gray-500 mt-0.5">KYC documents submitted</p>
                    <p className="text-[10px] text-gray-400 mt-1">1 hour ago</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                </div>
                <div className="p-4 hover:bg-gray-50/50 flex gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Daily procurement summary generated</p>
                    <p className="text-xs text-gray-500 mt-0.5">248 farmers, 12.4 tonnes processed</p>
                    <p className="text-[10px] text-gray-400 mt-1">3 hours ago</p>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50/50 flex gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">System backup completed successfully</p>
                    <p className="text-xs text-gray-500 mt-0.5">All data synced to cloud storage</p>
                    <p className="text-[10px] text-gray-400 mt-1">6 hours ago</p>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50/50 flex gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <UsersIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">New admin account created: DT-Kolkata</p>
                    <p className="text-xs text-gray-500 mt-0.5">District-level admin for Kolkata</p>
                    <p className="text-[10px] text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FULL AI INSIGHTS MODAL ================= */}
      <AnimatePresence>
        {showFullInsightsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F4F1EA] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E7E2D2]"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-[#344E06] text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <PresentationChartLineIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-oldenburg">AI Procurement Insights</h2>
                    <p className="text-xs text-[#E9DF87]">Comprehensive automated analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFullInsightsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-sm text-gray-600 mb-6">
                  Based on current dashboard data across centres, tokens, farmers, and procurement metrics, the following automated insights have been generated:
                </p>
                
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className={`flex items-start gap-4 p-4 rounded-xl shadow-xs ${insight.colorStyle}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl font-bold shadow-sm ${insight.iconBg}`}>
                        {insight.icon}
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${insight.titleColor}`}>
                          {insight.title}
                        </h4>
                        <p className={`text-xs mt-1 ${insight.descColor}`}>
                          {insight.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
