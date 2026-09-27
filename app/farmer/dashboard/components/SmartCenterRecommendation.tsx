"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration for local FastAPI ML microservice
const ML_SERVICE_HOSTS = ["http://127.0.0.1:8000", "http://localhost:8000"];

interface CentreCoordinates {
  lat: number;
  lon: number;
}

interface RankedCentre {
  centre_id: string;
  centre_name: string;
  district: string;
  supervisor?: string;
  coordinates: CentreCoordinates;
  score: number;
  distance_km: number;
  predicted_wait_time_minutes: number;
  available_capacity_mt: number;
  total_capacity_mt: number;
  current_utilization_pct: number;
  current_queue_count: number;
  weighbridges: number;
  operating_hours?: string;
  is_crop_supported: boolean;
  diversion_enabled: boolean;
  tags?: string[];
  explanation: string;
  rank: number;
  is_recommended: boolean;
}

interface RecommendationResponse {
  status: string;
  is_demo_data?: boolean;
  disclaimer?: string;
  input_summary?: {
    crop: string;
    quantity_kg: number;
    resolved_farmer_location: {
      village: string;
      lat: number;
      lon: number;
    };
    preferred_time_slot: string;
  };
  recommended_centre: RankedCentre | null;
  ranked_centres: RankedCentre[];
}

const COMMON_CROPS = ["Potato", "Paddy", "Wheat", "Mustard", "Maize"];

const REFERENCE_VILLAGES = [
  "Kalyani, Nadia",
  "Burdwan Central",
  "Singur, Hooghly",
  "Memari, Burdwan",
  "Ranaghat, Nadia",
  "Guskara, Purba",
  "Chinsurah, Hooghly",
  "Kalna, Purba Bardhaman",
  "Katwa, Purba Bardhaman",
  "Santipur, Nadia",
];

const TIME_SLOTS = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

