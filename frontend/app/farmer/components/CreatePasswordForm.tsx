"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";

export default function CreatePasswordForm({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = () => {
    // Check passwords
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check terms and conditions
    if (!agreeToTerms) {
      setError(
        "Please agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    setError("");

    // Continue registration
    onSubmit();
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
          Create Password
        </h2>

        <p className="font-onest text-sm text-[#351903]/70">
          Secure Your Account
        </p>
      </div>

      <div className="space-y-5">
        {/* Create Password */}
        <FormInput
          label="Create Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <FormInput
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Important Information */}
        <div className="bg-[#FFF8E7] border border-[#FDEBBE] rounded-xl p-4 md:p-5 mt-4">
          <h4 className="text-[#925E08] font-bold font-onest text-sm mb-1">
            Important Information
          </h4>

          <p className="font-onest text-[#925E08]/90 text-xs md:text-sm leading-relaxed">
            Your Farmer ID will be generated automatically after registration.
            Keep this ID safe. You will use it along with your password to log
            in.
          </p>
        </div>

        {/* Terms & Conditions */}
        <label className="flex items-start gap-3 cursor-pointer pt-2">
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

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-600 text-sm font-onest">
            {error}
          </p>
        )}

        {/* Create Button */}
        <button
          onClick={handleCreate}
          type="button"
          className="w-full h-12 mt-4 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
        >
          CREATE
        </button>
      </div>
    </div>
  );
}