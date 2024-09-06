import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Blink, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

export default function BlinkPreview({ actionApiUrl }) {
    const { publicKey, connected } = useWallet();
    const walletAddress = connected && publicKey ? publicKey.toBase58() : 'Not connected';
    const { adapter } = useActionSolanaWalletAdapter('https://api.devnet.solana.com');
    const { action, error } = useAction({ url: actionApiUrl, adapter });

    useEffect(() => {
        console.log('Action:', action);
        console.log('Action error:', error);
        if (action) {
            console.log('Action title:', action.title);
            console.log('Action description:', action.description);
            console.log('Action links:', action.links);
        }
        fetch(actionApiUrl)
            .then(response => response.json())
            .then(data => console.log('API response:', data))
            .catch(error => console.error('API fetch error:', error));
    }, [action, error, actionApiUrl]);

    return (
        <div style={{
            maxWidth: '32rem',
            margin: '1.5rem auto',
            padding: '1.5rem',
            backgroundColor: '#2d3748',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#e2e8f0' }}>Blink Preview</h2>
            {error && (
                <div style={{
                    backgroundColor: '#742a2a',
                    borderLeft: '4px solid #f56565',
                    color: '#fed7d7',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '0.25rem',
                }} role="alert">
                    <p style={{ fontWeight: 'bold' }}>Error</p>
                    <p>{error.message}</p>
                </div>
            )}
            {action ? (
                <div style={{ width: '100%', border: '1px solid #4a5568', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <Blink
                        action={action}
                        websiteText={new URL(actionApiUrl).hostname}
                        stylePreset="x-dark"
                    />
                </div>
            ) : (
                <div style={{
                    width: '100%',
                    height: '16rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#4a5568',
                    borderRadius: '0.5rem',
                    color: '#a0aec0',
                }}>
                    <p>Loading Blink...</p>
                </div>
            )}
        </div>
    );
}