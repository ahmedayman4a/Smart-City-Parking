import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Building } from 'lucide-react';
import InputField from './InputField';
import AuthButton from './AuthButton';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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