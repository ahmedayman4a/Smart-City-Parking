import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Car } from "lucide-react";
import BaseSignupFields from "./BaseSignupFields";
import InputField from "../InputField";
import AuthButton from "../AuthButton";
import type { DriverDTO } from "../../../types/auth";

const API_URL = "http://localhost:8080";

export default function DriverSignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    licensePlateNumber: "",
    carModel: "",
  });

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.birthDate ||
      !formData.licensePlateNumber ||
      !formData.carModel
    ) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isLoading) {
      return;
    }

    setError("");
    setIsLoading(true);
    console.log("Submitting form data..."); // Debug log

    try {
      const driverData: DriverDTO = {
        ...formData,
        birthDate: new Date(formData.birthDate),
      };
      console.log("Prepared driver data:", driverData); // Debug log

      const response = await axios.post(
        `${API_URL}/api/authenticate/signUp/driver`,
        driverData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Server response:", response); // Debug log

      // Check status code instead of response.data.success
      if (response.status >= 200 && response.status < 300) {
        console.log("Signup successful, redirecting..."); // Debug log
        navigate("/login");
        return;
      }

      setError("Signup failed. Please try again.");
    } catch (err: any) {
      console.error("Full error details:", err); // Debug log

      if (err.response?.status === 409) {
        setError("User already exists with this email");
      } else if (err.response?.status >= 200 && err.response?.status < 300) {
        // Handle success that might be caught as error
        console.log("Signup successful (from catch block)"); // Debug log
        navigate("/login");
        return;
      } else {
        setError(
          err.response?.data?.message || "An error occurred during signup"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <BaseSignupFields formData={formData} onChange={handleChange} />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="License Plate Number"
          name="licensePlateNumber"
          type="text"
          value={formData.licensePlateNumber}
          onChange={handleChange}
          icon={<Car className="h-5 w-5 text-gray-400" />}
          placeholder="ABC123"
          required
        />
        <InputField
          label="Car Model"
          name="carModel"
          type="text"
          value={formData.carModel}
          onChange={handleChange}
          icon={<Car className="h-5 w-5 text-gray-400" />}
          placeholder="Toyota Camry"
          required
        />
      </div>

      <AuthButton
        type="submit"
        text={isLoading ? "Signing up..." : "Sign up as Driver"}
        disabled={isLoading}
      />
    </form>
  );
}
