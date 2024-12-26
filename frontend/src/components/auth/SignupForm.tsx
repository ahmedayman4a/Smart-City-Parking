import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Building } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Egypt',
      postalCode: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the payload to match the backend's requirements
    const payload = {
      username: formData.email.split('@')[0], // Example: Use email prefix as username
      firstName: formData.name.split(' ')[0], // Extract first name from full name
      lastName: formData.name.split(' ').slice(1).join(' ') || 'Doe', // Default if no last name
      password: formData.password,
      email: formData.email,
      phoneNumber: formData.phoneNumber || '+201987654321', // Default if not provided
      address: formData.address,
      role: 'DOCTOR', // Example role
      insuranceNumber: 'INS987654321', // Replace with actual input if needed
      emergencyContactNumber: '+201987654320', // Replace with actual input if needed
    };

    console.log('Payload:', payload); // Debug the payload

    try {
      const response = await axios.post(
        'http://localhost:8080/api/authenticate/register/patient',
        payload
      );
      console.log('Response:', response.data);
      alert('Signup successful!');

      // Save the token in a cookie
      const token = response.data.token;
      Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days

      // Redirect to login page after successful signup
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup Error:', error);
      alert('Failed to create account. Please try again.');
      
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]; // e.g., 'street', 'city'
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Full name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        icon={<User className="h-5 w-5 text-gray-400" />}
        placeholder="John Doe"
        required
      />

      <InputField
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        icon={<Mail className="h-5 w-5 text-gray-400" />}
        placeholder="admin@example.com"
        required
      />

      <InputField
        label="Company name"
        name="company"
        type="text"
        value={formData.company}
        onChange={handleChange}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="Your Company"
        required
      />

      <InputField
        label="Phone Number"
        name="phoneNumber"
        type="text"
        value={formData.phoneNumber}
        onChange={handleChange}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="+201987654321"
        required
      />

      <InputField
        label="Street Address"
        name="address.street"
        type="text"
        value={formData.address.street}
        onChange={handleChange}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="456 Maple Avenue"
        required
      />

      <InputField
        label="City"
        name="address.city"
        type="text"
        value={formData.address.city}
        onChange={handleChange}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="Alexandria"
        required
      />

      <InputField
        label="State"
        name="address.state"
        type="text"
        value={formData.address.state}
        onChange={handleChange}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="Alexandria"
        required
      />

      <InputField
        label="Postal Code"
        name="address.postalCode"
        type="text"
        value={formData.address.postalCode}
        onChange={handleChange}
        icon={<Building className="h-5 w-5 text-gray-400" />}
        placeholder="67890"
        required
      />

      <div className="relative">
        <InputField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </label>
      </div>

      <AuthButton type="submit" text="Create account" />
    </form>
  );
}
