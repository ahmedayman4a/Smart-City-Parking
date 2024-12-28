import React, { useState } from "react";
import axios from "axios";
import BaseSignupFields from "./BaseSignupFields";
import AuthButton from "../AuthButton";
import type { ManagerDTO } from "../../../types/auth";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8080";

interface ManagerSignupFormProps {
  onSubmit: (data: ManagerDTO) => void;
}

export default function ManagerSignupForm({
  onSubmit,
}: ManagerSignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.birthDate
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

    try {
      const managerData: ManagerDTO = {
        ...formData,
        birthDate: new Date(formData.birthDate),
      };

      const response = await axios.post(
        `${API_URL}/api/authenticate/signUp/parkingOwner`,
        managerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup response:", response);
      if (response.status >= 200 && response.status < 300) {
        onSubmit(managerData);
        Cookies.set("authToken", response.data.data, { expires: 7 });
        return;
      }

      setError("Signup failed. Please try again.");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("User already exists with this email");
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
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <BaseSignupFields formData={formData} onChange={handleChange} />
      <AuthButton
        type="submit"
        text={isLoading ? "Signing up..." : "Sign up as Manager"}
        disabled={isLoading}
      />
    </form>
  );
}
