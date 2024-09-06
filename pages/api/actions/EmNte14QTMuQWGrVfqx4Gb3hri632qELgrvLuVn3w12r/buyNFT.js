
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
  "icon": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgz9hadyYQ1Y4Q_EKLx0nmtFXzcPWEAPpdBKGvHhsZAzh9d6FxSGOkuiBOu5zjYSoi3QX0a4HiHyvj0AHt5SCBK-1Er2Rh5Hx-vRU_o1QS75VFZwrn6LxggT2M3Cy0RrDFgBwUKK0ghfeCJ-AOydta-hoAOL15iVKlJ70GurI1AO7dBEuOP7tfSVJo2WlZ8/s320/blink.png",
  "label": "Anti-Abuse Dog Petition",
  "title": "End Abuse Against Dogs",
  "description": "Support our cause to end the abuse and mistreatment of dogs. Join us in raising awareness and advocating for stronger laws to protect our furry friends.",
  "links": {
    "actions": [
      {
        "label": "Sign to show your support for this petition",
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
    