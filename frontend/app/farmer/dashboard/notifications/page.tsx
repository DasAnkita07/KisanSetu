"use client";

import React from 'react';
import { useKisanData } from '../services/useDataHooks';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsPage() {
  const { notifications, markNotificationRead } = useKisanData();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Notifications</h1>
        <p className="font-onest text-sm text-[#351903]/70">Stay updated on your orders, payments, and market changes.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E9DDBD] bg-[#F9FAF6] flex justify-between items-center">
          <h3 className="font-oldenburg text-xl text-[#351903]">Recent Alerts</h3>
        </div>
        
        <div className="divide-y divide-[#F0F0F0]">
          <AnimatePresence>
            {notifications.map((n) => (
              <motion.div 
                key={n.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className={`p-6 flex gap-4 ${n.read ? 'bg-white opacity-70' : 'bg-[#F9FAF6]'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                  n.type === 'Payment' ? 'bg-[#E3F2E3] text-[#1E5D1E]' :
                  n.type === 'Queue' ? 'bg-[#FDF2D9] text-[#9A7314]' :
                  n.type === 'Order' ? 'bg-[#E9F0FD] text-[#1D54A0]' :
                  'bg-[#FDE2E2] text-[#A61A1A]'
                }`}>
                  {n.type === 'Payment' ? '💰' : n.type === 'Queue' ? '👥' : n.type === 'Order' ? '📦' : '📈'}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-onest text-base ${n.read ? 'text-[#351903]' : 'text-[#351903] font-bold'}`}>
                      {n.message}
                    </h4>
                    <span className="font-onest text-xs text-[#351903]/50 whitespace-nowrap ml-4">{n.time}</span>
                  </div>
                  <p className="font-onest text-sm text-[#351903]/60 mb-3">
                    {n.type === 'Payment' ? 'Your linked bank account has been credited.' :
                     n.type === 'Queue' ? 'Please proceed to the procurement center.' :
                     'Tap to view more details.'}
                  </p>
                  
                  {!n.read && (
                    <button 
                      onClick={() => markNotificationRead(n.id)}
                      className="text-[#365006] text-xs font-semibold font-onest hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {notifications.length === 0 && (
            <div className="p-12 text-center text-[#351903]/50">
              <span className="text-4xl mb-4 block">🔕</span>
              <p className="font-onest">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
