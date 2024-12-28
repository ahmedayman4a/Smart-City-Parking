import { useState } from "react";
import { Building2 } from "lucide-react";
import ManagerSignupForm from "../../components/auth/signup/ManagerSignupForm";
import ParkingFacilityForm from "../../components/auth/signup/ParkingFacilityForm";
import { ManagerDTO } from "../../types/auth";

export default function ManagerSignup() {
  const [step, setStep] = useState(1);
  const [managerData, setManagerData] = useState<ManagerDTO | null>(null);

  const handleManagerSubmit = (data: ManagerDTO) => {
    setManagerData(data); // Save manager data in state
    setStep(2); // Move to the next step
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === 1 ? "Create Manager Account" : "Register Parking Facility"}
        </h2>
        <div className="mt-2 flex justify-center">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 1 ? "bg-blue-600" : "bg-blue-200"
              }`}
            >
              <span className="text-white">1</span>
            </div>
            <div
              className={`w-12 h-1 ${
                step === 1 ? "bg-blue-200" : "bg-blue-600"
              }`}
            />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 2 ? "bg-blue-600" : "bg-blue-200"
              }`}
            >
              <span className="text-white">2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 ? (
            <ManagerSignupForm onSubmit={handleManagerSubmit} />
          ) : (
            <ParkingFacilityForm managerData={managerData} />
          )}
        </div>
      </div>
    </div>
  );
}