export default function SmartCenterRecommendation() {
  // Input fields
  const [crop, setCrop] = useState<string>("Potato");
  const [customCrop, setCustomCrop] = useState<string>("");
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [village, setVillage] = useState<string>("Kalyani, Nadia");
  const [customVillage, setCustomVillage] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("10:00 - 12:00");
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsStatus, setGpsStatus] = useState<string>("");

  // Quick farmer crop suggestions from local storage if available
  const [savedFarmerCrops, setSavedFarmerCrops] = useState<{ name: string; quantity: number }[]>([]);

  // State flags & results
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [serviceOnline, setServiceOnline] = useState<boolean | null>(null);
  const [showAlternatives, setShowAlternatives] = useState<boolean>(false);

  // Check ML Microservice Health on Mount & prefill farmer profile info
  const checkServiceHealth = useCallback(async () => {
    for (const host of ML_SERVICE_HOSTS) {
      try {
        const res = await fetch(`${host}/health`, {
          method: "GET",
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          setServiceOnline(true);
          return;
        }
      } catch {
        // try next host
      }
    }
    setServiceOnline(false);
  }, []);

  useEffect(() => {
    checkServiceHealth();

    // Check for saved crops in localStorage for quick selection
    if (typeof window !== "undefined") {
      try {
        const rawCrops = localStorage.getItem("ks_crops");
        if (rawCrops) {
          const parsed = JSON.parse(rawCrops);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSavedFarmerCrops(parsed.slice(0, 4));
          }
        }
      } catch {
        // ignore
      }
    }
  }, [checkServiceHealth]);

  // Browser Geolocation integration
  const handleGetCoordinates = () => {
    if (!navigator.geolocation) {
      setGpsStatus("Geolocation not supported on this browser.");
      return;
    }
    setGpsLoading(true);
    setGpsStatus("Acquiring GPS location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLoading(false);
        const lat = parseFloat(position.coords.latitude.toFixed(4));
        const lon = parseFloat(position.coords.longitude.toFixed(4));
        setGpsCoords({ lat, lon });
        setGpsStatus(`GPS Acquired: ${lat}°, ${lon}°`);
      },
      (err) => {
        setGpsLoading(false);
        setGpsStatus(`GPS unavailable (${err.message}). Using village name.`);
        setGpsCoords(null);
      },
      { timeout: 8000 }
    );
  };

  // Submit recommendation request to FastAPI service
  const handleGetRecommendation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const selectedCrop = customCrop.trim() || crop;
    if (!selectedCrop) {
      setError("Please select or enter a crop name.");
      return;
    }

    if (!quantityKg || quantityKg <= 0) {
      setError("Please enter a valid quantity greater than 0 kg.");
      return;
    }

    const selectedVillage = customVillage.trim() || village;

    setLoading(true);
    setError(null);

    const payload = {
      crop: selectedCrop,
      quantity_kg: Number(quantityKg),
      farmer_village: selectedVillage || undefined,
      farmer_coords: gpsCoords || undefined,
      preferred_time_slot: timeSlot || "10:00 - 12:00",
      top_n: 5,
    };

    let fetchSuccessful = false;
    let lastErrorMsg = "";

    for (const host of ML_SERVICE_HOSTS) {
      try {
        const res = await fetch(`${host}/recommend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });

        if (res.ok) {
          const data: RecommendationResponse = await res.json();
          setResult(data);
          setServiceOnline(true);
          fetchSuccessful = true;
          break;
        } else {
          const errData = await res.json().catch(() => null);
          lastErrorMsg = errData?.detail || `ML Service returned status ${res.status}`;
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          lastErrorMsg = err.message;
        } else {
          lastErrorMsg = "Unable to connect to ML recommendation service.";
        }
      }
    }

    setLoading(false);

    if (!fetchSuccessful) {
      setServiceOnline(false);
      setError(
        lastErrorMsg
          ? `Connection failed: ${lastErrorMsg}. Ensure ML service is running (python ml/service.py).`
          : "Could not connect to ML recommendation service. Please verify that python ml/service.py is active."
      );
    }
  };

  const recommended = result?.recommended_centre;
  const alternatives = result?.ranked_centres?.filter(
    (c) => c.centre_id !== recommended?.centre_id
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.55 }}
      className="bg-[#F9FAF6] rounded-xl border border-[#D5D0BD] shadow-sm p-5 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Header section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="Smart Centre">
              🎯
            </span>
            <h3 className="font-oldenburg text-xl text-[#351903]">
              Smart Centre Match
            </h3>
          </div>

          {/* Status pill: checks whether python ml/service.py is reachable
          {serviceOnline === true && (
            <span className="px-2 py-0.5 rounded-full bg-[#E3F2E3] text-[#1E5D1E] text-[11px] font-semibold flex items-center gap-1 border border-[#C8E4C8]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              ML Active
            </span>
          )} */}
          {serviceOnline === false && (
            <button
              onClick={checkServiceHealth}
              title="Click to re-check ML service"
              className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium flex items-center gap-1 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Service Offline (Retry)
            </button>
          )}
        </div>

        <p className="font-onest text-sm text-[#351903]/70 mb-4">
          Find the best APMC depot with minimal queue wait-time & capacity.
        </p>

        {/* VIEW 1: RECOMMENDATION FORM */}
        {!result && (
          <form onSubmit={handleGetRecommendation} className="space-y-4">
            {/* Quick crop pills from farmer's current crops */}
            {savedFarmerCrops.length > 0 && (
              <div>
                <p className="font-onest text-xs font-semibold text-[#351903]/60 mb-1.5 uppercase tracking-wider">
                  Quick Select Your Listed Crops:
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {savedFarmerCrops.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setCrop(c.name);
                        setCustomCrop("");
                        setQuantityKg(c.quantity || 500);
                      }}
                      className={`text-xs px-2.5 py-1 rounded-md border font-onest transition-colors ${
                        crop === c.name && !customCrop
                          ? "bg-[#365006] text-white border-[#365006]"
                          : "bg-white text-[#351903] border-[#E9DDBD] hover:border-[#365006]"
                      }`}
                    >
                      {c.name} ({c.quantity} kg)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Crop Selection */}
            <div>
              <label
                htmlFor="recommend-crop-select"
                className="block font-onest text-xs font-semibold text-[#351903]/80 mb-1"
              >
                Produce / Crop Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  id="recommend-crop-select"
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setCustomCrop("");
                  }}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E9DDBD] rounded-lg text-[#351903] font-onest focus:outline-none focus:border-[#365006]"
                >
                  {COMMON_CROPS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Custom">Other / Custom</option>
                </select>

                {crop === "Custom" ? (
                  <input
                    type="text"
                    placeholder="Enter crop name..."
                    value={customCrop}
                    onChange={(e) => setCustomCrop(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#E9DDBD] rounded-lg text-[#351903] font-onest focus:outline-none focus:border-[#365006]"
                  />
                ) : (
                  <div className="text-xs text-[#351903]/60 flex items-center px-2 py-1 bg-white/70 border border-[#E9DDBD] rounded-lg font-onest">
                    <span>Selected: <strong>{crop}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity in KG */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="recommend-quantity-input"
                  className="font-onest text-xs font-semibold text-[#351903]/80"
                >
                  Lot Quantity (Kilograms)
                </label>
                <div className="flex gap-1">
                  {[200, 500, 1000, 2000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantityKg(preset)}
                      className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        quantityKg === preset
                          ? "bg-[#365006] text-white border-[#365006]"
                          : "bg-white text-[#351903]/70 border-[#E9DDBD] hover:border-[#365006]"
                      }`}
                    >
                      {preset} kg
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  id="recommend-quantity-input"
                  type="number"
                  min="10"
                  max="50000"
                  step="10"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E9DDBD] rounded-lg text-[#351903] font-onest focus:outline-none focus:border-[#365006]"
                  placeholder="e.g. 500"
                  required
                />
                <span className="absolute right-3 top-2 text-xs font-onest text-[#351903]/50">
                  kg ({Number(quantityKg / 1000).toFixed(2)} MT)
                </span>
              </div>
            </div>

            {/* Farmer Location / Village */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="recommend-village-select"
                  className="font-onest text-xs font-semibold text-[#351903]/80"
                >
                  Farmer Village / Origin
                </label>
                <button
                  type="button"
                  onClick={handleGetCoordinates}
                  disabled={gpsLoading}
                  className="text-[11px] text-[#365006] hover:underline flex items-center gap-1 font-semibold"
                >
                  {gpsLoading ? "Acquiring..." : "📍 Use GPS"}
                </button>
              </div>

              <select
                id="recommend-village-select"
                value={village}
                onChange={(e) => {
                  setVillage(e.target.value);
                  setCustomVillage("");
                  setGpsCoords(null);
                  setGpsStatus("");
                }}
                className="w-full px-3 py-2 text-sm bg-white border border-[#E9DDBD] rounded-lg text-[#351903] font-onest focus:outline-none focus:border-[#365006]"
              >
                {REFERENCE_VILLAGES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
                <option value="Custom">Custom Village / Region</option>
              </select>

              {village === "Custom" && (
                <input
                  type="text"
                  placeholder="Enter village name..."
                  value={customVillage}
                  onChange={(e) => setCustomVillage(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-sm bg-white border border-[#E9DDBD] rounded-lg text-[#351903] font-onest focus:outline-none focus:border-[#365006]"
                />
              )}

              {gpsStatus && (
                <p className="text-[11px] font-onest text-[#1E5D1E] mt-1 flex items-center gap-1">
                  ✓ {gpsStatus}
                </p>
              )}
            </div>

            {/* Preferred Time Slot */}
            <div>
              <label
                htmlFor="recommend-timeslot-select"
                className="block font-onest text-xs font-semibold text-[#351903]/80 mb-1"
              >
                Preferred Arrival Slot
              </label>
              <select
                id="recommend-timeslot-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#E9DDBD] rounded-lg text-[#351903] font-onest focus:outline-none focus:border-[#365006]"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message Box */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-onest text-red-700 leading-relaxed"
                >
                  <p className="font-semibold mb-0.5">Recommendation Request Failed</p>
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={() => handleGetRecommendation()}
                    className="mt-2 text-[11px] text-red-800 underline font-medium"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#365006] text-white rounded-lg font-onest text-sm font-semibold hover:bg-[#2d4305] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating APMC Depots...</span>
                </>
              ) : (
                <>
                  <span>Recommend Best Centre</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* LOADING STATE ANIMATION */}
        {loading && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="flex gap-1.5 items-center mb-3">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#365006] animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#365006] animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#365006] animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <p className="font-onest text-xs font-semibold text-[#351903]">
              Running ML Wait-Time Regressor
            </p>
            <p className="font-onest text-[11px] text-[#351903]/60 mt-0.5">
              Evaluating distance, weighbridge queues, and capacity headroom...
            </p>
          </div>
        )}

        {/* VIEW 2: RECOMMENDATION RESULT DISPLAY */}
        {result && (
          <div className="space-y-4">
            {/* Top Bar with Back / Modify button */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E9DDBD]">
              <div className="text-xs font-onest text-[#351903]/70">
                Crop: <strong className="text-[#351903]">{result.input_summary?.crop}</strong> ·{" "}
                {result.input_summary?.quantity_kg} kg
              </div>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
                className="text-xs text-[#365006] hover:underline font-semibold font-onest flex items-center gap-1"
              >
                ← Change Inputs
              </button>
            </div>

            {/* RECOMMENDED CENTRE CARD */}
            {recommended ? (
              <div className="bg-white rounded-xl border border-[#C8E4C8] shadow-sm p-4 relative">
                {/* Badge Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-[#E3F2E3] text-[#1E5D1E] font-onest text-[10px] font-bold tracking-wider uppercase mb-1">
                      ★ Top Recommended Centre
                    </span>
                    <h4 className="font-oldenburg text-base text-[#351903] leading-snug">
                      {recommended.centre_name}
                    </h4>
                    <p className="font-onest text-xs text-[#351903]/60">
                      ID: {recommended.centre_id} · {recommended.district}
                      {recommended.supervisor ? ` · Supv: ${recommended.supervisor}` : ""}
                    </p>
                  </div>

                  {/* Recommendation Score Badge */}
                  <div className="text-right flex-shrink-0 bg-[#F9FAF6] border border-[#E9DDBD] px-2.5 py-1 rounded-lg">
                    <p className="font-onest text-[10px] uppercase text-[#351903]/60 font-semibold">
                      Match Score
                    </p>
                    <p className="font-oldenburg text-lg font-bold text-[#365006]">
                      {recommended.score}
                      <span className="text-xs font-normal text-[#351903]/60">/100</span>
                    </p>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
                  {/* Distance */}
                  <div className="bg-[#F9FAF6] p-2 rounded-lg border border-[#E9DDBD] text-center">
                    <p className="font-onest text-[10px] text-[#351903]/60">Distance</p>
                    <p className="font-oldenburg text-sm font-bold text-[#351903]">
                      {recommended.distance_km} <span className="text-[10px] font-normal">km</span>
                    </p>
                  </div>

                  {/* Estimated Waiting Time */}
                  <div className="bg-[#F9FAF6] p-2 rounded-lg border border-[#E9DDBD] text-center">
                    <p className="font-onest text-[10px] text-[#351903]/60">Est. Wait</p>
                    <p className="font-oldenburg text-sm font-bold text-[#351903]">
                      ~{Math.round(recommended.predicted_wait_time_minutes)}{" "}
                      <span className="text-[10px] font-normal">mins</span>
                    </p>
                  </div>

                  {/* Current Queue */}
                  <div className="bg-[#F9FAF6] p-2 rounded-lg border border-[#E9DDBD] text-center">
                    <p className="font-onest text-[10px] text-[#351903]/60">Queue Load</p>
                    <p className="font-oldenburg text-sm font-bold text-[#351903]">
                      {recommended.current_queue_count}{" "}
                      <span className="text-[10px] font-normal">vehicles</span>
                    </p>
                  </div>

                  {/* Available Capacity */}
                  <div className="bg-[#F9FAF6] p-2 rounded-lg border border-[#E9DDBD] text-center">
                    <p className="font-onest text-[10px] text-[#351903]/60">Free Headroom</p>
                    <p className="font-oldenburg text-sm font-bold text-[#351903]">
                      {recommended.available_capacity_mt}{" "}
                      <span className="text-[10px] font-normal">MT</span>
                    </p>
                  </div>
                </div>

                {/* Recommendation Reason & Tags */}
                <div className="bg-[#F8F6ED] border border-[#E9DDBD] rounded-lg p-2.5 mb-3 text-xs font-onest text-[#351903]">
                  <p className="font-semibold text-[11px] text-[#365006] mb-1 flex items-center gap-1">
                    <span>💡</span> Why this centre was selected:
                  </p>
                  <p className="text-[#351903]/80 leading-relaxed text-xs">
                    {recommended.explanation || "Optimal balance of distance and wait time."}
                  </p>

                  {/* Tags */}
                  {recommended.tags && recommended.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {recommended.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-[#D5D0BD] text-[#351903]/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional centre info */}
                <div className="flex items-center justify-between text-[11px] font-onest text-[#351903]/60 px-1">
                  <span>Weighbridges: {recommended.weighbridges} active</span>
                  <span>Hours: {recommended.operating_hours || "08:00 AM - 06:00 PM"}</span>
                </div>
              </div>
            ) : (
              /* NO RESULT STATE */
              <div className="bg-white rounded-xl border border-[#E9DDBD] p-4 text-center">
                <p className="text-2xl mb-1">⚠️</p>
                <p className="font-oldenburg text-sm text-[#351903]">
                  No Suitable Centre Found
                </p>
                <p className="font-onest text-xs text-[#351903]/70 mt-1">
                  None of the registered APMC depots are currently accepting{" "}
                  <strong>{crop}</strong> for this quantity.
                </p>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="mt-3 px-3 py-1.5 bg-[#365006] text-white text-xs font-onest rounded-md"
                >
                  Try Different Crop or Quantity
                </button>
              </div>
            )}

            {/* VIEW OTHER RANKED ALTERNATIVES */}
            {alternatives && alternatives.length > 0 && (
              <div className="border border-[#E9DDBD] rounded-xl bg-white p-3">
                <button
                  type="button"
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  className="w-full flex items-center justify-between text-xs font-semibold font-onest text-[#351903]"
                >
                  <span className="flex items-center gap-1.5">
                    <span>📊</span>
                    <span>Other Evaluated Centres ({alternatives.length})</span>
                  </span>
                  <span className="text-[#365006]">{showAlternatives ? "▲ Hide" : "▼ Compare"}</span>
                </button>

                <AnimatePresence>
                  {showAlternatives && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2 pt-2 border-t border-[#E9DDBD]"
                    >
                      {alternatives.map((alt) => (
                        <div
                          key={alt.centre_id}
                          className="p-2.5 rounded-lg border border-[#E9DDBD] bg-[#F9FAF6] flex flex-col gap-1.5"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-oldenburg text-xs text-[#351903] flex items-center gap-1">
                                <span className="text-[#351903]/50">#{alt.rank}</span>
                                {alt.centre_name}
                              </p>
                              <p className="font-onest text-[10px] text-[#351903]/60">
                                {alt.distance_km} km away · ~
                                {Math.round(alt.predicted_wait_time_minutes)} mins wait ·{" "}
                                {alt.available_capacity_mt} MT free
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-[11px] font-bold font-oldenburg px-1.5 py-0.5 rounded ${
                                  alt.score > 50
                                    ? "bg-[#E3F2E3] text-[#1E5D1E]"
                                    : alt.score > 0
                                    ? "bg-amber-50 text-amber-800"
                                    : "bg-red-50 text-red-700"
                                }`}
                              >
                                {alt.score} pts
                              </span>
                            </div>
                          </div>

                          <p className="font-onest text-[10px] text-[#351903]/70 italic">
                            {alt.explanation}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Disclaimer pill */}
            {result.disclaimer && (
              <p className="text-[10px] text-[#351903]/50 font-onest text-center italic">
                {result.disclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}