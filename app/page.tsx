"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Oldenburg, Onest } from "next/font/google";
import { useRouter } from "next/navigation";

const oldenburg = Oldenburg({ subsets: ["latin"], weight: "400" });
const onest = Onest({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const features = [
  "Hassle-free slot booking",
  "Automated quality checks",
  "Instant and transparent payouts",
];

export default function KisanSetuOnboarding() {
  // Step 1: Logo only (0.0s - 1.0s)
  // Step 2: Logo + Title + Tagline (1.0s - 2.0s)
  // Step 3: Green curtain drops to reveal Onboarding UI (2.0s+)
  const [step, setStep] = useState(1);
  const [index, setIndex] = useState(0);

  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/login");
  };

  useEffect(() => {
    // 1.0s: Transition from Page 1 to Page 2
    const timer1 = setTimeout(() => setStep(2), 1000);

    // 1.0s (0.0s + 1.0s): Transition from Page 2 to Page 3
    const timer2 = setTimeout(() => setStep(3), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Dynamic feature text rotation (runs on Page 3)
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % features.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <main className="h-screen w-full bg-slate-50 flex flex-col justify-between items-center relative overflow-hidden select-none">
      
      {/* ---------------- PAGE 3 BACKGROUND SKETCH & HEADER ---------------- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/bgsketch.png"
          alt="Background Sketch"
          className="w-full h-full object-cover object-center opacity-70 mix-blend-multiply"
        />
      </div>

      {step === 3 && (
        <motion.img
          src="/onboardingFarmer.png"
          alt="Farmer Illustration"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute translate-y-[100%] left-1/2 -translate-x-1/2 w-72 sm:w-88 md:w-[440px] max-h-[48vh] object-contain drop-shadow-md pointer-events-none z-20 scale-100 sm:scale-160 md:scale-160 origin-bottom"
        />
      )}

      {/* Page 3 Header Section (Reveals as curtain drops) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={step === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="pt-4 md:pt-6 px-4 flex flex-col items-center text-center z-10 w-full max-w-2xl md:max-w-3xl mx-auto relative shrink-0"
      >
        <img
          src="/logoBrown.svg"
          alt="KisanSetu Logo"
          className="w-11 h-11 md:w-19 md:h-19 object-contain"
        />

        <h1
          style={{ fontFamily: "var(--font-oldenburg)" }}
          className="text-3xl md:text-5xl text-[#351903]"
        >
          KisanSetu
        </h1>

        <p
          style={{ fontFamily: "var(--font-onest)" }}
          className="text-sm md:text-lg text-center max-w-xs md:max-w-md text-[#925E08]"
        >
          The Digital Bridge for Every Farmer
        </p>

        {/* Dynamic Rotating Text Block */}
        <div
          style={{ fontFamily: "var(--font-onest)" }}
          className="mt-10 md:mt-7 text-slate-800 text-base sm:text-lg md:text-2xl sm:px-26 text-center shrink-0 flex flex-col items-center md:whitespace-nowrap"
        >
          <span>KisanSetu is a smart digital platform that eliminates long mandi queues with </span>

          <div className="inline-flex relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ fontFamily: "var(--font-onest)" }}
                className="text-xl md:text-3xl font-bold text-[#2b4c00] inline-block mt-2 "
              >
                {features[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ---------------- GREEN CURTAIN CONTAINER (PAGES 1, 2, & 3) ---------------- */}
      <motion.div
        layoutId="green-header" // <-- Add this property
        initial={{ height: "100vh", borderRadius: "0% 0%" }}
        animate={
          step === 3
            ? { height: "17vh", borderRadius: "7% 7% 0 0" }
            : { height: "100vh", borderRadius: "0% 0%" }
        }
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        className="w-full bg-[#365006] absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center px-6 pb-6"
      >
        {/* PAGE 1 & PAGE 2 CONTENT */}
        <AnimatePresence>
          {step < 3 && (
            <motion.div
              key="intro"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center justify-center space-y-3"
            >
              {/* Page 1 Logo */}
              <motion.img
                src="/mainLogo.svg"
                alt="KisanSetu Logo"
                initial={{ scale: 2.0, opacity: 0, y: 0 }}
                animate={{
                  scale: step === 2 ? 1.0 : 2.0,
                  opacity: 1,
                  y: step === 2 ? 12 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />

              {/* Page 2 Title & Subtitle (Fades in at 1.0s) */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5, // Holds back text until the logo finishes gliding up
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center space-y-2"
                >
                  <h1
                    style={{ fontFamily: "var(--font-oldenburg)" }}
                    className="text-3xl md:text-5xl text-white"
                  >
                    KisanSetu
                  </h1>
                  <p
                    style={{ fontFamily: "var(--font-onest)" }}
                    className="text-sm md:text-lg text-[#F0E383] text-center max-w-xs md:max-w-md"
                  >
                    The Digital Bridge for Every Farmer
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PAGE 3 CONTENT (Farmer & Get Started Button) */}
        {step === 3 && (
          <>
            <motion.button
              layoutId="yellow-bar" // <-- Add this property
              onClick={handleGetStarted} // <-- Add this prop
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.0}}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "var(--font-onest)" }}
              className="w-full sm:max-w-3xs md:max-w-xs bg-[#F0E383] py-3 px-6 rounded-[14px] text-xl md:text-2xl font-extrabold text-[#365006] text-center tracking-wider z-30 
              X: 3, Y: 4, Blur: 7, Color: #FFFFFF (50% opacity)
              X: -3, Y: -4, Blur: 7, Color: #000000 (20% opacity)
              shadow-[inset_0_3px_2px_rgba(255,255,255,0.6),_inset_0_-4px_4px_rgba(0,0,0,0.15)]
              X: 0, Y: 6, Blur: 8, Color: #000000 (30% opacity)
              shadow-[0_6px_10px_rgba(0,0,0,0.3)]
              active:translate-y-[0px] active:shadow-[inset_0_2px_1px_rgba(255,255,255,0.8),_inset_0_-2px_2px_rgba(0,0,0,0.15),_0_3px_6px_rgba(0,0,0,0.3)]
              transition-all duration-150"
            >
              GET STARTED
            </motion.button>
          </>
        )}
      </motion.div>
    </main>
  );
}