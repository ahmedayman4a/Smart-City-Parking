import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find the perfect</span>
                <span className="block text-blue-600">parking spot instantly</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Book parking spots in advance, save time, and never worry about finding parking again. Real-time availability and competitive prices guaranteed.
              </p>
              
              <div className="mt-8 sm:mt-10">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-l-md pl-10 sm:text-sm border-gray-300"
                        placeholder="Enter location or landmark"
                      />
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 sm:justify-center lg:justify-start">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium text-blue-600 mr-2">1000+</span> Parking Spots
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium text-blue-600 mr-2">24/7</span> Customer Support
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium text-blue-600 mr-2">100%</span> Secure Booking
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
          alt="Modern parking garage"
        />
      </div>
    </div>
  );
}