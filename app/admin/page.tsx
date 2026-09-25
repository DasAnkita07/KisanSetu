//admin login page
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Forgot Password Modal State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetId, setResetId] = useState("");
  const [resetMobile, setResetMobile] = useState("");
  const [resetStep, setResetStep] = useState(1);
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = () => {
    if (!adminId || !password) {
      setError("Please enter your Admin ID and Password.");
      return;
    }

    setError("");
    router.push("/login/admin/dashboard");
  };

  const handleRegister = () => {
    router.push("/login/admin/registration/details");
  };

  const handleSendResetOtp = () => {
    if (!resetId || !resetMobile) {
      setResetMessage("Please enter both Admin ID and Registered Mobile.");
      return;
    }
    setResetMessage("");
    setResetStep(2);
  };

  const handleFinishReset = () => {
    if (!resetOtp || !newPassword) {
      setResetMessage("Please enter OTP and New Password.");
      return;
    }
    setResetMessage("Password reset successfully! You can now log in.");
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetStep(1);
      setResetMessage("");
    }, 1500);
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-center">
          <img
            src="/mainLogo.svg"
            alt="KisanSetu"
            className="w-11 h-11 sm:w-14 sm:h-14"
          />

          <div className="ml-2">
            <h1 className="font-oldenburg text-white text-2xl sm:text-3xl leading-none">
              KisanSetu
            </h1>

            <p className="font-onest text-[9px] md:text-[11px] text-[#F0E383] text-center">
              The Digital Bridge for Every Farmer
            </p>
          </div>
        </div>
      </header>

      {/* ================= LOGIN + MAIN CONTENT ================= */}
      <div
        className="flex-1 w-full"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ================= LOGIN / REGISTER TABS ================= */}
        <div
          className="w-full flex justify-center pt-5 sm:pt-7"
          style={{
            backgroundImage: "url('/bgsketch.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex border-b border-[#365006]">

            <button
              type="button"
              className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base font-semibold text-[#365006] border-b-4 border-[#365006]"
            >
              LOGIN
            </button>

            <button
              type="button"
              onClick={handleRegister}
              className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base text-[#351903] hover:text-[#365006] transition"
            >
              REGISTER
            </button>

          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <section className="flex-1 flex justify-center px-5 py-8 sm:py-12">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
                Admin Login
              </h2>

              <p className="font-onest text-sm md:text-md text-[#351903]/70">
                Login to manage centres &amp; procurement.
              </p>
            </div>

            {/* ================= FORM ================= */}
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

              {/* Password */}
              <div>
                <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-onest text-sm md:text-md text-[#365006] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error */}
              {error && (
                <p className="font-onest text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
              >
                LOGIN
              </button>

              {/* Register Text */}
              <div className="text-center pt-2">
                <p className="font-onest text-sm text-[#351903]/70">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="font-semibold text-[#365006] hover:underline cursor-pointer"
                  >
                    Register
                  </button>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FORGOT PASSWORD MODAL ================= */}
        <AnimatePresence>
          {showForgotPassword && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-[#344E06] font-oldenburg">
                    Reset Admin Password
                  </h3>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-4 space-y-4 text-sm md:text-md font-onest">
                  {resetStep === 1 ? (
                    <>
                      <p className="text-gray-600">
                        Enter your Admin ID and registered mobile number to receive a verification OTP.
                      </p>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Admin ID</label>
                        <input
                          type="text"
                          placeholder="e.g. ADM-891"
                          value={resetId}
                          onChange={(e) => setResetId(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#365006] text-[#000000]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Registered Mobile</label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={resetMobile}
                          onChange={(e) => setResetMobile(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#365006] text-[#000000]"
                        />
                      </div>
                      {resetMessage && <p className="text-red-600 font-semibold">{resetMessage}</p>}
                      <button
                        type="button"
                        onClick={handleSendResetOtp}
                        className="w-full h-10 bg-[#365006] text-white font-bold rounded-lg hover:bg-[#283C04] transition cursor-pointer"
                      >
                        Send OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        Enter the 6-digit OTP sent to +91 {resetMobile} and choose a new password.
                      </p>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Enter OTP</label>
                        <input
                          type="text"
                          placeholder="6-digit OTP (e.g. 123456)"
                          value={resetOtp}
                          onChange={(e) => setResetOtp(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#365006] text-[#000000]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new strong password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border border-gray-300 outline-none focus:border-[#365006] text-[#000000]"
                        />
                      </div>
                      {resetMessage && <p className="text-green-700 font-semibold">{resetMessage}</p>}
                      <button
                        type="button"
                        onClick={handleFinishReset}
                        className="w-full h-10 bg-[#344E06] text-white font-bold rounded-lg hover:bg-[#283C04] transition cursor-pointer"
                      >
                        Confirm New Password
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="h-7 sm:h-8 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">
        <span className="font-onest text-[11px] md:text-[13px] text-[#351903]">
          © KisanSetu
        </span>

        <div className="flex gap-3 md:gap-5 font-onest text-[11px] md:text-[13px] text-[#351903]">
          <span>About</span>
          <span>Features</span>
          <span>Contact</span>
        </div>

        <div className="flex gap-2 md:gap-3 items-center">
          <span className="text-[11px] md:text-[13px]">
            <img src="/facebook-box.png" alt="Facebook" className="w-5 h-5 md:w-7 md:h-7 inline-block" />
          </span>
          <span className="text-[11px] md:text-[13px]">
            <img src="/instagram.png" alt="Instagram" className="w-5 h-5 md:w-7 md:h-7 inline-block" />
          </span>
          <span className="text-[11px] md:text-[13px]">
            <img src="/linkedin-box.png" alt="LinkedIn" className="w-5 h-5 md:w-7 md:h-7 inline-block" />
          </span>
        </div>
      </footer>

    </main>
  );
}