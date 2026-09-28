// adminregistration2
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegistration2() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setError(
        "Please agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    setError("");

    // Save password temporarily for the next registration step
    sessionStorage.setItem("adminPassword", password);

    router.push("/admin/registration/success");
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-center">
          <img
            src="/mainLogo.svg"
            alt="KrishiSangam"
            className="w-11 h-11 sm:w-14 sm:h-14"
          />

          <div className="ml-2">
            <h1 className="font-oldenburg text-white text-2xl sm:text-3xl leading-none">
              KrishiSangam
            </h1>

            <p className="font-onest text-[9px] md:text-[11px] text-[#F0E383] text-center">
              The Digital Bridge for Every Farmer
            </p>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="flex-1 w-full"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Tabs */}
        <div className="w-full flex justify-center pt-5 sm:pt-7">
          <div className="flex border-b border-[#365006]">

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base text-[#351903]"
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
        <section className="flex-1 w-full flex justify-center px-5 py-8">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="text-center mb-6">
              <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
                Create Password
              </h2>

              <p className="font-onest text-sm text-[#351903]/70">
                Set a password for your admin account
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center mb-8">

              <div className="w-9 h-9 rounded-full bg-[#365006] text-white flex items-center justify-center font-onest text-sm">
                ✓
              </div>

              <div className="w-12 sm:w-16 h-[2px] bg-[#365006]" />

              <div className="w-9 h-9 rounded-full bg-[#365006] text-white flex items-center justify-center font-onest font-semibold text-sm">
                2
              </div>

              <div className="w-12 sm:w-16 h-[2px] bg-[#D5D0BD]" />

              <div className="w-9 h-9 rounded-full border-2 border-[#D5D0BD] text-[#999] flex items-center justify-center font-onest text-sm">
                3
              </div>

            </div>

            {/* ================= FORM ================= */}
            <div className="space-y-5">

              {/* Create Password */}
              <div>
                <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                  Create Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 font-onest text-sm text-[#351903] outline-none focus:border-[#365006] focus:ring-1 focus:ring-[#365006]"
                />
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#365006] focus:ring-[#365006] accent-[#365006]"
                />

                <span className="font-onest text-[#351903]/80 text-sm select-none">
                  I agree to the Terms & Conditions and Privacy Policy
                </span>
              </label>

              {/* Error */}
              {error && (
                <p className="font-onest text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              {/* Create Button */}
              <button
                type="button"
                onClick={handleCreate}
                className="w-full h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition"
              >
                CREATE
              </button>

              {/* Already Registered */}
              <p className="text-center font-onest text-sm text-[#351903]/70 pt-1">
                Already registered?{" "}

                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="font-semibold text-[#365006] hover:underline"
                >
                  Login
                </button>
              </p>

            </div>
          </div>
        </section>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="h-7 sm:h-8 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">

        <span className="font-onest text-[11px] md:text-[13px] text-[#351903]">
          © KrishiSangam
        </span>

        <div className="flex gap-3 md:gap-5 font-onest text-[11px] md:text-[13px] text-[#351903]">
          <span>About</span>
          <span>Features</span>
          <span>Contact</span>
        </div>

        <div className="flex gap-2 md:gap-3 items-center">

          <span>
            <img
              src="/facebook-box.png"
              alt="Facebook"
              className="w-5 h-5 md:w-7 md:h-7 inline-block"
            />
          </span>

          <span>
            <img
              src="/instagram.png"
              alt="Instagram"
              className="w-5 h-5 md:w-7 md:h-7 inline-block"
            />
          </span>

          <span>
            <img
              src="/linkedin-box.png"
              alt="LinkedIn"
              className="w-5 h-5 md:w-7 md:h-7 inline-block"
            />
          </span>

        </div>
      </footer>

    </main>
  );
}