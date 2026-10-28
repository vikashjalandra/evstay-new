import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const base = (process.env.EVSTAY_API_URL || 'https://api.evstay.in').replace(/\/$/, '');
    const chargers = [];
    let after = '';
    for (let page = 0; page < 100; page++) {
      const response = await fetch(`${base}/api/customer-status/v1/chargers?limit=100&after=${encodeURIComponent(after)}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw Error('Status directory unavailable');
      const body = await response.json();
      if (!body.ok || !Array.isArray(body.chargers)) throw Error('Invalid status response');
      chargers.push(...body.chargers);
      if (!body.nextCursor) return NextResponse.json({ success: true, data: chargers }, { headers: { 'Cache-Control': 'no-store' } });
      if (body.nextCursor === after) throw Error('Invalid cursor');
      after = body.nextCursor;
    }
    throw Error('Directory too large');
  } catch {
    return NextResponse.json({ success: false, error: 'Live status unavailable.' }, { status: 502 });
  }
}
