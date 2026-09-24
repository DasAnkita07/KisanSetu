"use client";

import React, { useState } from 'react';
import Hero from './components/Hero';
import StatCard from './components/StatCard';
import QuickActions from './components/QuickActions';
import DashboardTables from './components/DashboardTables';
import { useKisanData } from './services/useDataHooks';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import BookingQR from "./components/bookingQR";

export default function DashboardOverview() {
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

      <QuickActions />

      <div className="lg:col-span-8 space-y-6">
          
          {/* Live Procurement Queue */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="font-oldenburg text-lg text-[#351903]">Live Procurement Queue</h3>
                <span className="px-2 py-1 rounded bg-[#E3F2E3] text-[#1E5D1E] text-xs font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-onest text-xs text-[#351903]/50">Last updated: Just now</span>
                <button onClick={refreshQueue} className="text-[#365006] hover:rotate-180 transition-transform p-1">
                  ↻
                </button>
              </div>
            </div>

            {queue ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="border border-[#E9DDBD] rounded-lg p-3 text-center bg-[#F9FAF6]">
                    <p className="font-onest text-xs text-[#351903]/60 mb-1">Your Queue Number</p>
                    <p className="font-oldenburg text-2xl text-[#351903]">#{queue.queueNumber}</p>
                  </div>
                  <div className="border border-[#E9DDBD] rounded-lg p-3 text-center bg-white">
                    <p className="font-onest text-xs text-[#351903]/60 mb-1">Currently Serving</p>
                    <p className="font-oldenburg text-2xl text-[#351903]">#{queue.currentlyServing}</p>
                  </div>
                  <div className="border border-[#E9DDBD] rounded-lg p-3 text-center bg-white">
                    <p className="font-onest text-xs text-[#351903]/60 mb-1">Farmers Ahead</p>
                    <p className="font-oldenburg text-2xl text-[#351903]">{(queue.farmersAhead).toString().padStart(2, '0')}</p>
                  </div>
                  <div className="border border-[#E9DDBD] rounded-lg p-3 text-center bg-white">
                    <p className="font-onest text-xs text-[#351903]/60 mb-1">Estimated Wait</p>
                    <p className="font-oldenburg text-2xl text-[#351903]">{queue.estimatedWaitMins} <span className="text-sm">mins</span></p>
                  </div>
                </div>

                {/* Queue Progress Bar */}
                <div className="relative pt-6 pb-2 px-4 mb-6">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E9DDBD] -translate-y-1/2 rounded-full z-0" />
                  <motion.div 
                    className="absolute top-1/2 left-0 h-1 bg-[#365006] -translate-y-1/2 rounded-full z-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (queue.currentlyServing / queue.queueNumber) * 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                  
                  <div className="relative z-10 flex justify-between">
                    {[18, 19, 20, 21, 22, 24].map((num) => (
                      <div key={num} className="flex flex-col items-center">
                        <motion.div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                            num < queue.currentlyServing ? 'bg-[#365006] text-white' :
                            num === queue.currentlyServing ? 'bg-[#365006] text-white ring-4 ring-[#E3F2E3]' :
                            num === queue.queueNumber ? 'bg-white border-2 border-[#365006] text-[#365006]' :
                            'bg-white border-2 border-[#D5D0BD] text-[#D5D0BD]'
                          }`}
                          layout
                        >
                          {num < queue.currentlyServing ? '✓' : ''}
                        </motion.div>
                        <span className="font-onest text-[10px] mt-2 font-semibold text-[#351903]/70">{num}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/farmer/dashboard/queue" className="inline-block px-5 py-2 bg-[#365006] text-white rounded font-onest text-sm font-semibold hover:bg-[#2d4305] transition">
                  View Live Queue →
                </Link>
              </>
            ) : (
              <p className="text-center py-6 text-sm text-gray-500">Loading queue data...</p>
            )}
          </motion.div>

        </div>

        {/* Right Sidebar: AI and Voice Assistants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <BookingQR />
          
          {/* AI Assistant Widget */}
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-[#F9FAF6] rounded-xl border border-[#D5D0BD] shadow-sm p-5">
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

            <Link href="/farmer/dashboard/crop-assistant" className="block w-full text-center px-4 py-2.5 bg-[#365006] text-white rounded font-onest text-sm font-semibold hover:bg-[#2d4305] transition">
              Open Crop Assistant →
            </Link>
          </motion.div>

          {/* Voice Assistant Widget */}
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="bg-[#F8F6ED] rounded-xl border border-[#D5D0BD] shadow-sm p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🎙️</div>
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <span className="text-2xl">🎙️</span>
              <h3 className="font-oldenburg text-xl text-[#351903]">Voice Assistant</h3>
            </div>
            <p className="font-onest text-sm text-[#351903]/70 mb-6 relative z-10">Talk to KisanSetu</p>
            
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

            <Link href="/farmer/dashboard/voice-assistant" className="block w-full text-center mt-6 px-4 py-2.5 bg-[#365006] text-white rounded font-onest text-sm font-semibold hover:bg-[#2d4305] transition relative z-10">
              Start Talking
            </Link>
          </motion.div>

        </div>

      <DashboardTables />
      
    </div>
  );
}
