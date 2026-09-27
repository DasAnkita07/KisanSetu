"use client";
import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import Link from 'next/link';

export default function PersonalDetailsForm({
  onNext,
}: {
  onNext: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
  if (!fullName) {
    setError("Please enter your full name.");
    return;
  }

  if (!email) {
    setError("Please enter your email address.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!state) {
    setError("Please select your state.");
    return;
  }

  if (!district) {
    setError("Please select your district.");
    return;
  }

  if (!village) {
    setError("Please enter your village / house details.");
    return;
  }

  if (!dateOfBirth) {
    setError("Please select your date of birth.");
    return;
  }

  if (!gender) {
    setError("Please select your gender.");
    return;
  }

  setError("");
  onNext();
};

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903]">
          Farmer Registration
        </h2>
        <p className="font-onest text-sm text-[#351903]/70">
          Tell us about yourself
        </p>
      </div>

      <div className="space-y-5">
        <FormInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
    
        <div>
          <FormInput
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormSelect 
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={[
                { value: "mh", label: "Maharashtra" },
                { value: "up", label: "Uttar Pradesh" },
              ]}
            />
          </div>
          <div className="flex-1">
            <FormSelect 
              label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              options={[
                { value: "d1", label: "Pune" },
                { value: "d2", label: "Nashik" },
              ]}
            />
          </div>
        </div>
        
        <FormInput
          label="Village / House"
          placeholder="Enter your village or house details"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
        />

        <div className="flex gap-4">
          <FormInput
            label="Date of Birth"
            type="date"
            placeholder="Select date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <div className="flex-1">
            <FormSelect
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { value: "m", label: "Male" },
                { value: "f", label: "Female" },
                { value: "o", label: "Other" },
              ]}
            />
          </div>
        </div>

        {error && (
          <p className="text-center text-red-600 text-sm font-onest">
            {error}
          </p>
        )}

        <button 
          onClick={handleNext}
          type="button"
          className="w-full h-12 mt-4 rounded-md bg-[#365006] text-white font-onest text-sm font-semibold tracking-wide hover:bg-[#2d4305] transition cursor-pointer"
        >
          CONTINUE
        </button>
        
        <p className="text-center font-onest text-sm text-[#351903]/70 pt-1">
          Already registered?{" "}
          <Link href="/farmer/login" className="font-semibold text-[#365006] hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
