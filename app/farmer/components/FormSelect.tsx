"use client";
import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export default function FormSelect({ label, options, className = '', ...props }: FormSelectProps) {
  return (
    <div>
      <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006] appearance-none ${className}`}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
