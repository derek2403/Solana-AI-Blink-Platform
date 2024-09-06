import React, { useState } from 'react';
import { MultiBlink } from '../components/Collections';  // Adjust the import path as necessary
import { AnalyticsPopup } from '../components/Collections';  // Adjust the import path as necessary
import ChatBox from '../components/ChatBox';  // Adjust the import path as necessary
import ConnectWalletButton from '../components/ConnectWalletButton';  // Adjust the import path as necessary

const SidebarLayout = () => {
  const [selectedComponent, setSelectedComponent] = useState('create');
  const [walletAddress, setWalletAddress] = useState('');

  const actionUrls = [
    'https://dial.to/?action=solana-action:https://blink.sunrisestake.com/api/actions/stake',
    'https://dial.to/?action=solana-action:https://www.dewicats.xyz/api/auction-blink',
    'https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Ftiplink.io%2Fapi%2Fblinks%2Fdonate%3Fdest%3D8QNrVY8L6bRRNCGMtBeACSDFh9bBd1R6mMp2tkdBCqYK'
  ];

  const menuItems = [
    { label: 'Create Blinks', id: 'create' },
    { label: 'Collections', id: 'collections' },
  ];

  const renderContent = () => {
    switch (selectedComponent) {
      case 'create':
        return (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Create Your Blink</h2>
            <ChatBox walletAddress={walletAddress} />
          </div>
        );
      case 'collections':
        return <MultiBlink actionUrls={actionUrls} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blinks Portfolio</h1>
        <ConnectWalletButton setWalletAddress={setWalletAddress} />
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 p-6">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.id} className="mb-4">
                  <button
                    onClick={() => setSelectedComponent(item.id)}
                    className={`text-left w-full py-2 px-4 rounded ${
                      selectedComponent === item.id ? 'bg-purple-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-grow p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;