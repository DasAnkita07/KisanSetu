"use client";

import React, { use } from 'react';
import { useKisanData } from '../../services/useDataHooks';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OrderTrackPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const { orders } = useKisanData();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-[#351903] font-oldenburg mb-4">Order Not Found</h2>
        <Link href="/farmer/dashboard/track-status" className="text-[#365006] underline">Return to Tracking</Link>
      </div>
    );
  }

  const stages = [
    'Order Placed',
    'Accepted',
    'Procurement Scheduled',
    'In Transit',
    'Payment Pending',
    'Payment Completed'
  ];

  let currentStageIndex = 0;
  if (order.status === 'Processing') currentStageIndex = 2;
  else if (order.status === 'In Transit') currentStageIndex = 3;
  else if (order.status === 'Completed') currentStageIndex = 5;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Link href="/farmer/dashboard/track-status" className="inline-flex items-center gap-2 text-[#365006] hover:underline font-onest text-sm font-semibold mb-6">
        <span>←</span> Back to all orders
      </Link>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-[#E9DDBD] pb-6">
          <div>
            <h1 className="font-oldenburg text-2xl sm:text-3xl text-[#351903] mb-1">Order #{order.id}</h1>
            <p className="font-onest text-[#351903]/70">{order.crop} • {order.quantity} {order.unit}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            <p className="font-onest text-sm text-[#351903]/60 mb-1">Current Status</p>
            <p className="font-oldenburg text-xl text-[#365006]">{stages[currentStageIndex]}</p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-4 sm:pl-8 py-4">
          <div className="absolute top-0 bottom-0 left-6 sm:left-10 w-0.5 bg-[#E9DDBD]" />
          
          <motion.div 
            className="absolute top-0 left-6 sm:left-10 w-0.5 bg-[#365006] origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: (currentStageIndex) / (stages.length - 1) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          <div className="space-y-10 relative">
            {stages.map((stage, idx) => {
              const isCompleted = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              
              return (
                <div key={stage} className="flex items-center gap-6 relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className={`w-5 h-5 rounded-full flex items-center justify-center relative z-10 ${
                      isCompleted ? 'bg-[#365006]' : 'bg-white border-2 border-[#D5D0BD]'
                    } ${isCurrent ? 'ring-4 ring-[#E3F2E3]' : ''}`}
                  >
                    {isCompleted && <span className="text-white text-[10px]">✓</span>}
                  </motion.div>
                  
                  <div>
                    <h4 className={`font-onest font-semibold ${isCompleted ? 'text-[#351903]' : 'text-[#351903]/50'}`}>
                      {stage}
                    </h4>
                    {isCurrent && (
                      <p className="font-onest text-sm text-[#365006] mt-1">
                        {idx === 3 ? "Your produce is being transported." : 
                         idx === 5 ? "Payment has been credited." : 
                         "Processing your request..."}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {order.status !== 'Completed' && (
          <div className="mt-12 bg-[#F9FAF6] border border-[#E9DDBD] rounded-lg p-4 flex items-start gap-4">
            <span className="text-2xl">⏳</span>
            <div>
              <h5 className="font-onest font-semibold text-[#351903]">Estimated Completion</h5>
              <p className="font-onest text-sm text-[#351903]/70">Today, 4:30 PM</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
