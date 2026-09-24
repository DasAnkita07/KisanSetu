"use client";

import React, { useState } from 'react';
import { useKisanData } from '../services/useDataHooks';
import { useToast } from '../components/ToastProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function SlotBookingPage() {
  const { crops, slots, bookSlot } = useKisanData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('08:00 AM - 10:00 AM');
  const [center, setCenter] = useState('Haldia APMC');
  
  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrop || !date || !timeSlot || !center) {
      showToast('Please fill all fields', 'error');
      return;
    }

    // Generate a unique booking ID
    const uniqueId = `KS-${Date.now().toString().slice(-8)}`;

    // Save booking
    bookSlot({
      cropId: selectedCrop,
      date,
      timeSlot,
      center
    });

    // Save QR booking data
    localStorage.setItem(
      'kisansetu_booking',
      JSON.stringify({
        uniqueId,
        crop: crops.find(c => c.id === selectedCrop)?.name,
        date,
        time: timeSlot,
        center
      })
    );

    showToast('Procurement slot booked successfully!', 'success');

    setIsModalOpen(false);
    setSelectedCrop('');
    setDate('');
  };

  const activeCrops = crops.filter(c => c.status === 'Listed' || c.status === 'Ready to Sell');

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Slot Booking</h1>
          <p className="font-onest text-sm text-[#351903]/70">Book a time slot to bring your produce to the procurement center and avoid waiting.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#365006] text-white px-6 py-2.5 rounded-md font-onest text-sm font-semibold hover:bg-[#2d4305] transition flex items-center gap-2"
        >
          <span className="text-lg">📅</span> Book New Slot
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E9DDBD] bg-[#F9FAF6]">
          <h3 className="font-oldenburg text-xl text-[#351903]">Your Booked Slots</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead className="bg-[#F9FAF6]">
              <tr className="border-b border-[#E9DDBD] text-[#351903]/70">
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">Center</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Time Slot</th>
                <th className="px-6 py-4 font-semibold">Crop</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#351903]/50">
                    <div className="text-4xl mb-2">📅</div>
                    <p>No slots booked yet. Click "Book New Slot" to schedule your visit.</p>
                  </td>
                </tr>
              ) : (
                slots.map((s) => {
                  const crop = crops.find(c => c.id === s.cropId);
                  const displayDate = new Date(s.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  
                  return (
                    <motion.tr 
                      key={s.id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]"
                    >
                      <td className="px-6 py-4 font-semibold text-[#351903]">{s.id}</td>
                      <td className="px-6 py-4 text-[#351903]">{s.center}</td>
                      <td className="px-6 py-4 text-[#351903]">{displayDate}</td>
                      <td className="px-6 py-4 text-[#351903]">{s.timeSlot}</td>
                      <td className="px-6 py-4 text-[#351903]">{crop ? crop.name : 'Unknown Crop'}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-[#E9F0FD] border-[#C8DDF8] text-[#1D54A0]">
                          {s.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Slot Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-[#D5D0BD] overflow-hidden"
            >
              <div className="bg-[#F9FAF6] border-b border-[#E9DDBD] px-6 py-4 flex items-center justify-between">
                <h3 className="font-oldenburg text-xl text-[#351903]">Book Procurement Slot</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-onest">
                <div>
                  <label className="block text-sm font-semibold text-[#351903] mb-1">Select Center *</label>
                  <select required value={center} onChange={e => setCenter(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white text-[#351903]">
                    <option value="Haldia APMC">Haldia APMC</option>
                    <option value="Kolkata APMC">Kolkata APMC</option>
                    <option value="Medinipur Center">Medinipur Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#351903] mb-1">Select Crop *</label>
                  <select required value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white text-[#351903]">
                    <option value="" disabled>-- Select listed crop --</option>
                    {activeCrops.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.quantity} {c.unit})</option>
                    ))}
                  </select>
                  {activeCrops.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">You have no listed crops. Please add or list a crop first.</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Date *</label>
                    <input required value={date} onChange={e => setDate(e.target.value)} type="date" min={new Date().toISOString().split('T')[0]} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] text-[#351903]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Time Slot *</label>
                    <select required value={timeSlot} onChange={e => setTimeSlot(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white text-[#351903]">
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-[#F0F0F0] mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md font-semibold text-[#351903] hover:bg-gray-100 transition">Cancel</button>
                  <button type="submit" disabled={!selectedCrop} className="px-6 py-2 rounded-md font-semibold bg-[#365006] text-white hover:bg-[#2d4305] transition disabled:opacity-50">
                    Confirm Booking
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
