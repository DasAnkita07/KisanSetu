"use client";
import React from 'react';

export default function RegistrationSuccess({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-md text-center">
      <div className="flex flex-col items-center justify-center w-full max-w-sm rounded-md bg-[#ffffff]/50 border border-[#ffffff] px-5 py-10 mx-auto mt-8">
        <div className="mx-auto w-24 h-24 text-white flex items-center justify-center text-5xl mb-7">
          <img src="/successful.svg" alt="Checkmark" className="w-24 h-24" />
        </div>
        <h3 className="font-oldenburg font-bold text-2xl sm:text-3xl text-[#351903]">
          Registration Successful!
        </h3>
        <p className="font-onest text-sm text-[#351903]/70 mt-3">
          Your farmer account has been successfully created.
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full h-12 mt-8 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
      >
        VIEW FARMER ID
      </button>
    </div>
  );
}
