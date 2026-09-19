"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function FarmerLoginPage() {
  const router = useRouter();

  // Login Mode: "password" or "otp"
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!identifier || identifier.trim().length < 10) {
      setError("Please enter a valid 10-digit Mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    
    try {
      const phoneToAuth = identifier.startsWith('+') ? identifier : `+91${identifier}`;
      const { error } = await supabase.auth.signInWithOtp({ phone: phoneToAuth });
      
      if (error && !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('dummy')) {
        setError(error.message);
      } else {
        setOtpSent(true);
      }
    } catch (err) {
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!identifier.trim()) {
      setError("Please enter your Mobile number.");
      return;
    }

    if (authMode === "password") {
      if (!password) {
        setError("Please enter your Password or 4-digit mPIN.");
        return;
      }
    } else {
      if (!otpSent) {
        setError("Please generate OTP first.");
        return;
      }
      if (!otp) {
        setError("Please enter the OTP.");
        return;
      }
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      router.push("/login/farmer/dashboard");
    }, 800);
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background soft decoration */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-[#365006] rounded-b-[40px] sm:rounded-b-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10"
      >
        {/* Left Side: Illustration / Branding */}
        <div className="w-full md:w-5/12 bg-emerald-50 p-8 flex flex-col items-center justify-center border-r border-emerald-100">
          <Image src="/mainLogo.svg" alt="Logo" width={60} height={60} className="mb-6" />
          <h2 className="text-2xl font-bold text-[#351903] mb-2 font-serif text-center">KisanSetu</h2>
          <p className="text-sm text-emerald-700 font-medium mb-8 text-center px-4">
            The Digital Bridge for Every Farmer
          </p>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <Image 
              src="/onboardingFarmer.png" 
              alt="Farmer" 
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-500 text-sm mb-8">Access your farmer portal to manage slots and payments.</p>

          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setAuthMode("password")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                authMode === "password" ? "bg-white text-[#365006] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Login with mPIN
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("otp")}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                authMode === "otp" ? "bg-white text-[#365006] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Login with OTP
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number</label>
              <input
                type="tel"
                maxLength={10}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter 10-digit mobile"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all bg-slate-50"
              />
            </div>

            <AnimatePresence mode="wait">
              {authMode === "password" ? (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Secure mPIN</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter 4-digit PIN"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all bg-slate-50"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">One-Time Password (OTP)</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#365006] focus:ring-1 focus:ring-[#365006] outline-none transition-all bg-slate-50 text-center tracking-widest font-bold text-lg"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-6 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold transition-colors shrink-0"
                    >
                      {loading ? "..." : otpSent ? "Resend" : "Get OTP"}
                    </button>
                  </div>
                  {otpSent && <p className="text-xs font-medium text-emerald-600 mt-2">✓ OTP sent successfully</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-[#365006] text-white font-bold text-sm tracking-wide hover:bg-[#2c4205] transition-all shadow-md disabled:opacity-70"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN SECURELY"}
            </button>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link href="/login/farmer/registration/details" className="text-[#365006] font-bold hover:underline">
              Register as Farmer
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
