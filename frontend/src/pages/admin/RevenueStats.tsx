import React from 'react';
import { DollarSign, TrendingUp, Clock, Calendar } from 'lucide-react';

const stats = [
  {
    name: 'Today\'s Revenue',
    value: '$2,456',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    name: 'Active Bookings',
    value: '45',
    change: '+5.3%',
    icon: Clock,
    trend: 'up'
  },
  {
    name: 'Monthly Revenue',
    value: '$45,623',
    change: '+23.1%',
    icon: Calendar,
    trend: 'up'
  },
  {
    name: 'Occupancy Rate',
    value: '85%',
    change: '+8.2%',
    icon: TrendingUp,
    trend: 'up'
  }
];

export default function RevenueStats() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Revenue Overview
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {item.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}