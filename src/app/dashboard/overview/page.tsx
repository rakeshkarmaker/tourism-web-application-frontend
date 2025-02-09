'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';
import { Bar as BarChartJS } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, ChartLegend);

const data = [
  { name: 'Followers', value: -0.03 },
  { name: 'Orders', value: 15.03 },
  { name: 'Total Balance', value: 6.08 },
];

const chartData = {
  labels: ['Followers', 'Orders', 'Total Balance'],
  datasets: [
    {
      label: 'Percentage Change',
      data: [-0.03, 15.03, 6.08],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

const ongoingGuides = [
  { customerName: 'ByelWind', date: 'Jun 24, 2024', destination: 'Old chaka city tour', duration: 10, status: 'fun@courses' },
  { customerName: 'Natali Craig', date: 'Mar 10, 2024', destination: 'Sajek Tour', duration: 30, status: 'compeata' },
  { customerName: 'Drew Cano', date: 'Nov 10, 2024', destination: 'Dhaka city Tour', duration: 70, status: 'Reading' },
];

export default function Overview() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Income</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <BarChartJS data={chartData} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Present Ongoing Guides</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour Destination</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Here, We are running a loop on a map to fetch all the data */}
            {ongoingGuides.map((guide, index) => ( 
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guide.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guide.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guide.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guide.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guide.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}