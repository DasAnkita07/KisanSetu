//adminregistration4
"use client";

import { useRouter } from "next/navigation";

export default function AdminRegistration4() {
  const router = useRouter();

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

      {/* Tabs */}
      <div className="w-full flex justify-center pt-5 sm:pt-7">
        <div className="flex border-b border-[#365006]">
          <button
            onClick={() => router.push("/admin")}
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

      {/* Content */}
      <section className="flex-1 w-full flex justify-center px-5 py-8">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
              Admin activation
            </h2>

            <p className="font-onest text-sm text-[#351903]/70 mt-2">
              Your admin account is ready
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-9 h-9 rounded-full bg-[#365006] text-white flex items-center justify-center">
              ✓
            </div>

            <div className="w-12 sm:w-16 h-[2px] bg-[#365006]" />

            <div className="w-9 h-9 rounded-full bg-[#365006] text-white flex items-center justify-center">
              ✓
            </div>

            <div className="w-12 sm:w-16 h-[2px] bg-[#365006]" />

            <div className="w-9 h-9 rounded-full bg-[#365006] text-white flex items-center justify-center">
              ✓
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5">

            <div>
              <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                Registered Mobile
              </label>

              <div className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 flex items-center font-onest text-sm text-[#351903]">
                +91 XXXXX XXXXX
              </div>
            </div>

            <div>
              <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
                Admin ID
              </label>

              <div className="w-full h-12 rounded-md border border-[#C9C4B2] bg-white px-4 flex items-center font-onest text-sm text-[#351903]">
                Your Admin ID
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="w-full h-12 mt-4 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition"
            >
              CONTINUE TO LOGIN
            </button>

          </div>
        </div>
      </section>

      {/* Bottom Strip */}
      <div className="w-full h-7 sm:h-9 bg-[#F0E383] border-t border-[#D8C867]" />

    </main>
  );
}
