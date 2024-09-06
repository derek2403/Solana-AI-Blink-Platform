
import { ActionGetResponse } from "@solana/actions";

const ACTIONS_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": 
    "Content-Type, Authorization, Content-Encoding, Accept-Encoding",
  "Content-Type": "application/json",
};

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, ACTIONS_CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    const payload = {
  "icon": "https://drive.google.com/file/d/1KUHmUHgZ5R6kf2vmaf_jxrxaVqtsa5dm/view?usp=sharing",
  "label": "NFT for Awareness",
  "title": "Stand Against Violence",
  "description": "I am seeking support to raise awareness against violence and harmful intentions. Our goal is to promote peace and understanding through this campaign.",
  "links": {
    "actions": [
      {
        "label": "Sign to Agree to This Petition",
        "href": "/api/signTransaction"
      }
    ]
  }
};

    res.writeHead(200, ACTIONS_CORS_HEADERS);
    res.end(JSON.stringify(payload));
    return;
  }

  res.writeHead(405, ACTIONS_CORS_HEADERS);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}
    