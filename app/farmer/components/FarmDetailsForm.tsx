"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

export default function FarmDetailsForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [primaryCrop, setPrimaryCrop] = useState("");
  const [landArea, setLandArea] = useState("");
  const [expectedProduce, setExpectedProduce] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [landId, setLandId] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!primaryCrop) {
      setError("Please select your primary crop.");
      return;
    }

    if (!landArea) {
      setError("Please enter your land area.");
      return;
    }

    if (!expectedProduce) {
      setError("Please enter your expected produce.");
      return;
    }

    if (!harvestDate) {
      setError("Please select your harvest date.");
      return;
    }

    if (!landId) {
      setError("Please enter your Land ID.");
      return;
    }

    setError("");
    onNext();
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
          Farm Details
        </h2>

        <p className="font-onest text-sm text-[#351903]/70">
          Tell us about your farm
        </p>
      </div>

      <div className="space-y-5">
        {/* Primary Crop */}
        <FormSelect
          label="Primary Crop"
          value={primaryCrop}
          onChange={(e) => setPrimaryCrop(e.target.value)}
          options={[
            { value: "wheat", label: "Wheat" },
            { value: "rice", label: "Rice" },
            { value: "cotton", label: "Cotton" },
            { value: "sugarcane", label: "Sugarcane" },
          ]}
        />

        {/* Land Area */}
        <div>
          <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
            Land Area
          </label>

          <div className="flex rounded-md border border-[#C9C4B2] bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#365006] focus-within:border-[#365006]">
            <input
              type="number"
              placeholder="area"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              className="flex-1 min-w-0 h-12 px-4 font-onest text-sm text-[#351903] outline-none"
            />

            <div className="h-12 px-4 flex items-center justify-center font-onest text-sm text-[#351903] bg-gray-50 border-l border-[#C9C4B2]">
              / Hectare
            </div>
          </div>
        </div>

        {/* Expected Produce */}
        <div>
          <label className="block font-onest text-sm font-medium text-[#351903] mb-2">
            Expected Produce
          </label>

          <div className="flex rounded-md border border-[#C9C4B2] bg-white overflow-hidden focus-within:ring-1 focus-within:ring-[#365006] focus-within:border-[#365006]">
            <input
              type="number"
              placeholder="quantity"
              value={expectedProduce}
              onChange={(e) => setExpectedProduce(e.target.value)}
              className="flex-1 min-w-0 h-12 px-4 font-onest text-sm text-[#351903] outline-none"
            />

            <div className="h-12 px-4 flex items-center justify-center font-onest text-sm text-[#351903] bg-gray-50 border-l border-[#C9C4B2]">
              / quintal
            </div>
          </div>
        </div>

        {/* Harvest Date */}
        <FormInput
          label="Harvest Date"
          type="date"
          placeholder="date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />

        {/* Land ID */}
        <FormInput
          label="Land ID"
          placeholder="Enter your Land ID"
          value={landId}
          onChange={(e) => setLandId(e.target.value)}
        />

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 text-sm font-onest">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={onBack}
            type="button"
            className="flex-1 h-12 rounded-md bg-white border border-[#365006] text-[#365006] font-onest text-sm font-semibold tracking-wide hover:bg-[#F8F6ED] transition cursor-pointer"
          >
            BACK
          </button>

          <button
            onClick={handleNext}
            type="button"
            className="flex-1 h-12 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}