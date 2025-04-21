import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { publicKey } = await request.json();
    
    if (!publicKey) {
      return NextResponse.json({ error: 'Public key is required' }, { status: 400 });
    }

    const response = await fetch('https://solana-mainnet.g.alchemy.com/v2/oHs0xLln0rLVHulnSd-vOn3LZ30nrfyn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'getAccountInfo',
        params: [publicKey],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch account info:', error);
    return NextResponse.json({ error: 'Failed to fetch account info' }, { status: 500 });
  }
} 