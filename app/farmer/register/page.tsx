"use client";
import React, { useState } from 'react';
import FarmerAuthLayout from '../components/FarmerAuthLayout';
import ProgressSteps from '../components/ProgressSteps';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import FarmDetailsForm from '../components/FarmDetailsForm';
import CreatePasswordForm from '../components/CreatePasswordForm';
import RegistrationSuccess from '../components/RegistrationSuccess';
import FarmerIdCard from '../components/FarmerIdCard';

export default function FarmerRegister() {
  const [step, setStep] = useState(1);

  return (
    <FarmerAuthLayout>
      <div className="w-full flex flex-col items-center max-w-md mx-auto">
        
        {step <= 3 && (
          <div className="w-full">
            <ProgressSteps currentStep={step} />
          </div>
        )}

        {step === 4 && (
          <div className="w-full mb-8 text-center">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903] mb-8">
              Farmer activation
            </h2>
            <ProgressSteps currentStep={4} />
          </div>
        )}

        {step === 5 && (
          <div className="w-full mb-8 text-center">
            <h2 className="font-oldenburg text-2xl sm:text-3xl text-[#351903] mb-8">
              Farmer activation
            </h2>
            <ProgressSteps currentStep={5} />
          </div>
        )}

        <div className="w-full">
          {step === 1 && <PersonalDetailsForm onNext={() => setStep(2)} />}
          {step === 2 && <FarmDetailsForm onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <CreatePasswordForm onSubmit={() => setStep(4)} />}
          {step === 4 && <RegistrationSuccess onNext={() => setStep(5)} />}
          {step === 5 && <FarmerIdCard />}
        </div>
      </div>
    </FarmerAuthLayout>
  );
}
