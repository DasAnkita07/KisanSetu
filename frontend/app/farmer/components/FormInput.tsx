"use client";
import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, className = '', ...props }: FormInputProps) {
  return (
    <div>
      <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
        {label}
      </label>
      <input
        {...props}
        className={`w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006] ${className}`}
      />
    </div>
  );
}
