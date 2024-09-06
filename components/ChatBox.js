import { useState } from 'react';
import BlinkPreview from './DynamicBlink'; // Ensure the import path is correct

export default function ChatBox({ walletAddress }) {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [actionApiUrl, setActionApiUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInput.trim()) {
      setResponse('Prompt cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/extract-payload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput, walletAddress }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setResponse(result.message);

      const newActionApiUrl = `http://localhost:3000/api/actions/${walletAddress}/buyNFT`;
      console.log('Generated Action URL:', newActionApiUrl);
      setActionApiUrl(newActionApiUrl);

    } catch (error) {
      console.error('Error submitting prompt:', error);
      setResponse('Failed to submit prompt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      gap: '2rem',
      backgroundColor: '#1a202c',
      color: '#e2e8f0',
      padding: '2rem',
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '900px' }}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="What Blink should I generate?"
          rows="4"
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            width: '1000px',
            borderRadius: '0.75rem',
            borderWidth: '2px',
            borderColor: '#4a5568',
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            outline: 'none',
            boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            transition: 'all 0.3s ease-in-out',
          }}
        />
        <button
          type="submit"
          disabled={loading || !walletAddress}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#1a202c',
            background: 'linear-gradient(to right, #4299e1, #68d391)',
            borderRadius: '0.5rem',
            border: 'none',
            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
            cursor: loading || !walletAddress ? 'not-allowed' : 'pointer',
            opacity: loading || !walletAddress ? '0.5' : '1',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {actionApiUrl && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontSize: '1rem', color: '#68d391', marginBottom: '1rem' }}>
            Action Link: <a href={actionApiUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4299e1', textDecoration: 'underline', cursor: 'pointer' }}>{actionApiUrl}</a>
          </p>
          <BlinkPreview actionApiUrl={actionApiUrl} />
        </div>
      )}
    </div>
  );
}