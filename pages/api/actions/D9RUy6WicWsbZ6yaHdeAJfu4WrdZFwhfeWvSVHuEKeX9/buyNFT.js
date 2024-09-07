
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
  "icon": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4FIWyzAWXv_rUVt-s4mslyFzsAz2OJp7wYEKYjIVIKTJSdRJKnuLGA1SheM2H32V_I1FL4oNHjhGt4U1OyWA6VV3VTSeGU48hPcjAT_1uTfTCk29cxYdnsZyrr1Ogmq_m_weQy0A-bxy3SuCfWIoZLP2TrkWocBL23iBfmJzVmAavpjpeBhHSossoXurR/s320/ezgif.com-animated-gif-maker.gif",
  "label": "Stop Dog Abuse",
  "title": "Stop Dog Abuse",
  "description": "Join us in the fight against dog abuse. Raise awareness and support efforts to protect our furry friends from harm.",
  "links": {
    "actions": [
      {
        "label": "Sign to Show Your Support",
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
    