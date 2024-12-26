import React from 'react';
import { Clock, MapPin, CreditCard, Shield } from 'lucide-react';

const features = [
  {
    name: 'Real-time Availability',
    description: 'Find available parking spots instantly with live updates on occupancy status.',
    icon: Clock,
  },
  {
    name: 'Easy Location Search',
    description: 'Search for parking spots by address, landmark, or current location.',
    icon: MapPin,
  },
  {
    name: 'Secure Payments',
    description: 'Pay safely online with multiple payment options and instant confirmation.',
    icon: CreditCard,
  },
  {
    name: 'Guaranteed Spots',
    description: 'Your parking spot is guaranteed upon reservation with our secure booking system.',
    icon: Shield,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Smart Parking Made Simple
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Everything you need to make parking hassle-free and efficient.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}