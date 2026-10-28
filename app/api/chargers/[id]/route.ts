import { NextResponse } from 'next/server';
import { DirectoryError, getChargerById } from '@/lib/chargers';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return NextResponse.json({ success: true, data: await getChargerById(id) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const status = error instanceof DirectoryError ? error.status : 502;
    return NextResponse.json({ success: false, error: status === 404 ? 'Location no longer published.' : 'Unable to load this location.' }, { status });
  }
}
