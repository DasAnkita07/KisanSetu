//who are you? page
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <motion.div
        layoutId="green-header"
        animate={{
          // Keyframes: 17vh (start) -> 100vh (full screen) -> 28vh (final top header)
          height: ["17vh", "100vh", "11vh"],
          borderRadius: ["7% 7% 0 0", "0% 0% 0% 0%", "0% 0% 3% 3%"],
        }}
        transition={{
          duration: 1.4,
          times: [0, 0.4, 1], // Spending 40% of the duration sweeping full-screen, then resting into place
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full bg-[#365006] z-20 shadow-md shrink-0 origin-bottom"
      >
        <div className="flex items-center justify-center pt-5 md:pt-4">
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
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <section
        className="flex-1 flex flex-col items-center px-4 py-7 sm:py-10"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Welcome Back */}
        <div className="text-center mb-7 sm:mb-9">
          <h2 className="font-onest font-bold text-2xl sm:text-3xl text-[#7C9E18]">
            Welcome Back
          </h2>

          <p className="font-onest text-[13px] md:text-[15px] text-[#351903]/70">
            Sign in to manage your procurement journey.
          </p>
        </div>

        {/* Who are you? */}
        <h3 className="font-oldenburg font-semibold text-xl sm:text-2xl text-[#351903] mb-5">
          Registered as
        </h3>

        {/* Cards */}
        <div className="w-full max-w-[430px] space-y-7">

          {/* ================= FARMER CARD ================= */}
          <button
            type="button"
            className="w-[240px] md:w-[360px] h-[120px] sm:h-[145px] rounded-lg border border-[#B18A3D] bg-[#E8D7B0]/85 shadow-sm flex flex-col items-center justify-center hover:bg-[#E1CCA0] transition mx-auto"
          >
            {/* Simple Farmer Icon */}
            <div className=" text-[#351903]">
              <img src="/Farmer.svg" alt="Farmer Icon" className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <h4 className="font-onest font-bold text-xl sm:text-2xl text-[#B07A08]">
              Farmer
            </h4>

            <p className="font-onest text-[13px] md:text-[15px] text-[#351903]">
              Track slots & procurement
            </p>
          </button>

          {/* ================= ADMIN CARD ================= */}
          <button
            type="button"
            onClick={() => router.push("/login/admin")}
            className="w-[240px] md:w-[360px] h-[120px] sm:h-[145px] rounded-lg border border-[#B18A3D] bg-[#E8D7B0]/85 shadow-sm flex flex-col items-center justify-center hover:bg-[#E1CCA0] transition mx-auto"
          >
            {/* Admin Icon */}
            <div className="text-[#351903]">
              <img src="/Admin.png" alt="Admin Icon" className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <h4 className="font-onest font-bold text-xl sm:text-2xl text-[#B07A08]">
              Admin
            </h4>

            <p className="font-onest text-[13px] md:text-[15px] text-[#351903]">
              Manage centres & procurement
            </p>
          </button>

        </div>
      </section>

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