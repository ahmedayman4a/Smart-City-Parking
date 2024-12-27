import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Car } from 'lucide-react';
import InputField from '../InputField';
import AuthButton from '../AuthButton';
import { useNavigate } from 'react-router-dom';

interface ParkingFacilityFormProps {
  managerId: string;
}

export default function ParkingFacilityForm({ managerId }: ParkingFacilityFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parkName: '',
    totalSlots: '',
    address: '',
    ratePerHour: '',
    penalty: '',
    startPrice: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to create parking facility
    console.log('Creating parking facility:', {
      ...formData,
      managerId
    });
    
    // Mock credentials for testing
    const mockCredentials = {
      email: 'manager@parkwise.com',
      password: 'manager123'
    };
    
    alert(`Facility registered successfully!\n\nLogin credentials:\nEmail: ${mockCredentials.email}\nPassword: ${mockCredentials.password}`);
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Parking Facility Name"
        name="parkName"
        type="text"
        value={formData.parkName}
        onChange={handleChange}
        icon={<Building2 className="h-5 w-5 text-gray-400" />}
        placeholder="Downtown Parking"
        required
      />

      <InputField
        label="Total Parking Slots"
        name="totalSlots"
        type="number"
        value={formData.totalSlots}
        onChange={handleChange}
        icon={<Car className="h-5 w-5 text-gray-400" />}
        placeholder="100"
        required
      />

      <InputField
        label="Address"
        name="address"
        type="text"
        value={formData.address}
        onChange={handleChange}
        icon={<MapPin className="h-5 w-5 text-gray-400" />}
        placeholder="123 Main St, City"
        required
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <InputField
          label="Rate per Hour ($)"
          name="ratePerHour"
          type="number"
          value={formData.ratePerHour}
          onChange={handleChange}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
          placeholder="5.00"
          required
        />

        <InputField
          label="Penalty Fee ($)"
          name="penalty"
          type="number"
          value={formData.penalty}
          onChange={handleChange}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
          placeholder="20.00"
          required
        />

        <InputField
          label="Start Price ($)"
          name="startPrice"
          type="number"
          value={formData.startPrice}
          onChange={handleChange}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
          placeholder="2.00"
          required
        />
      </div>

      <AuthButton type="submit" text="Register Facility" />
    </form>
  );
}