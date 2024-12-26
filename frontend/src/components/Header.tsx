import React from 'react';
import { Car, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ParkWise</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Find Parking</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">How It Works</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Find Parking</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">How It Works</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Pricing</a>
              <a href="#" className="block px-3 py-2 text-blue-600 font-medium">Sign In</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}