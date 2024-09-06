import React, { useState } from 'react';
import '@dialectlabs/blinks/index.css';
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import { Blink, useAction } from "@dialectlabs/blinks";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@nextui-org/react";

const extractHostname = (url) => {
  try {
    const fullUrl = new URL(url);
    return fullUrl.hostname;
  } catch (error) {
    try {
      const actionUrl = new URL(url.split('action=')[1]);
      return actionUrl.hostname;
    } catch (nestedError) {
      console.error('Failed to extract hostname:', nestedError);
      return 'Unknown Host';
    }
  }
};

// Mock data for charts
const lineChartData = [
  { date: '1/9/2024', donors: 4 },
  { date: '2/9/2024', donors: 7 },
  { date: '3/9/2024', donors: 5 },
  { date: '4/9/2024', donors: 10 },
  { date: '5/9/2024', donors: 8 },
];

const barChartData = [
  { amount: '0.1 SOL', donors: 15 },
  { amount: '0.25 SOL', donors: 20 },
  { amount: '0.5 SOL', donors: 10 },
  { amount: 'Custom', donors: 5 },
];

const AnalyticsPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Donation Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Total Donors</h3>
            <p className="text-3xl font-bold text-white">50</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Total Amount</h3>
            <p className="text-3xl font-bold text-white">25.5 SOL</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Donors Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} />
              <Legend />
              <Line type="monotone" dataKey="donors" stroke="#8B5CF6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Donation Amounts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="amount" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} />
              <Legend />
              <Bar dataKey="donors" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const BlinkPane = ({ url }) => {
  const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');
  const { action, error } = useAction({ url, adapter });
  const [showAnalytics, setShowAnalytics] = useState(false);

  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!action) return <p className="text-gray-400"></p>;

  const hostname = extractHostname(url);

  return (
    <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="flex-grow overflow-auto" style={{ minHeight: '400px' }}>
        <Blink
          action={action}
          websiteText={hostname}
          stylePreset="x-dark"
        />
      </div>
      <div className="p-2 text-center" style={{ color: '#512DA8' }}>
        <Button
          onClick={() => setShowAnalytics(true)}
          className="w-full"
          style={{
            backgroundColor: '#512DA8',
            color: '#fff', // Assuming you want white text on the button
          }}
          auto
        >
          <strong>Details</strong>
        </Button>
      </div>
      {showAnalytics && <AnalyticsPopup onClose={() => setShowAnalytics(false)} />}
    </div>
  );
};

export const MultiBlink = ({ actionUrls = [] }) => {
  return (
    <div className="text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center pt-8">
        <span className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-transparent p-1 rounded">
          Blinks
        </span> Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {actionUrls.length > 0 ? (
          actionUrls.slice(0, 8).map((url, index) => (
            <BlinkPane key={index} url={url} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No action URLs provided.</p>
        )}
      </div>
    </div>
  );
};

export default MultiBlink;