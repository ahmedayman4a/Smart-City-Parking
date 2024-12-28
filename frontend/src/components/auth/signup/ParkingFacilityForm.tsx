import React, { useState } from "react";
import { Building2, MapPin, DollarSign, Car } from "lucide-react";
import InputField from "../InputField";
import AuthButton from "../AuthButton";
import Dropdown from "../Dropdown";
import MapSelector from "../MapSelector";
import apiClient from "../../../api/apiClient";
import { useAuth } from "../../../context/AuthContext";

export default function ParkingFacilityForm({ managerData }: any) {
  const [formData, setFormData] = useState({
    name: "",
    totalSpaces: "",
    address: "",
    ratePerHour: "",
    penalty: "",
    startPrice: "",
    type: "",
    longitude: 0,
    latitude: 0,
  });
  const { login } = useAuth();
  const [parkingLotType, setParkingLotType] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/parkingLot/create", formData);
      login(managerData.email, managerData.password);
    } catch (error) {
      console.error("Error creating parking facility:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (value: string) => {
    setParkingLotType(value);
    setFormData({
      ...formData,
      type: value.toUpperCase(),
    });
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData({
      ...formData,
      longitude: lng,
      latitude: lat,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Parking Facility Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        icon={<Building2 className="h-5 w-5 text-gray-400" />}
        placeholder="Downtown Parking"
        required
      />

      <InputField
        label="Total Parking Slots"
        name="totalSpaces"
        type="number"
        value={formData.totalSpaces}
        onChange={handleChange}
        icon={<Car className="h-5 w-5 text-gray-400" />}
        placeholder="100"
        required
      />

      <Dropdown
        label="Parking Type"
        options={["Standard", "Handicap", "Electric"]}
        value={parkingLotType}
        onChange={(value: string) => handleDropdownChange(value)}
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
          label="Rate per Hr ($)"
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
      <MapSelector onLocationSelect={handleLocationSelect} />
      <AuthButton type="submit" text="Register Facility" />
    </form>
  );
}
