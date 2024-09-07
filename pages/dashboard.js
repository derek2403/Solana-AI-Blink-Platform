import React, { useState } from 'react';
import { MultiBlink } from '../components/Collections';
import ChatBox from '../components/ChatBox';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { Button } from "@nextui-org/react";
import StarfieldBackground from '../components/Background';

const SidebarLayout = () => {
    const [selectedComponent, setSelectedComponent] = useState('create');
    const [walletAddress, setWalletAddress] = useState('');

    const menuItems = [
        { label: 'Create Blinks', id: 'create' },
        { label: 'My Blinks', id: 'collections' },
    ];

    const actionUrls = [
        'http://localhost:3000/api/actions/D9RUy6WicWsbZ6yaHdeAJfu4WrdZFwhfeWvSVHuEKeX9/buyNFT',
        'https://dial.to/?action=solana-action:https://blink.sunrisestake.com/api/actions/stake',
        'https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Ftiplink.io%2Fapi%2Fblinks%2Fdonate%3Fdest%3D8QNrVY8L6bRRNCGMtBeACSDFh9bBd1R6mMp2tkdBCqYK'
    ];

    const renderContent = () => {
        switch (selectedComponent) {
            case 'create':
                return (
                    <div className="text-white">
                        <h1 className="text-4xl font-bold  text-center pt-8">
                            Create Your&nbsp;
                            <span className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-green-400 bg-clip-text text-transparent p-1 rounded">
                                Blinks
                            </span>
                        </h1>
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
        <div className="relative min-h-screen w-full">
            <StarfieldBackground />
            <div className="absolute inset-0 z-10 flex flex-col bg-opacity-0 text-white">
                <header className="p-4 flex justify-between items-center">
                <img
                src="/onlyBlinks.png"  // Replace with the actual path to your image
                alt="Blinks Portfolio"
                style={{ width: '160px', height: 'auto', marginLeft: '3%'}}  // Adjust size as needed
                />
                <ConnectWalletButton setWalletAddress={setWalletAddress} />
                </header>

                <div className="flex flex-1 overflow-hidden">
                    <aside className="w-64 p-6 overflow-y-auto">
                        <nav>
                            <ul>
                                {menuItems.map((item) => (
                                    <li key={item.id} className="mb-4">
                                        <Button
                                            onClick={() => setSelectedComponent(item.id)}
                                            className={`text-left w-full py-2 px-4 rounded text-white font-bold ${selectedComponent === item.id
                                                ? 'bg-[#512DA8]'
                                                : 'hover:bg-gray-700 hover:bg-opacity-75 text-black'
                                                }`}
                                        >
                                            {item.label}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                    <main className="flex-grow p-6 overflow-y-auto">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;