"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function FarmerAuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isLogin = pathname.includes('/farmer/login');

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center justify-center">
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
          </Link>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div
        className="flex-1 w-full flex flex-col"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Login / Register Tabs */}
        <div className="w-full flex justify-center pt-5 sm:pt-7">
          <div className="flex border-b border-[#365006]">
            <button
              onClick={() => router.push("/farmer/login")}
              className={`px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base ${
                isLogin
                  ? "font-semibold text-[#365006] border-b-4 border-[#365006]"
                  : "text-[#351903] hover:text-[#365006] transition"
              }`}
            >
              LOGIN
            </button>

            <button
              onClick={() => router.push("/farmer/register")}
              className={`px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base ${
                !isLogin
                  ? "font-semibold text-[#365006] border-b-4 border-[#365006]"
                  : "text-[#351903] hover:text-[#365006] transition"
              }`}
            >
              REGISTER
            </button>
          </div>
        </div>

        {/* Content */}
        <section className="flex-1 w-full flex justify-center px-5 py-8 sm:py-12">
          {children}
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
