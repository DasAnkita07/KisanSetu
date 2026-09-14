//admin login page
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!adminId || !password) {
      setError("Please enter your Admin ID and Password.");
      return;
    }

    setError("");

    // Login functionality can be connected to the backend later.
//     alert("Login functionality will be connected later.");
  router.push("/login/admin/dashboard");
 };

  const handleRegister = () => {
    router.push("/login/admin/registration/details");
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:py-4">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/logoBrown.svg"
            alt="KisanSetu"
            className="w-11 h-11 sm:w-14 sm:h-14 brightness-0 invert"
          />

          <div className="text-center">
            <h1 className="font-oldenburg text-white text-2xl sm:text-3xl leading-none">
              KisanSetu
            </h1>

            <p className="font-onest text-[7px] sm:text-[8px] text-[#F0E383]">
              The Digital Bridge for Every Farmer
            </p>
          </div>
        </div>
      </header>

      {/* ================= LOGIN / REGISTER TABS ================= */}
      <div className="w-full flex justify-center pt-5 sm:pt-7">
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
      <section
        className="flex-1 flex justify-center px-5 py-8 sm:py-12"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
              Admin Login
            </h2>

            <p className="font-onest text-xs sm:text-sm text-[#351903]/70 mt-2">
              Login to manage centres & procurement.
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
                className="font-onest text-xs sm:text-sm text-[#365006] hover:underline"
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
              className="w-full h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition"
            >
              LOGIN
            </button>

            {/* Register Text */}
            <div className="text-center pt-2">
              <p className="font-onest text-sm text-[#351903]/70">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleRegister}
                  className="font-semibold text-[#365006] hover:underline"
                >
                  Register
                </button>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="h-7 sm:h-9 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">

        <span className="font-onest text-[6px] sm:text-[7px] text-[#351903]">
          © KisanSetu
        </span>

        <div className="flex gap-3 sm:gap-5 font-onest text-[6px] sm:text-[7px] text-[#351903]">
          <span>About</span>
          <span>Features</span>
          <span>Contact</span>
        </div>

        <div className="flex gap-2 text-[#351903]">
          <span className="text-[8px]">▣</span>
          <span className="text-[8px]">◎</span>
          <span className="text-[8px]">◉</span>
        </div>

      </footer>

    </main>
  );
}