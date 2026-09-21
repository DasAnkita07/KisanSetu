"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function FarmerIdCard() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md text-center mt-8 flex flex-col items-center">
      <p className="font-onest text-sm sm:text-base font-semibold text-[#351903] mb-1">
        Registered Mobile:
      </p>
      <p className="font-onest text-sm text-[#351903] mb-5">
        ******4821
      </p>

      <div className="w-72 md:w-80 h-44 md:h-50 rounded-md bg-[#E9DDBD]/80 border border-[#D5C99F] px-5 py-5 flex flex-col items-center justify-center">
        <div className="mx-auto w-12 md:w-16 h-8 md:h-12 text-white flex items-center justify-center mb-5 mt-2 md:mb-8 md:mt-4">
          <img src="/fingerprint.svg" alt="Fingerprint" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
        </div>
        
        <p className="font-onest text-sm md:text-md text-[#351903]/70 mb-3 mt-4">
          YOUR FARMER ID
        </p>
        
        <div className="bg-[#E9DDBD] border border-[#C9B98D] rounded-md px-4 py-2">
          <p className="font-onest font-semibold text-sm sm:text-base text-[#351903]">
            FRM-26-048721
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/farmer/login")}
        className="w-full h-12 mt-10 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
      >
        CONTINUE TO LOGIN
      </button>
    </div>
  );
}
