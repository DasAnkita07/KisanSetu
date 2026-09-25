//adminregistration3
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminRegistration3() {
  const router = useRouter();

  const [showAdminId, setShowAdminId] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdminId(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="flex-1 w-full"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="w-full flex justify-center pt-5 sm:pt-7">
        <div className="flex border-b border-[#365006]">
          <button
            onClick={() => router.push("/admin")}
            className="px-8 sm:px-12 pb-2 font-onest text-sm text-[#351903]"
          >
            LOGIN
          </button>

          <button className="px-8 sm:px-12 pb-2 font-onest text-sm font-semibold text-[#365006] border-b-4 border-[#365006]">
            REGISTER
          </button>
        </div>
      </div>

      <section className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-md text-center">

          <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903] mb-8">
            Admin activation
          </h2>

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
              {showAdminId ? "✓" : "3"}
            </div>

          </div>

          {!showAdminId ? (
            /* ================= STATE 1 ================= */
            <div className="flex flex-col items-center justify-center w-90 md:w-110 rounded-md bg-[#ffffff]/50 border border-[#ffffff] px-5 py-5 mx-auto">

              <div className="mx-auto w-24 h-24 text-white flex items-center justify-center text-5xl mb-7">
                <img src="/successful.svg" alt="Checkmark" className="w-24 h-24" />
              </div>

              <h3 className="font-oldenburg font-bold text-2xl sm:text-3xl text-[#351903]">
                Registration Successful!
              </h3>

            </div>
          ) : (
            /* ================= STATE 2 ================= */
            <div className="flex flex-col items-center">

              <p className="font-onest text-sm sm:text-base font-semibold text-[#351903] mb-1">
                Registered Mobile:
              </p>

              <p className="font-onest text-sm text-[#351903] mb-5">
                ******4821
              </p>

              <div className="w-70 md:w-80 h-40 md:h-50 rounded-md bg-[#E9DDBD]/80 border border-[#D5C99F] px-5 py-5">

                <div className="mx-auto w-12 md:w-16 h-2 md:h-3 text-white flex items-center justify-center mb-5 mt-4 md:mb-11 md:mt-7">
                  <img src="/fingerprint.svg" alt="Fingerprint" className="w-24 h-24" />
                </div>

                <p className="font-onest text-sm md:text-md text-[#351903]/70 mb-3 mt-7">
                  YOUR ADMIN ID
                </p>

                <div className="bg-[#E9DDBD] border border-[#C9B98D] rounded-md px-3 py-2">
                  <p className="font-onest font-semibold text-sm sm:text-base text-[#351903]">
                    ADM-26-048721
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="mt-8 px-5 h-10 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition"
              >
                CONTINUE TO LOGIN
              </button>

            </div>
          )}

        </div>
      </section>
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
