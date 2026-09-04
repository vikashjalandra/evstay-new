import { NextResponse } from 'next/server';
import { getAllChargers, createCharger } from '@/lib/chargers';
import { auth } from '@/auth';

export async function GET() {
  try {
    const chargers = await getAllChargers();
    return NextResponse.json({
      success: true,
      count: chargers.length,
      data: chargers
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Failed to fetch chargers:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body.name || !body.location?.lat || !body.location?.lng) {
      return NextResponse.json(
        { success: false, error: 'Missing required station fields (name, location)' },
        { status: 400 }
      );
    }

    const created = await createCharger(body);
    return NextResponse.json({
      success: true,
      data: created
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create charger:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create charger' },
      { status: 500 }
    );
  }
}
