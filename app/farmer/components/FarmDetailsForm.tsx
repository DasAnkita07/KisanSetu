"use client";
import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

export default function FarmDetailsForm({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
          Farm Details
        </h2>
        <p className="font-onest text-sm text-[#351903]/70">
          Tell us about your farm
        </p>
      </div>

      <div className="space-y-5">
        <FormSelect 
          label="Primary Crop" 
          options={[
            { value: 'wheat', label: 'Wheat' },
            { value: 'rice', label: 'Rice' },
            { value: 'cotton', label: 'Cotton' },
            { value: 'sugarcane', label: 'Sugarcane' },
          ]} 
        />
        
        <div>
          <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
            Land Area
          </label>
          <div className="flex rounded-md border border-[#C9C4B2] bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#365006] focus-within:border-[#365006]">
            <input 
              type="number"
              placeholder="area"
              className="flex-1 min-w-0 h-12 px-4 font-onest text-sm text-[#351903] outline-none"
            />
            <div className="h-12 px-4 flex items-center justify-center font-onest text-sm text-[#351903] bg-gray-50 border-l border-[#C9C4B2]">
              / Hectare
            </div>
          </div>
        </div>

        <div>
          <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
            Expected Produce
          </label>
          <div className="flex rounded-md border border-[#C9C4B2] bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#365006] focus-within:border-[#365006]">
            <input 
              type="number"
              placeholder="quantity"
              className="flex-1 min-w-0 h-12 px-4 font-onest text-sm text-[#351903] outline-none"
            />
            <div className="h-12 px-4 flex items-center justify-center font-onest text-sm text-[#351903] bg-gray-50 border-l border-[#C9C4B2]">
              / quintal
            </div>
          </div>
        </div>

        <FormInput label="Harvest Date" type="date" placeholder="date" />
        
        <FormInput label="Land ID" placeholder="Enter your Land ID" />

        <div className="flex gap-4 pt-2">
          <button 
            onClick={onBack}
            type="button"
            className="flex-1 h-12 rounded-md bg-white border border-[#365006] text-[#365006] font-onest text-sm font-semibold tracking-wide hover:bg-[#F8F6ED] transition cursor-pointer"
          >
            BACK
          </button>
          <button 
            onClick={onNext}
            type="button"
            className="flex-1 h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
