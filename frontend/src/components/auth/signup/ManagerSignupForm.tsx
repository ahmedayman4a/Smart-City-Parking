import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseSignupFields from './BaseSignupFields';
import AuthButton from '../AuthButton';
import type { ManagerDTO } from '../../../types/auth';

const API_URL = import.meta.env.VITE_API_URL;

export default function ManagerSignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    birthDate: ''
  });
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.username || 
        !formData.firstName || !formData.lastName || !formData.phoneNumber || 
        !formData.birthDate) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isLoading) {
      return;
    }
    setError('');
    setIsLoading(true);
    console.log('Submitting form data...'); // Debug log

    try {
      // Convert birthDate string to Date object
      const managerData: ManagerDTO = {
        ...formData,
        birthDate: new Date(formData.birthDate)
      };

      // Make API call to signup endpoint
      const response = await axios.post(
        `${API_URL}/api/authenticate/signUp/parkingOwner`,
        managerData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
// Check status code instead of response.data.success
      if (response.status >= 200 && response.status < 300) {
        console.log('Signup successful, redirecting...'); // Debug log
        navigate('/login');
        return;
      }
      
      setError('Signup failed. Please try again.');
      
    } catch (err: any) {
      console.error('Full error details:', err); // Debug log
      
      if (err.response?.status === 409) {
        setError('User already exists with this email');
      } else if (err.response?.status >= 200 && err.response?.status < 300) {
        // Handle success that might be caught as error
        console.log('Signup successful (from catch block)'); // Debug log
        navigate('/login');
        return;
      } else {
        setError(err.response?.data?.message || 'An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
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
        text={isLoading ? "Signing up..." : "Sign up as Driver"}
        disabled={isLoading}
      />
    </form>
  );
}