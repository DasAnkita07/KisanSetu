"use client";

import React, { useState } from 'react';
import Hero from './components/Hero';
import StatCard from './components/StatCard';
//import QuickActions from './components/QuickActions';
import DashboardTables from './components/DashboardTables';
import { useKisanData } from './services/useDataHooks';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import BookingQR from "./components/bookingQR";
import SmartCenterRecommendation from './components/SmartCenterRecommendation';

export default function DashboardOverview() {
  const [showQueueDetails, setShowQueueDetails] = useState(false);
  const { crops, orders, payments, queue, refreshQueue } = useKisanData();

  const totalCrops = crops.length;
  const activeListings = crops.filter(c => c.status === 'Listed').length;
  const pendingOrders = orders.filter(o => o.status !== 'Completed').length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const totalEarnings = payments
    .filter(p => p.status === 'Paid' && new Date(p.date).getMonth() === currentMonth && new Date(p.date).getFullYear() === currentYear)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleAiAsk = (question: string) => {
    setAiLoading(true);
    setAiResponse("");
    // Mock AI response
    setTimeout(() => {
      setAiLoading(false);
      if (question.includes("yield")) {
        setAiResponse("To increase rice yield, ensure proper water management (5-10cm depth) and apply balanced NPK fertilizers at the right growth stages.");
      } else if (question.includes("potato")) {
        setAiResponse("For potatoes, a fertilizer mix rich in Phosphorus and Potassium is recommended. Apply base fertilizer before planting.");
      } else if (question.includes("disease")) {
        setAiResponse("Please open the full AI Assistant to upload a photo of the affected plant.");
      } else {
        setAiResponse("Wheat should typically be harvested when the moisture content drops to 14-15% and the stalks turn golden yellow.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <Hero />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="My Crops" value={totalCrops} subtitle="+1 this month" icon="🌱" trend="up" link="/farmer/dashboard/crops" delay={0.1}
        />
        <StatCard 
          title="Active Listings" value={`0${activeListings}`} subtitle="awaiting sale" icon="🏪" trend="neutral" link="/farmer/dashboard/sell" delay={0.2}
        />
        <StatCard 
          title="Pending Orders" value={`0${pendingOrders}`} subtitle="processing" icon="📄" trend="neutral" link="/farmer/dashboard/orders" delay={0.3}
        />
        <StatCard 
          title="Total Earnings" value={`₹${totalEarnings.toLocaleString('en-IN')}`} subtitle="This month" icon="🪙" trend="up" link="/farmer/dashboard/payments" delay={0.4}
        />
      </div>

      

      <div className="lg:col-span-8 space-y-6">
          
          {/* Procurement / VIP / QR Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  {/* Live Procurement Queue */}
  <Link
  href="/farmer/dashboard/queue"
  className="bg-white border border-[#E9DDBD] rounded-xl p-5 hover:shadow-md transition h-full flex flex-col"
  >
  <div className="flex items-center justify-between mb-4">
  <h3 className="font-oldenburg text-lg text-[#351903]">
    Live Procurement Queue
  </h3>

  <div className="flex items-center gap-2 text-xs text-[#351903]/50">
    <span>Last updated: Just now</span>
    <span className="text-[#365006] text-base">↻</span>
  </div>
</div>

  {queue ? (
    <>
      <div className="border border-[#E9DDBD] rounded-lg p-5 text-center bg-[#F9FAF6] flex flex-col items-center justify-center mb-4">
  <p className="font-onest text-sm text-[#351903]/60 mb-2">
    Your Queue Number
  </p>
  <p className="font-onest text-2xl text-[#351903]">
    #{queue.queueNumber}
  </p>
</div>

        <div className="border border-[#E9DDBD] rounded-lg p-5 text-center bg-white flex flex-col items-center justify-center mb-4">
  <p className="font-onest text-sm text-[#351903]/60 mb-2">
    Currently Serving
  </p>
  <p className="font-onest text-2xl text-[#351903]">
    #{queue.currentlyServing}
  </p>
</div>

       <div className="border border-[#E9DDBD] rounded-lg p-5 text-center bg-white flex flex-col items-center justify-center mb-4">
  <p className="font-onest text-sm text-[#351903]/60 mb-2">
    Farmers Ahead
  </p>
  <p className="font-onest text-2xl text-[#351903]">
    {queue.farmersAhead.toString().padStart(2, "0")}
  </p>
</div>

        <div className="border border-[#E9DDBD] rounded-lg p-5 text-center bg-white flex flex-col items-center justify-center">
  <p className="font-onest text-sm text-[#351903]/60 mb-2">
    Estimated Wait
  </p>
  <p className="font-onest text-2xl text-[#351903]">
    {queue.estimatedWaitMins}
    <span className="font-oldenburg text-sm ml-1">mins</span>
  </p>
</div>

<div className="py-4 text-center">
  <p className="font-onest text-sm text-[#351903]/60">
    You are currently{" "}
    <span className="font-semibold text-[#365006]">
      {queue.farmersAhead} farmers ahead
    </span>
    . Please stay ready for your turn.
  </p>
</div>

      <div className="mt-auto pt-4">
  <div className="w-full bg-[#365006] text-white text-center py-2.5 rounded-lg font-onest text-sm font-semibold hover:bg-[#2d4305] transition">
    View Live Queue →
  </div>
</div>
    </>
  ) : (
    <p className="text-center py-4 text-sm text-gray-500">
      Loading queue data...
    </p>
  )}
</Link>

  {/* Track Status */}
<div className="bg-white border border-[#E9DDBD] rounded-xl p-5 h-full min-h-[520px] flex flex-col">

  <h3 className="font-oldenburg text-lg text-[#351903] mb-2">
    Track Status
  </h3>

  <p className="font-onest text-sm text-[#351903]/60 mb-5">
    Your latest crop sale (Token H-0987)
  </p>

  {/* Status Timeline */}
  <div className="relative flex-1 flex flex-col justify-between pl-2">

    {/* Connecting line */}
    <div className="absolute left-[21px] top-4 bottom-4 w-[3px] bg-[#DCE5D0]"></div>

    {/* 1. Booking Confirmed */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-[#365006] text-white flex items-center justify-center text-sm font-semibold shrink-0">
        ✓
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Booking Confirmed
        </p>
        <p className="font-onest text-xs text-[#365006] mt-1">
          Completed
        </p>
      </div>
    </div>

    {/* 2. Token Issued */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-[#365006] text-white flex items-center justify-center text-sm font-semibold shrink-0">
        ✓
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Token Issued
        </p>
        <p className="font-onest text-xs text-[#365006] mt-1">
          Completed
        </p>
      </div>
    </div>

    {/* 3. Arrived at Centre */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-[#365006] text-white flex items-center justify-center text-sm font-semibold shrink-0">
        ✓
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Arrived at Centre
        </p>
        <p className="font-onest text-xs text-[#365006] mt-1">
          Completed
        </p>
      </div>
    </div>

    {/* 4. Quality Check */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-[#365006] text-white flex items-center justify-center text-sm font-semibold shrink-0">
        ✓
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Quality Check
        </p>
        <p className="font-onest text-xs text-[#365006] mt-1">
          Completed
        </p>
      </div>
    </div>

    {/* 5. Weighing & Grading */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-[#365006] text-white flex items-center justify-center text-sm font-semibold shrink-0">
        ✓
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Weighing &amp; Grading
        </p>
        <p className="font-onest text-xs text-[#365006] mt-1">
          Completed
        </p>
      </div>
    </div>

    {/* 6. Sale Processing */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-white border-2 border-[#365006] flex items-center justify-center shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#365006]"></div>
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Sale Processing
        </p>
        <p className="font-onest text-xs text-[#365006] mt-1">
          In progress
        </p>
      </div>
    </div>

    {/* 7. Payment */}
    <div className="relative flex gap-4">
      <div className="relative z-10 w-7 h-7 rounded-full bg-[#F3C969] flex items-center justify-center shrink-0">
      </div>

      <div>
        <p className="font-onest text-sm font-semibold text-[#351903]">
          Payment
        </p>
        <p className="font-onest text-xs text-[#351903]/60 mt-1">
          Pending
        </p>
      </div>
    </div>

  </div>

</div>
        
      
  {/* Procurement QR */}

  <BookingQR />

</div>

        </div>

        {/* Right Sidebar: AI and Voice Assistants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <SmartCenterRecommendation/>
          
          {/* AI Assistant Widget */}
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-[#F9FAF6] rounded-xl border border-[#D5D0BD] shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌱</span>
              <h3 className="font-oldenburg text-xl text-[#351903]">AI Crop Assistant</h3>
            </div>
            <p className="font-onest text-sm text-[#351903]/70 mb-5">Get smart advice for better farming</p>
            
            <div className="space-y-2 mb-5">
              {[
                "How to increase rice yield?",
                "Best fertilizer for potato?",
                "Detect plant disease (upload image)",
                "When to harvest wheat?"
              ].map((q) => (
                <button 
                  key={q} 
                  onClick={() => handleAiAsk(q)}
                  className="w-full text-left px-4 py-2.5 rounded border border-[#E9DDBD] bg-white font-onest text-sm text-[#351903] hover:border-[#365006] hover:bg-[#F0E383]/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {aiLoading && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4">
                  <div className="flex gap-1 items-center px-4 py-3 bg-white border border-[#E9DDBD] rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-[#365006] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#365006] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#365006] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              {aiResponse && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 px-4 py-3 bg-[#E3F2E3] border border-[#C8E4C8] rounded-lg text-sm font-onest text-[#1E5D1E] leading-relaxed">
                  {aiResponse}
                </motion.div>
              )}
            </AnimatePresence>

            <Link href="/farmer/dashboard/crop-assistant" className="mt-auto block w-full text-center px-4 py-2.5 bg-[#365006] text-white rounded font-onest text-sm font-semibold hover:bg-[#2d4305] transition">
              Open Crop Assistant →
            </Link>
          </motion.div>

          {/* Voice Assistant Widget */}
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="bg-[#F8F6ED] rounded-xl border border-[#D5D0BD] shadow-sm p-5 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🎙️</div>
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <span className="text-2xl">🎙️</span>
              <h3 className="font-oldenburg text-xl text-[#351903]">Voice Assistant</h3>
            </div>
            <p className="font-onest text-sm text-[#351903]/70 mb-6 relative z-10">Talk to KrishiSangam</p>
            
            <div className="flex justify-center mb-6 relative z-10">
              <Link href="/farmer/dashboard/voice-assistant" className="w-16 h-16 rounded-full bg-[#365006] text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 hover:bg-[#2d4305] transition-all cursor-pointer">
                🎤
              </Link>
            </div>

            <div className="space-y-3 relative z-10">
              <p className="font-onest text-xs font-semibold text-[#351903]/60 uppercase tracking-wider">Try saying:</p>
              <div className="flex items-center gap-2 font-onest text-sm text-[#351903]">
                <span className="text-xl">🗣️</span> "What is today's rice price?"
              </div>
              <div className="flex items-center gap-2 font-onest text-sm text-[#351903]">
                <span className="text-xl">🗣️</span> "Show my order status"
              </div>
              <div className="flex items-center gap-2 font-onest text-sm text-[#351903]">
                <span className="text-xl">🗣️</span> "When should I irrigate my field?"
              </div>
            </div>

            <Link href="/farmer/dashboard/voice-assistant" className="mt-auto block w-full text-center mt-6 px-4 py-2.5 bg-[#365006] text-white rounded font-onest text-sm font-semibold hover:bg-[#2d4305] transition relative z-10">
              Start Talking
            </Link>
          </motion.div>

        </div>

      <DashboardTables />
      
    </div>
  );
}
