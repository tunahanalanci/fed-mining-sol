import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

// PUT: Update hours or reset maintenance overhaul timer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const authUser = verifyAuth(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { currentHours, averageWeeklyHours, resetOverhaul } = body;

    // Find drifter and check ownership
    const drifter = await prisma.customerDrifter.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!drifter) {
      return NextResponse.json({ error: 'Drifter not found' }, { status: 404 });
    }

    // Allow user to update their own drifters, and admin to update any client drifters
    if (drifter.userId !== authUser.id && authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data: any = {
      lastUpdatedAt: new Date()
    };

    if (currentHours !== undefined) {
      data.currentHours = parseFloat(currentHours);
    }
    
    if (averageWeeklyHours !== undefined) {
      data.averageWeeklyHours = parseFloat(averageWeeklyHours);
    }

    if (resetOverhaul) {
      // User performed 400h service, reset count to current hours
      data.lastOverhaulHours = currentHours !== undefined ? parseFloat(currentHours) : drifter.currentHours;
    }

    const updatedDrifter = await prisma.customerDrifter.update({
      where: { id: resolvedParams.id },
      data
    });

    return NextResponse.json({ drifter: updatedDrifter });
  } catch (error) {
    console.error('Update drifter error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Same as PUT (alias for dashboard compatibility)
export const PATCH = PUT;

// DELETE: Unregister a drifter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const authUser = verifyAuth(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const drifter = await prisma.customerDrifter.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!drifter) {
      return NextResponse.json({ error: 'Drifter not found' }, { status: 404 });
    }

    if (drifter.userId !== authUser.id && authUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.customerDrifter.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true, message: 'Drifter unregistered successfully' });
  } catch (error) {
    console.error('Delete drifter error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
