import React from 'react';
import { User, Mail, Lock, Phone, Calendar } from 'lucide-react';
import InputField from '../InputField';

interface BaseSignupFieldsProps {
  formData: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BaseSignupFields({ formData, onChange }: BaseSignupFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={onChange}
          icon={<User className="h-5 w-5 text-gray-400" />}
          placeholder="John"
          required
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={onChange}
          icon={<User className="h-5 w-5 text-gray-400" />}
          placeholder="Doe"
          required
        />
      </div>

      <InputField
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={onChange}
        icon={<User className="h-5 w-5 text-gray-400" />}
        placeholder="johndoe"
        required
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        icon={<Mail className="h-5 w-5 text-gray-400" />}
        placeholder="john@example.com"
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={onChange}
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        placeholder="••••••••"
        required
      />

      <InputField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={onChange}
        icon={<Phone className="h-5 w-5 text-gray-400" />}
        placeholder="+1 (555) 123-4567"
        required
      />

      <InputField
        label="Date of Birth"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={onChange}
        icon={<Calendar className="h-5 w-5 text-gray-400" />}
        placeholder="YYYY-MM-DD"
        required
      />
    </>
  );
}