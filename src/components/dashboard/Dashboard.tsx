'use client';

import React from 'react';
import { LineChart, Activity, Users, Clock } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Scripts',
      value: '24',
      change: '+4.75%',
      icon: LineChart
    },
    {
      title: 'Active Users',
      value: '12',
      change: '+10.2%',
      icon: Users
    },
    {
      title: 'Executions Today',
      value: '147',
      change: '+22.4%',
      icon: Activity
    },
    {
      title: 'Avg. Response Time',
      value: '2.4s',
      change: '-4.2%',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Aquí puedes agregar más secciones como gráficos, tablas, etc. */}
    </div>
  );
}