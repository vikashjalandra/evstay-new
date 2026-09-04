import { NextResponse } from 'next/server';
import { getAllLeads, createLead, deleteMultipleLeads } from '@/lib/leads';
import { auth } from '@/auth';

export async function GET() {
  try {
    const leads = await getAllLeads();
    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract client IP address from standard headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwarded
      ? forwarded.split(',')[0].trim()
      : realIp || '127.0.0.1';

    const userAgent = request.headers.get('user-agent') || 'Unknown Device';

    const created = await createLead({
      stationId: body.stationId || 'unknown-station',
      stationName: body.stationName || 'EV Charging Station',
      category: body.category || 'General',
      address: body.address || '',
      phone: body.phone || '',
      ipAddress,
      userAgent,
      action: body.action || 'Phone Call / Call to Book Slot'
    });

    return NextResponse.json({
      success: true,
      data: created
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const ids = body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No lead IDs provided for deletion' },
        { status: 400 }
      );
    }

    const deletedCount = await deleteMultipleLeads(ids);
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedCount} lead(s)`,
      count: deletedCount
    });
  } catch (error) {
    console.error('Failed to bulk delete leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to bulk delete leads' },
      { status: 500 }
    );
  }
}
