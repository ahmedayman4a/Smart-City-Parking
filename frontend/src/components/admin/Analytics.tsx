import React from 'react';
import { BarChart3, TrendingUp, Users, Car } from 'lucide-react';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    changeType: 'increase'
  },
  {
    name: 'Active Users',
    value: '2,345',
    change: '+15.3%',
    changeType: 'increase'
  },
  {
    name: 'Parking Occupancy',
    value: '85%',
    change: '+5.2%',
    changeType: 'increase'
  },
  {
    name: 'Avg. Booking Duration',
    value: '2.5 hrs',
    change: '+12.5%',
    changeType: 'increase'
  }
];

export default function Analytics() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Analytics Overview</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-5 w-5 ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className="ml-2">{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}