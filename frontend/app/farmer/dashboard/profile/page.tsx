"use client";

import React, { useState } from 'react';
import { useKisanData } from '../services/useDataHooks';
import { useToast } from '../components/ToastProvider';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { profile, updateProfile } = useKisanData();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [village, setVillage] = useState(profile?.village || '');
  const [district, setDistrict] = useState(profile?.district || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, village, district });
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  if (!profile) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">My Profile</h1>
          <p className="font-onest text-sm text-[#351903]/70">Manage your personal and farm details.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-[#E9DDBD] text-[#351903] px-6 py-2 rounded-md font-onest text-sm font-semibold hover:bg-[#D5C99F] transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ID Card / Left Column */}
        <div className="md:col-span-1">
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#365006] text-white flex items-center justify-center text-4xl mb-4 shadow-inner">
              {profile.name.charAt(0)}
            </div>
            <h2 className="font-oldenburg text-2xl text-[#351903] mb-1">{profile.name}</h2>
            <p className="font-onest text-sm text-[#351903]/60 mb-4">{profile.id}</p>
            <span className="px-3 py-1 rounded-full bg-[#E3F2E3] text-[#1E5D1E] text-xs font-semibold inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {profile.status}
            </span>
          </motion.div>
        </div>

        {/* Details / Right Column */}
        <div className="md:col-span-2">
          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E9DDBD] bg-[#F9FAF6]">
              <h3 className="font-oldenburg text-xl text-[#351903]">Personal Details</h3>
            </div>
            
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 font-onest">
                  <div>
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Full Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#351903] mb-1">Mobile Number</label>
                    <input disabled value={profile.mobile} type="text" className="w-full h-10 px-3 rounded-md border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none" />
                    <p className="text-xs text-gray-400 mt-1">Mobile number cannot be changed directly for security reasons.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#351903] mb-1">Village</label>
                      <input required value={village} onChange={e => setVillage(e.target.value)} type="text" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#351903] mb-1">District</label>
                      <input required value={district} onChange={e => setDistrict(e.target.value)} type="text" className="w-full h-10 px-3 rounded-md border border-[#C9C4B2] outline-none focus:border-[#365006]" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-3 border-t border-[#F0F0F0] mt-6">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-md font-semibold text-[#351903] hover:bg-gray-100 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 rounded-md font-semibold bg-[#365006] text-white hover:bg-[#2d4305] transition">Save Changes</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 font-onest">
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <p className="text-xs font-semibold text-[#351903]/50 uppercase tracking-wider mb-1">Full Name</p>
                      <p className="text-[#351903]">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#351903]/50 uppercase tracking-wider mb-1">Mobile Number</p>
                      <p className="text-[#351903]">{profile.mobile}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#351903]/50 uppercase tracking-wider mb-1">Village</p>
                      <p className="text-[#351903]">{profile.village}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#351903]/50 uppercase tracking-wider mb-1">District</p>
                      <p className="text-[#351903]">{profile.district}, {profile.state}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
