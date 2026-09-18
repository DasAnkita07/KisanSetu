// Farmer Registration Step 2: Set Password / mPIN
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FarmerRegistrationPassword() {
  const router = useRouter();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!pin || !confirmPin) {
      setError("Please set and confirm your 4-digit mPIN or Password.");
      return;
    }

    if (pin.length < 4) {
      setError("PIN must be at least 4 digits/characters.");
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match. Please re-enter.");
      return;
    }

    setError("");
    // Generate new Farmer ID
    const randomId = `FAR-${Math.floor(100 + Math.random() * 900)}`;
    sessionStorage.setItem("newFarmer_id", randomId);
    sessionStorage.setItem("newFarmer_pin", pin);

    router.push("/login/farmer/registration/success");
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col justify-between">
      
      {/* Header */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/login/farmer/registration/details"
            className="text-xs text-[#F0E383] hover:text-white transition font-onest font-medium"
          >
            ← Previous Step
          </Link>

          <div className="flex items-center gap-2">
            <img
              src="/logoBrown.svg"
              alt="KisanSetu Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 brightness-0 invert"
            />
            <h1 className="font-oldenburg text-white text-2xl sm:text-3xl">
              KisanSetu
            </h1>
          </div>

          <span className="text-[10px] sm:text-xs font-onest text-white/90 bg-black/20 px-2 py-0.5 rounded">
            Registration
          </span>
        </div>
      </header>

      {/* Tabs */}
      <div className="w-full flex justify-center pt-4 sm:pt-6">
        <div className="flex border-b border-[#365006]">
          <button
            type="button"
            onClick={() => router.push("/login/farmer")}
            className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base text-[#351903] hover:text-[#365006] cursor-pointer"
          >
            LOGIN
          </button>

          <button
            type="button"
            className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base font-semibold text-[#365006] border-b-4 border-[#365006]"
          >
            REGISTER
          </button>
        </div>
      </div>

      {/* Content */}
      <section
        className="flex-1 w-full flex justify-center px-4 py-6 sm:py-8"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#B18A3D]/40 shadow-lg">
          
          <div className="text-center mb-6">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
              Set Security PIN
            </h2>
            <p className="font-onest text-xs sm:text-sm text-[#351903]/75 mt-1">
              Step 2 of 3: Choose a 4-digit mPIN to easily sign into KisanSetu
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 rounded-full bg-[#365006] text-white flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div className="w-12 sm:w-16 h-[3px] bg-[#365006]" />
            <div className="w-8 h-8 rounded-full bg-[#365006] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              2
            </div>
            <div className="w-12 sm:w-16 h-[3px] bg-gray-200" />
            <div className="w-8 h-8 rounded-full bg-[#EAE7D8] text-[#351903] flex items-center justify-center font-bold text-xs border border-gray-300">
              3
            </div>
          </div>

          <div className="space-y-4 font-onest">
            <div>
              <label className="block text-xs font-semibold text-[#351903] mb-1.5">
                Set 4-Digit Kisan mPIN or Password *
              </label>
              <input
                type="password"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN (e.g. 1234)"
                className="w-full h-11 rounded-lg border border-[#C9C4B2] bg-white px-3.5 text-center text-lg tracking-widest text-[#351903] outline-none focus:border-[#365006]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#351903] mb-1.5">
                Confirm 4-Digit Kisan mPIN *
              </label>
              <input
                type="password"
                maxLength={8}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Re-enter your PIN"
                className="w-full h-11 rounded-lg border border-[#C9C4B2] bg-white px-3.5 text-center text-lg tracking-widest text-[#351903] outline-none focus:border-[#365006]"
              />
            </div>

            <div className="p-3 bg-[#F4F1EA] rounded-xl border border-[#D8C867]/60 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="smsNotify"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="mt-0.5 accent-[#365006] cursor-pointer"
              />
              <label htmlFor="smsNotify" className="text-xs text-[#351903] cursor-pointer leading-tight">
                Send live mandi queue call updates and weighbridge turn alerts via SMS.
              </label>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200 text-center font-medium">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleContinue}
              className="w-full h-11 sm:h-12 rounded-lg bg-[#365006] text-white font-semibold text-sm tracking-wide hover:bg-[#2c4205] transition cursor-pointer shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>COMPLETE REGISTRATION</span>
              <span>✓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-7 sm:h-8 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">
        <span className="font-onest text-[7px] sm:text-[8px] text-[#351903]">© KisanSetu</span>
        <div className="flex gap-4 font-onest text-[7px] sm:text-[8px] text-[#351903]">
          <span>Security &amp; Privacy Guarantee</span>
        </div>
      </footer>

    </main>
  );
}
