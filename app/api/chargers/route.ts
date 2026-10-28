import { NextResponse } from 'next/server';
import { getAllChargers } from '@/lib/chargers';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: await getAllChargers() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ success: false, error: 'Unable to load charging locations. Please try again.' }, { status: 502 });
  }
}
