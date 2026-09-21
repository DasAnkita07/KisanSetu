"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FarmerAuthLayout from "../components/FarmerAuthLayout";
import FormInput from "../components/FormInput";

export default function FarmerLogin() {
  const router = useRouter();
  const [farmerId, setFarmerId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!farmerId || !password) {
      setError("Please enter your Farmer ID and Password.");
      return;
    }
    setError("");
    router.push("/farmer/dashboard"); // Assuming a farmer dashboard route exists or will exist
  };

  return (
    <FarmerAuthLayout>
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
            Farmer Login
          </h2>
          <p className="font-onest text-sm md:text-md text-[#351903]/70">
            Login to manage your farm & procurement.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <FormInput
            label="Farmer ID"
            value={farmerId}
            onChange={(e) => setFarmerId(e.target.value)}
            placeholder="Enter Farmer ID"
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="font-onest text-sm md:text-md text-[#365006] hover:underline cursor-pointer"
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
            className="w-full h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
          >
            LOGIN
          </button>

          {/* Register Text */}
          <div className="text-center pt-2">
            <p className="font-onest text-sm text-[#351903]/70">
              Don&apos;t have an account?{" "}
              <Link href="/farmer/register" className="font-semibold text-[#365006] hover:underline cursor-pointer">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </FarmerAuthLayout>
  );
}
