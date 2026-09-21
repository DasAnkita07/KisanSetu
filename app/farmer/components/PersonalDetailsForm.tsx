"use client";
import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import Link from 'next/link';

export default function PersonalDetailsForm({ onNext }: { onNext: () => void }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
          Farmer Registration
        </h2>
        <p className="font-onest text-sm text-[#351903]/70">
          Tell us about yourself
        </p>
      </div>

      <div className="space-y-5">
        <FormInput label="Full Name" placeholder="Enter your full name" />
        
        <div>
          <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Enter 10-digit mobile number"
            className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
          />
        </div>

        <div>
          <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
            OTP
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter OTP"
              className="flex-1 min-w-0 h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
            />
            <button
              type="button"
              className="h-12 px-4 sm:px-5 rounded-md bg-[#351903] text-white font-onest text-xs sm:text-sm font-semibold hover:opacity-90 transition cursor-pointer"
            >
              GET OTP
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormSelect 
              label="State" 
              options={[
                { value: 'mh', label: 'Maharashtra' },
                { value: 'up', label: 'Uttar Pradesh' },
              ]} 
            />
          </div>
          <div className="flex-1">
            <FormSelect 
              label="District" 
              options={[
                { value: 'd1', label: 'Pune' },
                { value: 'd2', label: 'Nashik' },
              ]} 
            />
          </div>
        </div>
        
        <FormInput label="Village / House" placeholder="Enter your village or house details" />

        <div className="flex gap-4">
          <div className="flex-1">
            <FormInput label="Date of Birth" type="date" placeholder="Select date" />
          </div>
          <div className="flex-1">
            <FormSelect 
              label="Gender" 
              options={[
                { value: 'm', label: 'Male' },
                { value: 'f', label: 'Female' },
                { value: 'o', label: 'Other' },
              ]} 
            />
          </div>
        </div>

        <button 
          onClick={onNext}
          type="button"
          className="w-full h-12 mt-4 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
        >
          CONTINUE
        </button>
        
        <p className="text-center font-onest text-sm text-[#351903]/70 pt-1">
          Already registered?{" "}
          <Link href="/farmer/login" className="font-semibold text-[#365006] hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
