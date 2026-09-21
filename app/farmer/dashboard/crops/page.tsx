"use client";

import React, { useState, useEffect } from 'react';
import { useKisanData } from '../services/useDataHooks';
import { useToast } from '../components/ToastProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';

export default function MyCropsPage() {
  const { crops, addCrop, updateCrop, deleteCrop } = useKisanData();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [harvestDate, setHarvestDate] = useState('');
  const [status, setStatus] = useState<'Growing' | 'Ready to Sell' | 'Listed' | 'Sold'>('Growing');
  const [expectedPrice, setExpectedPrice] = useState('');

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      openModal();
      // Remove query param without refresh
      router.replace('/farmer/dashboard/crops');
    }
  }, [searchParams, router]);

  const openModal = (cropId?: string) => {
    if (cropId) {
      const crop = crops.find(c => c.id === cropId);
      if (crop) {
        setEditingId(crop.id);
        setName(crop.name);
        setQuantity(crop.quantity.toString());
        setUnit(crop.unit);
        setHarvestDate(crop.harvestDate);
        setStatus(crop.status);
        setExpectedPrice(crop.expectedPrice ? crop.expectedPrice.toString() : '');
      }
    } else {
      setEditingId(null);
      setName('');
      setQuantity('');
      setUnit('kg');
      setHarvestDate('');
      setStatus('Growing');
      setExpectedPrice('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity || !harvestDate) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    const payload = {
      name,
      quantity: Number(quantity),
      unit,
      harvestDate,
      status,
      expectedPrice: expectedPrice ? Number(expectedPrice) : undefined
    };

    if (editingId) {
      updateCrop(editingId, payload);
      showToast('Crop updated successfully.', 'success');
    } else {
      addCrop(payload);
      showToast('Crop added successfully.', 'success');
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      deleteCrop(id);
      showToast('Crop deleted successfully.', 'success');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">My Crops</h1>
          <p className="font-onest text-sm text-[#351903]/70">Manage your farm's produce and track harvest status.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#365006] text-white px-6 py-2.5 rounded-md font-onest text-sm font-semibold hover:bg-[#2d4305] transition flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New Crop
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-onest text-sm">
            <thead className="bg-[#F9FAF6]">
              <tr className="border-b border-[#E9DDBD] text-[#351903]/70">
                <th className="px-6 py-4 font-semibold">Crop Name</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">Harvest Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Est. Price</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#351903]/50">
                    <div className="text-4xl mb-2">🌱</div>
                    <p>No crops added yet. Click "Add New Crop" to get started.</p>
                  </td>
                </tr>
              ) : (
                crops.map((c) => (
                  <motion.tr 
                    key={c.id} 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAF6] transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-[#351903]">{c.name}</td>
                    <td className="px-6 py-4 text-[#351903]">{c.quantity} {c.unit}</td>
                    <td className="px-6 py-4 text-[#351903]/80">
                      {new Date(c.harvestDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        c.status === 'Ready to Sell' ? 'bg-[#E3F2E3] border-[#C8E4C8] text-[#1E5D1E]' :
                        c.status === 'Listed' ? 'bg-[#FFF7E3] border-[#FDEBBE] text-[#9A7314]' :
                        c.status === 'Sold' ? 'bg-[#F2F2F2] border-[#E0E0E0] text-[#555]' :
                        'bg-[#E9F0FD] border-[#C8DDF8] text-[#1D54A0]'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#351903]">
                      {c.expectedPrice ? `₹${c.expectedPrice}/${c.unit}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {c.status !== 'Listed' && c.status !== 'Sold' && (
                          <button onClick={() => router.push(`/farmer/dashboard/sell?cropId=${c.id}`)} className="text-[#365006] font-semibold hover:underline text-xs">Sell</button>
                        )}
                        <button onClick={() => openModal(c.id)} className="text-[#351903]/60 hover:text-[#365006] transition text-sm">✏️</button>
                        <button onClick={() => handleDelete(c.id)} className="text-[#351903]/60 hover:text-red-600 transition text-sm">🗑️</button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
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
                  {editingId ? 'Edit Crop' : 'Add New Crop'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-700">✕</button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-onest">
                <div>
                  <label className="block text-sm font-semibold text-[#351903] mb-1">Crop Name *</label>
                  <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="e.g. Rice" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]" />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Quantity *</label>
                    <input required value={quantity} onChange={e => setQuantity(e.target.value)} type="number" placeholder="0" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]" />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Unit</label>
                    <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white">
                      <option value="kg">kg</option>
                      <option value="quintal">quintal</option>
                      <option value="ton">ton</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#351903] mb-1">Harvest Date *</label>
                  <input required value={harvestDate} onChange={e => setHarvestDate(e.target.value)} type="date" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]" />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] bg-white">
                      <option value="Growing">Growing</option>
                      <option value="Ready to Sell">Ready to Sell</option>
                      <option value="Listed">Listed</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Expected Price (₹)</label>
                    <input value={expectedPrice} onChange={e => setExpectedPrice(e.target.value)} type="number" placeholder="Optional" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-[#F0F0F0] mt-6">
                  <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md font-semibold text-[#351903] hover:bg-gray-100 transition">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-md font-semibold bg-[#365006] text-white hover:bg-[#2d4305] transition">
                    {editingId ? 'Save Changes' : 'Add Crop'}
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
