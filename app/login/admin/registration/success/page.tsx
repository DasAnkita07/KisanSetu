//adminregistration3
"use client";

import { useRouter } from "next/navigation";

export default function AdminRegistration3() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col">

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

      <div className="w-full flex justify-center pt-5 sm:pt-7">
        <div className="flex border-b border-[#365006]">
          <button
            onClick={() => router.push("/login/admin")}
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

          <div className="mx-auto w-20 h-20 rounded-full bg-[#365006] text-white flex items-center justify-center text-4xl mb-6">
            ✓
          </div>

          <h3 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
            Registration Successful!
          </h3>

          <p className="font-onest text-sm text-[#351903]/70 mt-3">
            Your admin account has been successfully registered.
          </p>

          <button
            type="button"
            onClick={() => router.push("/login/admin/registration")}
            className="w-full h-12 mt-8 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition"
          >
            CONTINUE
          </button>

        </div>
      </section>

      <div className="w-full h-7 sm:h-9 bg-[#F0E383] border-t border-[#D8C867]" />

    </main>
  );
}