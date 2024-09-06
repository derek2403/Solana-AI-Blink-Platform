import { useState } from 'react';
import BlinkPreview from './DynamicBlink';
import { Button, Textarea } from "@nextui-org/react";
import { CopyIcon } from '../public/CopyIcon.js';
import { TickIcon } from '../public/TickIcon.js';

export default function ChatBox({ walletAddress }) {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [actionApiUrl, setActionApiUrl] = useState('');
  const [justCopied, setJustCopied] = useState(false);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(actionApiUrl).then(() => {
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 text-gray-200 p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="What Blink should I generate?"
          rows={4}
          className="w-full mb-4 bg-gray-800 bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 rounded-lg shadow border-none"
        />

        <Button
          type="submit"
          disabled={loading || !walletAddress}
          className="bg-[#512DA8] bg-opacity-75 rounded-lg shadow text-white font-bold"
          style={{ backgroundColor: '#512DA8', color: '#fff', fontWeight: 'bold',width: '20%'}}
        >
          {loading ? 'Processing...' : 'Submit'}
        </Button>
      </form>
      {actionApiUrl && (
        <div className="bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow text-center w-full">
          <h2 className="text-lg font-semibold mb-2">Action Link</h2>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-300 mr-2 break-all">
              {actionApiUrl}
            </p>
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0 inline-flex items-center"
              title={justCopied ? "Copied!" : "Copy address"}
            >
              {justCopied ? <TickIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
            </button>
          </div>
          <BlinkPreview actionApiUrl={actionApiUrl} />
        </div>
      )}
    </div>
  );
}