"use client";

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-oldenburg text-3xl sm:text-4xl text-[#351903] mb-2">Settings</h1>
        <p className="font-onest text-sm text-[#351903]/70">Manage your account preferences and notifications.</p>
      </div>
      <div className="bg-white rounded-xl border border-[#D5D0BD] shadow-sm p-8 text-center text-[#351903]/50 font-onest">
        <span className="text-4xl block mb-4">⚙️</span>
        <p>Settings module will be available in the next release.</p>
      </div>
    </div>
  );
}
