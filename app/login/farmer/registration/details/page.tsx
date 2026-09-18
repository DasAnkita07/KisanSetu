// Farmer Registration Step 1: Personal & Farming Details
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function FarmerRegistrationDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FarmerRegistrationDetailsContent />
    </Suspense>
  );
}

function FarmerRegistrationDetailsContent() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("Nadia");
  const [landHolding, setLandHolding] = useState("");
  const [primaryCrop, setPrimaryCrop] = useState("Potato");
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const mobileParam = searchParams.get('mobile');
  
  useEffect(() => {
    if (mobileParam) {
      setMobileNumber(mobileParam);
    }
  }, [mobileParam]);

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!fullName || !mobileNumber || !aadhaarNumber || !landHolding) {
      setError("Please fill in all mandatory fields (*).");
      return;
    }

    if (mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (aadhaarNumber.replace(/\s/g, "").length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/farmer/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: mobileNumber,
          name: fullName,
          aadhaar: aadhaarNumber.replace(/\s/g, ""),
          village,
          district,
          state: "West Bengal",
          crops: [primaryCrop]
        })
      });

      if (response.ok) {
        const farmerProfile = await response.json();
        sessionStorage.setItem("farmerUser", JSON.stringify(farmerProfile));
        router.push("/login/farmer/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to register profile.");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col justify-between">
      
      {/* Header */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/login/farmer"
            className="text-xs text-[#F0E383] hover:text-white transition font-onest font-medium"
          >
            ← Back to Login
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
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-xs p-5 sm:p-8 rounded-2xl border border-[#B18A3D]/40 shadow-lg">
          
          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
              Farmer Registration
            </h2>
            <p className="font-onest text-xs sm:text-sm text-[#351903]/75 mt-1">
              Step 1 of 3: Enter your details &amp; farmland information for DBT
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center mb-7">
            <div className="w-8 h-8 rounded-full bg-[#365006] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              1
            </div>
            <div className="w-12 sm:w-16 h-[3px] bg-[#365006]" />
            <div className="w-8 h-8 rounded-full bg-[#EAE7D8] text-[#351903] flex items-center justify-center font-bold text-xs border border-gray-300">
              2
            </div>
            <div className="w-12 sm:w-16 h-[3px] bg-gray-200" />
            <div className="w-8 h-8 rounded-full bg-[#EAE7D8] text-[#351903] flex items-center justify-center font-bold text-xs border border-gray-300">
              3
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4 font-onest">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#351903] mb-1">
                Full Name (as on Aadhaar) *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Chandra Mondal"
                className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
              />
            </div>

            {/* Mobile Number & OTP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#351903] mb-1">
                  Mobile Number *
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit mobile"
                    className="flex-1 h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
                  />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="px-3 h-10 bg-[#365006]/15 hover:bg-[#365006]/25 text-[#365006] text-xs font-bold rounded-lg transition shrink-0 cursor-pointer"
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#351903] mb-1">
                  Enter OTP {otpSent && <span className="text-green-700">(Demo: 4589)</span>}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
                />
              </div>
            </div>

            {/* Aadhaar Number */}
            <div>
              <label className="block text-xs font-semibold text-[#351903] mb-1">
                Aadhaar Number (for PM-KISAN / Mandi e-KYC) *
              </label>
              <input
                type="text"
                maxLength={14}
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="12-digit Aadhaar Number (e.g. 5421 8890 2311)"
                className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
              />
            </div>

            {/* Location: District & Village */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#351903] mb-1">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
                >
                  <option value="Burdwan">Purba Bardhaman</option>
                  <option value="Hooghly">Hooghly (Singur/Tarakeswar)</option>
                  <option value="Nadia">Nadia (Kalyani/Ranaghat)</option>
                  <option value="Bankura">Bankura</option>
                  <option value="Murshidabad">Murshidabad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#351903] mb-1">
                  Village / Gram Panchayat
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Anandapur, Block II"
                  className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
                />
              </div>
            </div>

            {/* Farm Details: Land Holding & Primary Crop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#351903] mb-1">
                  Total Land Holding (Acres) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={landHolding}
                  onChange={(e) => setLandHolding(e.target.value)}
                  placeholder="e.g. 4.5"
                  className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#351903] mb-1">
                  Primary Crop for Procurement *
                </label>
                <select
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  className="w-full h-10 rounded-lg border border-[#C9C4B2] bg-white px-3 text-sm text-[#351903] outline-none focus:border-[#365006]"
                >
                  <option value="Potato (Jyoti)">Potato (Jyoti)</option>
                  <option value="Potato (Chandramukhi)">Potato (Chandramukhi)</option>
                  <option value="Paddy (Minikit/Swarna)">Paddy (Minikit / Swarna)</option>
                  <option value="Wheat (Sharbati)">Wheat (Sharbati)</option>
                  <option value="Mustard Seed">Mustard Seed</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>
            </div>

            {/* Bank details for DBT */}
            <div className="p-3 bg-[#F4F1EA] rounded-xl border border-[#D8C867]/60">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm">🏦</span>
                <span className="text-xs font-bold text-[#365006]">Bank Account for Instant DBT Payout</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="Bank Account Number"
                  className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 text-xs text-[#351903] outline-none focus:border-[#365006]"
                />
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  placeholder="IFSC Code (e.g. SBIN0001234)"
                  className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 text-xs text-[#351903] outline-none focus:border-[#365006]"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200 text-center font-medium">
                {error}
              </p>
            )}

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full h-11 sm:h-12 rounded-lg bg-[#365006] text-white font-semibold text-sm tracking-wide hover:bg-[#2c4205] transition cursor-pointer shadow-md mt-3 flex items-center justify-center gap-2"
            >
              <span>CONTINUE TO SET SECURITY PIN</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-7 sm:h-8 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">
        <span className="font-onest text-[7px] sm:text-[8px] text-[#351903]">© KisanSetu</span>
        <div className="flex gap-4 font-onest text-[7px] sm:text-[8px] text-[#351903]">
          <span>Mandi e-KYC Helpline</span>
          <span>Terms &amp; Conditions</span>
        </div>
      </footer>

    </main>
  );
}
