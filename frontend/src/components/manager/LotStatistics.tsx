import React from 'react';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

const statistics = [
  {
    name: 'Total Revenue Today',
    value: '$1,234',
    change: '+12.5%',
    icon: DollarSign
  },
  {
    name: 'Current Occupancy',
    value: '85%',
    change: '+5.2%',
    icon: Users
  },
  {
    name: 'Average Duration',
    value: '2.5 hrs',
    change: '+8.1%',
    icon: Clock
  },
  {
    name: 'Peak Hours',
    value: '2-4 PM',
    change: 'Consistent',
    icon: TrendingUp
  }
];

export default function LotStatistics() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Today's Overview</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div
              key={stat.name}
              className="bg-gray-50 rounded-lg p-5"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-green-600">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}