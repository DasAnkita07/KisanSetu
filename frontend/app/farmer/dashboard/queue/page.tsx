"use client";

import React from 'react';
import { useKisanData } from '../services/useDataHooks';
import { motion } from 'framer-motion';

export default function LiveQueuePage() {
  const { queue, refreshQueue } = useKisanData();

  if (!queue) return null;

  // Generate an array of queue numbers around the current serving
  const displayNumbers = [];
  const start = Math.max(1, queue.currentlyServing - 2);
  for (let i = 0; i < 7; i++) {
    displayNumbers.push(start + i);
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Live Procurement Queue</h1>
        <p className="font-onest text-sm text-[#351903]/70">Monitor your position in the procurement center queue in real-time.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1.5 rounded bg-[#E3F2E3] text-[#1E5D1E] text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Center: Haldia APMC
            </span>
            <span className="font-onest text-sm text-[#351903]/60">Gate 3</span>
          </div>
          <button 
            onClick={refreshQueue}
            className="flex items-center gap-2 bg-[#E9DDBD] hover:bg-[#D5C99F] text-[#351903] px-4 py-2 rounded-md font-onest text-sm font-semibold transition-colors"
          >
            <span>↻</span> Refresh Queue
          </button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="border-2 border-[#365006] rounded-xl p-4 sm:p-6 text-center bg-[#F9FAF6] shadow-sm transform scale-105">
            <p className="font-onest text-xs sm:text-sm text-[#351903]/80 font-semibold mb-2">Your Queue Number</p>
            <p className="font-oldenburg text-4xl sm:text-5xl text-[#365006]">#{queue.queueNumber}</p>
          </div>
          <div className="border border-[#E9DDBD] rounded-xl p-4 sm:p-6 text-center bg-white shadow-sm">
            <p className="font-onest text-xs sm:text-sm text-[#351903]/60 font-semibold mb-2">Currently Serving</p>
            <p className="font-oldenburg text-3xl sm:text-4xl text-[#351903]">#{queue.currentlyServing}</p>
          </div>
          <div className="border border-[#E9DDBD] rounded-xl p-4 sm:p-6 text-center bg-white shadow-sm">
            <p className="font-onest text-xs sm:text-sm text-[#351903]/60 font-semibold mb-2">Farmers Ahead</p>
            <p className="font-oldenburg text-3xl sm:text-4xl text-[#351903]">{(queue.farmersAhead).toString().padStart(2, '0')}</p>
          </div>
          <div className="border border-[#E9DDBD] rounded-xl p-4 sm:p-6 text-center bg-white shadow-sm">
            <p className="font-onest text-xs sm:text-sm text-[#351903]/60 font-semibold mb-2">Estimated Wait</p>
            <p className="font-oldenburg text-3xl sm:text-4xl text-[#351903]">{queue.estimatedWaitMins} <span className="text-lg">m</span></p>
          </div>
        </div>

        {/* Large Animated Queue Line */}
        <div className="relative pt-10 pb-8 px-4 sm:px-10 mb-6 bg-[#F9FAF6] border border-[#E9DDBD] rounded-xl">
          <h4 className="absolute top-4 left-6 font-onest font-semibold text-[#351903]/60 text-sm">Live Line Progress</h4>
          
          <div className="mt-8 relative w-full h-2 bg-[#D5D0BD] rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#365006] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (queue.currentlyServing / queue.queueNumber) * 100)}%` }}
              transition={{ duration: 1, type: 'spring' }}
            />
            
            <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2">
              {displayNumbers.map((num) => {
                const isServing = num === queue.currentlyServing;
                const isPassed = num < queue.currentlyServing;
                const isMine = num === queue.queueNumber;
                
                return (
                  <div key={num} className="relative flex flex-col items-center">
                    <motion.div 
                      className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold shadow-sm transition-colors ${
                        isPassed ? 'bg-[#365006] text-white' :
                        isServing ? 'bg-[#365006] text-white ring-8 ring-[#E3F2E3]' :
                        isMine ? 'bg-[#F0E383] border-2 border-[#351903] text-[#351903] z-10 scale-125' :
                        'bg-white border-2 border-[#D5D0BD] text-[#351903]/50'
                      }`}
                      layout
                    >
                      {isPassed ? '✓' : num}
                    </motion.div>
                    
                    {isMine && (
                      <div className="absolute -bottom-8 font-onest text-xs font-bold text-[#351903] whitespace-nowrap">
                        YOU ARE HERE
                      </div>
                    )}
                    {isServing && !isMine && (
                      <div className="absolute -bottom-8 font-onest text-xs font-bold text-[#1E5D1E] whitespace-nowrap">
                        SERVING
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {queue.status === 'Called' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#365006] text-white p-6 rounded-xl text-center shadow-lg"
          >
            <h3 className="font-oldenburg text-2xl mb-2">It's your turn!</h3>
            <p className="font-onest text-sm opacity-90">Please proceed to Gate 3 immediately with your produce and ID.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
