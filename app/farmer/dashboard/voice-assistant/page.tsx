"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  // Handle mock voice interaction
  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript("Listening...");
      setResponse("");

      // Simulate voice recognition process
      setTimeout(() => {
        const commands = [
          { text: "What is today's rice price?", reply: "Today's rice price is ₹32/kg. Navigating to Market Prices...", path: "/farmer/dashboard/market?crop=rice" },
          { text: "Show my order status", reply: "You have 3 pending orders. Navigating to Track Status...", path: "/farmer/dashboard/track-status" },
          { text: "When is my queue?", reply: "Your queue number is #24. Navigating to Live Queue...", path: "/farmer/dashboard/queue" }
        ];
        
        const randomCmd = commands[Math.floor(Math.random() * commands.length)];
        
        setTranscript(`"${randomCmd.text}"`);
        setIsListening(false);
        
        setTimeout(() => {
          setResponse(randomCmd.reply);
          setTimeout(() => {
            router.push(randomCmd.path);
          }, 2000);
        }, 800);
      }, 3000);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-5">
        <span className="text-[400px]">🎙️</span>
      </div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="font-oldenburg text-4xl sm:text-5xl text-[#351903] mb-4">Voice Assistant</h1>
        <p className="font-onest text-lg text-[#351903]/70">Talk to KisanSetu for hands-free navigation and queries.</p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Waveform Background */}
        <AnimatePresence>
          {isListening && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#365006]/10 flex items-center justify-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-3/4 h-3/4 rounded-full bg-[#365006]/20"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={toggleListen}
          className={`relative z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-2xl transition-all duration-300 ${
            isListening ? 'bg-[#2d4305] text-white scale-110 shadow-[0_0_40px_rgba(54,80,6,0.4)]' : 'bg-[#365006] text-white hover:scale-105 hover:bg-[#2d4305]'
          }`}
        >
          🎙️
        </button>

        <div className="mt-12 h-32 flex flex-col items-center justify-center w-full max-w-lg text-center px-4">
          <AnimatePresence mode="wait">
            {transcript && (
              <motion.div
                key={transcript}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`font-onest text-xl sm:text-2xl mb-4 ${isListening ? 'text-[#351903]/60 italic animate-pulse' : 'text-[#351903] font-semibold'}`}
              >
                {transcript}
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            {response && (
              <motion.div
                key={response}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#E3F2E3] border border-[#C8E4C8] text-[#1E5D1E] px-6 py-3 rounded-full font-onest text-sm shadow-sm"
              >
                {response}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {!isListening && !response && (
        <div className="relative z-10 mt-8 text-center space-y-3">
          <p className="font-onest text-sm font-semibold text-[#351903]/50 uppercase tracking-wider">Try saying:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white border border-[#D5D0BD] text-[#351903]/80 font-onest text-sm shadow-sm">"What is today's rice price?"</span>
            <span className="px-4 py-2 rounded-full bg-white border border-[#D5D0BD] text-[#351903]/80 font-onest text-sm shadow-sm">"Show my order status"</span>
            <span className="px-4 py-2 rounded-full bg-white border border-[#D5D0BD] text-[#351903]/80 font-onest text-sm shadow-sm">"When is my queue?"</span>
          </div>
        </div>
      )}
    </div>
  );
}
