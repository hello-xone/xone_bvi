export default async function handler(req, res) {
  const { target } = req.query;

  if (!target) {
    return res.status(400).json({ error: 'Missing target parameter' });
  }

  const rpcUrls = {
    'testnet': 'https://rpc-testnet.xone.org',
    'mainnet': 'https://rpc.xone.org'
  };

  const rpcUrl = rpcUrls[target];

  if (!rpcUrl) {
    return res.status(400).json({ error: 'Invalid target' });
  }

  try {
    const response = await fetch(rpcUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
