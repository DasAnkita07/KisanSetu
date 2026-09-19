// Farmer Registration Step 3: Success & Digital Kisan Card
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FarmerRegistrationSuccess() {
  const router = useRouter();

  const [farmer, setFarmer] = useState({
    id: "FAR-108",
    name: "Ramesh Chandra Mondal",
    mobile: "+91 98765 43210",
    village: "Anandapur, Nadia",
    land: "4.5 Acres",
    crop: "Potato (Jyoti)",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = sessionStorage.getItem("newFarmer_id") || "FAR-108";
      const name = sessionStorage.getItem("newFarmer_name") || "Ramesh Chandra Mondal";
      const mobile = sessionStorage.getItem("newFarmer_mobile") || "9876543210";
      const village = sessionStorage.getItem("newFarmer_village") || "Anandapur, Nadia";
      const land = sessionStorage.getItem("newFarmer_land") || "4.5 Acres";
      const crop = sessionStorage.getItem("newFarmer_crop") || "Potato (Jyoti)";

      const userObj = {
        id,
        name,
        mobile: `+91 ${mobile}`,
        village,
        land,
        crop,
      };

      setFarmer(userObj);
      sessionStorage.setItem("farmerUser", JSON.stringify(userObj));
    }
  }, []);

  const handleEnterDashboard = () => {
    router.push("/login/farmer/dashboard");
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F6ED] flex flex-col justify-between">
      
      {/* Header */}
      <header className="w-full bg-[#365006] rounded-b-md px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
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

      {/* Tabs */}
      <div className="w-full flex justify-center pt-4 sm:pt-6">
        <div className="flex border-b border-[#365006]">
          <button
            type="button"
            onClick={() => router.push("/login/farmer")}
            className="px-8 sm:px-12 pb-2 font-onest text-sm sm:text-base text-[#351903] hover:text-[#365006] cursor-pointer"
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
      <section
        className="flex-1 w-full flex justify-center px-4 py-6 sm:py-8"
        style={{
          backgroundImage: "url('/bgsketch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#B18A3D]/40 shadow-xl text-center">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 rounded-full bg-[#365006] text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-md"
          >
            ✓
          </motion.div>

          <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#365006] mb-1">
            Account Activated!
          </h2>

          <p className="font-onest text-xs sm:text-sm text-[#351903]/80 mb-6">
            Your KisanSetu digital identity is verified &amp; ready for procurement slot booking.
          </p>

          {/* Kisan Digital Card */}
          <div className="bg-gradient-to-br from-[#E8D7B0] to-[#E1CCA0] border border-[#B18A3D] rounded-xl p-4 text-left shadow-md relative overflow-hidden mb-6">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-15 pointer-events-none">
              <img src="/logoBrown.svg" alt="watermark" className="w-full h-full object-contain" />
            </div>

            <div className="flex items-center justify-between border-b border-[#B18A3D]/30 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-oldenburg text-lg font-bold text-[#351903]">KisanSetu</span>
                <span className="text-[9px] bg-[#365006] text-white font-bold px-1.5 py-0.5 rounded font-onest">
                  Verified Farmer
                </span>
              </div>
              <span className="font-onest text-xs font-bold text-[#365006] bg-white/60 px-2 py-0.5 rounded">
                {farmer.id}
              </span>
            </div>

            <div className="space-y-1.5 font-onest text-xs text-[#351903]">
              <div className="flex justify-between">
                <span className="text-[#351903]/70">Farmer Name:</span>
                <span className="font-bold">{farmer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#351903]/70">Mobile:</span>
                <span className="font-medium">{farmer.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#351903]/70">Location:</span>
                <span className="font-medium">{farmer.village}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#351903]/70">Land Holding:</span>
                <span className="font-medium">{farmer.land}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#351903]/70">Primary Crop:</span>
                <span className="font-medium text-[#365006] font-semibold">{farmer.crop}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            onClick={handleEnterDashboard}
            className="w-full h-11 sm:h-12 rounded-lg bg-[#365006] text-white font-semibold text-sm tracking-wide hover:bg-[#2c4205] transition cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>GO TO FARMER DASHBOARD</span>
            <span>→</span>
          </button>

          <div className="mt-3">
            <Link
              href="/login/farmer"
              className="font-onest text-xs text-[#351903]/70 hover:text-[#365006] hover:underline"
            >
              Sign in with another ID
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="h-7 sm:h-8 bg-[#F0E383] border-t border-[#D8C867] flex items-center justify-between px-3 sm:px-5 shrink-0">
        <span className="font-onest text-[7px] sm:text-[8px] text-[#351903]">© KisanSetu</span>
        <div className="flex gap-4 font-onest text-[7px] sm:text-[8px] text-[#351903]">
          <span>Mandi e-Pass Helpline: 1800-KISAN-SETU</span>
        </div>
      </footer>

    </main>
  );
}
