"use client";

import React, { useState, useEffect } from 'react';
import { useKisanData } from '../services/useDataHooks';
import { useToast } from '../components/ToastProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SellProducePage() {
  const { crops, updateCrop } = useKisanData();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active listings are crops with status "Listed"
  const activeListings = crops.filter(c => c.status === 'Listed');
  const availableToSell = crops.filter(c => c.status === 'Ready to Sell' || c.status === 'Growing');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [selectedCropId, setSelectedCropId] = useState('');
  const [sellQuantity, setSellQuantity] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [center, setCenter] = useState('Haldia');
  const [pickup, setPickup] = useState('Self Drop');

  // Watch for query param
  useEffect(() => {
    const cropId = searchParams.get('cropId');
    if (cropId) {
      setSelectedCropId(cropId);
      setIsModalOpen(true);
      router.replace('/farmer/dashboard/sell');
    }
  }, [searchParams, router]);

  const selectedCrop = crops.find(c => c.id === selectedCropId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrop) return;
    
    if (Number(sellQuantity) > selectedCrop.quantity) {
      showToast("Cannot sell more than available quantity.", "error");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Update crop status to listed
      // We could also reduce quantity if partial, but for simplicity we list the whole batch or update it
      updateCrop(selectedCrop.id, { 
        status: 'Listed',
        expectedPrice: expectedPrice ? Number(expectedPrice) : selectedCrop.expectedPrice
      });
      
      setLoading(false);
      setIsModalOpen(false);
      showToast("Produce listed successfully!", "success");
      
      // Reset form
      setSelectedCropId('');
      setSellQuantity('');
      setExpectedPrice('');
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Sell Produce</h1>
          <p className="font-onest text-sm text-[#351903]/70">List your ready crops for government procurement.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#365006] text-white px-6 py-2.5 rounded-md font-onest text-sm font-semibold hover:bg-[#2d4305] transition flex items-center gap-2 shadow-sm"
        >
          <span className="text-lg">🛒</span> Create New Listing
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-[#E9DDBD] bg-[#F9FAF6]">
          <h3 className="font-oldenburg text-xl text-[#351903]">Your Active Listings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead className="bg-[#F9FAF6]">
              <tr className="border-b border-[#E9DDBD] text-[#351903]/70">
                <th className="px-6 py-4 font-semibold">Listing ID</th>
                <th className="px-6 py-4 font-semibold">Crop</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Listed Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeListings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#351903]/50">
                    <div className="text-4xl mb-2">🏪</div>
                    <p>No active listings. Click "Create New Listing" to sell your produce.</p>
                  </td>
                </tr>
              ) : (
                activeListings.map((c) => (
                  <motion.tr 
                    key={c.id} 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6]"
                  >
                    <td className="px-6 py-4 font-semibold text-[#351903]">LST-{c.id.padStart(4, '0')}</td>
                    <td className="px-6 py-4 text-[#351903]">{c.name}</td>
                    <td className="px-6 py-4 text-[#351903]">{c.quantity} {c.unit}</td>
                    <td className="px-6 py-4 text-[#351903]">₹{c.expectedPrice}/{c.unit}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-[#FFF7E3] border-[#FDEBBE] text-[#9A7314]">
                        Awaiting Buyer
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => {
                        updateCrop(c.id, { status: 'Ready to Sell' });
                        showToast('Listing cancelled.', 'info');
                      }} className="text-red-600 font-semibold hover:underline text-xs">Cancel</button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sell Modal */}
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
                <h3 className="font-oldenburg text-xl text-[#351903]">
                  List Produce for Sale
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-onest">
                <div>
                  <label className="block text-sm font-semibold text-[#351903] mb-1">Select Crop *</label>
                  <select 
                    required 
                    value={selectedCropId} 
                    onChange={e => setSelectedCropId(e.target.value)} 
                    className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white text-[#351903]"
                  >
                    <option value="" disabled>-- Select a crop to sell --</option>
                    {availableToSell.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.quantity} {c.unit} available)</option>
                    ))}
                  </select>
                  {availableToSell.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">You have no crops available to sell. Add crops first.</p>
                  )}
                </div>
                
                {selectedCrop && (
                  <>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-[#351903] mb-1">Quantity to Sell *</label>
                        <div className="relative">
                          <input required value={sellQuantity} onChange={e => setSellQuantity(e.target.value)} type="number" max={selectedCrop.quantity} placeholder="0" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006]" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{selectedCrop.unit}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-[#351903] mb-1">Expected Price (₹) *</label>
                        <input required value={expectedPrice} onChange={e => setExpectedPrice(e.target.value)} type="number" placeholder={`e.g. ${selectedCrop.currentPrice || 30}`} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006]" />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-[#351903] mb-1">Procurement Center</label>
                        <select value={center} onChange={e => setCenter(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white">
                          <option value="Haldia">Haldia Center</option>
                          <option value="Kolkata">Kolkata Center</option>
                          <option value="Medinipur">Medinipur APMC</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-[#351903] mb-1">Pickup Preference</label>
                        <select value={pickup} onChange={e => setPickup(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white">
                          <option value="Self Drop">Self Drop</option>
                          <option value="Govt Pickup">Govt Pickup</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-[#E3F2E3] border border-[#C8E4C8] rounded-md p-3 mt-2">
                      <p className="text-xs text-[#1E5D1E] font-medium leading-relaxed">
                        By listing this produce, you agree to bring it to the center within 48 hours of order confirmation. Current market price for {selectedCrop.name} is ₹{selectedCrop.currentPrice || '--'}/{selectedCrop.unit}.
                      </p>
                    </div>
                  </>
                )}

                <div className="pt-4 flex justify-end gap-3 border-t border-[#F0F0F0] mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md font-semibold text-[#351903] hover:bg-gray-100 transition">Cancel</button>
                  <button 
                    type="submit" 
                    disabled={!selectedCrop || loading}
                    className="px-6 py-2 rounded-md font-semibold bg-[#365006] text-white hover:bg-[#2d4305] transition disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Listing...</>
                    ) : (
                      'LIST PRODUCE'
                    )}
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
