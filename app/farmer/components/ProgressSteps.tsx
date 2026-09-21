"use client";
import React from 'react';

export default function ProgressSteps({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3];
  
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div 
            className={`w-9 h-9 rounded-full flex items-center justify-center font-onest font-semibold text-sm transition-colors duration-300 ${
              step < currentStep 
                ? 'bg-[#365006] text-white' 
                : step === currentStep
                ? 'bg-[#365006] text-white'
                : 'border-2 border-[#D5D0BD] text-[#999]'
            }`}
          >
            {step < currentStep ? '✓' : step}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 sm:w-16 h-[2px] transition-colors duration-300 ${
              step < currentStep ? 'bg-[#365006]' : 'bg-[#D5D0BD]'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
