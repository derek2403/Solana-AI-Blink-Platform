import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';

export default function ConnectWalletButton({ setWalletAddress }) {
    const { publicKey, connected } = useWallet();
    const walletAddress = connected && publicKey ? publicKey.toBase58() : 'Not connected';

    useEffect(() => {
        if (connected && walletAddress !== 'Not connected') {
            setWalletAddress(walletAddress);

            fetch(`/api/create-folder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message);
                })
                .catch((error) => {
                    console.error('Error creating folder:', error);
                });
        }
    }, [connected, walletAddress]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <WalletMultiButton style={{
                backgroundColor: '#4299e1',
                color: '#1a202c',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
            }} />
            {connected && (
                <p style={{
                }}>
                </p>
            )}
        </div>
    );
}