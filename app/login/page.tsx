//who are you? page
"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-center">
          <img
            src="/logoBrown.svg"
            alt="KisanSetu"
            className="w-11 h-11 sm:w-14 sm:h-14 brightness-0 invert"
          />

          <div className="ml-2">
            <h1 className="font-oldenburg text-white text-2xl sm:text-3xl leading-none">
              KisanSetu
            </h1>

            <p className="font-onest text-[7px] sm:text-[8px] text-[#F0E383] text-center">
              The Digital Bridge for Every Farmer
            </p>
          </div>
        </div>
      </header>

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
          <h2 className="font-onest font-semibold text-2xl sm:text-3xl text-[#7C9E18]">
            Welcome Back
          </h2>

          <p className="font-onest text-[11px] sm:text-sm text-[#351903]/70 mt-1">
            Sign in to manage your procurement journey.
          </p>
        </div>

        {/* Who are you? */}
        <h3 className="font-oldenburg font-semibold text-xl sm:text-2xl text-[#351903] mb-5">
          Who are you?
        </h3>

        {/* Cards */}
        <div className="w-full max-w-[430px] space-y-3">

          {/* ================= FARMER CARD ================= */}
          <button
            type="button"
            className="w-full h-[120px] sm:h-[145px] rounded-lg border border-[#B18A3D] bg-[#E8D7B0]/85 shadow-sm flex flex-col items-center justify-center hover:bg-[#E1CCA0] transition"
          >
            {/* Simple Farmer Icon */}
            <div className="mb-1 text-[#351903]">
              <svg
                width="38"
                height="38"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="22"
                  cy="14"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M11 32C11 25.9 15.9 21 22 21C28.1 21 33 25.9 33 32"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M30 25L39 34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M35 29L40 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h4 className="font-onest font-semibold text-xl sm:text-2xl text-[#B07A08]">
              Farmer
            </h4>

            <p className="font-onest text-[11px] sm:text-sm text-[#351903]">
              Track slots & procurement
            </p>
          </button>

          {/* ================= ADMIN CARD ================= */}
          <button
            type="button"
            onClick={() => router.push("/login/admin")}
            className="w-full h-[120px] sm:h-[145px] rounded-lg border border-[#B18A3D] bg-[#E8D7B0]/85 shadow-sm flex flex-col items-center justify-center hover:bg-[#E1CCA0] transition"
          >
            {/* Admin Icon */}
            <div className="mb-1 text-[#351903]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 20L24 10L39 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 20V37"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M36 20V37"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M8 37H40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M18 21V34"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M24 21V34"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M30 21V34"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h4 className="font-onest font-semibold text-xl sm:text-2xl text-[#B07A08]">
              Admin
            </h4>

            <p className="font-onest text-[11px] sm:text-sm text-[#351903]">
              Manage centres & procurement
            </p>
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="h-7 sm:h-8 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">
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