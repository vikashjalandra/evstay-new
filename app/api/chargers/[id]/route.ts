import { NextResponse } from 'next/server';
import { getChargerById, updateCharger, deleteCharger } from '@/lib/chargers';
import { auth } from '@/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const charger = await getChargerById(id);
    if (!charger) {
      return NextResponse.json(
        { success: false, error: 'Charger not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: charger });
  } catch (error) {
    console.error('Failed to get charger:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const updated = await updateCharger(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Charger not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Failed to update charger:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update charger' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = await deleteCharger(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Charger not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Charger deleted successfully' });
  } catch (error) {
    console.error('Failed to delete charger:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete charger' },
      { status: 500 }
    );
  }
}
