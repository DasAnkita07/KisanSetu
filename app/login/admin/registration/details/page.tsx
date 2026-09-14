//adminregistration1
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegistration1() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleGetOtp = () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");
    alert("OTP sent successfully!");
  };

  const handleContinue = () => {
    if (!adminId || !cardCode || !mobileNumber || !otp) {
      setError("Please fill in all the fields.");
      return;
    }

    if (mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    // Save the information temporarily for the next registration page
    sessionStorage.setItem("adminId", adminId);
    sessionStorage.setItem("cardCode", cardCode);
    sessionStorage.setItem("mobileNumber", mobileNumber);

    // Go to AdminRegistration2
    router.push("/login/admin/registration/password");
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col">
      
      {/* Green Header */}
      <header className="w-full h-20 sm:h-24 bg-[#365006] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <img
            src="/logoBrown.svg"
            alt="KisanSetu Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 brightness-0 invert"
          />

          <h1 className="font-oldenburg text-white text-2xl sm:text-3xl">
            KisanSetu
          </h1>
        </div>
      </header>

      {/* Login / Register Tabs */}
      <div className="w-full flex justify-center pt-5 sm:pt-7">
        <div className="flex border-b border-[#365006]">
          <button
            onClick={() => router.push("/login/admin")}
            className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base text-[#351903]"
          >
            LOGIN
          </button>

          <button
            className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base font-semibold text-[#365006] border-b-4 border-[#365006]"
          >
            REGISTER
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-1 w-full flex justify-center px-5 py-8">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
              Admin activation
            </h2>

            <p className="font-onest text-sm text-[#351903]/70 mt-2">
              Register your admin account
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            
            <div className="w-9 h-9 rounded-full bg-[#365006] text-white flex items-center justify-center font-onest font-semibold text-sm">
              1
            </div>

            <div className="w-12 sm:w-16 h-[2px] bg-[#D5D0BD]" />

            <div className="w-9 h-9 rounded-full border-2 border-[#D5D0BD] text-[#999] flex items-center justify-center font-onest text-sm">
              2
            </div>

            <div className="w-12 sm:w-16 h-[2px] bg-[#D5D0BD]" />

            <div className="w-9 h-9 rounded-full border-2 border-[#D5D0BD] text-[#999] flex items-center justify-center font-onest text-sm">
              3
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Admin ID */}
            <div>
              <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                Admin ID
              </label>

              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID"
                className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
              />
            </div>

            {/* Card Code */}
            <div>
              <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                Card Code
              </label>

              <input
                type="text"
                value={cardCode}
                onChange={(e) => setCardCode(e.target.value)}
                placeholder="Enter Card Code"
                className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="Enter 10-digit mobile number"
                className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                OTP
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  placeholder="Enter OTP"
                  className="flex-1 min-w-0 h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
                />

                <button
                  type="button"
                  onClick={handleGetOtp}
                  className="h-12 px-4 sm:px-5 rounded-md bg-[#351903] text-white font-onest text-xs sm:text-sm font-semibold hover:opacity-90 transition"
                >
                  GET OTP
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="font-onest text-sm text-red-600 text-center">
                {error}
              </p>
            )}

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition"
            >
              CONTINUE
            </button>

            {/* Already Registered */}
            <p className="text-center font-onest text-sm text-[#351903]/70 pt-1">
              Already registered?{" "}
              <button
                onClick={() => router.push("/login/admin")}
                className="font-semibold text-[#365006] hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Yellow Strip */}
      <div className="w-full h-7 sm:h-9 bg-[#F0E383] border-t border-[#D8C867]" />
    </main>
  );
}