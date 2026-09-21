"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function CropAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'msg1', sender: 'ai', text: 'Hello! I am your KisanSetu AI Crop Assistant. Ask me anything about crop management, diseases, fertilizers, or market trends.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How to increase rice yield?",
    "Best fertilizer for potato?",
    "Detect plant disease",
    "When to harvest wheat?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "I am processing your query. Currently, I am a mock AI service. In the production version, this will connect to our AI backend for precise agricultural advice!";
      
      const q = text.toLowerCase();
      if (q.includes('yield')) {
        reply = "To increase crop yield, ensure timely irrigation and apply proper NPK ratios. For rice, maintaining 5-10cm standing water during the vegetative stage is crucial.";
      } else if (q.includes('potato') || q.includes('fertilizer')) {
        reply = "Potatoes require well-drained soil and high phosphorus/potassium fertilizers. Apply base fertilizer before planting, and avoid excessive nitrogen which delays tuber formation.";
      } else if (q.includes('disease') || q.includes('detect')) {
        reply = "I can analyze crop diseases. Please click the attachment icon to upload a photo of the affected plant leaves or stem.";
      } else if (q.includes('harvest')) {
        reply = "Harvest timing varies by crop. Wheat should be harvested when moisture is around 14% and the plant turns golden. Rice should be harvested 30-35 days after flowering.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: reply }]);
    }, 1500);
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h1 className="font-oldenburg text-3xl text-[#351903] mb-1">AI Crop Assistant</h1>
        <p className="font-onest text-sm text-[#351903]/70">Get personalized smart advice for better farming outcomes.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-[#D5D0BD] shadow-sm flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-[#F9FAF6]">
          <div className="space-y-6">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-5 py-3 ${
                  msg.sender === 'user' 
                    ? 'bg-[#365006] text-white rounded-br-sm' 
                    : 'bg-white border border-[#E9DDBD] text-[#351903] rounded-bl-sm shadow-sm'
                }`}>
                  <p className="font-onest text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white border border-[#E9DDBD] rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#365006] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#365006] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#365006] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#D5D0BD]">
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedQuestions.map(q => (
              <button 
                key={q}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full border border-[#D5D0BD] text-[#351903]/80 font-onest text-xs hover:border-[#365006] hover:bg-[#F9FAF6] hover:text-[#365006] transition"
              >
                {q}
              </button>
            ))}
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-3"
          >
            <button type="button" className="p-2 text-[#365006] hover:bg-[#F9FAF6] rounded-full transition">
              📎
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crops, weather, pests, fertilizers..."
              className="flex-1 h-12 rounded-full border border-[#C9C4B2] bg-[#F9FAF6] px-5 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-[#365006] text-white flex items-center justify-center hover:bg-[#2d4305] transition disabled:opacity-50"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
